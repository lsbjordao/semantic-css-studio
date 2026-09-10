import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { QuartoEditor } from '../src/editor/QuartoEditor'
import { useStudioStore } from '../src/theme/store'

// Without `globals: true` in vite.config, Testing Library auto-cleanup does
// not register by itself; without this, renders from each test accumulate in
// the document and queries start finding duplicate elements.
afterEach(() => cleanup())

describe('QuartoEditor', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  it('shows the highlighted surface by default', () => {
    render(<QuartoEditor />)
    expect(
      screen.getByRole('radio', { name: 'Highlighted surface' }),
    ).toHaveAttribute('aria-checked', 'true')
  })

  it('switches the sidebar tone and records it in undo', () => {
    render(<QuartoEditor />)
    fireEvent.click(screen.getByRole('radio', { name: 'Same as page' }))
    expect(useStudioStore.getState().theme.quarto?.sidebarTone).toBe(
      'background',
    )

    useStudioStore.getState().undo()
    expect(
      useStudioStore.getState().theme.quarto?.sidebarTone ?? 'surface',
    ).toBe('surface')
  })

  it('offers the locked light and dark exports', () => {
    render(<QuartoEditor />)
    expect(
      screen.getByRole('button', { name: 'Export theme-light.css' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Export theme-dark.css' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/light: \[cosmo, theme-light\.css\]/),
    ).toBeInTheDocument()
  })
})
