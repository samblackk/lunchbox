import { DemoList } from '@/components/demo-list'
import { PageShell } from '@/components/page-shell'

import styles from './page.module.css'

const HomePage = () => (
  <PageShell trail={[]}>
    <p className={styles.lede}>
      Ridiculous things built ridiculously well.
      <br />A low-ego showcase by{' '}
      <a href="https://neonanomaly.io" target="_blank" rel="noreferrer">
        Sam O&rsquo;Leary
      </a>
      .
    </p>

    <DemoList />
  </PageShell>
)

export default HomePage
