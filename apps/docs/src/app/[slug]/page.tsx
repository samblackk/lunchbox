import { notFound } from 'next/navigation'

import { PageShell } from '@/components/page-shell'
import { componentEntries, findComponent } from '@/content/components'

export const dynamicParams = false

export const generateStaticParams = () =>
  componentEntries.map((entry) => ({ slug: entry.slug }))

const ComponentPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const entry = findComponent(slug)

  if (!entry) notFound()

  return (
    <PageShell trail={[entry.name]}>
      <h1>{entry.name}</h1>
    </PageShell>
  )
}

export default ComponentPage
