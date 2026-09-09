import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ElementEditor } from '../src/editor/ElementEditor'
import { TypographyEditor } from '../src/editor/TokenEditors'
import { useStudioStore } from '../src/theme/store'

afterEach(() => cleanup())

describe('webfonts nos controles de pilha', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  it('oferece a webfont configurada no Font family do elemento', () => {
    useStudioStore.getState().applyPreset('Porcelain')
    useStudioStore.getState().setSelectedElement('a')
    render(<ElementEditor />)
    const select = screen.getByLabelText('Font family') as HTMLSelectElement
    const values = [...select.options].map((option) => option.value)
    expect(values).toContain('Fraunces, Georgia, serif')
  })

  it('grava a webfont como override do elemento', () => {
    useStudioStore.getState().applyPreset('Porcelain')
    useStudioStore.getState().setSelectedElement('a')
    render(<ElementEditor />)
    fireEvent.change(screen.getByLabelText('Font family'), {
      target: { value: 'Fraunces, Georgia, serif' },
    })
    expect(useStudioStore.getState().theme.layers.elements.a?.fontFamily).toBe(
      'Fraunces, Georgia, serif',
    )
  })

  it('oferece a webfont no select do token correspondente', () => {
    useStudioStore.getState().applyPreset('Porcelain')
    render(<TypographyEditor />)
    const select = screen.getByLabelText('Heading font') as HTMLSelectElement
    const values = [...select.options].map((option) => option.value)
    expect(values).toContain('Fraunces, Georgia, serif')
  })

  it('sem webfont, so ha pilhas portateis', () => {
    useStudioStore.getState().setSelectedElement('a')
    render(<ElementEditor />)
    const select = screen.getByLabelText('Font family') as HTMLSelectElement
    const values = [...select.options].map((option) => option.value)
    expect(values.every((value) => !/Fraunces/.test(value))).toBe(true)
  })
})
