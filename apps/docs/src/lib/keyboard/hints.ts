export type KeyHint = {
  readonly keys: readonly string[]
  readonly does: string
}

export const themeHint: KeyHint = {
  keys: ['t'],
  does: 'switch theme',
}
