'use client'

import { useCallback, useEffect, useRef } from 'react'

import { useShortcuts } from '@/lib/keyboard/use-shortcuts'

import {
  asPreference,
  flipped,
  type ThemePreference,
  themeAttribute,
  themeStorageKey,
} from './preference'

const apply = (preference: ThemePreference) => {
  const root = document.documentElement
  if (preference === 'system') root.removeAttribute(themeAttribute)
  else root.setAttribute(themeAttribute, preference)
}

export const useTheme = (): void => {
  const preference = useRef<ThemePreference>('system')

  useEffect(() => {
    preference.current = asPreference(localStorage.getItem(themeStorageKey))
  }, [])

  const flip = useCallback(() => {
    const systemPrefersDark =
      window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false

    const next = flipped(preference.current, systemPrefersDark)
    preference.current = next
    localStorage.setItem(themeStorageKey, next)
    apply(next)
  }, [])

  useShortcuts([{ key: 't', run: flip }])
}
