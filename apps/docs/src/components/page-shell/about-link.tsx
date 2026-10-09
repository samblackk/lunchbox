'use client'

import { Tooltip } from '@neonanomaly/lunchbox'

// Describes the link rather than naming it, so the link text stays what a
// screen reader reads.
const about = [
  'The girl behind the code; likes cats and drinks too much coffee.',
  "It'd be pretty cool of you to click this link and learn how cool she is.",
].join(' ')

export const AboutLink = () => (
  <Tooltip
    describes
    side="top"
    label={about}
    render={
      <a href="https://neonanomaly.io" target="_blank" rel="noreferrer" />
    }
  >
    who is sam o&rsquo;leary?
  </Tooltip>
)
