import { type Result, fail } from '@/lib/fetch/result'
import { postJson } from '@/lib/fetch/post-json'

import { parseJevResponse } from './parse'
import type { JevResponse, Question } from './types'

export const jevEndpoint = 'https://api.typesafe.ai/v1/systemone'

// The caller passes the key in rather than this module reading the environment,
// so nothing here is unsafe to import and every path stays testable.
type ScoreRequest = {
  state: string
  questions: Readonly<Record<string, Question>>
  apiKey: string
  fetchImpl?: typeof fetch
  sleep?: (ms: number) => Promise<void>
}

export const scoreWithJev = ({
  state,
  questions,
  apiKey,
  fetchImpl,
  sleep,
}: ScoreRequest): Promise<Result<JevResponse>> => {
  if (apiKey === '') return Promise.resolve(fail('unauthorized'))

  return postJson({
    url: jevEndpoint,
    body: { model: 'jev-latest', state, questions },
    parse: parseJevResponse,
    headers: { authorization: `Bearer ${apiKey}` },
    ...(fetchImpl ? { fetchImpl } : {}),
    ...(sleep ? { sleep } : {}),
  })
}
