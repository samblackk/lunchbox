import type { Question } from '@/lib/jev/types'

type Dimension = {
  readonly id: string
  // What the rubric row is called. The model never sees this, only the
  // instructions, so the label can be funnier than the prompt.
  readonly label: string
  // What the label means, for a reader who has not seen a result yet. Also
  // never sent: the model gets the instructions.
  readonly gloss: string
  readonly question: Question
}

const scored = (
  id: string,
  label: string,
  gloss: string,
  instructions: string,
  criteria: readonly string[],
): Dimension => ({
  id,
  label,
  gloss,
  question: { type: 'score', instructions, criteria },
})

export const dimensions: readonly Dimension[] = [
  scored(
    'cannon',
    'cannon moment',
    'Is this true in some world, or did you make it up just now?',
    'Rate how firmly established this is as true within whatever world it belongs to.',
    ['Fan theory', 'Widely assumed', 'Stated outright', 'Load-bearing lore'],
  ),
  scored(
    'cousin-joe',
    'cousin joe approves',
    'Would it survive the family barbecue, or start something?',
    'Rate how readily an ordinary relative at a family barbecue would agree with this.',
    [
      'Starts an argument',
      'Gets a shrug',
      'Gets a nod',
      'Repeated at the next barbecue',
    ],
  ),
  scored(
    'hr-involvement',
    'HR involvement',
    'How many meetings happen after you say this at work?',
    'Rate how likely saying this at work is to involve the human resources department.',
    [
      'Nobody notices',
      'A quiet word',
      'A meeting with notes',
      'A file is opened',
    ],
  ),
  scored(
    'stackoverflow',
    'solved on stackoverflow',
    'Has someone already answered this, badly, in 2013?',
    'Rate how likely someone has already posted a working answer to this.',
    [
      'Nobody has asked',
      'Asked, closed as a duplicate',
      'Answered in 2013',
      'Accepted answer, four hundred upvotes',
    ],
  ),
  scored(
    'children-yearn',
    'the children yearn for it',
    'Would a child want this, or back away slowly?',
    'Rate how badly children would want this if it were offered to them.',
    ['Actively avoided', 'Mild curiosity', 'A queue forms', 'They yearn'],
  ),
  scored(
    'wormhole',
    'likely to cause a wormhole',
    'Odds this punches a hole clean through spacetime.',
    'Rate how likely this statement is to cause a traversable wormhole.',
    [
      'No spacetime risk',
      'Mild local curvature',
      'Measurable tunneling',
      'Wormhole imminent',
    ],
  ),
]
