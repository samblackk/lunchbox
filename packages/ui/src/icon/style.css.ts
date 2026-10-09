import { keyframes, style } from '@vanilla-extract/css'

import { vars } from '../tokens/theme.css'

export const icon = style({
  display: 'block',
  flexShrink: 0,
})

const turn = keyframes({ to: { rotate: '360deg' } })

// Linear, because a spinner that eases is a spinner that looks like it is
// catching on something.
export const spinning = style({
  animation: `${turn} ${vars.motion.duration.loop} linear infinite`,
})
