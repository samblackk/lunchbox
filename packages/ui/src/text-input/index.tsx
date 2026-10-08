import type { ComponentPropsWithRef, ReactNode } from 'react'

import { Chevron } from './chevron'
import { ClearingInput } from './clearing-input'
import * as styles from './style.css'

// `prefix` is an RDFa attribute React already puts on every element, so the
// slots are named for the logical edges they sit on instead.
type InputProps = Omit<ComponentPropsWithRef<'input'>, 'prefix' | 'className'>

// Paired rather than two loose optionals, so a reveal can never ship without
// the word that opens it.
type MoreInfoProps =
  | { readonly moreInfo?: undefined; readonly moreInfoLabel?: undefined }
  | { readonly moreInfo: ReactNode; readonly moreInfoLabel: string }

export type TextInputProps = InputProps &
  MoreInfoProps & {
    readonly start?: ReactNode
    readonly end?: ReactNode
    // Lands on the shell, which is the part anyone can see. The inner input is
    // deliberately not styleable from outside, so no caller breaks the layout.
    readonly className?: string
    // Empties the field the moment it is focused, so the last answer is not
    // something to select and delete before typing the next one.
    readonly clearOnFocus?: boolean
  }

// A server component. Nothing here holds state, so a form can submit it with no
// JavaScript and an interactive slot brings its own client boundary.
export const TextInput = ({
  start,
  end,
  className,
  clearOnFocus = false,
  moreInfo,
  moreInfoLabel,
  ...inputProps
}: TextInputProps) => (
  <div className={styles.field}>
    <div className={className ? `${styles.shell} ${className}` : styles.shell}>
      {start === undefined ? null : (
        <span className={styles.startSlot}>{start}</span>
      )}

      {clearOnFocus ? (
        <ClearingInput className={styles.input} {...inputProps} />
      ) : (
        <input className={styles.input} {...inputProps} />
      )}

      {end === undefined ? null : <span className={styles.slot}>{end}</span>}
    </div>

    {/* A native disclosure: no state, no client boundary, and the keyboard
        and screen reader behavior comes for free. */}
    {moreInfo === undefined ? null : (
      <details className={styles.moreInfo}>
        <summary className={styles.moreInfoTrigger}>
          {moreInfoLabel}
          <Chevron />
        </summary>
        {moreInfo}
      </details>
    )}
  </div>
)
