import { describe, expect, it } from 'vitest'

import { dimensions } from './dimensions'
import { scenarios } from './scenarios'
import { frozenResult } from './frozen'

const expectedIds = [
  ...dimensions.map((each) => each.id),
  ...scenarios.map((each) => each.id),
]

describe('the frozen fixture', () => {
  it('answers every question the rubric asks', () => {
    const missing = expectedIds.filter((id) => !(id in frozenResult.answers))
    expect(missing).toEqual([])
  })

  it('answers nothing the rubric does not ask', () => {
    const known = new Set<string>(expectedIds)
    const extra = Object.keys(frozenResult.answers).filter(
      (id) => !known.has(id),
    )
    expect(extra).toEqual([])
  })

  it('carries a verdict for every scenario', () => {
    const missing = scenarios.filter(
      (each) => frozenResult.answers[each.id]?.type !== 'noul',
    )
    expect(missing).toEqual([])
  })
})
