import type { Question } from '@/lib/jev/types'

type Dimension = {
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
    'cannon',
    'cannon moment',
    'Rate how firmly established this is as true within whatever world it belongs to.',
    ['Fan theory', 'Widely assumed', 'Stated outright', 'Load-bearing lore'],
  ),
  scored(
    'cousin-joe',
    'cousin joe approves',
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
    'Rate how badly children would want this if it were offered to them.',
    ['Actively avoided', 'Mild curiosity', 'A queue forms', 'They yearn'],
  ),
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
]
