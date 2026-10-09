import { type IconName, type IconPath, iconPaths } from './paths'
import * as styles from './style.css'

export type { IconName }

export type IconProps = {
  readonly name: IconName
  // Inline rather than a class, so a caller's size always beats the default
  // without depending on which stylesheet the bundler emitted first.
  readonly size?: string
  readonly className?: string | undefined
  // Turns the icon. Named for the behavior rather than for the spinner, so a
  // caller can spin whatever reads best as busy.
  readonly spin?: boolean
}

// A bare string is the common case, so the data stays terse and the one icon
// that needs per-path opacity does not reshape the other two.
const shape = (path: IconPath): { d: string; opacity?: number } =>
  typeof path === 'string' ? { d: path } : path

// Decorative by default. Whatever the icon sits in carries the text, so the
// icon stays out of the accessibility tree.
export const Icon = ({
  name,
  size = '0.65em',
  className,
  spin = false,
}: IconProps) => (
  <svg
    className={[styles.icon, spin ? styles.spinning : '', className ?? '']
      .filter(Boolean)
      .join(' ')}
    style={{ width: size, height: size }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    aria-hidden="true"
  >
    {iconPaths[name].map(shape).map(({ d, opacity }) => (
      <path key={d} d={d} opacity={opacity} />
    ))}
  </svg>
)
