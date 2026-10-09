// A fixed window per caller: the timestamps of the calls still inside it.
// Pure, so the policy can be tested without waiting for real time to pass.
export const withinWindow = (
  stamps: readonly number[],
  now: number,
  windowMs: number,
): readonly number[] => stamps.filter((stamp) => now - stamp < windowMs)

export const isOverLimit = (
  stamps: readonly number[],
  limit: number,
): boolean => stamps.length >= limit

// How long until the oldest call leaves the window and a slot frees up.
export const retryAfterMs = (
  stamps: readonly number[],
  now: number,
  windowMs: number,
): number => {
  const oldest = stamps[0]
  if (oldest === undefined) return 0
  return Math.max(0, windowMs - (now - oldest))
}
