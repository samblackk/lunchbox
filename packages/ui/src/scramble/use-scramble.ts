'use client'

import { useEffect, useState } from 'react'

const settleMs = 900

// Swaps start fast and stretch out as the value lands, which is what makes it
// read as settling rather than as stopping.
const swapDelay = (progress: number) => 30 + progress * progress * 170

export type ScrambleOptions = {
  readonly value: string
  // Flipping this on starts a run. It settles on its own and will not start
  // again until the flag goes off and back on.
  readonly running: boolean
  readonly noise: (value: string) => string
}

// Returns what to paint. Always the real value to start with, so the server
// output is correct before any of this runs and stays correct if it never does.
export const useScramble = ({
  value,
  running,
  noise,
}: ScrambleOptions): string => {
  const [shown, setShown] = useState(value)

  useEffect(() => {
    if (!running) {
      setShown(value)
      return
    }

    // Optional call: a test environment may not implement it.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let startedAt = 0
    let swappedAt = 0

    const tick = (now: number) => {
      startedAt = startedAt === 0 ? now : startedAt
      const progress = (now - startedAt) / settleMs

      if (progress >= 1) {
        setShown(value)
        return
      }

      if (now - swappedAt >= swapDelay(progress)) {
        swappedAt = now
        setShown(noise(value))
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [value, running, noise])

  return shown
}
