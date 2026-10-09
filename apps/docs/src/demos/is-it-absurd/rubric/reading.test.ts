import { describe, expect, it } from 'vitest'

import { likeliestReading, segmentsOf } from './reading'

const legend = { '0': 'none', '1': 'some', '2': 'lots', '3': 'total' }

describe('likeliestReading', () => {
  it('names the criterion carrying the most belief', () => {
    expect(
      likeliestReading({
        type: 'score',
        score: 1,
        confidence: 0.5,
        legend,
        probabilities: { '0': 0.1, '1': 0.2, '2': 0.7, '3': 0 },
      }),
    ).toBe('lots')
  })

  // The mean of a split distribution falls between the two things the model
  // actually believes, and rounding it lands on neither.
  it('does not report the valley of a split distribution', () => {
    expect(
      likeliestReading({
        type: 'score',
        score: 0.75,
        confidence: 0.25,
        legend,
        probabilities: { '0': 0.69, '1': 0.05, '2': 0.08, '3': 0.18 },
      }),
    ).toBe('none')
  })

  it('keeps the first of two equally likely criteria', () => {
    expect(
      likeliestReading({
        type: 'score',
        score: 0.5,
        confidence: 0.1,
        legend,
        probabilities: { '0': 0.5, '1': 0.5, '2': 0, '3': 0 },
      }),
    ).toBe('none')
  })

  it('says so when the winning index has no name', () => {
    expect(
      likeliestReading({
        type: 'score',
        score: 0,
        confidence: 1,
        legend: { '0': 'none' },
        probabilities: { '9': 1 },
      }),
    ).toBe('no label')
  })
})

const split = {
  type: 'score',
  score: 0.75,
  confidence: 0.25,
  legend,
  probabilities: { '0': 0.69, '1': 0.05, '2': 0, '3': 0.18 },
} as const

describe('segmentsOf', () => {
  it('drops a criterion carrying no belief', () => {
    expect(segmentsOf(split).map((each) => each.index)).toEqual(['0', '1', '3'])
  })

  it('reads left to right as the scale, not as a ranking', () => {
    expect(segmentsOf(split).map((each) => each.probability)).toEqual([
      0.69, 0.05, 0.18,
    ])
  })

  it('marks the one the reading names', () => {
    expect(segmentsOf(split).filter((each) => each.leading)).toHaveLength(1)
  })

  it('names each segment from the legend', () => {
    expect(segmentsOf(split)[0]?.label).toBe('none')
  })
})
