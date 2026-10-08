// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Tooltip } from './index'

afterEach(cleanup)

const tip = 'It is not hard.'

describe('Tooltip', () => {
  it('renders its trigger', () => {
    render(
      <Tooltip label={tip}>
        <span>why</span>
      </Tooltip>,
    )
    expect(screen.getByRole('button').textContent).toBe('why')
  })

  it('never submits the form it sits in', () => {
    render(
      <Tooltip label={tip}>
        <span>why</span>
      </Tooltip>,
    )
    expect(screen.getByRole('button')).toHaveProperty('type', 'button')
  })

  it('keeps the tip out of the document until the trigger is used', () => {
    render(
      <Tooltip label={tip}>
        <span>why</span>
      </Tooltip>,
    )
    expect(screen.queryByText(tip)).toBeNull()
  })

  it('names the trigger with the tip, so the text is reachable without hover', () => {
    render(
      <Tooltip label={tip}>
        <span>why</span>
      </Tooltip>,
    )
    expect(screen.queryByRole('button', { name: tip })).not.toBeNull()
  })
})
