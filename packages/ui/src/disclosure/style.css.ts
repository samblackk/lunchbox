import { style } from '@vanilla-extract/css'

import { vars } from '../tokens/theme.css'

// One trigger treatment everywhere a reveal appears: the browser's disclosure
// at body size and body color. The marker is the browser's own, which already
// turns over on open and costs nothing.
export const trigger = style({
  width: 'fit-content',
  marginBottom: '0.5rem',
  cursor: 'pointer',

  selectors: {
    // The one hover this can carry without color: the text already sits at
    // text-primary, so a color shift would be invisible.
    '&:hover': { textDecoration: 'underline' },
    '&:focus-visible': {
      outline: `${vars.strokes.focus} solid ${vars.colors.accent}`,
      outlineOffset: vars.strokes.focusOffset,
    },
  },
})
