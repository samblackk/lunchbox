// Same digit count as the answer, so the line never reflows mid-scramble.
export const noiseDigits = (value: string): string =>
  String(Math.floor(Math.random() * 10 ** value.length)).padStart(
    value.length,
    '0',
  )

const glyphs = 'abcdefghijklmnopqrstuvwxyz'

// Only letters move. Spaces and punctuation hold their places, so the word
// shape stays recognizable while the letters inside it churn.
export const noiseLetters = (value: string): string =>
  Array.from(value, (character) =>
    /[a-z]/i.test(character)
      ? (glyphs[Math.floor(Math.random() * glyphs.length)] ?? character)
      : character,
  ).join('')
