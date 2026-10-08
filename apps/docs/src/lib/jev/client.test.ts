import { describe, expect, it, vi } from 'vitest'

import { jevEndpoint, scoreWithJev } from './client'
import type { Question } from './types'

const questions: Record<string, Question> = {
  wormhole: {
    type: 'score',
    instructions: 'How likely is this to open a wormhole',
    criteria: ['Not at all', 'Somewhat', 'Imminently'],
  },
}

const answerBody = {
  model: 'jev-1.13.0',
  answers: {
    wormhole: {
      type: 'score',
      score: 1.5,
      probabilities: { '0': 0.95, '1': 0.05 },
      confidence: 0.92,
      legend: { '0': 'Not at all', '1': 'Somewhat' },
    },
  },
}

const respondWith = (body: unknown, status = 200) =>
  vi.fn<typeof fetch>(() =>
    Promise.resolve(
      new Response(JSON.stringify(body), {
        status,
        headers: { 'content-type': 'application/json' },
      }),
    ),
  )

type SentBody = { model: string; state: string; questions: unknown }

const sentBody = (mock: ReturnType<typeof respondWith>): SentBody => {
  const raw = mock.mock.calls[0]?.[1]?.body
  if (typeof raw !== 'string') throw new Error('expected a JSON string body')
  return JSON.parse(raw) as SentBody
}

const sentHeaders = (mock: ReturnType<typeof respondWith>) =>
  (mock.mock.calls[0]?.[1]?.headers ?? {}) as Record<string, string>

const call = (fetchImpl: typeof fetch, apiKey = 'test-key') =>
  scoreWithJev({
    state: 'The sky is purple',
    questions,
    apiKey,
    fetchImpl,
    sleep: () => Promise.resolve(),
  })

describe('scoreWithJev', () => {
  it('posts to the System One endpoint', async () => {
    const fetchImpl = respondWith(answerBody)
    await call(fetchImpl)
    expect(fetchImpl.mock.calls[0]?.[0]).toBe(jevEndpoint)
  })

  it('sends the api key as a bearer token', async () => {
    const fetchImpl = respondWith(answerBody)
    await call(fetchImpl)
    expect(sentHeaders(fetchImpl).authorization).toBe('Bearer test-key')
  })

  it('asks for jev-latest', async () => {
    const fetchImpl = respondWith(answerBody)
    await call(fetchImpl)
    expect(sentBody(fetchImpl).model).toBe('jev-latest')
  })

  it('sends the state verbatim', async () => {
    const fetchImpl = respondWith(answerBody)
    await call(fetchImpl)
    expect(sentBody(fetchImpl).state).toBe('The sky is purple')
  })

  it('returns the score for a score question', async () => {
    const result = await call(respondWith(answerBody))
    expect(result.ok && result.data.result.answers.wormhole).toMatchObject({
      type: 'score',
      score: 1.5,
      confidence: 0.92,
    })
  })

  it('rejects an answer type it does not model', async () => {
    const body = {
      model: 'jev-1.13.0',
      answers: {
        shape: {
          type: 'choice',
          choice: 'oblong',
          probabilities: { oblong: 0.7, round: 0.3 },
          confidence: 0.7,
        },
      },
    }
    const result = await call(respondWith(body))
    expect(result).toMatchObject({ ok: false, reason: 'bad-response' })
  })

  it('rejects a payload whose answers are not an object', async () => {
    const result = await call(respondWith({ model: 'x', answers: 'nope' }))
    expect(result).toMatchObject({ ok: false, reason: 'bad-response' })
  })

  it('rejects an answer missing its confidence', async () => {
    const body = {
      model: 'x',
      answers: { wormhole: { type: 'score', score: 1, probabilities: {} } },
    }
    const result = await call(respondWith(body))
    expect(result).toMatchObject({ ok: false, reason: 'bad-response' })
  })

  it('does not call out at all when the api key is missing', async () => {
    const fetchImpl = respondWith(answerBody)
    await call(fetchImpl, '')
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('reports unauthorized when the api key is missing', async () => {
    const result = await call(respondWith(answerBody), '')
    expect(result).toMatchObject({ ok: false, reason: 'unauthorized' })
  })
})
