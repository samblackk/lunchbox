// Each href stays a literal so Next's typed routes reject an entry that points
// nowhere.
const built = [
  {
    href: '/is-it-absurd',
    name: 'is it absurd?',
    blurb: 'Using Jev for the greater good',
  },
] as const

// Named before it exists, so the index says what the showcase is going to be
// rather than what it happens to hold today.
const planned = [
  ['ask my ghost', 'Answers about me, with receipts'],
  ['leviosa', "This site's design system"],
] as const

type BuiltDemo = (typeof built)[number]

type PlannedDemo = {
  readonly name: string
  readonly blurb: string
  readonly href?: undefined
}

type DemoEntry = BuiltDemo | PlannedDemo

export const demoEntries: readonly DemoEntry[] = [
  ...built,
  ...planned.map(([name, blurb]) => ({ name, blurb: `Soon. ${blurb}` })),
]
