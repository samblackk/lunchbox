'use client'

import { useState } from 'react'

import { noiseLetters } from '../scramble/noise'
import { useScramble } from '../scramble/use-scramble'

import * as styles from './style.css'

export type ScrambleTextProps = {
  readonly value: string
}

// Churns its letters while the pointer is on it. The word underneath is the
// real one and is what a screen reader gets; the churn is decoration.
export const ScrambleText = ({ value }: ScrambleTextProps) => {
  const [running, setRunning] = useState(false)
  const shown = useScramble({ value, running, noise: noiseLetters })

  return (
    <span
      className={styles.word}
      onPointerEnter={() => setRunning(true)}
      onPointerLeave={() => setRunning(false)}
    >
      <span className={styles.measure}>{value}</span>
      <span className={styles.painted} aria-hidden="true">
        {shown}
      </span>
    </span>
  )
}
