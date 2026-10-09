import type { ScoreAnswer } from '@/lib/jev/types'

type Segment = {
  readonly index: string
  readonly label: string
  readonly probability: number
  readonly leading: boolean
}

// Jev returns a distribution over the criteria and a score that is its mean.
// The reading is where the belief is, not where the mean rounds to: a split
// distribution has its mean in the gap, naming something nobody voted for.
const likeliestIndex = (answer: ScoreAnswer): string => {
  let winner = ''
  let best = -1

  for (const [index, probability] of Object.entries(answer.probabilities)) {
    if (probability > best) {
      winner = index
      best = probability
    }
  }

  return winner
}

export const likeliestReading = (answer: ScoreAnswer): string =>
  answer.legend[likeliestIndex(answer)] ?? 'no label'

// In criteria order, so the bar reads left to right as the scale does rather
// than as a ranking. Empty criteria are dropped: a segment of no width is
// still a gap, and four of them would read as a bar that does not add up.
export const segmentsOf = (answer: ScoreAnswer): readonly Segment[] => {
  const winner = likeliestIndex(answer)

  return Object.entries(answer.probabilities)
    .filter(([, probability]) => probability > 0.005)
    .sort(([one], [two]) => Number(one) - Number(two))
    .map(([index, probability]) => ({
      index,
      label: answer.legend[index] ?? index,
      probability,
      leading: index === winner,
    }))
}
