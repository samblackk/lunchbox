import type { Metadata } from 'next'

import { PageShell } from '@/components/page-shell'
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

  return (
    <PageShell trail={['is it absurd?']}>
      <IsItAbsurd statement={asked ?? ''} />
    </PageShell>
  )
}

export default IsItAbsurdPage
