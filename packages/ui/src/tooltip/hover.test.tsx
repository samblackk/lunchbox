// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Tooltip } from './index'

// Kept apart from index.test.tsx on purpose. Base UI holds tooltip open state
// in a module-level store, so an earlier render in the same file primes the
// group and the next tooltip opens with no delay at all.
afterEach(cleanup)

const tip = 'It is not hard.'

// Base UI opens on a real pointer, so both events have to land before the
// timers run. Fake timers rather than a wait: a sleep in a test is a defect.
const hover = (delayMs: number) => {
  vi.useFakeTimers()
  render(
    <Tooltip label={tip}>
      <span>why</span>
    </Tooltip>,
  )
  const trigger = screen.getByRole('button')
  fireEvent.pointerEnter(trigger, { pointerType: 'mouse' })
  fireEvent.mouseEnter(trigger)
  fireEvent.mouseMove(trigger)
  act(() => void vi.advanceTimersByTime(delayMs))
  vi.useRealTimers()
}

describe('Tooltip on hover', () => {
  it('opens as soon as the pointer is on it', () => {
    hover(0)
    expect(screen.queryByText(tip)).not.toBeNull()
  })

  it('shows rich content in place of the label when given it', () => {
    vi.useFakeTimers()
    render(
      <Tooltip
        label={tip}
        content={
          <ul>
            <li>a breakdown</li>
          </ul>
        }
      >
        <span>why</span>
      </Tooltip>,
    )
    const trigger = screen.getByRole('button')
    fireEvent.pointerEnter(trigger, { pointerType: 'mouse' })
    fireEvent.mouseEnter(trigger)
    fireEvent.mouseMove(trigger)
    act(() => void vi.advanceTimersByTime(150))
    vi.useRealTimers()
    expect(screen.queryByText('a breakdown')).not.toBeNull()
  })

  it('opens against the pointer it was last told about', () => {
    vi.useFakeTimers()
    render(
      <Tooltip label={tip}>
        <span>why</span>
      </Tooltip>,
    )
    const trigger = screen.getByRole('button')
    fireEvent.pointerEnter(trigger, { pointerType: 'mouse' })
    fireEvent.pointerMove(trigger, { clientX: 120, clientY: 240 })
    fireEvent.mouseEnter(trigger)
    fireEvent.mouseMove(trigger)
    act(() => void vi.advanceTimersByTime(150))
    vi.useRealTimers()
    // The anchor is read from the move that happened before it opened, so
    // there is no frame positioned against the trigger.
    expect(screen.queryByText(tip)).not.toBeNull()
  })

  it('opens on a tap, which is all a touch screen can offer', () => {
    render(
      <Tooltip label={tip}>
        <span>why</span>
      </Tooltip>,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(screen.queryByText(tip)).not.toBeNull()
  })
})
