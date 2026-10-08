'use client'

import { Tooltip as BaseTooltip } from '@base-ui-components/react/tooltip'
import type { ReactNode } from 'react'

import * as styles from './style.css'

// Base UI waits 600ms by default, which reads as a tip you have to earn.
const openDelay = 100

export type TooltipProps = {
  // Names the trigger as well as filling the tip, so the text is reachable
  // without a pointer. An icon-only trigger would otherwise be unannounced.
  readonly label: string
  readonly children: ReactNode
  readonly side?: 'top' | 'right' | 'bottom' | 'left'
}

export const Tooltip = ({ label, children, side = 'top' }: TooltipProps) => (
  <BaseTooltip.Root>
    <BaseTooltip.Trigger
      type="button"
      delay={openDelay}
      className={styles.trigger}
      aria-label={label}
    >
      {children}
    </BaseTooltip.Trigger>

    <BaseTooltip.Portal>
      <BaseTooltip.Positioner side={side} sideOffset={8}>
        <BaseTooltip.Popup className={styles.popup}>
          <BaseTooltip.Arrow className={styles.arrow} />
          {label}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  </BaseTooltip.Root>
)
