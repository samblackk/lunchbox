import { style } from '@vanilla-extract/css'

// The real word holds the box and the scrambled one is painted over it, so a
// run of wider letters cannot shove the layout around.
export const word = style({
  position: 'relative',
  display: 'inline-block',
})

export const measure = style({
  color: 'transparent',
})

export const painted = style({
  position: 'absolute',
  insetBlockStart: 0,
  insetInlineStart: 0,
  whiteSpace: 'nowrap',
})
