import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ShadowField } from '../src/editor/ShadowField'

afterEach(() => cleanup())

describe('ShadowField', () => {
  it('edits an outer and an inner shadow in the same property', () => {
    const onChange = vi.fn()
    render(
      <ShadowField
        label="Box shadow"
        value="0 1px 2px #000, inset 0 2px 6px #0003"
        onChange={onChange}
      />,
    )

    expect(screen.getByText('Outer shadow 1')).toBeInTheDocument()
    expect(screen.getByText('Inner shadow 2')).toBeInTheDocument()

    const innerToggles = screen.getAllByRole('checkbox', {
      name: 'inner shadow',
    })
    fireEvent.click(innerToggles[0])

    expect(onChange).toHaveBeenLastCalledWith(
      'inset 0 1px 2px 0px #000, inset 0 2px 6px 0px #0003',
    )
  })

  it('allows adding an inner layer to an outer shadow', () => {
    const onChange = vi.fn()
    render(
      <ShadowField
        label="Box shadow"
        value="0 8px 24px rgb(0 0 0 / 0.14)"
        onChange={onChange}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: '+ inner shadow' }))

    expect(onChange).toHaveBeenLastCalledWith(
      '0 8px 24px 0px rgb(0 0 0 / 0.14), inset 0 2px 6px 0px rgb(0 0 0 / 0.12)',
    )
  })
})
