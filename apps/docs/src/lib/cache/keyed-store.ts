type KeyedStore<Value> = {
  readonly get: (key: string) => Value | undefined
  readonly set: (key: string, value: Value) => void
}

// Insertion-ordered by Map, so the first key is always the oldest. Bounded
// because the keys come from user input and an unbounded one is a slow leak.
export const createKeyedStore = <Value>({
  limit,
}: {
  limit: number
}): KeyedStore<Value> => {
  const entries = new Map<string, Value>()

  return {
    get: (key) => entries.get(key),

    set: (key, value) => {
      entries.delete(key)

      const oldest = entries.keys().next()
      if (entries.size >= limit && !oldest.done) entries.delete(oldest.value)

      entries.set(key, value)
    },
  }
}
