import type { ReactNode } from 'react'

import { AboutPanel } from '@/components/about/panel'
import { Breadcrumb } from '@/components/breadcrumb'

import styles from './style.module.css'

export const PageShell = ({
  trail,
  action,
  children,
}: {
  trail: readonly string[]
  // Sits opposite the breadcrumb. A page puts whatever one thing it offers
  // from up here, which is nothing on most of them.
  action?: ReactNode
  children: ReactNode
}) => (
  <div className={styles.page}>
    <div className={styles.sheet}>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerRow}`}>
          <Breadcrumb trail={trail} />
          {action === undefined ? null : (
            <div className={styles.action}>{action}</div>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>

      <p className={`${styles.container} ${styles.more}`}>
        <span aria-hidden="true">&#x2B07;</span> but wait, there&rsquo;s more!
      </p>
    </div>

    <footer className={styles.footer}>
      <div className={styles.container}>
        <AboutPanel />
      </div>
    </footer>
  </div>
)
