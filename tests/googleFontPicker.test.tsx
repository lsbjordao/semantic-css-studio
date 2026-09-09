import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { TypographyEditor } from '../src/editor/TokenEditors'
import { useStudioStore } from '../src/theme/store'

afterEach(() => cleanup())

describe('seletor de Google Fonts', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  it('aplica familia, pesos e pilha ao escolher na lista', () => {
    render(<TypographyEditor />)
    const group = screen.getByRole('group', { name: 'Heading webfont' })
    fireEvent.change(within(group).getByLabelText('Heading webfont family'), { target: { value: 'Fraunces' } })
    fireEvent.click(within(group).getByRole('checkbox', { name: '500' }))
    const theme = useStudioStore.getState().theme
    expect(theme.fonts?.heading?.family).toBe('Fraunces')
    expect(theme.fonts?.heading?.weights).toContain(500)
    expect(theme.tokens.typography.fontHeading.startsWith('Fraunces,')).toBe(true)
  })

  it('a lista mostra sempre todas as opcoes, mesmo com valor escolhido', () => {
    render(<TypographyEditor />)
    const group = screen.getByRole('group', { name: 'Heading webfont' })
    fireEvent.change(within(group).getByLabelText('Heading webfont family'), { target: { value: 'Fraunces' } })
    const select = within(group).getByLabelText('Heading webfont family') as HTMLSelectElement
    const values = [...select.options].map((option) => option.value)
    expect(values).toContain('Playfair Display')
    expect(values).toContain('__custom__')
  })

  it('modo custom aceita qualquer familia; limpar volta para a lista', () => {
    render(<TypographyEditor />)
    const group = screen.getByRole('group', { name: 'Heading webfont' })
    fireEvent.change(within(group).getByLabelText('Heading webfont family'), { target: { value: '__custom__' } })
    expect(within(group).getByRole('button', { name: 'Usar a lista' })).toBeInTheDocument()
    fireEvent.change(within(group).getByLabelText('Heading webfont family'), { target: { value: 'Caveat' } })
    expect(useStudioStore.getState().theme.fonts?.heading?.family).toBe('Caveat')
    expect(useStudioStore.getState().theme.tokens.typography.fontHeading.startsWith('Caveat,')).toBe(true)
    // com valor custom, voltar seria perda: o caminho e limpar o texto
    expect(within(group).queryByRole('button', { name: 'Usar a lista' })).not.toBeInTheDocument()
    fireEvent.change(within(group).getByLabelText('Heading webfont family'), { target: { value: '' } })
    expect(within(group).getByLabelText('Heading webfont family').tagName).toBe('SELECT')
  })

  it('liga o italico do papel', () => {
    render(<TypographyEditor />)
    const group = screen.getByRole('group', { name: 'Heading webfont' })
    fireEvent.change(within(group).getByLabelText('Heading webfont family'), { target: { value: 'Fraunces' } })
    fireEvent.click(within(group).getByRole('checkbox', { name: 'Italic' }))
    expect(useStudioStore.getState().theme.fonts?.heading?.italic).toBe(true)
  })

  it('mostra o estado do preset Porcelain ao abrir', () => {
    useStudioStore.getState().applyPreset('Porcelain')
    render(<TypographyEditor />)
    const group = screen.getByRole('group', { name: 'Heading webfont' })
    expect((within(group).getByLabelText('Heading webfont family') as HTMLInputElement).value).toBe('Fraunces')
    expect((within(group).getByRole('checkbox', { name: '600' }) as HTMLInputElement).checked).toBe(true)
  })

  it('limpa o papel sem apagar a pilha', () => {
    useStudioStore.getState().applyPreset('Porcelain')
    render(<TypographyEditor />)
    const group = screen.getByRole('group', { name: 'Heading webfont' })
    fireEvent.click(within(group).getByRole('button', { name: 'Clear heading webfont' }))
    const theme = useStudioStore.getState().theme
    expect(theme.fonts?.heading).toBeUndefined()
    expect(theme.tokens.typography.fontHeading).toContain('Fraunces')
  })

  it('mostra a amostra na pilha real do token', () => {
    useStudioStore.getState().applyPreset('Porcelain')
    render(<TypographyEditor />)
    const group = screen.getByRole('group', { name: 'Heading webfont' })
    const sample = within(group).getByText('AaBbGg 123')
    expect(sample.style.fontFamily).toContain('Fraunces')
  })
})
