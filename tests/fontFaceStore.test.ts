import { beforeEach, describe, expect, it } from 'vitest'
import { useStudioStore } from '../src/theme/store'

describe('fontes da store', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  it('define familia e pilha no mesmo commit', () => {
    useStudioStore.getState().setFontFace('heading', { family: 'Fraunces', weights: [400, 700], italic: true }, 'Fraunces, Georgia, serif')
    const theme = useStudioStore.getState().theme
    expect(theme.fonts?.heading).toEqual({ family: 'Fraunces', weights: [400, 700], italic: true })
    expect(theme.tokens.typography.fontHeading).toBe('Fraunces, Georgia, serif')
  })

  it('limpar remove o papel e some com fonts quando vazio', () => {
    const store = useStudioStore.getState()
    store.setFontFace('heading', { family: 'Fraunces' }, 'Fraunces, Georgia, serif')
    useStudioStore.getState().setFontFace('heading', null)
    const theme = useStudioStore.getState().theme
    expect(theme.fonts).toBeUndefined()
    // a pilha segue editavel a parte: limpar o import nao apaga o texto
    expect(theme.tokens.typography.fontHeading).toBe('Fraunces, Georgia, serif')
  })

  it('desfaz familia e pilha juntas', () => {
    useStudioStore.getState().setFontFace('heading', { family: 'Fraunces' }, 'Fraunces, Georgia, serif')
    useStudioStore.getState().undo()
    const theme = useStudioStore.getState().theme
    expect(theme.fonts).toBeUndefined()
    expect(theme.tokens.typography.fontHeading).not.toContain('Fraunces')
  })
})
