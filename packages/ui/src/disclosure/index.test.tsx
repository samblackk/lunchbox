// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Disclosure } from './index'

afterEach(cleanup)

describe('Disclosure', () => {
  it('puts its label on the summary', () => {
    render(<Disclosure label="recommendations">the body</Disclosure>)
    expect(screen.getByText('recommendations').tagName).toBe('SUMMARY')
  })

  it('starts closed', () => {
    const { container } = render(<Disclosure label="more">the body</Disclosure>)
    expect(container.querySelector('details')).toHaveProperty('open', false)
  })

  it('renders the body it was given', () => {
    render(<Disclosure label="more">the body</Disclosure>)
    expect(screen.getByText('the body')).not.toBeNull()
  })
})
