export const themePreferences = ['system', 'light', 'dark'] as const

export type ThemePreference = (typeof themePreferences)[number]

export const themeAttribute = 'data-theme'
export const themeStorageKey = 'na-theme'

export const asPreference = (stored: string | null): ThemePreference =>
  themePreferences.find((each) => each === stored) ?? 'system'

export const resolveTheme = (
  preference: ThemePreference,
  systemPrefersDark: boolean,
): 'light' | 'dark' =>
  preference === 'system' ? (systemPrefersDark ? 'dark' : 'light') : preference

// Cycling into 'system' looks like a key that did nothing whenever the
// system already matches, so this flips what is on screen instead.
export const flipped = (
  preference: ThemePreference,
  systemPrefersDark: boolean,
): ThemePreference =>
  resolveTheme(preference, systemPrefersDark) === 'dark' ? 'light' : 'dark'
