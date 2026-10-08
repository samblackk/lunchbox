// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { TextInput } from './index'

// Vitest runs without globals here, so React Testing Library never registers
// its own teardown and one render would leak into the next.
afterEach(cleanup)

const shellOf = (input: HTMLElement) => input.parentElement as HTMLElement

describe('TextInput', () => {
  it('puts the start node before the input', () => {
    render(<TextInput start="statement" aria-label="statement" />)
    const input = screen.getByLabelText('statement')
    const position =
      shellOf(input).firstElementChild?.compareDocumentPosition(input)
    expect(position).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
  })

  it('puts the end node after the input', () => {
    render(
      <TextInput
        end={<button type="submit">score it</button>}
        aria-label="statement"
      />,
    )
    const input = screen.getByLabelText('statement')
    const position =
      shellOf(input).lastElementChild?.compareDocumentPosition(input)
    expect(position).toBe(Node.DOCUMENT_POSITION_PRECEDING)
  })

  it('renders no slot wrapper when start is omitted', () => {
    render(<TextInput end="go" aria-label="statement" />)
    const input = screen.getByLabelText('statement')
    expect(shellOf(input).firstElementChild).toBe(input)
  })

  it('forwards input attributes to the input itself', () => {
    render(<TextInput start="statement" name="statement" aria-label="s" />)
    expect(screen.getByLabelText('s')).toHaveProperty('name', 'statement')
  })

  it('keeps the end node clickable when the input is disabled', () => {
    render(
      <TextInput
        disabled
        end={<button type="submit">score it</button>}
        aria-label="statement"
      />,
    )
    expect(screen.getByRole('button')).toHaveProperty('disabled', false)
  })
})

describe('TextInput that clears on focus', () => {
  it('empties the field when it gains focus', () => {
    render(<TextInput clearOnFocus defaultValue="old one" aria-label="s" />)
    const input = screen.getByLabelText('s')
    fireEvent.focus(input)
    expect(input).toHaveProperty('value', '')
  })

  it('leaves the field alone when the behavior is not asked for', () => {
    render(<TextInput defaultValue="old one" aria-label="s" />)
    const input = screen.getByLabelText('s')
    fireEvent.focus(input)
    expect(input).toHaveProperty('value', 'old one')
  })

  it('still runs a focus handler the caller passed', () => {
    const onFocus = vi.fn()
    render(<TextInput clearOnFocus onFocus={onFocus} aria-label="s" />)
    fireEvent.focus(screen.getByLabelText('s'))
    expect(onFocus).toHaveBeenCalledTimes(1)
  })
})

const recommendations = <a href="/sky">The sky is purple</a>

describe('TextInput with more info', () => {
  it('labels the reveal with the text it was given', () => {
    render(
      <TextInput
        aria-label="s"
        moreInfo={recommendations}
        moreInfoLabel="recommendations"
      />,
    )
    expect(screen.getByText('recommendations').tagName).toBe('SUMMARY')
  })

  it('starts closed, so the field is what the eye lands on', () => {
    render(
      <TextInput
        aria-label="s"
        moreInfo={recommendations}
        moreInfoLabel="recommendations"
      />,
    )
    expect(
      screen.getByText('recommendations').closest('details'),
    ).toHaveProperty('open', false)
  })

  it('renders no reveal at all when there is nothing to reveal', () => {
    const { container } = render(<TextInput aria-label="s" />)
    expect(container.querySelector('details')).toBeNull()
  })
})
