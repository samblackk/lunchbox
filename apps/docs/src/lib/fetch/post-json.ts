import { type Failure, type Result, fail, succeed } from './result'

const defaultTimeoutMs = 10_000
const defaultAttempts = 3
const backoffMs = [250, 500, 1000]

const retryableStatuses = new Set([429, 529])

const reasonFor = (status: number) => {
  if (status === 401) return 'unauthorized' as const
  if (status === 422) return 'invalid-request' as const
  if (status === 429) return 'rate-limited' as const
  if (status === 529) return 'overloaded' as const
  return 'server-error' as const
}

const isTimeout = (error: unknown) =>
  error instanceof DOMException && error.name === 'TimeoutError'

// Servers may answer a 429 with the number of seconds to hold off. Prefer it
// over our own backoff, since it is the only one that knows the real window.
const retryDelayMs = (response: Response, attempt: number) => {
  const header = Number(response.headers.get('retry-after'))
  if (Number.isFinite(header) && header > 0) return header * 1000
  return backoffMs[Math.min(attempt, backoffMs.length - 1)] ?? 0
}

const realSleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export type PostJsonOptions<Payload> = {
  url: string
  body: unknown
  parse: (value: unknown) => Payload | null
  headers?: Record<string, string>
  timeoutMs?: number
  attempts?: number
  fetchImpl?: typeof fetch
  sleep?: (ms: number) => Promise<void>
}

export const postJson = async <Payload>({
  url,
  body,
  parse,
  headers = {},
  timeoutMs = defaultTimeoutMs,
  attempts = defaultAttempts,
  fetchImpl = fetch,
  sleep = realSleep,
}: PostJsonOptions<Payload>): Promise<Result<Payload>> => {
  let last: Failure = fail('network')

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    let response: Response

    try {
      response = await fetchImpl(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...headers },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(timeoutMs),
      })
    } catch (error) {
      last = fail(isTimeout(error) ? 'timeout' : 'network')
      if (attempt < attempts - 1) await sleep(backoffMs[attempt] ?? 0)
      continue
    }

    if (!response.ok) {
      last = fail(reasonFor(response.status), response.status)
      if (!retryableStatuses.has(response.status)) return last
      if (attempt < attempts - 1) await sleep(retryDelayMs(response, attempt))
      continue
    }

    const payload: unknown = await response.json().catch(() => null)
    const parsed = parse(payload)
    return parsed === null
      ? fail('bad-response', response.status)
      : succeed(parsed)
  }

  return last
}
