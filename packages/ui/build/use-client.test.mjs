import { describe, expect, it } from 'vitest'

import { hasUseClientDirective } from './use-client.mjs'

describe('hasUseClientDirective', () => {
  it('finds a single-quoted directive on the first line', () => {
    expect(hasUseClientDirective("'use client'\nexport const a = 1\n")).toBe(
      true,
    )
  })

  it('finds a double-quoted directive', () => {
    expect(hasUseClientDirective('"use client"\nexport const a = 1\n')).toBe(
      true,
    )
  })

  it('finds a directive that follows a license comment', () => {
    const code = "/* license */\n'use client'\nexport const a = 1\n"
    expect(hasUseClientDirective(code)).toBe(true)
  })

  it('ignores the same string once code has started', () => {
    const code = "export const label = 'use client'\n"
    expect(hasUseClientDirective(code)).toBe(false)
  })

  it('does not treat use server as a client directive', () => {
    expect(hasUseClientDirective("'use server'\nexport const a = 1\n")).toBe(
      false,
    )
  })
})
