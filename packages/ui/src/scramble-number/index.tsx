'use client'

import { useEffect, useRef, useState } from 'react'

import * as styles from './style.css'

const settleMs = 900

// Swaps start fast and stretch out as the number lands, which is what makes it
// read as settling rather than as stopping.
const swapDelay = (progress: number) => 30 + progress * progress * 170

// Same digit count as the answer, so the line never reflows mid-scramble.
const noiseLike = (value: number) => {
  const width = String(value).length
  return String(Math.floor(Math.random() * 10 ** width)).padStart(width, '0')
}

export type ScrambleNumberProps = {
  readonly value: number
}

// Renders the real number on the server, so the page is already correct before
// any of this runs and stays correct if it never does.
export const ScrambleNumber = ({ value }: ScrambleNumberProps) => {
  const anchor = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(String(value))

  useEffect(() => {
    const node = anchor.current
    if (node === null) return
    // Optional call: a test environment may not implement it.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let startedAt = 0
    let swappedAt = 0

    const tick = (now: number) => {
      startedAt = startedAt === 0 ? now : startedAt
      const progress = (now - startedAt) / settleMs

      if (progress >= 1) {
        setShown(String(value))
        return
      }

      if (now - swappedAt >= swapDelay(progress)) {
        swappedAt = now
        setShown(noiseLike(value))
      }

      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <span ref={anchor} className={styles.number} role="presentation">
      {shown}
    </span>
  )
}
