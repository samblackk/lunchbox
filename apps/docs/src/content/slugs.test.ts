import { describe, expect, it } from 'vitest'

import { demoEntries } from './demos'

// Only the ones that point somewhere. A planned demo has no href to check.
const hrefs = demoEntries.flatMap((entry) =>
  entry.href === undefined ? [] : [entry.href],
)

describe('demo hrefs', () => {
  it('are unique', () => {
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })

  it('are a single url safe segment', () => {
    const malformed = hrefs.filter(
      (href) => !/^\/[a-z0-9]+(-[a-z0-9]+)*$/.test(href),
    )
    expect(malformed).toEqual([])
  })
})
