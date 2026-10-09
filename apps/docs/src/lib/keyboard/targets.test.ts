import { describe, expect, it } from 'vitest'

import { isActivatingTarget, isTypingTarget } from './targets'

describe('isTypingTarget', () => {
  it('spots a text field', () => {
    expect(isTypingTarget('INPUT', false)).toBe(true)
  })

  it('spots a rich text area that is not a field at all', () => {
    expect(isTypingTarget('DIV', true)).toBe(true)
  })

  it('leaves the page itself alone', () => {
    expect(isTypingTarget('BODY', false)).toBe(false)
  })

  it('does not count a button, which takes keys but not text', () => {
    expect(isTypingTarget('BUTTON', false)).toBe(false)
  })
})

describe('isActivatingTarget', () => {
  it('counts a button, which space already activates', () => {
    expect(isActivatingTarget('BUTTON', false)).toBe(true)
  })

  it('counts a link', () => {
    expect(isActivatingTarget('A', false)).toBe(true)
  })

  it('still counts anything that takes text', () => {
    expect(isActivatingTarget('TEXTAREA', false)).toBe(true)
  })

  it('leaves the page itself alone', () => {
    expect(isActivatingTarget('BODY', false)).toBe(false)
  })
})
