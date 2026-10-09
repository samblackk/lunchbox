import { keyframes, style } from '@vanilla-extract/css'

import { vars } from '../tokens/theme.css'

// Inline, because an icon is a piece of text more often than it is a box. A
// flex parent blockifies it anyway, so the flex callers are unaffected and
// the ones that sit it in running text get it on the line.
export const icon = style({
  display: 'inline-block',
  verticalAlign: 'middle',
  flexShrink: 0,
})

const turn = keyframes({ to: { rotate: '360deg' } })

// Linear, because a spinner that eases is a spinner that looks like it is
// catching on something.
export const spinning = style({
  animation: `${turn} ${vars.motion.duration.loop} linear infinite`,
})
