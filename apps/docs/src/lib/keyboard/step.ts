// Where arrow keys land next. Wraps, because a list you can only walk off the
// end of makes the last item a dead end.
export const nextIndex = (
  count: number,
  current: number,
  delta: number,
): number => {
  if (count <= 0) return -1
  if (current < 0) return delta > 0 ? 0 : count - 1
  return (current + delta + count) % count
}
