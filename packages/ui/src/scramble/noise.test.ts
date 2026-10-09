import { describe, expect, it } from 'vitest'

import { noiseDigits, noiseLetters } from './noise'

describe('noiseDigits', () => {
  it('keeps the width it was given', () => {
    expect(noiseDigits('069')).toHaveLength(3)
  })
})

describe('noiseLetters', () => {
  it('keeps the width it was given', () => {
    expect(noiseLetters('is it absurd?')).toHaveLength(13)
  })

  it('leaves everything that is not a letter where it was', () => {
    const scrambled = noiseLetters('is it absurd?')
    expect(scrambled[2]).toBe(' ')
    expect(scrambled[5]).toBe(' ')
    expect(scrambled.endsWith('?')).toBe(true)
  })

  it('only ever emits letters in the letter positions', () => {
    expect(noiseLetters('leviosa')).toMatch(/^[a-z]{7}$/)
  })
})
