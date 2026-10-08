import { describe, expect, it, vi } from 'vitest'

import { postJson } from './post-json'

const parseEcho = (value: unknown) =>
  typeof value === 'object' && value !== null && 'ok' in value
    ? (value as { ok: string })
    : null

const jsonResponse = (
  status: number,
  body: unknown,
  headers: HeadersInit = {},
) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  })

const callWith = (fetchImpl: typeof fetch, overrides = {}) =>
  postJson({
    url: 'https://example.test/v1',
    body: { a: 1 },
    parse: parseEcho,
    fetchImpl,
    sleep: () => Promise.resolve(),
    ...overrides,
  })

describe('postJson', () => {
  it('returns the parsed body on a 200', async () => {
    const result = await callWith(() =>
      Promise.resolve(jsonResponse(200, { ok: 'yes' })),
    )
    expect(result).toEqual({ ok: true, data: { ok: 'yes' } })
  })

  it('reports unauthorized on a 401 without retrying', async () => {
    const fetchImpl = vi.fn(() => Promise.resolve(jsonResponse(401, {})))
    await callWith(fetchImpl)
    expect(fetchImpl).toHaveBeenCalledTimes(1)
  })

  it('names a 401 as unauthorized', async () => {
    const result = await callWith(() => Promise.resolve(jsonResponse(401, {})))
    expect(result).toMatchObject({ ok: false, reason: 'unauthorized' })
  })

  it('names a 422 as invalid-request', async () => {
    const result = await callWith(() => Promise.resolve(jsonResponse(422, {})))
    expect(result).toMatchObject({ ok: false, reason: 'invalid-request' })
  })

  it('retries a 429 and succeeds on the second attempt', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(429, {}))
      .mockResolvedValueOnce(jsonResponse(200, { ok: 'later' }))
    const result = await callWith(fetchImpl)
    expect(result).toEqual({ ok: true, data: { ok: 'later' } })
  })

  it('retries a 529 up to the attempt limit', async () => {
    const fetchImpl = vi.fn(() => Promise.resolve(jsonResponse(529, {})))
    await callWith(fetchImpl, { attempts: 3 })
    expect(fetchImpl).toHaveBeenCalledTimes(3)
  })

  it('waits the Retry-After interval when the server sets one', async () => {
    const sleep = vi.fn(() => Promise.resolve())
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(429, {}, { 'retry-after': '2' }))
      .mockResolvedValueOnce(jsonResponse(200, { ok: 'yes' }))
    await callWith(fetchImpl, { sleep })
    expect(sleep).toHaveBeenCalledWith(2000)
  })

  it('reports bad-response when the payload fails its parse', async () => {
    const result = await callWith(() =>
      Promise.resolve(jsonResponse(200, { unexpected: true })),
    )
    expect(result).toMatchObject({ ok: false, reason: 'bad-response' })
  })

  it('reports network when fetch itself rejects', async () => {
    const result = await callWith(() => Promise.reject(new Error('down')))
    expect(result).toMatchObject({ ok: false, reason: 'network' })
  })

  it('reports timeout when the request aborts', async () => {
    const result = await callWith(() =>
      Promise.reject(new DOMException('aborted', 'TimeoutError')),
    )
    expect(result).toMatchObject({ ok: false, reason: 'timeout' })
  })
})
