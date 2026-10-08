import { style } from '@vanilla-extract/css'

import { vars } from '../tokens/theme.css'

// An ink fill, so the text comes from the on-ink set rather than a second
// white. Scrolls in both axes: payloads have long lines and many of them.
export const code = style({
  maxHeight: '24rem',
  margin: 0,
  padding: '1rem',
  overflow: 'auto',
  borderRadius: vars.rounded.default,
  backgroundColor: vars.colors.accent,
  color: vars.onInk.textPrimary,
  fontFamily: vars.typography.familyMono,
  fontSize: vars.typography.sizeFine,
  lineHeight: vars.typography.body.lineHeight,
  tabSize: 2,

  selectors: {
    '&:focus-visible': {
      outline: `${vars.strokes.focus} solid ${vars.colors.accent}`,
      outlineOffset: vars.strokes.focusOffset,
    },
  },
})
