// How much a row reacts, from 1 right under the pointer to 0 at the edge of
// its reach. Smoothstepped rather than linear, so the list bends toward the
// pointer instead of coming to a point at it.
export const proximity = (distance: number, radius: number): number => {
  if (radius <= 0) return 0

  const nearness = 1 - Math.min(Math.abs(distance) / radius, 1)
  return nearness * nearness * (3 - 2 * nearness)
}

// One step of a row toward where it should be. Snaps when it is close enough
// to stop, so the loop that drives it has something to end on.
export const approach = (
  current: number,
  target: number,
  ease: number,
): number => {
  const next = current + (target - current) * ease
  return Math.abs(target - next) < 0.001 ? target : next
}
