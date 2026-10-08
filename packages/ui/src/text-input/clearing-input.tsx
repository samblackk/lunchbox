'use client'

import type { ComponentPropsWithRef, FocusEvent } from 'react'

// The only part of a TextInput that needs the client. Kept in its own file so
// the shell, the slots and the plain input all stay server components.
export const ClearingInput = ({
  onFocus,
  ...inputProps
}: ComponentPropsWithRef<'input'>) => {
  const clear = (event: FocusEvent<HTMLInputElement>) => {
    event.currentTarget.value = ''
    onFocus?.(event)
  }

  return <input {...inputProps} onFocus={clear} />
}
