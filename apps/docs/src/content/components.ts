export type ComponentEntry = {
  readonly slug: string
  readonly name: string
}

// Every demo gets one entry here, which is what the index grid and the demo
// routes both read. A demo is listed once its page is real.
export const componentEntries: readonly ComponentEntry[] = [
  { slug: 'is-it-absurd', name: 'is it absurd?' },
]

export const findComponent = (slug: string) =>
  componentEntries.find((entry) => entry.slug === slug)
