import { beforeEach, describe, expect, it } from 'vitest'
import { seedBaseRules } from '../src/theme/baseRules'
import { isBaseRuleModified, useStudioStore } from '../src/theme/store'

describe('camada base na store', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  it('edita uma declaracao da regra base', () => {
    useStudioStore.getState().setLayerProperty('base', 'pre code', 'padding', '4px')
    expect(useStudioStore.getState().theme.layers.base['pre code'].padding).toBe('4px')
  })

  it('reconhece uma regra modificada', () => {
    const theme = () => useStudioStore.getState().theme
    expect(isBaseRuleModified(theme(), 'pre code')).toBe(false)
    useStudioStore.getState().setLayerProperty('base', 'pre code', 'padding', '4px')
    expect(isBaseRuleModified(theme(), 'pre code')).toBe(true)
  })

  it('restaura a regra ao padrao semeado', () => {
    useStudioStore.getState().setLayerProperty('base', 'pre code', 'padding', '4px')
    useStudioStore.getState().resetBaseRule('pre code')
    expect(useStudioStore.getState().theme.layers.base['pre code']).toEqual(seedBaseRules()['pre code'])
  })

  it('desliga e religa uma regra sem perder as declaracoes', () => {
    const store = useStudioStore.getState()
    store.setLayerProperty('base', 'pre code', 'padding', '4px')
    store.toggleBaseRule('pre code', false)
    expect(useStudioStore.getState().theme.layers.base['pre code']).toBeUndefined()
    useStudioStore.getState().toggleBaseRule('pre code', true)
    // religar traz de volta o padrao semeado, nao a edicao descartada
    expect(useStudioStore.getState().theme.layers.base['pre code']).toEqual(seedBaseRules()['pre code'])
  })

  it('registra a mudanca no historico de undo', () => {
    useStudioStore.getState().setLayerProperty('base', 'pre code', 'padding', '4px')
    useStudioStore.getState().undo()
    expect(useStudioStore.getState().theme.layers.base['pre code'].padding).toBe('0')
  })
})
