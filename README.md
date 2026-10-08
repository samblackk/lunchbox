# Lunchbox

Component library for Neon Anomaly. Base UI primitives, vanilla-extract for
styling, built for React Server Components.

## Layout

| Path          | What it is                                           |
| ------------- | ---------------------------------------------------- |
| `packages/ui` | The library, published as `@neonanomaly/lunchbox`    |
| `apps/docs`   | Next.js site for local development and documentation |
| `design.md`   | Token contract and the reasoning behind it           |

## Getting started

```sh
pnpm install
pnpm dev
```

`pnpm dev` builds the library once, then watches it while serving the docs site
on http://localhost:3000.

## Scripts

| Script           | What it does                                |
| ---------------- | ------------------------------------------- |
| `pnpm dev`       | Watch the library, serve the docs site      |
| `pnpm build`     | Build the library, then the docs site       |
| `pnpm test`      | Run unit tests                              |
| `pnpm typecheck` | Typecheck every workspace                   |
| `pnpm lint`      | ESLint, including the `react-hooks` rules   |
| `pnpm verify`    | Lint, typecheck, test and build in one pass |

## Tokens

`design.md` holds the token contract in its frontmatter. The library turns it
into CSS custom properties with readable names, so a consumer can override
`--na-colors-page` without touching JavaScript:

```tsx
import { vars } from '@neonanomaly/lunchbox/tokens'

const style = { color: vars.colors.textPrimary }
```

Reference the semantic name, never a raw value. Adding a value means adding it
to `design.md` first, with a changelog line saying why.

## Server and client boundaries

Components are server components unless they need interactivity. `'use client'`
sits on the smallest leaf that needs it, and the build preserves the directive
per module so a client boundary survives bundling. Every component carries its
states: resting, hover, focus, active, disabled, loading, error, and empty
where emptiness is possible.

## License

MIT. See [LICENSE](LICENSE).
