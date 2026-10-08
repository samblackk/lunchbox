import { describe, expect, it } from 'vitest'

import { parseJevResponse, parseJevResult } from './parse'

describe('parseJevResult with a noul', () => {
  it('reads the probability', () => {
    const parsed = parseJevResult({
      model: 'jev-1.13.0',
      answers: { boardroom: { type: 'noul', noul: 0.69 } },
    })
    expect(parsed?.answers.boardroom).toEqual({ type: 'noul', noul: 0.69 })
  })

  it('rejects a noul without a probability', () => {
    const parsed = parseJevResult({
      model: 'x',
      answers: { boardroom: { type: 'noul' } },
    })
    expect(parsed).toBeNull()
  })
})

describe('parseJevResponse', () => {
  const body = {
    model: 'jev-1.13.0',
    answers: { boardroom: { type: 'noul', noul: 0.69 } },
  }

  it('keeps the body it was handed, untouched', () => {
    expect(parseJevResponse(body)?.raw).toBe(body)
  })

  it('rejects a body the validator will not take', () => {
    expect(parseJevResponse({ model: 'x', answers: 'nope' })).toBeNull()
  })
})
