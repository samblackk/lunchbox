import type { Question } from '@/lib/jev/types'

export type Dimension = {
  readonly id: string
  // What the rubric row is called. The model never sees this, only the
  // instructions, so the label can be funnier than the prompt.
  readonly label: string
  readonly question: Question
}

const scored = (
  id: string,
  label: string,
  instructions: string,
  criteria: readonly string[],
): Dimension => ({
  id,
  label,
  question: { type: 'score', instructions, criteria },
})

export const dimensions: readonly Dimension[] = [
  scored(
    'wormhole',
    'likely to cause a wormhole',
    'Rate how likely this statement is to cause a traversable wormhole.',
    [
      'No spacetime risk',
      'Mild local curvature',
      'Measurable tunneling',
      'Wormhole imminent',
    ],
  ),
  scored(
    'consistency',
    'internal consistency',
    'Rate how well this statement agrees with itself.',
    ['Contradicts itself', 'Strained', 'Holds together', 'Airtight'],
  ),
  scored(
    'absurd',
    'absurd',
    'Rate how much of the claim collapses if the absurd part is removed.',
    ['Absurdity is decoration', 'Removable', 'Structural', 'The entire claim'],
  ),
  scored(
    'recoverability',
    'recoverability',
    'Rate how hard it would be for the speaker to walk this back.',
    [
      'Walks back easily',
      'Needs an explanation',
      'Needs an apology',
      'Unrecoverable',
    ],
  ),
  scored(
    'committee',
    'committee survivability',
    'Rate how far this would get through a committee before someone objected.',
    [
      'Dies in the first meeting',
      'Survives one round',
      'Reaches a vote',
      'Becomes policy',
    ],
  ),
  scored(
    'falsifiability',
    'falsifiability',
    'Rate how testable this statement is.',
    [
      'Untestable',
      'Testable in principle',
      'Testable cheaply',
      'Already falsified',
    ],
  ),
  scored(
    'ontological-strain',
    'ontological strain',
    'Rate how much this statement strains the categories it uses.',
    ['None', 'Bends a category', 'Breaks a category', 'Demands a new category'],
  ),
  scored(
    'confidence-gap',
    'confidence gap',
    'Rate the gap between how certain this sounds and how well supported it is.',
    [
      'Appropriately hedged',
      'Slightly overconfident',
      'Badly overconfident',
      'Serene certainty',
    ],
  ),
  scored(
    'verification-cost',
    'cost to verify',
    'Rate what it would cost to check whether this is true.',
    [
      'A glance out the window',
      'An afternoon',
      'A research grant',
      'A particle accelerator',
    ],
  ),
]

// The headline verdict. A noul rather than a score, because the readout is a
// probability in a sentence and not a position on a scale.
export const finalBoss = {
  id: 'boardroom',
  label: "chance you'd look weird saying this in a board meeting",
  question: {
    type: 'noul',
    instructions:
      'Would someone look strange saying this out loud in a board meeting?',
  },
} as const satisfies Dimension

// Typed as tuples, or Object.fromEntries widens a mixed array to any.
const questionEntries: readonly [string, Question][] = [
  ...dimensions.map(({ id, question }): [string, Question] => [id, question]),
  [finalBoss.id, finalBoss.question],
]

export const rubricQuestions: Readonly<Record<string, Question>> =
  Object.fromEntries(questionEntries)
