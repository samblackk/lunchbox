import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { rubricQuestions } from '@/content/rubric/dimensions'

import { scoreWithJev } from './client'

// Opt in with JEV_LIVE=1. Excluded from the normal run because it costs money
// and touches the network, which a unit test must never do.
const apiKeyFromEnvFile = () => {
  try {
    const file = readFileSync(
      new URL('../../../.env.local', import.meta.url),
      'utf8',
    )
    const prefix = 'TYPESAFE_API_KEY='
    const line = file.split('\n').find((each) => each.startsWith(prefix))
    return line?.slice(prefix.length).trim() ?? ''
  } catch {
    return ''
  }
}

describe.skipIf(process.env.JEV_LIVE !== '1')('the real Jev API', () => {
  it('parses every dimension from one call', async () => {
    const result = await scoreWithJev({
      state: 'The sky is purple',
      questions: rubricQuestions,
      apiKey: apiKeyFromEnvFile(),
    })

    if (!result.ok) throw new Error(`Jev call failed: ${result.reason}`)

    expect(Object.keys(result.data.result.answers)).toHaveLength(10)
  })
})
