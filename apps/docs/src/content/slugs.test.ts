import { describe, expect, it } from 'vitest'

import { componentEntries } from './components'
import { sectionLinks } from './sections'

// Demos live at the site root, so a demo href that matches a static reference
// page would quietly open that page instead of the demo.
const reservedHrefs: readonly string[] = sectionLinks.map((link) => link.href)

describe('demo hrefs', () => {
  it('never collide with a reference page', () => {
    const clashes = componentEntries
      .map((entry) => entry.href)
      .filter((href) => reservedHrefs.includes(href))
    expect(clashes).toEqual([])
  })

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
