import { vars } from '@neonanomaly/lunchbox/tokens'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'

export const metadata: Metadata = {
  title: "lunchbox. / sam o'leary",
  description: 'Low ego showcase; the 2am musings of a 24/7 creative.',
}

// Setting the root size from the token is also what pulls the library's token
// stylesheet into the page, which every stylesheet here reads through var().
const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" style={{ fontSize: vars.typography.rootSize }}>
    {/* Extensions like Grammarly add attributes to body before React
        hydrates. Shallow, so a real mismatch inside the tree still reports. */}
    <body suppressHydrationWarning>{children}</body>
  </html>
)

export default RootLayout
