import { parseJevResult } from '@/lib/jev/parse'
import type { JevResult } from '@/lib/jev/types'

import raw from './frozen.json'

export const frozenStatement = 'The sky is purple'

// Run through the same parser as a live response, so a fixture that drifts from
// the real shape fails at build time rather than rendering something wrong.
const parsed = parseJevResult(raw)

if (parsed === null) {
  throw new Error('frozen.json does not match the Jev response shape')
}

export const frozenResult: JevResult = parsed

// The captured body itself, so the reveal shows a real payload rather than one
// re-serialized from the parts the parser kept.
export const frozenRaw: unknown = raw
