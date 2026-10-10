import { describe, expect, it } from 'vitest'

import { asPreference, flipped, resolveTheme } from './preference'

describe('asPreference', () => {
  it('keeps a value it recognizes', () => {
    expect(asPreference('dark')).toBe('dark')
  })

  it('falls back to following the system', () => {
    expect(asPreference('neon')).toBe('system')
    expect(asPreference(null)).toBe('system')
  })
})

describe('flipped', () => {
  it('turns an explicit choice into the other one', () => {
    expect(flipped('light', false)).toBe('dark')
    expect(flipped('dark', false)).toBe('light')
  })

  it('leaves the system by going to the opposite of what it shows', () => {
    expect(flipped('system', true)).toBe('light')
    expect(flipped('system', false)).toBe('dark')
  })

  it('never lands on a value that looks like no change', () => {
    expect(flipped('dark', true)).toBe('light')
  })
})

describe('resolveTheme', () => {
  it('reads the system when it is deferring to it', () => {
    expect(resolveTheme('system', true)).toBe('dark')
    expect(resolveTheme('system', false)).toBe('light')
  })

  it('ignores the system once a reader has picked', () => {
    expect(resolveTheme('light', true)).toBe('light')
    expect(resolveTheme('dark', false)).toBe('dark')
  })
})
