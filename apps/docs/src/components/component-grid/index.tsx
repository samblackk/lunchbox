import Link from 'next/link'

import { componentEntries } from '@/content/components'

import styles from './style.module.css'

export const ComponentGrid = () => {
  if (componentEntries.length === 0) {
    return (
      <p className={styles.empty}>
        No components yet. The first one shows up here.
      </p>
    )
  }

  return (
    <ul className={styles.grid}>
      {componentEntries.map((entry) => (
        <li key={entry.slug}>
          <Link className={styles.tile} href={`/components/${entry.slug}`}>
            <span className={styles.name}>{entry.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
