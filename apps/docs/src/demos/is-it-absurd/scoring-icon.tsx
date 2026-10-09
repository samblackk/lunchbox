'use client'

import { Icon } from '@neonanomaly/lunchbox'
import { useEffect, useRef, useState } from 'react'

// The form is a plain GET, so the server cannot show this: the old page is
// still on screen while the next one is being scored. The smallest leaf that
// can is a listener on the form this icon already sits inside.
export const ScoringIcon = () => {
  const anchor = useRef<HTMLSpanElement>(null)
  const [scoring, setScoring] = useState(false)

  useEffect(() => {
    const form = anchor.current?.closest('form')
    if (!form) return

    const start = () => setScoring(true)
    form.addEventListener('submit', start)
    return () => form.removeEventListener('submit', start)
  }, [])

  return (
    <span ref={anchor}>
      <Icon name={scoring ? 'spinner' : 'info'} size="1rem" spin={scoring} />
    </span>
  )
}
