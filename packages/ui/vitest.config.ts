import { defineConfig } from 'vitest/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}', 'build/**/*.test.mjs'],
  },
})
