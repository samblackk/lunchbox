import { vars } from '@neonanomaly/lunchbox/tokens'

const HomePage = () => (
  <main
    style={{
      background: vars.colors.page,
      color: vars.colors.textPrimary,
      fontFamily: vars.typography.familyBody,
    }}
  >
    <h1>Hello world</h1>
  </main>
)

export default HomePage
