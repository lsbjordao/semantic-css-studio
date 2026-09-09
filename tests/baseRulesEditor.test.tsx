import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { BaseRulesEditor } from '../src/editor/BaseRulesEditor'
import { useStudioStore } from '../src/theme/store'

// Sem `globals: true` no vite.config, o auto-cleanup do Testing Library nao
// se registra sozinho; sem isto os renders de cada teste se acumulam no
// document e as queries passam a achar elementos duplicados.
afterEach(() => cleanup())

describe('BaseRulesEditor', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  it('avisa que as regras tem especificidade zero', () => {
    render(<BaseRulesEditor />)
    expect(screen.getByRole('note')).toHaveTextContent(/especificidade/i)
  })

  it('lista as regras semeadas', () => {
    render(<BaseRulesEditor />)
    expect(screen.getByText('pre code')).toBeInTheDocument()
    expect(screen.getByText('th, td')).toBeInTheDocument()
  })

  it('edita uma declaracao', () => {
    render(<BaseRulesEditor />)
    const field = screen.getByLabelText('padding em pre code')
    fireEvent.change(field, { target: { value: '4px' } })
    expect(useStudioStore.getState().theme.layers.base['pre code'].padding).toBe('4px')
  })

  it('marca a regra como modificada e permite restaurar', () => {
    render(<BaseRulesEditor />)
    fireEvent.change(screen.getByLabelText('padding em pre code'), { target: { value: '4px' } })
    const group = screen.getByRole('group', { name: /pre code/ })
    expect(within(group).getByText(/modificada/i)).toBeInTheDocument()
    fireEvent.click(within(group).getByRole('button', { name: /restaurar/i }))
    expect(useStudioStore.getState().theme.layers.base['pre code'].padding).toBe('0')
  })

  it('desliga a regra', () => {
    render(<BaseRulesEditor />)
    const group = screen.getByRole('group', { name: /pre code/ })
    fireEvent.click(within(group).getByRole('checkbox'))
    expect(useStudioStore.getState().theme.layers.base['pre code']).toBeUndefined()
  })
})
