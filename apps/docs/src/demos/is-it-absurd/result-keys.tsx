'use client'

import { nextIndex } from '@/lib/keyboard/step'
import { useShortcuts } from '@/lib/keyboard/use-shortcuts'

import { demoPath } from './path'

const readings = () =>
  Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-reading] button'),
  )

// Focus is what opens a tip, so walking the rows is all it takes to read them
// in order.
const step = (delta: number) => {
  const rows = readings()
  const here = rows.findIndex((row) => row === document.activeElement)
  rows[nextIndex(rows.length, here, delta)]?.focus()
}

const cycle = () => {
  document.querySelector<HTMLButtonElement>('[data-cycle]')?.click()
}

// Reached through the DOM rather than through props: these keys act on parts
// of the page the shortcut list does not own and should not have to hold.
export const ResultKeys = () => {
  useShortcuts([
    { key: 'Escape', run: () => window.location.assign(demoPath) },
    { key: ' ', run: cycle, scope: 'outside-controls' },
    { key: 'ArrowDown', run: () => step(1) },
    { key: 'ArrowUp', run: () => step(-1) },
  ])

  return null
}
