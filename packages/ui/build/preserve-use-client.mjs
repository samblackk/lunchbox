import { clientDirective, hasUseClientDirective } from './use-client.mjs'

// Rollup drops module-level directives while parsing, which would silently turn
// every client component in this library into a server component.
export const preserveUseClient = () => {
  const clientModules = new Set()

  return {
    name: 'preserve-use-client',

    transform(code, id) {
      if (hasUseClientDirective(code)) clientModules.add(id)
      return null
    },

    banner(chunk) {
      const isClientChunk = chunk.moduleIds.some((id) => clientModules.has(id))
      return isClientChunk ? clientDirective : ''
    },
  }
}
