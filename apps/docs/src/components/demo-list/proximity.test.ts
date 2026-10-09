import { describe, expect, it } from 'vitest'

import { approach, proximity } from './proximity'

describe('proximity', () => {
  it('is whole under the pointer', () => {
    expect(proximity(0, 100)).toBe(1)
  })

  it('is nothing at the edge of its reach', () => {
    expect(proximity(100, 100)).toBe(0)
  })

  it('is nothing beyond it, rather than going negative', () => {
    expect(proximity(400, 100)).toBe(0)
  })

  it('does not care which side the pointer is on', () => {
    expect(proximity(-40, 100)).toBe(proximity(40, 100))
  })

  it('eases rather than ramping, so the curve sits above the midpoint', () => {
    expect(proximity(50, 100)).toBe(0.5)
  })

  it('falls away faster near the edge than near the middle', () => {
    const nearMiddle = proximity(40, 100) - proximity(50, 100)
    const nearEdge = proximity(80, 100) - proximity(90, 100)
    expect(nearMiddle).toBeGreaterThan(nearEdge)
  })

  it('reaches nowhere when it has no radius', () => {
    expect(proximity(0, 0)).toBe(0)
  })
})

describe('approach', () => {
  it('moves a fraction of the way, not all of it', () => {
    expect(approach(0, 1, 0.25)).toBe(0.25)
  })

  it('closes the gap from either side', () => {
    expect(approach(1, 0, 0.25)).toBe(0.75)
  })

  it('arrives outright when the step would overshoot nothing', () => {
    expect(approach(0, 1, 1)).toBe(1)
  })

  it('snaps home once the rest of the gap is invisible', () => {
    expect(approach(0.9999, 1, 0.25)).toBe(1)
  })

  it('has nowhere to go when it is already there', () => {
    expect(approach(1, 1, 0.25)).toBe(1)
  })
})
