'use client'

import { useEffect } from 'react'

import { analyticsEvents } from '@/lib/analytics/events'
import { track } from '@/lib/analytics/mixpanel'

// The statement itself is not sent. Its shape says enough about how the demo
// is used, and someone else's sentence is not this site's to collect.
export const ScoredEvent = ({
  live,
  length,
  percent,
}: {
  live: boolean
  length: number
  percent: number
}) => {
  useEffect(() => {
    track(analyticsEvents.statementScored, { live, length, percent })
  }, [live, length, percent])

  return null
}
