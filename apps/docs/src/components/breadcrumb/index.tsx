import Link from 'next/link'

import styles from './style.module.css'

// Each page passes its own trail, which keeps this a server component. Reading
// the current route instead would need a client hook for no benefit.
export const Breadcrumb = ({ trail }: { trail: readonly string[] }) => (
  <nav aria-label="Breadcrumb">
    <ol className={styles.list}>
      <li className={styles.item}>
        <Link href="/" className={styles.link}>
          lunchbox.
        </Link>
      </li>
      {trail.map((label, index) => (
        <li key={label} className={styles.item}>
          <span className={styles.separator} aria-hidden="true">
            /
          </span>
          <span
            className={styles.current}
            {...(index === trail.length - 1 ? { 'aria-current': 'page' } : {})}
          >
            {label}
          </span>
        </li>
      ))}
    </ol>
  </nav>
)
