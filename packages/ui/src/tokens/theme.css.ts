import {
  assignVars,
  createGlobalTheme,
  createGlobalThemeContract,
  globalStyle,
} from '@vanilla-extract/css'

import { cssVarName } from './var-name'
import { darkColors, darkOnInk, darkWashes, tokens } from './values'

export const vars = createGlobalThemeContract(tokens, (_value, path) =>
  cssVarName(path),
)

createGlobalTheme(':root', vars, tokens)

// Both, so form controls and scrollbars follow the page.
globalStyle(':root', { colorScheme: 'light dark' })

const dark = {
  ...assignVars(vars.colors, darkColors),
  ...assignVars(vars.onInk, darkOnInk),
  ...assignVars(vars.washes, darkWashes),
  ...assignVars(vars.inkWashes, tokens.washes),
}

globalStyle(':root', {
  '@media': { '(prefers-color-scheme: dark)': { vars: dark } },
})

// Outranks the media query on specificity rather than on order.
globalStyle(`:root[data-theme='light']`, {
  vars: {
    ...assignVars(vars.colors, tokens.colors),
    ...assignVars(vars.onInk, tokens.onInk),
    ...assignVars(vars.washes, tokens.washes),
    ...assignVars(vars.inkWashes, tokens.inkWashes),
  },
})

globalStyle(`:root[data-theme='dark']`, { vars: dark })
