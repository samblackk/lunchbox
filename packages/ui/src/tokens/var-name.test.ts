import { describe, expect, it } from 'vitest'

import { cssVarName } from './var-name'

describe('cssVarName', () => {
  it('prefixes a single segment with the namespace', () => {
    expect(cssVarName(['page'])).toBe('na-page')
  })

  it('joins nested segments with a hyphen', () => {
    expect(cssVarName(['colors', 'page'])).toBe('na-colors-page')
  })

  it('splits a camelCase segment into hyphenated words', () => {
    expect(cssVarName(['colors', 'textPrimary'])).toBe('na-colors-text-primary')
  })

  it('keeps a digit attached to the word it follows', () => {
    expect(cssVarName(['charts', 'seq100'])).toBe('na-charts-seq100')
  })

  it('hyphenates a segment that is three words long', () => {
    expect(cssVarName(['typography', 'bodyLetterSpacing'])).toBe(
      'na-typography-body-letter-spacing',
    )
  })
})
