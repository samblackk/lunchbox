import { createKeyedStore } from '@/lib/cache/keyed-store'

import { isOverLimit, retryAfterMs, withinWindow } from './window'

export type RateLimit = {
  // Records the call as well as judging it, so a caller cannot ask twice on
  // one answer. Returns how long to wait when there is no slot left.
  readonly take: (key: string, now?: number) => { readonly waitMs: number }
}

// Bounded like every other store here: the keys are addresses from the open
// internet, and an unbounded map of them is a slow leak.
export const createRateLimit = ({
  limit,
  windowMs,
  keys = 5000,
}: {
  limit: number
  windowMs: number
  keys?: number
}): RateLimit => {
  const calls = createKeyedStore<readonly number[]>({ limit: keys })

  return {
    take: (key, now = Date.now()) => {
      const recent = withinWindow(calls.get(key) ?? [], now, windowMs)

      if (isOverLimit(recent, limit)) {
        calls.set(key, recent)
        return { waitMs: retryAfterMs(recent, now, windowMs) }
      }

      calls.set(key, [...recent, now])
      return { waitMs: 0 }
    },
  }
}
