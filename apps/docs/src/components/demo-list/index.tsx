import { Tooltip } from '@neonanomaly/lunchbox'
import Link from 'next/link'

import { demoEntries } from '@/content/demos'

import { ProximityShift } from './proximity-shift'
import styles from './style.module.css'

// The tip describes the row rather than naming it: the name is the link text
// and should stay the thing a screen reader reads.
export const DemoList = () => (
  <ul className={styles.list} data-demo-list>
    {demoEntries.map((entry) => (
      <li key={entry.name} data-demo>
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
            {entry.name}
          </span>
        </Tooltip>
      </li>
    ))}

    <ProximityShift />
  </ul>
)
