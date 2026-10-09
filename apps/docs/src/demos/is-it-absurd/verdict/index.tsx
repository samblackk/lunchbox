'use client'

import { Icon, ScrambleNumber } from '@neonanomaly/lunchbox'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { fitsWithinLines, nextScale } from '@/lib/layout/line-fit'

import styles from './style.module.css'

// Long enough for the sentence to breathe, short enough to read at a glance.
const maxLines = 4

// Before paint, not after: measuring in a plain effect draws the heading at
// full size first and the shrink is visible. Falls back on the server, where
// there is no layout to read and React warns about the layout variant.
const useMeasureEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

export type Reading = {
  readonly id: string
  readonly label: string
  readonly percent: number
}

// Every scenario was scored in the same request, so moving between them is a
// state change and never another round trip.
export const Verdict = ({ readings }: { readings: readonly Reading[] }) => {
  const heading = useRef<HTMLHeadingElement>(null)
  const [shown, setShown] = useState(0)
  const [turning, setTurning] = useState(false)
  const reading = readings[shown % readings.length]

  // Shrink the heading until it fits its line budget. Written to the node
  // rather than to state: every trial has to be laid out before the next can
  // be measured, and a render per trial would be a loop.
  useMeasureEffect(() => {
    const node = heading.current
    if (!node) return

    const fitLines = () => {
      let scale = 1

      for (;;) {
        node.style.setProperty('--fit', String(scale))
        const leading = Number.parseFloat(getComputedStyle(node).lineHeight)

        if (
          fitsWithinLines({
            height: node.scrollHeight,
            lineHeight: leading,
            maxLines,
          })
        ) {
          break
        }

        scale = nextScale(scale)
        if (scale === 0) break
      }
    }

    fitLines()
    const observer = new ResizeObserver(fitLines)
    observer.observe(node)
    return () => observer.disconnect()
  }, [reading])

  if (reading === undefined) {
    return <h1 className={styles.verdict}>no verdict</h1>
  }

  return (
    <h1 ref={heading} className={styles.verdict}>
      {/* The whole sentence is the control. The icon says so and turns on
          press, but a target this size should not be the icon alone. */}
      <button
        type="button"
        data-cycle
        className={styles.cycle}
        onClick={() => {
          setShown((current) => current + 1)
          setTurning(true)
        }}
        // One turn per press. The animation loops, so the end of the first lap
        // is the cue to stop, which beats a timer repeating the duration.
        onAnimationIteration={() => setTurning(false)}
      >
        <ScrambleNumber value={reading.percent} />% chance it would be absurd to
        say this {reading.label} <Icon name="spinner" spin={turning} />
        <span className={styles.hint}>Press for another situation.</span>
      </button>
    </h1>
  )
}
