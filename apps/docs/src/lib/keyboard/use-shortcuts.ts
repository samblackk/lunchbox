'use client'

import { useEffect, useRef } from 'react'

import { isActivatingTarget, isTypingTarget } from './targets'

type ShortcutScope =
  // Stands down inside a text field.
  | 'outside-fields'
  // Also stands down on a button or link, which space and enter already work.
  | 'outside-controls'

type Shortcut = {
  readonly key: string
  readonly run: () => void
  readonly scope?: ShortcutScope
}

const blocks = (scope: ShortcutScope, tagName: string, editable: boolean) =>
  scope === 'outside-controls'
    ? isActivatingTarget(tagName, editable)
    : isTypingTarget(tagName, editable)

// Page level keys, live only while the component holding them is mounted,
// which is what keeps them scoped to one route.
export const useShortcuts = (shortcuts: readonly Shortcut[]): void => {
  const latest = useRef(shortcuts)

  // Kept in an effect rather than written during render, so a caller does not
  // have to memoise the list to avoid a stale handler.
  useEffect(() => {
    latest.current = shortcuts
  })

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return
      if (event.altKey || event.ctrlKey || event.metaKey) return

      const target = event.target
      const element = target instanceof HTMLElement ? target : null
      const tagName = element?.tagName ?? ''
      const editable = element?.isContentEditable ?? false

      for (const shortcut of latest.current) {
        if (shortcut.key !== event.key) continue
        if (blocks(shortcut.scope ?? 'outside-fields', tagName, editable)) {
          continue
        }

        event.preventDefault()
        shortcut.run()
        return
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}
