export type ScoreQuestion = {
  readonly type: 'score'
  readonly instructions: string
  readonly criteria: readonly string[]
}

// A noul is a yes/no question. Its answer is one probability and nothing else,
// with no confidence and no distribution, so it sits outside AnswerBase.
export type NoulQuestion = {
  readonly type: 'noul'
  readonly instructions: string
}

export type Question = ScoreQuestion | NoulQuestion

type AnswerBase = {
  readonly probabilities: Readonly<Record<string, number>>
  readonly confidence: number
}

export type ScoreAnswer = AnswerBase & {
  readonly type: 'score'
  readonly score: number
  readonly legend: Readonly<Record<string, string>>
}

export type NoulAnswer = {
  readonly type: 'noul'
  readonly noul: number
}

export type Answer = ScoreAnswer | NoulAnswer

export type JevResult = {
  readonly model: string
  readonly answers: Readonly<Record<string, Answer>>
}

// The validated answers beside the body they came from. The demo shows the
// body, so discarding it at the parse boundary would mean rebuilding it later
// from the parts that survived.
export type JevResponse = {
  readonly result: JevResult
  readonly raw: unknown
}
