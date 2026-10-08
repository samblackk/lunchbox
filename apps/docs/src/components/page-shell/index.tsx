import Link from 'next/link'
import type { ReactNode } from 'react'

import { Breadcrumb } from '@/components/breadcrumb'
import { sectionLinks } from '@/content/sections'

import styles from './style.module.css'

export const PageShell = ({
  trail,
  children,
}: {
  trail: readonly string[]
  children: ReactNode
}) => (
  <div className={styles.page}>
    <header className={styles.header}>
      <div className={styles.container}>
        <Breadcrumb trail={trail} />
      </div>
    </header>

    <main className={styles.main}>
      <div className={styles.container}>{children}</div>
    </main>

    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <nav className={styles.nav} aria-label="Reference">
            {sectionLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <p className={styles.prose}>
            <a href="https://neonanomaly.io">sam built this.</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
)
