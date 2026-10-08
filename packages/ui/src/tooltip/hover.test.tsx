// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Tooltip } from './index'
import * as styles from './style.css'

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
  it('is still closed before its open delay elapses', () => {
    hover(50)
    expect(screen.queryByText(tip)).toBeNull()
  })

  it('opens once its open delay elapses', () => {
    hover(150)
    expect(screen.queryByText(tip)).not.toBeNull()
  })

  it('draws an arrow pointing back at the trigger', () => {
    hover(150)
    expect(
      screen.getByText(tip).querySelector(`.${styles.arrow}`),
    ).not.toBeNull()
  })
})
