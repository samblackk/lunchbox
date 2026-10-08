import { style } from '@vanilla-extract/css'

import { vars } from '../tokens/theme.css'

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

export const popup = style({
  maxWidth: '12rem',
  padding: '0.4rem 0.8rem',
  borderRadius: vars.rounded.default,
  backgroundColor: vars.colors.accent,
  color: vars.colors.accentInk,
  fontFamily: vars.typography.familyMono,
  fontSize: '0.775rem',
  lineHeight: vars.typography.body.lineHeight,
})

export const arrow = style({
  width: '0.5rem',
  height: '0.5rem',
  backgroundColor: vars.colors.accent,
  rotate: '45deg',

  selectors: {
    '&[data-side="top"]': { bottom: '-0.2rem' },
    '&[data-side="bottom"]': { top: '-0.2rem' },
    '&[data-side="left"]': { right: '-0.2rem' },
    '&[data-side="right"]': { left: '-0.2rem' },
  },
})
