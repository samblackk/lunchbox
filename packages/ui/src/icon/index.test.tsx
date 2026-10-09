// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Icon } from './index'
import { iconPaths } from './paths'

afterEach(cleanup)

describe('Icon', () => {
  it('draws every path the named icon is made of', () => {
    const { container } = render(<Icon name="info" />)
    expect(container.querySelectorAll('path')).toHaveLength(
      iconPaths.info.length,
    )
  })

  it('stays out of the accessibility tree, since it never carries the name', () => {
    const { container } = render(<Icon name="chevron" />)
    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe(
      'true',
    )
  })

  it('lets a caller size it past the default', () => {
    const { container } = render(<Icon name="chevron" size="0.9rem" />)
    expect(container.querySelector('svg')?.style.width).toBe('0.9rem')
  })

  it('carries the per-path opacity an icon declares', () => {
    const { container } = render(<Icon name="spinner" />)
    expect(container.querySelector('path')?.getAttribute('opacity')).toBe('0.5')
  })

  it('leaves a plain path at full strength', () => {
    const { container } = render(<Icon name="info" />)
    expect(container.querySelector('path')?.hasAttribute('opacity')).toBe(false)
  })

  it('does not turn unless asked to', () => {
    const { container } = render(<Icon name="spinner" />)
    const spinning = render(<Icon name="spinner" spin />)
    expect(container.querySelector('svg')?.getAttribute('class')).not.toBe(
      spinning.container.querySelector('svg')?.getAttribute('class'),
    )
  })
})
