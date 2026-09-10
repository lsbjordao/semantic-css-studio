import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ElementEditor } from '../src/editor/ElementEditor'
import { TypographyEditor } from '../src/editor/TokenEditors'
import { useStudioStore } from '../src/theme/store'

afterEach(() => cleanup())

describe('webfonts in stack controls', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  it('offers the configured webfont in the element Font family', () => {
    useStudioStore.getState().applyPreset('Porcelain')
    useStudioStore.getState().setSelectedElement('a')
    render(<ElementEditor />)
    const select = screen.getByLabelText('Font family') as HTMLSelectElement
    const values = [...select.options].map((option) => option.value)
    expect(values).toContain('Fraunces, Georgia, serif')
  })

  it('writes the webfont as an element override', () => {
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

  it('offers the webfont in the matching token select', () => {
    useStudioStore.getState().applyPreset('Porcelain')
    render(<TypographyEditor />)
    const select = screen.getByLabelText('Heading font') as HTMLSelectElement
    const values = [...select.options].map((option) => option.value)
    expect(values).toContain('Fraunces, Georgia, serif')
  })

  it('without a webfont, only portable stacks exist', () => {
    useStudioStore.getState().setSelectedElement('a')
    render(<ElementEditor />)
    const select = screen.getByLabelText('Font family') as HTMLSelectElement
    const values = [...select.options].map((option) => option.value)
    expect(values.every((value) => !/Fraunces/.test(value))).toBe(true)
  })
})
