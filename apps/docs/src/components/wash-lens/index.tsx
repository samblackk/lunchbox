'use client'

import { useEffect, useRef } from 'react'

import styles from './style.module.css'

export const WashLens = () => {
  const lens = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = lens.current
    if (node === null) return

    let frame = 0

    const follow = ({ clientX, clientY }: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        node.style.setProperty('--wash-x', `${clientX}px`)
        node.style.setProperty('--wash-y', `${clientY}px`)
      })
    }

    window.addEventListener('pointermove', follow, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', follow)
    }
  }, [])

  return <div ref={lens} className={styles.lens} aria-hidden="true" />
}
