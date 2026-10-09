import { describe, expect, it } from 'vitest'

import { isOverLimit, retryAfterMs, withinWindow } from './window'

describe('withinWindow', () => {
  it('keeps a call made inside the window', () => {
    expect(withinWindow([900], 1000, 1000)).toEqual([900])
  })

  it('drops a call older than the window', () => {
    expect(withinWindow([0], 1000, 1000)).toEqual([])
  })
})

describe('isOverLimit', () => {
  it('allows a caller under the limit', () => {
    expect(isOverLimit([1, 2], 3)).toBe(false)
  })

  it('stops a caller at the limit', () => {
    expect(isOverLimit([1, 2, 3], 3)).toBe(true)
  })
})

describe('retryAfterMs', () => {
  it('is nothing for a caller who has not called', () => {
    expect(retryAfterMs([], 1000, 1000)).toBe(0)
  })

  it('counts from the oldest call still in the window', () => {
    expect(retryAfterMs([600, 900], 1000, 1000)).toBe(600)
  })

  it('never goes negative', () => {
    expect(retryAfterMs([0], 5000, 1000)).toBe(0)
  })
})
