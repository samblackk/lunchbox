import { Icon, Tooltip } from '@neonanomaly/lunchbox'

import { type KeyHint, themeHint } from '@/lib/keyboard/hints'

import styles from './style.module.css'

const asSentence = (hints: readonly KeyHint[]) =>
  hints.map((hint) => `${hint.keys.join(' or ')}: ${hint.does}`).join(', ')

const Row = ({ hint, shared }: { hint: KeyHint; shared: boolean }) => (
  <li className={shared ? styles.shared : undefined}>
    <span className={styles.keys}>
      {hint.keys.map((key) => (
        <kbd key={key} className={styles.key}>
          {key}
        </kbd>
      ))}
    </span>
    {hint.does}
  </li>
)

export const KeyHints = ({ hints = [] }: { hints?: readonly KeyHint[] }) => {
  const shared = [themeHint]

  return (
    <span className={styles.hints}>
      <Tooltip
        side="top"
        label={`Keyboard: ${asSentence([...hints, ...shared])}`}
        content={
          <ul className={styles.list}>
            {hints.map((hint) => (
              <Row key={hint.does} hint={hint} shared={false} />
            ))}

            {shared.map((hint, index) => (
              <Row key={hint.does} hint={hint} shared={index === 0} />
            ))}
          </ul>
        }
      >
        <Icon name="keyboard" size="1.1rem" />
      </Tooltip>
    </span>
  )
}
