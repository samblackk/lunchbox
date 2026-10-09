import type { Metadata } from 'next'

import { PageShell } from '@/components/page-shell'
import { asStatement } from '@/demos/is-it-absurd/score'
import { TryAgain } from '@/demos/is-it-absurd/try-again'
import { IsItAbsurd } from '@/demos/is-it-absurd'

export const metadata: Metadata = {
  title: 'is it absurd?',
}

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
      action={statementAsked === '' ? undefined : <TryAgain />}
    >
      <IsItAbsurd statement={statementAsked} />
    </PageShell>
  )
}

export default IsItAbsurdPage
