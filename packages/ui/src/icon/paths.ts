// Path data only. Every icon shares one viewBox and one stroke treatment, so
// the drawing attributes live on the element rather than on each path.
export const iconPaths = {
  info: [
    'M8 22L16 22',
    'M18.01 20L18 20',
    'M6.01001 20L6.00001 20',
    'M20.01 18L20 18',
    'M4.01001 18L4.00001 18',
    'M12 16L12 12H10',
    'M22 8L22 16',
    'M12 8.01V8',
    'M2 8L2 16',
    'M20.01 6L20 6',
    'M4 6L4 6.01',
    'M18.01 4L18 4',
    'M6 4L6 4.01',
    'M8 2L16 2',
  ],
  chevron: [
    'M12 16.99L12 17',
    'M10 14.99L10 15',
    'M14 14.99L14 15',
    'M16 12.99L16 13',
    'M8 12.99L8 13',
    'M6 10.99L6 11',
    'M18 10.99L18 11',
    'M20 8.98999L20 8.99999',
    'M4 8.98999L4 8.99999',
  ],
} as const satisfies Record<string, readonly string[]>

export type IconName = keyof typeof iconPaths
