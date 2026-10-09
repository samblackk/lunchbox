'use client'

import { useEffect } from 'react'

import { approach, proximity } from './proximity'

// How far the pointer reaches, in pixels. About two rows either side, so the
// list bends as a whole rather than one row twitching on its own.
const reach = 140

// How much of the remaining gap a row closes each frame. Low enough to trail
// the pointer, high enough not to feel like treacle.
const ease = 0.18

export const ProximityShift = () => {
  useEffect(() => {
    const list = document.querySelector<HTMLElement>('[data-demo-list]')
    if (!list) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const rows = Array.from(list.querySelectorAll<HTMLElement>('[data-demo]'))

    // Measured once in document space, not per frame in viewport space.
    // Reading layout every frame right after writing to it is what made this
    // stutter, and document coordinates survive scrolling for free.
    let centres: number[] = []
    const measure = () => {
      centres = rows.map((row) => {
        const box = row.getBoundingClientRect()
        return box.top + window.scrollY + box.height / 2
      })
    }

    const shifts = rows.map(() => 0)
    let pointer: number | null = null
    let frame = 0

    // Damped here rather than by a CSS transition. A transition retargeted
    // every frame never finishes, so it reads as lag instead of motion.
    const step = () => {
      let moving = false

      rows.forEach((row, index) => {
        const centre = centres[index] ?? 0
        const target = pointer === null ? 0 : proximity(pointer - centre, reach)
        const next = approach(shifts[index] ?? 0, target, ease)

        if (next !== shifts[index]) {
          shifts[index] = next
          row.style.setProperty('--shift', next.toFixed(4))
          moving = true
        }
      })

      frame = moving ? requestAnimationFrame(step) : 0
    }

    const start = () => {
      if (frame === 0) frame = requestAnimationFrame(step)
    }

    // On the window, not the list: the point is that the rows react as the
    // pointer approaches, which it does from outside them.
    const onMove = (event: PointerEvent) => {
      pointer = event.clientY + window.scrollY
      start()
    }

    const onLeave = () => {
      pointer = null
      start()
    }

    measure()
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerout', onLeave)
    window.addEventListener('resize', measure)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerout', onLeave)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return null
}
