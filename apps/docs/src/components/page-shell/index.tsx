import type { ReactNode } from 'react'

import type { KeyHint } from '@/lib/keyboard/hints'

import { AboutPanel } from '@/components/about/panel'
import { Breadcrumb } from '@/components/breadcrumb'
import { KeyHints } from '@/components/key-hints'
import { WashLens } from '@/components/wash-lens'

import styles from './style.module.css'

export const PageShell = ({
  trail,
  keys,
  children,
}: {
  trail: readonly string[]
  // What the keyboard does on this page. The shell adds the one key every
  // page shares, so a page lists only its own.
  keys?: readonly KeyHint[]
  children: ReactNode
}) => (
  <div className={styles.page}>
    <div className={`${styles.sheet} ${styles.blooms}`}>
      <WashLens />

      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerRow}`}>
          <Breadcrumb trail={trail} />
          <KeyHints {...(keys ? { hints: keys } : {})} />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>

      <p className={`${styles.container} ${styles.more}`}>
        <span aria-hidden="true">&#x2B07;</span> but wait, there&rsquo;s more!
      </p>
    </div>

    <footer className={`${styles.footer} ${styles.blooms}`}>
      <div className={styles.container}>
        <AboutPanel />
      </div>
    </footer>
  </div>
)
