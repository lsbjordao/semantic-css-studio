import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { BaseRulesEditor } from '../src/editor/BaseRulesEditor'
import { useStudioStore } from '../src/theme/store'

// Without `globals: true` in vite.config, Testing Library auto-cleanup does
// not register by itself; without this, renders from each test accumulate in
// the document and queries start finding duplicate elements.
afterEach(() => cleanup())

describe('BaseRulesEditor', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  it('notes that rules have zero specificity', () => {
    render(<BaseRulesEditor />)
    expect(screen.getByRole('note')).toHaveTextContent(/specificity/i)
  })

  it('lists the seeded rules', () => {
    render(<BaseRulesEditor />)
    expect(screen.getByText('button')).toBeInTheDocument()
    expect(screen.getByText('th, td')).toBeInTheDocument()
  })

  it('edits a declaration', () => {
    render(<BaseRulesEditor />)
    const field = screen.getByLabelText('padding in th, td')
    fireEvent.change(field, { target: { value: '4px' } })
    expect(useStudioStore.getState().theme.layers.base['th, td'].padding).toBe(
      '4px',
    )
  })

  it('marks the rule as modified and allows restoring', () => {
    render(<BaseRulesEditor />)
    fireEvent.change(screen.getByLabelText('padding in th, td'), {
      target: { value: '4px' },
    })
    const group = screen.getByRole('group', { name: /th, td/ })
    expect(within(group).getByText(/modified/i)).toBeInTheDocument()
    fireEvent.click(within(group).getByRole('button', { name: /restore/i }))
    expect(useStudioStore.getState().theme.layers.base['th, td'].padding).toBe(
      'var(--space-sm) var(--space-md)',
    )
  })

  it('disables the rule', () => {
    render(<BaseRulesEditor />)
    const group = screen.getByRole('group', { name: /th, td/ })
    fireEvent.click(within(group).getByRole('checkbox'))
    expect(
      useStudioStore.getState().theme.layers.base['th, td'],
    ).toBeUndefined()
  })
})
