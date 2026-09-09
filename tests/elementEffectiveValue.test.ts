import { describe, expect, it } from 'vitest'
import type { Theme } from '../src/theme/schema'
import {
  effectiveValueFor,
  hasElementOverride,
  propertyGroupsForElement,
} from '../src/editor/elementProfiles'
import { presets } from '../src/theme/presets'

function definitionFor(element: string, label: string) {
  const found = propertyGroupsForElement(element)
    .flatMap((group) => group.properties)
    .find((property) => property.label === label)
  if (!found) throw new Error(`controle "${label}" nao existe para ${element}`)
  return found
}

describe('valor efetivo no painel de elementos', () => {
  it('mostra o background do botao vindo da camada base', () => {
    expect(effectiveValueFor(presets.Minimal, 'button', definitionFor('button', 'Control background')))
      .toBe('var(--color-primary)')
  })

  it('mostra o texto do botao vindo da camada base', () => {
    expect(effectiveValueFor(presets.Minimal, 'button', definitionFor('button', 'Control text')))
      .toBe('var(--color-primary-text)')
  })

  it('resolve o shorthand border da regra de grupo para os longhands', () => {
    expect(effectiveValueFor(presets.Minimal, 'button', definitionFor('button', 'Border width')))
      .toBe('1px solid var(--color-border)')
    expect(effectiveValueFor(presets.Minimal, 'button', definitionFor('button', 'Border style')))
      .toBe('1px solid var(--color-border)')
  })

  it('resolve a regra de grupo para os demais controles do grupo', () => {
    expect(effectiveValueFor(presets.Minimal, 'select', definitionFor('select', 'Control background')))
      .toBe('var(--color-surface)')
  })

  it('prefere o override da camada elements sobre a base', () => {
    const theme: Theme = structuredClone(presets.Minimal)
    theme.layers.elements.button = { backgroundColor: '#ff0000' }
    expect(effectiveValueFor(theme, 'button', definitionFor('button', 'Control background')))
      .toBe('#ff0000')
  })

  it('distingue override proprio de valor herdado da base para o botao limpar', () => {
    expect(hasElementOverride(presets.Minimal, 'button', definitionFor('button', 'Control background'))).toBe(false)
    const theme: Theme = structuredClone(presets.Minimal)
    theme.layers.elements.button = { backgroundColor: '#ff0000' }
    expect(hasElementOverride(theme, 'button', definitionFor('button', 'Control background'))).toBe(true)
  })
})
