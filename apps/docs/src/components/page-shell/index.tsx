import type { ReactNode } from 'react'

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

    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav aria-label="Elsewhere">
          <a href="https://neonanomaly.io" target="_blank" rel="noreferrer">
            who is sam o&rsquo;leary?
          </a>
        </nav>
      </div>
    </footer>
  </div>
)
