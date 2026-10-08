import { describe, expect, it } from 'vitest'

import { componentEntries } from './components'
import { sectionLinks } from './sections'

// Demos live at the site root. A slug matching a static route would lose to it
// and the demo would be quietly unreachable.
const reservedSlugs = sectionLinks.map((link) => link.href.slice(1))

describe('demo slugs', () => {
  it('never collide with a static route', () => {
    const clashes = componentEntries
      .map((entry) => entry.slug)
      .filter((slug) => reservedSlugs.includes(slug))
    expect(clashes).toEqual([])
  })

  it('are unique', () => {
    const slugs = componentEntries.map((entry) => entry.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('are url safe', () => {
    const malformed = componentEntries
      .map((entry) => entry.slug)
      .filter((slug) => !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug))
    expect(malformed).toEqual([])
  })
})
