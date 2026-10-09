import { describe, expect, it } from 'vitest'

import { nextIndex } from './step'

describe('nextIndex', () => {
  it('moves forward', () => {
    expect(nextIndex(5, 1, 1)).toBe(2)
  })

  it('moves back', () => {
    expect(nextIndex(5, 1, -1)).toBe(0)
  })

  it('wraps past the end rather than stopping there', () => {
    expect(nextIndex(5, 4, 1)).toBe(0)
  })

  it('wraps past the start', () => {
    expect(nextIndex(5, 0, -1)).toBe(4)
  })

  it('enters at the top when nothing is focused yet', () => {
    expect(nextIndex(5, -1, 1)).toBe(0)
  })

  it('enters at the bottom when walking up into it', () => {
    expect(nextIndex(5, -1, -1)).toBe(4)
  })

  it('has nowhere to go in an empty list', () => {
    expect(nextIndex(0, -1, 1)).toBe(-1)
  })
})
