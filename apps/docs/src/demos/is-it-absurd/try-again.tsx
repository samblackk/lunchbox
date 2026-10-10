import { demoPath } from './path'
import styles from './style.module.css'

// A plain anchor, not next/link: the router would navigate on the client and
// the cross-document view transition would never fire, so the way back would
// cut while the way in tweens.
export const TryAgain = () => (
  <a className={styles.againButton} href={demoPath}>
    try again
  </a>
)
