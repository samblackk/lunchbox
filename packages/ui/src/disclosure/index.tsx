import type { ReactNode } from 'react'

import * as styles from './style.css'

export type DisclosureProps = {
  readonly label: ReactNode
  readonly children: ReactNode
  // Lands on the details element, so a caller can place the whole reveal
  // without reaching inside it.
  readonly className?: string | undefined
}

// A native disclosure: no state, no client boundary, and the keyboard and
// screen reader behavior comes for free.
export const Disclosure = ({ label, children, className }: DisclosureProps) => (
  <details className={className}>
    <summary className={styles.trigger}>{label}</summary>

    {children}
  </details>
)
