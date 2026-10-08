// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { CodeBlock } from './index'

afterEach(cleanup)

const payload = '{\n  "model": "jev-1.13.0"\n}'

describe('CodeBlock', () => {
  it('keeps the text it was given verbatim', () => {
    render(<CodeBlock label="raw response">{payload}</CodeBlock>)
    expect(screen.getByRole('region').textContent).toBe(payload)
  })

  it('is reachable by keyboard, or the scroll box cannot be scrolled', () => {
    render(<CodeBlock label="raw response">{payload}</CodeBlock>)
    expect(screen.getByRole('region')).toHaveProperty('tabIndex', 0)
  })

  it('names the region so the landmark is not anonymous', () => {
    render(<CodeBlock label="raw response">{payload}</CodeBlock>)
    expect(
      screen.queryByRole('region', { name: 'raw response' }),
    ).not.toBeNull()
  })
})
