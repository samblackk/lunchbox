import { beforeEach, describe, expect, it, vi } from 'vitest'

import { frozenStatement } from '@/content/rubric/frozen'

import { maxStatementLength, scoreStatement } from './score'

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
    ).toHaveLength(10)
  })

  it('fails rather than serving captured answers for another statement', async () => {
    const scoring = await scoreStatement('Cats are a liquid')
    expect(scoring).toMatchObject({ state: 'failed', reason: 'unauthorized' })
  })

  it('caps an overlong statement', async () => {
    const scoring = await scoreStatement('x'.repeat(maxStatementLength + 50))
    expect(scoring.statement).toHaveLength(maxStatementLength)
  })
})
