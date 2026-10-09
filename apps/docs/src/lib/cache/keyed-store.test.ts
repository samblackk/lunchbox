import { describe, expect, it } from 'vitest'

import { createKeyedStore } from './keyed-store'

describe('createKeyedStore', () => {
  it('hands back what it was given', () => {
    const store = createKeyedStore<number>({ limit: 2 })
    store.set('a', 1)
    expect(store.get('a')).toBe(1)
  })

  it('has nothing for a key it never saw', () => {
    const store = createKeyedStore<number>({ limit: 2 })
    expect(store.get('a')).toBeUndefined()
  })

  it('drops the oldest entry once it is full', () => {
    const store = createKeyedStore<number>({ limit: 2 })
    store.set('a', 1)
    store.set('b', 2)
    store.set('c', 3)
    expect(store.get('a')).toBeUndefined()
  })

  it('keeps the newest entry when it evicts', () => {
    const store = createKeyedStore<number>({ limit: 2 })
    store.set('a', 1)
    store.set('b', 2)
    store.set('c', 3)
    expect(store.get('c')).toBe(3)
  })

  it('refreshes an existing key rather than evicting for it', () => {
    const store = createKeyedStore<number>({ limit: 2 })
    store.set('a', 1)
    store.set('b', 2)
    store.set('a', 9)
    expect(store.get('b')).toBe(2)
  })
})
