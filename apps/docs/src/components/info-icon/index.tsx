import styles from './style.module.css'

// Decorative by default. Whatever names the control it sits in carries the
// text, so the icon stays out of the accessibility tree.
export const InfoIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    aria-hidden="true"
  >
    <path d="M8 22L16 22" />
    <path d="M18.01 20L18 20" />
    <path d="M6.01001 20L6.00001 20" />
    <path d="M20.01 18L20 18" />
    <path d="M4.01001 18L4.00001 18" />
    <path d="M12 16L12 12H10" />
    <path d="M22 8L22 16" />
    <path d="M12 8.01V8" />
    <path d="M2 8L2 16" />
    <path d="M20.01 6L20 6" />
    <path d="M4 6L4 6.01" />
    <path d="M18.01 4L18 4" />
    <path d="M6 4L6 4.01" />
    <path d="M8 2L16 2" />
  </svg>
)
