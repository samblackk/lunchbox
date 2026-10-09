// @vitest-environment jsdom
import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ScrambleNumber } from './index'

// jsdom has no IntersectionObserver. This one hands the component a hit the
// moment it subscribes, which is the only path worth exercising.
const observeImmediately = () => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      notify: IntersectionObserverCallback

      constructor(notify: IntersectionObserverCallback) {
        this.notify = notify
      }

      observe() {
        this.notify(
          [{ isIntersecting: true }] as IntersectionObserverEntry[],
          this as never,
        )
      }

      disconnect() {}
      unobserve() {}
    },
  )
}

const wantsLessMotion = (reduce: boolean) => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: reduce })),
  )
}

beforeEach(() => {
  vi.useFakeTimers()
  observeImmediately()
  wantsLessMotion(false)
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
  cleanup()
})

describe('ScrambleNumber', () => {
  it('renders the real number before anything animates', () => {
    wantsLessMotion(true)
    render(<ScrambleNumber value={69} />)
    expect(screen.getByText('69')).not.toBeNull()
  })

  it('lands on the value once it has settled', () => {
    render(<ScrambleNumber value={69} />)
    act(() => void vi.advanceTimersByTime(2000))
    expect(screen.getByText('69')).not.toBeNull()
  })

  it('never changes width while it scrambles', () => {
    render(<ScrambleNumber value={69} />)
    act(() => void vi.advanceTimersByTime(120))
    expect(screen.getByRole('presentation').textContent).toHaveLength(2)
  })

  it('leaves the number alone for a viewer who asked for less motion', () => {
    wantsLessMotion(true)
    render(<ScrambleNumber value={69} />)
    act(() => void vi.advanceTimersByTime(120))
    expect(screen.getByText('69')).not.toBeNull()
  })

  it('actually scrambles on the way there', () => {
    // 0.01 of a two digit ceiling is 1, padded to "01": a value 69 can never
    // show by accident, so this fails if the animation never starts.
    vi.spyOn(Math, 'random').mockReturnValue(0.01)
    render(<ScrambleNumber value={69} />)
    act(() => void vi.advanceTimersByTime(60))
    expect(screen.getByRole('presentation').textContent).toBe('01')
  })
})
