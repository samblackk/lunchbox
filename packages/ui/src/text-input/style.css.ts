import { style } from '@vanilla-extract/css'

import { vars } from '../tokens/theme.css'

// How far the start slot sits in from the shell's edge. The reveal's marker
// lines up with it, so the icon and the chevron read as one column.
const startInset = '0.75rem'

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
})

// The shell is the control: it carries the border, the focus ring and the
// padding, so the slots sit inside the box rather than beside it.
export const shell = style({
  display: 'flex',
  // So the end slot can take a line of its own where there is no room for it
  // beside the field.
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.6rem',
  padding: '0.3rem',
  paddingInlineStart: startInset,
  border: `${vars.strokes.hairline} solid ${vars.colors.borderStrong}`,
  borderRadius: vars.rounded.default,
  backgroundColor: vars.colors.page,
  color: vars.colors.textPrimary,
  transition: `border-color ${vars.motion.duration.default} ${vars.motion.easing.default}`,

  selectors: {
    // Hover darkens the edge rather than filling the box. The system is black
    // on paper, so a wash here would be the only color on the page.
    '&:has(input:enabled):hover': {
      borderColor: vars.colors.accent,
    },
    // Focus is drawn on the shell because the input itself has no edge of its
    // own. An outline rather than a border, so nothing reflows.
    '&:has(input:focus-visible)': {
      outline: `${vars.strokes.focus} solid ${vars.colors.accent}`,
      outlineOffset: vars.strokes.focusOffset,
    },
    // Weight, not color. This system has no danger token and does not want one.
    '&:has(input[aria-invalid="true"])': {
      borderWidth: vars.strokes.focus,
    },
    '&:has(input:disabled)': {
      color: vars.colors.textMuted,
      cursor: 'not-allowed',
    },
  },

  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
})

export const input = style({
  flex: 1,
  // Without this a flex child refuses to shrink below its content width, and a
  // long statement pushes the end slot out of the box.
  minWidth: 0,
  padding: '0.25rem 0',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'inherit',
  font: 'inherit',

  selectors: {
    '&::placeholder': { color: vars.colors.textMuted },
    '&:focus': { outline: 'none' },
    '&:disabled': { cursor: 'not-allowed' },
  },
})

// Slots size to their content and never stretch, so the input keeps the slack.
export const slot = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
})

export const startSlot = style([slot, { color: vars.colors.textMuted }])

// Full width under the field on a narrow window, back beside it above the
// breakpoint. Grid rather than flex, so the one child fills the row without
// the control having to reach into it.
export const endSlot = style([
  slot,
  {
    display: 'grid',
    flexBasis: '100%',

    '@media': {
      '(min-width: 640px)': {
        display: 'flex',
        flexBasis: 'auto',
      },
    },
  },
])

// Indents the whole reveal to the shell's start slot, so the trigger and the
// icon above it read as one column.
export const moreInfo = style({
  paddingInlineStart: `calc(${startInset} + ${vars.strokes.hairline})`,
})
