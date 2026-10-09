import { headers } from 'next/headers'

import { createRateLimit } from './rate-limit'

// Ten scored statements an hour per address. Enough to play with, far short
// of what it costs to leave a tab looping.
const limiter = createRateLimit({ limit: 10, windowMs: 60 * 60 * 1000 })

// Railway's proxy sets the forwarded header, so the first entry is the
// client. Falls back to one shared bucket rather than to no limit at all.
const addressOf = (forwarded: string | null): string =>
  forwarded?.split(',')[0]?.trim() ?? 'unknown'

export const takeScoringSlot = async (): Promise<{
  readonly waitMs: number
}> => {
  const headerList = await headers()
  return limiter.take(addressOf(headerList.get('x-forwarded-for')))
}
