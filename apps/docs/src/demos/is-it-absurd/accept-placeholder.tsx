'use client'

import { useEffect } from 'react'

// Tab is how a keyboard leaves a field, so this only takes it while there is
// nothing to leave behind: once the suggestion is in, the next Tab moves on
// as it always would, and shift and tab is never touched.
export const AcceptPlaceholder = ({ field }: { field: string }) => {
  useEffect(() => {
    const input = document.querySelector<HTMLInputElement>(
      `input[name="${field}"]`,
    )
    if (!input) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || event.shiftKey) return
      if (input.value !== '' || input.placeholder === '') return

      event.preventDefault()
      input.value = input.placeholder
    }

    input.addEventListener('keydown', onKeyDown)
    return () => input.removeEventListener('keydown', onKeyDown)
  }, [field])

  return null
}
