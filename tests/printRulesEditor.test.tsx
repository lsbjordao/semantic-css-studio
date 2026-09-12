import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { PrintRulesEditor } from '../src/editor/PrintRulesEditor'
import { seedPrintRules } from '../src/theme/printRules'
import { useStudioStore } from '../src/theme/store'

// Without `globals: true` in vite.config, Testing Library auto-cleanup does
// not register by itself; without this, renders from each test accumulate in
// the document and queries start finding duplicate elements.
afterEach(() => cleanup())

describe('PrintRulesEditor', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  it('notes the print media context', () => {
    render(<PrintRulesEditor />)
    expect(screen.getByRole('note')).toHaveTextContent(/@media print/i)
  })

  it('lists the seeded rules', () => {
    render(<PrintRulesEditor />)
    expect(screen.getByText('body')).toBeInTheDocument()
    expect(screen.getByText('a[href^="http"]::after')).toBeInTheDocument()
  })

  it('enables a seeded rule', () => {
    render(<PrintRulesEditor />)
    const group = screen.getByRole('group', { name: /Print rule body/ })
    fireEvent.click(within(group).getByRole('checkbox'))
    expect(useStudioStore.getState().theme.layers.print?.body).toEqual(
      seedPrintRules().body,
    )
  })

  it('edits an enabled declaration', () => {
    useStudioStore.getState().togglePrintRule('body', true)
    render(<PrintRulesEditor />)
    fireEvent.change(screen.getByLabelText('background in print body'), {
      target: { value: '#fafafa' },
    })
    expect(useStudioStore.getState().theme.layers.print?.body.background).toBe(
      '#fafafa',
    )
  })

  it('marks a modified rule and restores it', () => {
    useStudioStore.getState().togglePrintRule('body', true)
    render(<PrintRulesEditor />)
    fireEvent.change(screen.getByLabelText('background in print body'), {
      target: { value: '#fafafa' },
    })
    const group = screen.getByRole('group', { name: /Print rule body/ })
    expect(within(group).getByText(/modified/i)).toBeInTheDocument()
    fireEvent.click(within(group).getByRole('button', { name: /restore/i }))
    expect(useStudioStore.getState().theme.layers.print?.body).toEqual(
      seedPrintRules().body,
    )
  })

  it('disables the rule', () => {
    useStudioStore.getState().togglePrintRule('body', true)
    render(<PrintRulesEditor />)
    const group = screen.getByRole('group', { name: /Print rule body/ })
    fireEvent.click(within(group).getByRole('checkbox'))
    expect(useStudioStore.getState().theme.layers.print).toBeUndefined()
  })
})
