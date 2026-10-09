const typing = new Set(['INPUT', 'TEXTAREA', 'SELECT'])
const activating = new Set(['BUTTON', 'A', 'SUMMARY'])

// A page level shortcut must not eat a keystroke the focused element wanted.
export const isTypingTarget = (tagName: string, editable: boolean): boolean =>
  editable || typing.has(tagName)

// Space activates a focused button and Enter follows a focused link. A
// shortcut on either key stands down when something can already use it.
export const isActivatingTarget = (
  tagName: string,
  editable: boolean,
): boolean => isTypingTarget(tagName, editable) || activating.has(tagName)
