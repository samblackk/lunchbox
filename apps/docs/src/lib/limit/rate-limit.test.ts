import { describe, expect, it } from 'vitest'

import { createRateLimit } from './rate-limit'

describe('createRateLimit', () => {
  it('lets a caller through up to the limit', () => {
    const limiter = createRateLimit({ limit: 2, windowMs: 1000 })
    expect(limiter.take('a', 0).waitMs).toBe(0)
    expect(limiter.take('a', 1).waitMs).toBe(0)
  })

  it('stops the call past the limit', () => {
    const limiter = createRateLimit({ limit: 2, windowMs: 1000 })
    limiter.take('a', 0)
    limiter.take('a', 0)
    expect(limiter.take('a', 0).waitMs).toBe(1000)
  })

  it('lets the caller back in once the window passes', () => {
    const limiter = createRateLimit({ limit: 1, windowMs: 1000 })
    limiter.take('a', 0)
    expect(limiter.take('a', 1000).waitMs).toBe(0)
  })

  it('counts each caller on its own', () => {
    const limiter = createRateLimit({ limit: 1, windowMs: 1000 })
    limiter.take('a', 0)
    expect(limiter.take('b', 0).waitMs).toBe(0)
  })

  it('does not spend a slot on a call it refused', () => {
    const limiter = createRateLimit({ limit: 1, windowMs: 1000 })
    limiter.take('a', 0)
    limiter.take('a', 500)
    expect(limiter.take('a', 1000).waitMs).toBe(0)
  })
})
