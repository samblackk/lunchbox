export const tokens = {
  colors: {
    page: '#ffffff',
    surface1: 'rgba(141, 210, 206, 0.15)',
    textPrimary: '#000000',
    textSecondary: '#000000',
    textMuted: '#60656c',
    border: 'rgba(141, 210, 206, 0.25)',
    borderStrong: 'rgba(0, 0, 0, 0.46)',
    grid: 'rgba(0, 0, 0, 0.08)',
    axis: 'rgba(0, 0, 0, 0.25)',
    accent: '#000000',
    accentInk: '#ffffff',
    success: '#006300',
  },
  washes: {
    ice: '#eaf9ff',
    peach: '#ffe6d7',
    blush: '#fdf1f8',
    mint: '#ebffee',
    lemon: '#f7fbe8',
    sweep: 'linear-gradient(100deg, #8fd7f5 0%, #f9b8dd 52%, #ffc49a 100%)',
  },
  // The footer is the inverted panel, so its blooms are the other set. The
  // two trade places with the theme.
  inkWashes: {
    ice: 'rgba(74, 163, 200, 0.10)',
    peach: 'rgba(217, 138, 74, 0.10)',
    blush: 'rgba(192, 106, 154, 0.10)',
    mint: 'rgba(95, 191, 122, 0.10)',
    lemon: 'rgba(201, 196, 90, 0.10)',
    sweep:
      'linear-gradient(100deg, rgba(74, 163, 200, 0.22) 0%, rgba(192, 106, 154, 0.22) 52%, rgba(217, 138, 74, 0.22) 100%)',
  },
  onInk: {
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.92)',
    textMuted: 'rgba(255, 255, 255, 0.72)',
    border: 'rgba(255, 255, 255, 0.35)',
    surface1: 'rgba(255, 255, 255, 0.12)',
    accent: '#ffffff',
    accentInk: '#000000',
  },
  charts: {
    series1: '#2a78d6',
    series2: '#eb6834',
    series3: '#1baf7a',
    series4: '#eda100',
    series5: '#e87ba4',
    series6: '#008300',
    series7: '#4a3aa7',
    divergePos: '#2a78d6',
    divergeNeg: '#e34948',
    divergeMid: '#f0efec',
    seqEmpty: '#f0efec',
    seq100: '#cde2fb',
    seq250: '#86b6ef',
    seq350: '#5598e7',
    seq450: '#2a78d6',
    seq600: '#184f95',
  },
  typography: {
    rootSize: '17px',
    sizeFine: '11px',
    familyBody: 'Inter, system-ui, -apple-system, Segoe UI, sans-serif',
    familyDisplay: 'Darker Grotesque, Inter, sans-serif',
    familyMono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    body: { fontWeight: '400', lineHeight: '1.55', letterSpacing: '0' },
    strong: { fontWeight: '700' },
    display: { fontWeight: '900', lineHeight: '0.82' },
  },
  rounded: {
    default: '16px',
    pill: '99rem',
  },
  strokes: {
    hairline: '1px',
    focus: '2px',
    focusOffset: '2px',
  },
  layout: {
    measure: '768px',
    breakpoint: '640px',
    edge: '50px',
    edgeTight: '24px',
  },
  motion: {
    duration: { default: '200ms', slow: '400ms', loop: '900ms' },
    easing: { default: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  },
} as const

export const darkColors = {
  page: '#0b0b0b',
  surface1: 'rgba(141, 210, 206, 0.12)',
  textPrimary: '#ffffff',
  textSecondary: '#ffffff',
  textMuted: '#8c8c8c',
  border: 'rgba(255, 255, 255, 0.18)',
  borderStrong: 'rgba(255, 255, 255, 0.37)',
  grid: 'rgba(255, 255, 255, 0.10)',
  axis: 'rgba(255, 255, 255, 0.28)',
  accent: '#ffffff',
  accentInk: '#0b0b0b',
  success: '#4cc96a',
} as const

export const darkWashes = {
  ice: 'rgba(74, 163, 200, 0.10)',
  peach: 'rgba(217, 138, 74, 0.10)',
  blush: 'rgba(192, 106, 154, 0.10)',
  mint: 'rgba(95, 191, 122, 0.10)',
  lemon: 'rgba(201, 196, 90, 0.10)',
  sweep:
    'linear-gradient(100deg, rgba(74, 163, 200, 0.22) 0%, rgba(192, 106, 154, 0.22) 52%, rgba(217, 138, 74, 0.22) 100%)',
} as const

// On a dark page the panel that reads as inverted is white.
export const darkOnInk = {
  textPrimary: '#000000',
  textSecondary: 'rgba(0, 0, 0, 0.92)',
  textMuted: 'rgba(0, 0, 0, 0.55)',
  border: 'rgba(0, 0, 0, 0.35)',
  surface1: 'rgba(0, 0, 0, 0.12)',
  accent: '#000000',
  accentInk: '#ffffff',
} as const
