import { DemoList } from '@/components/demo-list'
import { PageShell } from '@/components/page-shell'

const HomePage = () => (
  <PageShell trail={[]}>
    <DemoList />
  </PageShell>
)

export default HomePage
