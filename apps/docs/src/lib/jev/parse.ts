import type { Answer, JevResult } from './types'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const numberMap = (value: unknown): Record<string, number> | null => {
  if (!isRecord(value)) return null
  const entries = Object.entries(value)
  return entries.every(([, each]) => typeof each === 'number')
    ? (Object.fromEntries(entries) as Record<string, number>)
    : null
}

const stringMap = (value: unknown): Record<string, string> | null => {
  if (!isRecord(value)) return null
  const entries = Object.entries(value)
  return entries.every(([, each]) => typeof each === 'string')
    ? (Object.fromEntries(entries) as Record<string, string>)
    : null
}

const parseAnswer = (value: unknown): Answer | null => {
  if (!isRecord(value)) return null

  const probabilities = numberMap(value.probabilities)
  if (probabilities === null) return null
  if (typeof value.confidence !== 'number') return null

  if (value.type === 'score') {
    const legend = stringMap(value.legend)
    if (typeof value.score !== 'number' || legend === null) return null
    return {
      type: 'score',
      score: value.score,
      confidence: value.confidence,
      probabilities,
      legend,
    }
  }

  if (value.type === 'choice' && typeof value.choice === 'string') {
    return {
      type: 'choice',
      choice: value.choice,
      confidence: value.confidence,
      probabilities,
    }
  }

  return null
}

// Jev is documented as unable to emit a type error, but this is still a network
// boundary. An unreadable answer is a failure, not a partial render.
export const parseJevResult = (value: unknown): JevResult | null => {
  if (!isRecord(value) || typeof value.model !== 'string') return null
  if (!isRecord(value.answers)) return null

  const answers: Record<string, Answer> = {}
  for (const [id, raw] of Object.entries(value.answers)) {
    const answer = parseAnswer(raw)
    if (answer === null) return null
    answers[id] = answer
  }

  return { model: value.model, answers }
}
