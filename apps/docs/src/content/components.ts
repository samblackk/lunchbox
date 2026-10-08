// Each href stays a literal so Next's typed routes reject an entry that points
// nowhere. The array itself is widened, or its length would be a literal too
// and the grid's empty branch would read as dead code.
const entries = [{ href: '/is-it-absurd', name: 'is it absurd?' }] as const

export type DemoEntry = (typeof entries)[number]

export const componentEntries: readonly DemoEntry[] = entries
