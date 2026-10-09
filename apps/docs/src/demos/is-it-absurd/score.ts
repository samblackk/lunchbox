import { rubricQuestions } from '@/content/rubric/questions'
import {
  frozenRaw,
  frozenResult,
  frozenStatement,
} from '@/content/rubric/frozen'
import { createKeyedStore } from '@/lib/cache/keyed-store'
import type { FailureReason } from '@/lib/fetch/result'
import { scoreWithJev } from '@/lib/jev/client'
import type { JevResponse, JevResult } from '@/lib/jev/types'

export const maxStatementLength = 280

// What counts as the statement, for the page that shows it as well as the
// call that scores it. Two readings of one query string is how a heading ends
// up quoting a trailing space nobody typed on purpose.
export const asStatement = (asked: string): string =>
  asked.trim().slice(0, maxStatementLength)

// Jev is not deterministic and takes no seed: ten runs of one statement move
// the verdict several points. A statement keeps its first answer, which also
// stands between a refresh and another paid call.
const scored = createKeyedStore<JevResponse>({ limit: 200 })

type Scoring =
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
export const scoreStatement = async (
  asked: string,
  // Injected only by tests, the same way the layers below take their fetch.
  fetchImpl?: typeof fetch,
): Promise<Scoring> => {
  const statement = asStatement(asked)

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

  const remembered = scored.get(statement)
  if (remembered !== undefined) {
    return {
      state: 'scored',
      statement,
      result: remembered.result,
      raw: remembered.raw,
      live: true,
    }
  }

  const result = await scoreWithJev({
    state: statement,
    questions: rubricQuestions,
    apiKey: process.env.TYPESAFE_API_KEY ?? '',
    ...(fetchImpl ? { fetchImpl } : {}),
  })

  if (!result.ok) return { state: 'failed', statement, reason: result.reason }

  scored.set(statement, result.data)

  return {
    state: 'scored',
    statement,
    result: result.data.result,
    raw: result.data.raw,
    live: true,
  }
}
