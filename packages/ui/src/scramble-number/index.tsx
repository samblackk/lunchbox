'use client'

import { useEffect, useRef, useState } from 'react'

import { noiseDigits } from '../scramble/noise'
import { useScramble } from '../scramble/use-scramble'

import * as styles from './style.css'

export type ScrambleNumberProps = {
  readonly value: number
}

// Runs once the number is actually on screen, so a figure further down the
// page is still animating when someone arrives at it.
export const ScrambleNumber = ({ value }: ScrambleNumberProps) => {
  const anchor = useRef<HTMLSpanElement>(null)
  const [seen, setSeen] = useState(false)
  const shown = useScramble({
    value: String(value),
    running: seen,
    noise: noiseDigits,
  })

  useEffect(() => {
    const node = anchor.current
    if (node === null) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        setSeen(true)
      },
      { threshold: 0.6 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <span ref={anchor} className={styles.number} role="presentation">
      {shown}
    </span>
  )
}
