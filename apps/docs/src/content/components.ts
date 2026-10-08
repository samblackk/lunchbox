export type ComponentEntry = {
  readonly slug: string
  readonly name: string
}

// Every component gets one entry here, which is what the index grid and the
// component routes both read. Empty until the first component lands.
export const componentEntries: readonly ComponentEntry[] = []

export const findComponent = (slug: string) =>
  componentEntries.find((entry) => entry.slug === slug)
