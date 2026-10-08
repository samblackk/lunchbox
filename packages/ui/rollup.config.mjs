import { readFileSync } from 'node:fs'

import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin'

import { preserveUseClient } from './build/preserve-use-client.mjs'

// vanilla-extract evaluates .css.ts through `eval`, which copies every global
// into its sandbox. Reading Node's experimental localStorage getter warns, and
// a stylesheet has no use for it.
delete globalThis.localStorage

const manifest = JSON.parse(readFileSync('./package.json', 'utf8'))
const runtimeDependencies = [
  ...Object.keys(manifest.dependencies ?? {}),
  ...Object.keys(manifest.peerDependencies ?? {}),
]

// Anything not declared as a runtime dependency is ours to compile, including
// the virtual CSS modules vanilla-extract emits.
const isRuntimeDependency = (id) =>
  runtimeDependencies.some((name) => id === name || id.startsWith(`${name}/`))

export default {
  input: ['src/index.ts', 'src/tokens/index.ts'],
  external: isRuntimeDependency,
  output: {
    dir: 'dist',
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: true,
  },
  onwarn(warning, warn) {
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
    warn(warning)
  },
  plugins: [
    vanillaExtractPlugin(),
    nodeResolve({ extensions: ['.ts', '.tsx', '.mjs', '.js'] }),
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: true,
      declarationMap: true,
      declarationDir: 'dist',
      outDir: 'dist',
      rootDir: 'src',
    }),
    preserveUseClient(),
  ],
}
