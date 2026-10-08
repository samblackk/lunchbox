import { rubricQuestions } from '@/content/rubric/dimensions'
import {
  frozenRaw,
  frozenResult,
  frozenStatement,
} from '@/content/rubric/frozen'
import type { FailureReason } from '@/lib/fetch/result'
import { scoreWithJev } from '@/lib/jev/client'
import type { JevResult } from '@/lib/jev/types'

export const maxStatementLength = 280

export type Scoring =
  | {
      readonly state: 'scored'
      readonly statement: string
      readonly result: JevResult
      readonly raw: unknown
      readonly live: boolean
    }
  | {
      readonly state: 'failed'
      readonly statement: string
      readonly reason: FailureReason
    }

// The only place that reads the key. Everything below it takes the key as an
// argument, so no module that touches a secret is importable from a component.
export const scoreStatement = async (asked: string): Promise<Scoring> => {
  const statement = asked.trim().slice(0, maxStatementLength)

  // The captured answers belong to one statement. Serving them for any other
  // would be a lie, so they are a shortcut here and never a fallback.
  if (statement === '' || statement === frozenStatement) {
    return {
      state: 'scored',
      statement: frozenStatement,
      result: frozenResult,
      raw: frozenRaw,
      live: false,
    }
  }

  const result = await scoreWithJev({
    state: statement,
    questions: rubricQuestions,
    apiKey: process.env.TYPESAFE_API_KEY ?? '',
  })

  return result.ok
    ? {
        state: 'scored',
        statement,
        result: result.data.result,
        raw: result.data.raw,
        live: true,
      }
    : { state: 'failed', statement, reason: result.reason }
}
