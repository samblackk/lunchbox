'use client'

import { useEffect } from 'react'

import { analyticsEvents } from '@/lib/analytics/events'
import { startAnalytics, track } from '@/lib/analytics/mixpanel'

// Mounted once per document. Navigation here is cross-document, so every
// page view is a fresh mount and there is no route change to listen for.
export const Analytics = () => {
  useEffect(() => {
    startAnalytics()
    track(analyticsEvents.pageViewed, { path: window.location.pathname })
  }, [])

  return null
}
