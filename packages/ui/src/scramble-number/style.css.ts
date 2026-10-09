import { style } from '@vanilla-extract/css'

// Tabular figures, or every swap would shift the words after it.
export const number = style({
  fontVariantNumeric: 'tabular-nums',
})
