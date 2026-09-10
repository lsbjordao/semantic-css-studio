import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { TypographyEditor } from '../src/editor/TokenEditors'
import { useStudioStore } from '../src/theme/store'

afterEach(() => cleanup())

describe('Google Fonts picker', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  it('applies family, weights and stack when choosing from the list', () => {
    render(<TypographyEditor />)
    const group = screen.getByRole('group', { name: 'Heading webfont' })
    fireEvent.change(within(group).getByLabelText('Heading webfont family'), {
      target: { value: 'Fraunces' },
    })
    fireEvent.click(within(group).getByRole('checkbox', { name: '500' }))
    const theme = useStudioStore.getState().theme
    expect(theme.fonts?.heading?.family).toBe('Fraunces')
    expect(theme.fonts?.heading?.weights).toContain(500)
    expect(theme.tokens.typography.fontHeading.startsWith('Fraunces,')).toBe(
      true,
    )
  })

  it('the list always shows every option, even with a chosen value', () => {
    render(<TypographyEditor />)
    const group = screen.getByRole('group', { name: 'Heading webfont' })
    fireEvent.change(within(group).getByLabelText('Heading webfont family'), {
      target: { value: 'Fraunces' },
    })
    const select = within(group).getByLabelText(
      'Heading webfont family',
    ) as HTMLSelectElement
    const values = [...select.options].map((option) => option.value)
    expect(values).toContain('Playfair Display')
    expect(values).toContain('__custom__')
  })

  it('custom mode accepts any family; clearing returns to the list', () => {
    render(<TypographyEditor />)
    const group = screen.getByRole('group', { name: 'Heading webfont' })
    fireEvent.change(within(group).getByLabelText('Heading webfont family'), {
      target: { value: '__custom__' },
    })
    expect(
      within(group).getByRole('button', { name: 'Use the list' }),
    ).toBeInTheDocument()
    fireEvent.change(within(group).getByLabelText('Heading webfont family'), {
      target: { value: 'Caveat' },
    })
    expect(useStudioStore.getState().theme.fonts?.heading?.family).toBe(
      'Caveat',
    )
    expect(
      useStudioStore
        .getState()
        .theme.tokens.typography.fontHeading.startsWith('Caveat,'),
    ).toBe(true)
    // with a custom value, going back would lose data: the path is clearing the text
    expect(
      within(group).queryByRole('button', { name: 'Use the list' }),
    ).not.toBeInTheDocument()
    fireEvent.change(within(group).getByLabelText('Heading webfont family'), {
      target: { value: '' },
    })
    expect(within(group).getByLabelText('Heading webfont family').tagName).toBe(
      'SELECT',
    )
  })

  it('toggles the role italic', () => {
    render(<TypographyEditor />)
    const group = screen.getByRole('group', { name: 'Heading webfont' })
    fireEvent.change(within(group).getByLabelText('Heading webfont family'), {
      target: { value: 'Fraunces' },
    })
    fireEvent.click(within(group).getByRole('checkbox', { name: 'Italic' }))
    expect(useStudioStore.getState().theme.fonts?.heading?.italic).toBe(true)
  })

  it('shows the Porcelain preset state on open', () => {
    useStudioStore.getState().applyPreset('Porcelain')
    render(<TypographyEditor />)
    const group = screen.getByRole('group', { name: 'Heading webfont' })
    expect(
      (
        within(group).getByLabelText(
          'Heading webfont family',
        ) as HTMLInputElement
      ).value,
    ).toBe('Fraunces')
    expect(
      (within(group).getByRole('checkbox', { name: '600' }) as HTMLInputElement)
        .checked,
    ).toBe(true)
  })

  it('clears the role without erasing the stack', () => {
    useStudioStore.getState().applyPreset('Porcelain')
    render(<TypographyEditor />)
    const group = screen.getByRole('group', { name: 'Heading webfont' })
    fireEvent.click(
      within(group).getByRole('button', { name: 'Clear heading webfont' }),
    )
    const theme = useStudioStore.getState().theme
    expect(theme.fonts?.heading).toBeUndefined()
    expect(theme.tokens.typography.fontHeading).toContain('Fraunces')
  })

  it('shows the sample in the token real stack', () => {
    useStudioStore.getState().applyPreset('Porcelain')
    render(<TypographyEditor />)
    const group = screen.getByRole('group', { name: 'Heading webfont' })
    const sample = within(group).getByText('AaBbGg 123')
    expect(sample.style.fontFamily).toContain('Fraunces')
  })
})
