import { Icon } from '@neonanomaly/lunchbox'

import { demoPath } from './path'
import styles from './style.module.css'

// A plain anchor, not next/link: the router would navigate on the client and
// the cross-document view transition would never fire, so the way back would
// cut while the way in tweens.
export const TryAgain = ({ big = false }: { big?: boolean }) => (
  <a className={big ? styles.againButton : styles.tryAgain} href={demoPath}>
    {big ? null : <Icon name="sparkles" size="0.9rem" />}
    try again
  </a>
)
