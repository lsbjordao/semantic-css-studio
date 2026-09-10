import { beforeEach, describe, expect, it } from 'vitest'
import { useStudioStore } from '../src/theme/store'

describe('store fonts', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  it('sets family and stack in the same commit', () => {
    useStudioStore
      .getState()
      .setFontFace(
        'heading',
        { family: 'Fraunces', weights: [400, 700], italic: true },
        'Fraunces, Georgia, serif',
      )
    const theme = useStudioStore.getState().theme
    expect(theme.fonts?.heading).toEqual({
      family: 'Fraunces',
      weights: [400, 700],
      italic: true,
    })
    expect(theme.tokens.typography.fontHeading).toBe('Fraunces, Georgia, serif')
  })

  it('clearing removes the role and drops fonts when empty', () => {
    const store = useStudioStore.getState()
    store.setFontFace(
      'heading',
      { family: 'Fraunces' },
      'Fraunces, Georgia, serif',
    )
    useStudioStore.getState().setFontFace('heading', null)
    const theme = useStudioStore.getState().theme
    expect(theme.fonts).toBeUndefined()
    // the stack stays separately editable: clearing the import does not erase the text
    expect(theme.tokens.typography.fontHeading).toBe('Fraunces, Georgia, serif')
  })

  it('undoes family and stack together', () => {
    useStudioStore
      .getState()
      .setFontFace(
        'heading',
        { family: 'Fraunces' },
        'Fraunces, Georgia, serif',
      )
    useStudioStore.getState().undo()
    const theme = useStudioStore.getState().theme
    expect(theme.fonts).toBeUndefined()
    expect(theme.tokens.typography.fontHeading).not.toContain('Fraunces')
  })
})
