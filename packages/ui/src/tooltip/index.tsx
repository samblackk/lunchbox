'use client'

import { Tooltip as BaseTooltip } from '@base-ui-components/react/tooltip'
import {
  type PointerEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import * as styles from './style.css'

// Base UI waits 600ms by default, which reads as a tip you have to earn. The
// tip rides the pointer, so it is already where the eye is: waiting to show
// it only makes the page feel slow.
const openDelay = 0

export type TooltipProps = {
  // Names the trigger as well as filling the tip, so the text is reachable
  // without a pointer. An icon-only trigger would otherwise be unannounced.
  readonly label: string
  readonly children: ReactNode
  // What the tip shows, when words alone will not do it. The label still
  // carries the meaning for anyone not looking at the screen.
  readonly content?: ReactNode
  readonly side?: 'top' | 'right' | 'bottom' | 'left'
  // Fills its container and stacks, for a trigger that wraps a block of
  // content rather than sitting inline beside it.
  readonly block?: boolean
}

// Every tip rides the pointer. No arrow, then: one pointing at the cursor it
// already sits under says nothing, and it fights the movement.
export const Tooltip = ({
  label,
  children,
  content,
  side = 'top',
  block = false,
}: TooltipProps) => {
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)
  const frame = useRef(0)

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  // Base UI's trackCursorAxis only starts listening once the tip is open, so
  // its first frame has no cursor and lands on the trigger. Reading the
  // pointer's own moves means the anchor is right before it opens.
  const track = ({ clientX, clientY }: PointerEvent) => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() =>
      setCursor({ x: clientX, y: clientY }),
    )
  }

  // Null until the pointer has been somewhere, which is Base UI's way of
  // saying "anchor to the trigger" and the right answer for a keyboard.
  const anchor = useMemo(() => {
    if (cursor === null) return null
    const { x, y } = cursor
    return { getBoundingClientRect: () => new DOMRect(x, y, 0, 0) }
  }, [cursor])

  return (
    // Controlled so a tap can open it. Base UI still drives hover and focus
    // through onOpenChange; a touch has neither, and dismissing on an outside
    // press is already handled.
    <BaseTooltip.Root
      open={open}
      // Base UI reads a press on the trigger as a close, which cancels the
      // very tap meant to open it. Everything else still drives the state.
      onOpenChange={(next, details) => {
        if (!next && details.reason === 'trigger-press') return
        setOpen(next)
      }}
      disableHoverablePopup
    >
      <BaseTooltip.Trigger
        type="button"
        delay={openDelay}
        className={block ? `${styles.trigger} ${styles.block}` : styles.trigger}
        aria-label={label}
        onPointerMove={track}
        onClick={() => setOpen(true)}
      >
        {children}
      </BaseTooltip.Trigger>

      <BaseTooltip.Portal>
        <BaseTooltip.Positioner anchor={anchor} side={side} sideOffset={8}>
          <BaseTooltip.Popup className={styles.popup}>
            {content ?? label}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  )
}
