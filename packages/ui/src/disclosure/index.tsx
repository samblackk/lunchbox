import type { ReactNode } from 'react'

import * as styles from './style.css'

export type DisclosureProps = {
  readonly label: ReactNode
  readonly children: ReactNode
  // Lands on the details element, so a caller can place the whole reveal
  // without reaching inside it.
  readonly className?: string | undefined
  // Starts expanded, for content worth showing to a reader who would have
  // opened it anyway.
  readonly open?: boolean
}

// A native disclosure: no state, no client boundary, and the keyboard and
// screen reader behavior comes for free.
export const Disclosure = ({
  label,
  children,
  className,
  open = false,
}: DisclosureProps) => (
  <details className={className} open={open}>
    <summary className={styles.trigger}>{label}</summary>

    {children}
  </details>
)
