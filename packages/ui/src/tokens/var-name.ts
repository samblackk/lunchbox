const varPrefix = 'na'

const hyphenate = (segment: string) =>
  segment.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

export const cssVarName = (path: readonly string[]) =>
  [varPrefix, ...path.map(hyphenate)].join('-')
