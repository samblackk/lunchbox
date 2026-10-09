// Every event this site sends, named once. A string literal at a call site
// is how two spellings of the same event end up in two charts.
export const analyticsEvents = {
  pageViewed: 'page viewed',
  statementScored: 'statement scored',
  scenarioCycled: 'scenario cycled',
} as const

export type AnalyticsEvent =
  (typeof analyticsEvents)[keyof typeof analyticsEvents]

export type AnalyticsProps = Readonly<Record<string, string | number | boolean>>
