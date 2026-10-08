import {
  createGlobalTheme,
  createGlobalThemeContract,
  globalStyle,
} from '@vanilla-extract/css'

import { cssVarName } from './var-name'
import { tokens } from './values'

export const vars = createGlobalThemeContract(tokens, (_value, path) =>
  cssVarName(path),
)

createGlobalTheme(':root', vars, tokens)

globalStyle(':root', { colorScheme: 'light' })
