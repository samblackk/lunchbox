'use client'

import mixpanel from 'mixpanel-browser'

import type { AnalyticsEvent, AnalyticsProps } from './events'

const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? ''

let started = false

// Without a token this is a no-op, the same way the demo falls back to its
// captured answers: a fork with no Mixpanel project still runs.
export const startAnalytics = (): void => {
  if (started || token === '') return
  started = true

  // The option names are Mixpanel's own spelling, which is the one exception
  // the naming rule makes: renaming them would mean passing nothing.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  mixpanel.init(token, { track_pageview: false, persistence: 'localStorage' })
}

export const track = (event: AnalyticsEvent, props: AnalyticsProps = {}) => {
  if (!started) return
  mixpanel.track(event, props)
}
