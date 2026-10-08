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

const chosen = (
  id: string,
  label: string,
  instructions: string,
  criteria: Readonly<Record<string, string>>,
): Dimension => ({
  id,
  label,
  question: { type: 'choice', instructions, criteria },
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
    'load-bearing',
    'load-bearing absurdity',
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
  chosen(
    'failure-mode',
    'failure mode',
    'Pick the most likely reason this statement is wrong.',
    {
      typo: 'A slip of the keyboard or the tongue',
      metaphor: 'Meant figuratively and read literally',
      sincere: 'Actually believed',
      bit: 'A joke being committed to',
    },
  ),
  chosen(
    'era',
    'era it passes unchallenged',
    'Pick the era in which nobody would have questioned this.',
    {
      antiquity: 'Before anyone measured',
      enlightenment: 'Measured, but politely',
      seventies: 'Measured and ignored',
      now: 'Passes today',
      never: 'Questioned in every era',
    },
  ),
  chosen(
    'jurisdiction',
    'jurisdiction',
    'Pick the field that should rule on whether this is true.',
    {
      physics: 'A question about the world',
      grammar: 'A question about the sentence',
      theology: 'A question about meaning',
      vibes: 'Not a question',
    },
  ),
  chosen(
    'notify',
    'who should be told',
    'Pick who most needs to hear about this statement.',
    {
      nobody: 'Let it go',
      friend: 'Worth one mention over dinner',
      physicist: 'Someone should check',
      authorities: 'Escalate',
    },
  ),
  chosen(
    'response',
    'correct response',
    'Pick the right thing to do when someone says this to you.',
    {
      agree: 'Agree and move on',
      nod: 'Nod without agreeing',
      ask: 'Ask a follow-up question',
      leave: 'Back away',
    },
  ),
  chosen(
    'containment',
    'containment',
    'Pick how far this statement has already spread.',
    {
      contained: 'Said once, heard by nobody',
      spreading: 'Repeated at least twice',
      press: 'Needs a correction issued',
      late: 'Too late',
    },
  ),
]

export const dimensionQuestions: Readonly<Record<string, Question>> =
  Object.fromEntries(dimensions.map(({ id, question }) => [id, question]))
