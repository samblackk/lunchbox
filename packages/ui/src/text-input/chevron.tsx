import * as styles from './style.css'

// Points down when the reveal is shut and flips when it opens, which the
// stylesheet handles off the parent's open attribute.
export const Chevron = () => (
  <svg
    className={styles.chevron}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    aria-hidden="true"
  >
    <path d="M12 16.99L12 17" />
    <path d="M10 14.99L10 15" />
    <path d="M14 14.99L14 15" />
    <path d="M16 12.99L16 13" />
    <path d="M8 12.99L8 13" />
    <path d="M6 10.99L6 11" />
    <path d="M18 10.99L18 11" />
    <path d="M20 8.98999L20 8.99999" />
    <path d="M4 8.98999L4 8.99999" />
  </svg>
)
