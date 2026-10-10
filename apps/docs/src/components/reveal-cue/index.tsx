'use client'

import styles from './style.module.css'

const reveal = () => {
  const gentle = !window.matchMedia?.('(prefers-reduced-motion: reduce)')
    .matches

  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: gentle ? 'smooth' : 'auto',
  })
}

export const RevealCue = () => (
  <button type="button" className={styles.cue} onClick={reveal}>
    <span aria-hidden="true">&#x2B07;</span> but wait, there&rsquo;s more!
  </button>
)
