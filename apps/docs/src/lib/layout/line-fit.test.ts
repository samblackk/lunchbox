import { describe, expect, it } from 'vitest'

import { fitsWithinLines, nextScale } from './line-fit'

describe('fitsWithinLines', () => {
  it('accepts a block that is exactly its line budget', () => {
    expect(fitsWithinLines({ height: 200, lineHeight: 50, maxLines: 4 })).toBe(
      true,
    )
  })

  it('rejects a block that has spilled onto another line', () => {
    expect(fitsWithinLines({ height: 250, lineHeight: 50, maxLines: 4 })).toBe(
      false,
    )
  })

  it('forgives the sub-pixel a fractional line height leaves behind', () => {
    expect(
      fitsWithinLines({ height: 200.4, lineHeight: 50, maxLines: 4 }),
    ).toBe(true)
  })

  it('gives up rather than looping when nothing has been laid out', () => {
    expect(fitsWithinLines({ height: 0, lineHeight: 0, maxLines: 4 })).toBe(
      true,
    )
  })
})

describe('nextScale', () => {
  it('steps down by a readable amount', () => {
    expect(nextScale(1)).toBeCloseTo(0.96)
  })

  it('bottoms out rather than shrinking forever', () => {
    expect(nextScale(0.5)).toBe(0)
  })
})
