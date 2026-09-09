import { beforeEach, describe, expect, it } from 'vitest'
import { compileTheme } from '../src/compiler'
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

describe('ordem da camada base ao religar uma regra', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  // Dentro de @layer base toda regra sai embrulhada em :where(), com
  // especificidade 0: a ordem do fonte e o UNICO criterio de desempate entre
  // elas. Religar uma regra reinserindo a chave no fim do objeto muda essa
  // ordem e troca o resultado — `input, textarea, select, button` passaria a
  // vir depois de `button` e roubaria a cor primaria de todo botao.
  it('devolve a regra religada a posicao original da semente', () => {
    const selector = 'input, textarea, select, button'
    useStudioStore.getState().toggleBaseRule(selector, false)
    useStudioStore.getState().toggleBaseRule(selector, true)

    expect(Object.keys(useStudioStore.getState().theme.layers.base)).toEqual(
      Object.keys(seedBaseRules()),
    )

    const css = compileTheme(useStudioStore.getState().theme)
    const fields = css.indexOf(`:where(${selector}) {`)
    const button = css.indexOf(':where(button) {')
    expect(fields).toBeGreaterThan(-1)
    expect(button).toBeGreaterThan(-1)
    expect(fields).toBeLessThan(button)
  })

  it('mantem o botao com a cor primaria depois do ciclo desliga/religa', () => {
    const selector = 'input, textarea, select, button'
    useStudioStore.getState().toggleBaseRule(selector, false)
    useStudioStore.getState().toggleBaseRule(selector, true)
    const css = compileTheme(useStudioStore.getState().theme)
    expect(lastBaseDeclarationFor(css, 'button', 'background')).toBe('var(--color-primary)')
    expect(lastBaseDeclarationFor(css, 'button', 'color')).toBe('var(--color-primary-text)')
  })

  it('preserva a posicao das demais regras', () => {
    useStudioStore.getState().toggleBaseRule('label', false)
    useStudioStore.getState().toggleBaseRule('label', true)
    expect(Object.keys(useStudioStore.getState().theme.layers.base)).toEqual(
      Object.keys(seedBaseRules()),
    )
  })
})

/**
 * Ultima declaracao de `property` que, dentro de @layer base, atinge o elemento
 * `element`. Todas as regras da camada tem especificidade 0, entao a ultima a
 * aparecer e a que vence.
 */
function lastBaseDeclarationFor(css: string, element: string, property: string): string | undefined {
  const start = css.indexOf('@layer base {')
  const end = css.indexOf('@layer elements {')
  const base = css.slice(start, end === -1 ? undefined : end)
  let winner: string | undefined
  for (const block of base.split('\n\n')) {
    const head = block.match(/:where\((.+)\) \{/)
    if (!head) continue
    const selectors = head[1].split(',').map((part) => part.trim())
    if (!selectors.includes(element)) continue
    const declaration = block.match(new RegExp(`\\n\\s*${property}: ([^;]+);`))
    if (declaration) winner = declaration[1]
  }
  return winner
}
