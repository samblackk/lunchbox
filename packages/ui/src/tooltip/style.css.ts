import { style } from '@vanilla-extract/css'

import { vars } from '../tokens/theme.css'

// The trigger is a button because a tip has to be reachable by keyboard, but
// it should look like whatever it wraps.
export const trigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: 0,
  border: 'none',
  background: 'none',
  color: 'inherit',
  font: 'inherit',
  cursor: 'help',
})

// Declared after the trigger, so these win on order rather than on luck.
export const block = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '0.4rem',
  width: '100%',
  textAlign: 'start',
})

// A tip floats over the whole app, so it has to out-stack whatever the app
// lifted. Portalled content shares the root context and loses on order.
export const positioner = style({
  zIndex: 10,
})

export const popup = style({
  maxWidth: '20rem',
  padding: '0.4rem 0.8rem',
  borderRadius: vars.rounded.default,
  backgroundColor: vars.colors.accent,
  color: vars.colors.accentInk,
  fontFamily: vars.typography.familyMono,
  fontSize: vars.typography.sizeFine,
  lineHeight: vars.typography.body.lineHeight,

  // Grows out of the corner nearest the pointer rather than its own middle.
  // Base UI works the origin out and hands it over on the positioner.
  transformOrigin: 'var(--transform-origin)',
  // `scale` rather than `transform`: the positioner owns the translate and
  // rewrites it every frame to follow the cursor.
  transition: `scale ${vars.motion.duration.default} ${vars.motion.easing.default}, opacity ${vars.motion.duration.default} ${vars.motion.easing.default}`,

  selectors: {
    '&[data-starting-style], &[data-ending-style]': {
      opacity: 0,
      scale: 0.9,
    },
  },

  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
})
