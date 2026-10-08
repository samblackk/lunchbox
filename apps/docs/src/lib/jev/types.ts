export type ScoreQuestion = {
  readonly type: 'score'
  readonly instructions: string
  readonly criteria: readonly string[]
}

export type ChoiceQuestion = {
  readonly type: 'choice'
  readonly instructions: string
  readonly criteria: Readonly<Record<string, string>>
}

export type Question = ScoreQuestion | ChoiceQuestion

type AnswerBase = {
  readonly probabilities: Readonly<Record<string, number>>
  readonly confidence: number
}

export type ScoreAnswer = AnswerBase & {
  readonly type: 'score'
  readonly score: number
  readonly legend: Readonly<Record<string, string>>
}

export type ChoiceAnswer = AnswerBase & {
  readonly type: 'choice'
  readonly choice: string
}

export type Answer = ScoreAnswer | ChoiceAnswer

export type JevResult = {
  readonly model: string
  readonly answers: Readonly<Record<string, Answer>>
}
