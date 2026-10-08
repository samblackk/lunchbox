import { describe, expect, it } from 'vitest'

import { dimensions, finalBoss } from './dimensions'
import { frozenResult } from './frozen'

const expectedIds = [...dimensions.map((each) => each.id), finalBoss.id]

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

  it('carries a verdict for the final boss', () => {
    expect(frozenResult.answers[finalBoss.id]).toMatchObject({ type: 'noul' })
  })
})
