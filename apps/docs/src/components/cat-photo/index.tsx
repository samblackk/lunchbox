'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { catPhotos } from '@/content/cat-photos'

import styles from './style.module.css'

// A riffle through the stack. The whole set goes by in about a second, so
// what lands is whatever the pointer leaves on.
const cycleMs = 120

export const CatPhoto = () => {
  const [shown, setShown] = useState(0)
  const [cycling, setCycling] = useState(false)

  useEffect(() => {
    if (!cycling || catPhotos.length < 2) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const timer = setInterval(
      () => setShown((current) => (current + 1) % catPhotos.length),
      cycleMs,
    )

    return () => clearInterval(timer)
  }, [cycling])

  return (
    <span
      className={styles.stack}
      onPointerEnter={() => setCycling(true)}
      onPointerLeave={() => setCycling(false)}
    >
      {catPhotos.map((photo, index) => (
        <Image
          key={photo.src}
          className={
            index === shown ? styles.frame : `${styles.frame} ${styles.resting}`
          }
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          aria-hidden={index === shown ? undefined : true}
        />
      ))}
    </span>
  )
}
