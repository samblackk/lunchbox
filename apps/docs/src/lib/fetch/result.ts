export type FailureReason =
  | 'timeout'
  | 'network'
  | 'unauthorized'
  | 'invalid-request'
  | 'rate-limited'
  | 'overloaded'
  | 'server-error'
  | 'bad-response'

type Success<Value> = {
  readonly ok: true
  readonly data: Value
}

export type Failure = {
  readonly ok: false
  readonly reason: FailureReason
  readonly status: number
}

export type Result<Value> = Success<Value> | Failure

export const succeed = <Value>(data: Value): Success<Value> => ({
  ok: true,
  data,
})

// Deliberately not generic. A failure carries no value, so one Failure is
// assignable to every Result and callers never annotate a type they discard.
export const fail = (reason: FailureReason, status = 0): Failure => ({
  ok: false,
  reason,
  status,
})
