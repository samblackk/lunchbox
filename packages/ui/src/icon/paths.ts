// Path data only: every icon shares one viewBox and stroke treatment, so the
// drawing attributes live on the element. The object form is for an icon that
// fades its own strokes, which is how the spinner reads as turning.
export type IconPath = string | { readonly d: string; readonly opacity: number }
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
  spinner: [
    { d: 'M12 19V22', opacity: 0.5 },
    { d: 'M19.01 19L19 19', opacity: 0.63 },
    { d: 'M5.01001 19L5.00001 19', opacity: 0.38 },
    { d: 'M17.01 17L17 17', opacity: 0.63 },
    { d: 'M7.01001 17L7.00001 17', opacity: 0.38 },
    { d: 'M22.005 11.995L19.005 11.995', opacity: 0.75 },
    { d: 'M5.005 11.995L2.005 11.995', opacity: 0.25 },
    { d: 'M17.01 7L17 7', opacity: 0.88 },
    { d: 'M7.01001 7L7.00001 7', opacity: 0.13 },
    { d: 'M19.01 5L19 5', opacity: 0.88 },
    { d: 'M5.01001 5L5.00001 5', opacity: 0.13 },
    { d: 'M12 2V5', opacity: 1 },
  ],
  sparkles: [
    'M17 7V7.01',
    'M13 7V7.01',
    'M13 11V11.01',
    'M17 11V11.01',
    'M15 13V17',
    'M15 1V5',
    'M11.005 8.995L9.005 8.995',
    'M21.005 8.995L19.005 8.995',
    'M9.01001 17L9.00001 17',
    'M3.01001 6L3.00001 6',
    'M5.01001 17L5.00001 17',
    'M7 13L7 15',
    'M7 19L7 21',
  ],
} as const satisfies Record<string, readonly IconPath[]>

export type IconName = keyof typeof iconPaths
