import * as styles from './style.css'

export type CodeBlockProps = {
  readonly children: string
  // Names the scroll region. An unnamed landmark is worse than none.
  readonly label: string
}

// Focusable on purpose: a plain overflow container cannot be scrolled by
// keyboard, which makes a long payload unreadable without a pointer.
export const CodeBlock = ({ children, label }: CodeBlockProps) => (
  <pre className={styles.code} tabIndex={0} role="region" aria-label={label}>
    {children}
  </pre>
)
