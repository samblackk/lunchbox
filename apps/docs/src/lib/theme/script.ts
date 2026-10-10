import { themeAttribute, themePreferences, themeStorageKey } from './preference'

// Inlined as a string and run before the first paint: a module would load
// too late to stop a flash. The index check skips zero, which is 'system'.
export const themeScript = `
try {
  var stored = localStorage.getItem('${themeStorageKey}')
  if (${JSON.stringify([...themePreferences])}.indexOf(stored) > 0) {
    document.documentElement.setAttribute('${themeAttribute}', stored)
  }
} catch (error) {}
`
