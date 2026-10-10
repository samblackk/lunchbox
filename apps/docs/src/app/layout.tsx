import { vars } from '@neonanomaly/lunchbox/tokens'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Analytics } from '@/components/analytics'
import { ThemeKeys } from '@/components/theme-keys'
import { themeScript } from '@/lib/theme/script'

import './globals.css'

export const metadata: Metadata = {
  title: "lunchbox. / sam o'leary",
  description: 'Low ego showcase; the 2am musings of a 24/7 creative.',
}

// Setting the root size from the token is also what pulls the library's token
// stylesheet into the page, which every stylesheet here reads through var().
const RootLayout = ({ children }: { children: ReactNode }) => (
  // The script below sets data-theme before React hydrates, so this element
  // is meant to differ from the server HTML.
  <html
    lang="en"
    style={{ fontSize: vars.typography.rootSize }}
    suppressHydrationWarning
  >
    <head>
      {/* Before the first paint, so a stored choice never flashes. */}
      {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
    </head>
    {/* Extensions like Grammarly add attributes to body before React
        hydrates. Shallow, so a real mismatch inside the tree still reports. */}
    <body suppressHydrationWarning>
      {children}
      <Analytics />
      <ThemeKeys />
    </body>
  </html>
)

export default RootLayout
