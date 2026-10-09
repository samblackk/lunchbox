import { beforeEach, describe, expect, it, vi } from 'vitest'

import { rubricQuestions } from '@/content/rubric/questions'
import { frozenStatement } from '@/content/rubric/frozen'

import { asStatement, maxStatementLength, scoreStatement } from './score'

// The real one reads request headers, which only exist during a render.
const takeSlot = () => Promise.resolve({ waitMs: 0 })

const answerBody = {
  model: 'jev-1.13.0',
  answers: Object.fromEntries(
    Object.entries(rubricQuestions).map(([id, question]) => [
      id,
      question.type === 'noul'
        ? { type: 'noul', noul: 0.5 }
        : {
            type: 'score',
            score: 1,
            confidence: 0.5,
            probabilities: { '0': 0.5, '1': 0.5 },
            legend: { '0': 'low', '1': 'high' },
          },
    ]),
  ),
}

describe('scoreStatement', () => {
  beforeEach(() => {
    // Empty key means scoreWithJev returns before any network call, so the
    // failure path is exercised without a request.
    vi.stubEnv('TYPESAFE_API_KEY', '')
  })

  it('serves the captured answers when nothing was asked', async () => {
    const scoring = await scoreStatement('')
    expect(scoring).toMatchObject({ state: 'scored', live: false })
  })

  it('names the captured statement when nothing was asked', async () => {
    const scoring = await scoreStatement('   ')
    expect(scoring.statement).toBe(frozenStatement)
  })

  it('shortcuts the captured statement instead of paying for it', async () => {
    const scoring = await scoreStatement(frozenStatement)
    expect(scoring).toMatchObject({ state: 'scored', live: false })
  })

  it('answers every dimension from the captured set', async () => {
    const scoring = await scoreStatement('')
    expect(
      scoring.state === 'scored' && Object.keys(scoring.result.answers),
    ).toHaveLength(12)
  })

  it('fails rather than serving captured answers for another statement', async () => {
    const scoring = await scoreStatement('Cats are a liquid', { takeSlot })
    expect(scoring).toMatchObject({ state: 'failed', reason: 'unauthorized' })
  })

  it('caps an overlong statement', async () => {
    const scoring = await scoreStatement('x'.repeat(maxStatementLength + 50), {
      takeSlot,
    })
    expect(scoring.statement).toHaveLength(maxStatementLength)
  })

  it('calls Jev once for a statement it has already scored', async () => {
    vi.stubEnv('TYPESAFE_API_KEY', 'test-key')
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        new Response(JSON.stringify(answerBody), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
      ),
    )
    await scoreStatement('Cats are a liquid', { fetchImpl, takeSlot })
    await scoreStatement('Cats are a liquid', { fetchImpl, takeSlot })
    expect(fetchImpl).toHaveBeenCalledTimes(1)
  })

  it('serves the remembered answer rather than a fresh one', async () => {
    vi.stubEnv('TYPESAFE_API_KEY', 'test-key')
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        new Response(JSON.stringify(answerBody), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
      ),
    )
    await scoreStatement('Time moves faster in hallways', {
      fetchImpl,
      takeSlot,
    })
    const second = await scoreStatement('Time moves faster in hallways', {
      fetchImpl,
      takeSlot,
    })
    expect(second).toMatchObject({ state: 'scored' })
  })

  it('drops the whitespace a reader did not mean to type', () => {
    expect(asStatement('  Do you think this works? ')).toBe(
      'Do you think this works?',
    )
  })

  it('caps an overlong statement at the same point the call does', () => {
    expect(asStatement('x'.repeat(maxStatementLength + 50))).toHaveLength(
      maxStatementLength,
    )
  })
})
