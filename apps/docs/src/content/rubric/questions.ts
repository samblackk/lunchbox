import type { Question } from '@/lib/jev/types'

import { dimensions } from './dimensions'
import { scenarios } from './scenarios'

// Typed as tuples, or Object.fromEntries widens a mixed array to any.
const asEntry = ({
  id,
  question,
}: {
  id: string
  question: Question
}): [string, Question] => [id, question]

// Every dimension and every scenario in one request. The scenarios only differ
// by where the statement is said, so asking them separately would be six more
// round trips for an answer the user switches between instantly.
export const rubricQuestions: Readonly<Record<string, Question>> =
  Object.fromEntries([...dimensions.map(asEntry), ...scenarios.map(asEntry)])
