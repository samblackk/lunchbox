// Sub-pixel line heights round the block up by a fraction, which would read
// as an overflow and shrink text that already fits.
const tolerance = 1

// Small enough that the type lands close to the largest size that fits, big
// enough to get there in a handful of passes.
const step = 0.96

// Below this the heading stops being a heading, and a sentence that cannot be
// made to fit is better left long than shrunk into the body copy.
const floor = 0.5

export const fitsWithinLines = ({
  height,
  lineHeight,
  maxLines,
}: {
  height: number
  lineHeight: number
  maxLines: number
}): boolean => lineHeight <= 0 || height <= lineHeight * maxLines + tolerance

// Zero means stop: there is no scale left worth trying.
export const nextScale = (scale: number): number => {
  const next = scale * step
  return next < floor ? 0 : next
}
