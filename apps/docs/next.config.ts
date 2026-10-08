import type { NextConfig } from 'next'

const config: NextConfig = {
  typedRoutes: true,
  // Keeps next dev from writing agent instruction files into the repo.
  agentRules: false,
  experimental: {
    agentFeedback: false,
  },
}

export default config
