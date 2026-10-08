import { type IconName, iconPaths } from './paths'
import * as styles from './style.css'

export type { IconName }

export type IconProps = {
  readonly name: IconName
  // Inline rather than a class, so a caller's size always beats the default
  // without depending on which stylesheet the bundler emitted first.
  readonly size?: string
  readonly className?: string | undefined
}

// Decorative by default. Whatever the icon sits in carries the text, so the
// icon stays out of the accessibility tree.
export const Icon = ({ name, size = '1em', className }: IconProps) => (
  <svg
    className={className ? `${styles.icon} ${className}` : styles.icon}
    style={{ width: size, height: size }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    aria-hidden="true"
  >
    {iconPaths[name].map((path) => (
      <path key={path} d={path} />
    ))}
  </svg>
)
