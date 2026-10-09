import { describe, expect, it } from 'vitest'

import { componentEntries } from './components'

describe('demo hrefs', () => {
  it('are unique', () => {
    const hrefs = componentEntries.map((entry) => entry.href)
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })

  it('are a single url safe segment', () => {
    const malformed = componentEntries
      .map((entry) => entry.href)
      .filter((href) => !/^\/[a-z0-9]+(-[a-z0-9]+)*$/.test(href))
    expect(malformed).toEqual([])
  })
})
