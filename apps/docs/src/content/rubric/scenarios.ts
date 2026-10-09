import type { NoulQuestion } from '@/lib/jev/types'

type Scenario = {
  readonly id: string
  // Reads as the tail of the verdict sentence, so each one starts with its
  // own preposition rather than the sentence guessing at one.
  readonly label: string
  readonly question: NoulQuestion
}

// The label usually reads as the tail of the question too. Only pass `where`
// when the model needs more than the sentence shows.
const situation = (id: string, label: string, where = label): Scenario => ({
  id,
  label,
  question: {
    type: 'noul',
    instructions: `Would it be absurd to say this out loud ${where}?`,
  },
})

export const scenarios: readonly Scenario[] = [
  situation('boardroom', 'in a board meeting'),
  situation('interview', 'in a job interview'),
  situation('first-date', 'on a first date'),
  situation('family-dinner', 'at family dinner', 'at dinner with family'),
  situation('group-chat', 'in the group chat', 'in a group chat with friends'),
  situation('eulogy', 'during a eulogy', 'while delivering a eulogy'),
]
