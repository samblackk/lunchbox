import type { Metadata } from 'next'

import { PageShell } from '@/components/page-shell'
import type { KeyHint } from '@/lib/keyboard/hints'
import { asStatement } from '@/demos/is-it-absurd/score'
import { IsItAbsurd } from '@/demos/is-it-absurd'

export const metadata: Metadata = {
  title: 'is it absurd?',
}

// What ResultKeys and AcceptPlaceholder actually bind, split the way the
// page is: nothing is offered in a state where it would do nothing.
const emptyKeys: readonly KeyHint[] = [
  { keys: ['tab'], does: 'borrow the example statement' },
]

const resultKeys: readonly KeyHint[] = [
  { keys: ['esc'], does: 'ask about something else' },
  { keys: ['space'], does: 'try another situation' },
  { keys: ['up', 'down'], does: 'read each dimension in turn' },
]

const IsItAbsurdPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ statement?: string | string[] }>
}) => {
  const { statement } = await searchParams
  const asked = Array.isArray(statement) ? (statement[0] ?? '') : statement

  const statementAsked = asStatement(asked ?? '')

  return (
    <PageShell
      trail={['is it absurd?']}
      keys={statementAsked === '' ? emptyKeys : resultKeys}
    >
      <IsItAbsurd statement={statementAsked} />
    </PageShell>
  )
}

export default IsItAbsurdPage
