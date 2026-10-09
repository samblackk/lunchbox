import { ScrambleText, Tooltip } from '@neonanomaly/lunchbox'
import Link from 'next/link'

import { demoEntries } from '@/content/demos'

import styles from './style.module.css'

// The tip describes the row rather than naming it: the name is the link text
// and should stay the thing a screen reader reads.
export const DemoList = () => (
  <ul className={styles.list}>
    {demoEntries.map((entry, index) => (
      <li key={entry.name} className={styles.row}>
        <span className={styles.count} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}.
        </span>

        <Tooltip
          describes
          side="right"
          label={entry.blurb}
          {...(entry.href === undefined
            ? {}
            : { render: <Link href={entry.href} /> })}
        >
          <span
            className={
              entry.href === undefined
                ? `${styles.name} ${styles.planned}`
                : styles.name
            }
          >
            <ScrambleText value={entry.name} />
          </span>
        </Tooltip>
      </li>
    ))}
  </ul>
)
