import { describe, expect, it } from 'vitest'
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

  it('decompoe o shorthand border da regra de grupo para controles focados', () => {
    expect(effectiveValueFor(presets.Minimal, 'button', definitionFor('button', 'Border width')))
      .toBe('1px')
    expect(effectiveValueFor(presets.Minimal, 'button', definitionFor('button', 'Border style')))
      .toBe('solid')
    expect(effectiveValueFor(presets.Minimal, 'button', definitionFor('button', 'Border color')))
      .toBe('var(--color-border)')
  })

  it('decompoe a barra inline-start do blockquote em largura, estilo e cor', () => {
    expect(effectiveValueFor(presets.Minimal, 'blockquote', definitionFor('blockquote', 'Start border width')))
      .toBe('4px')
    expect(effectiveValueFor(presets.Minimal, 'blockquote', definitionFor('blockquote', 'Start border style')))
      .toBe('solid')
    expect(effectiveValueFor(presets.Minimal, 'blockquote', definitionFor('blockquote', 'Start border color')))
      .toBe('var(--color-primary)')
  })

  it('decompoe padding de quatro lados sem enviar o shorthand inteiro ao stepper', () => {
    const theme = structuredClone(presets.Minimal)
    theme.layers.elements.article = { padding: '1rem 2rem 3rem 4rem' }
    expect(effectiveValueFor(theme, 'article', definitionFor('article', 'Padding top'))).toBe('1rem')
    expect(effectiveValueFor(theme, 'article', definitionFor('article', 'Padding right'))).toBe('2rem')
    expect(effectiveValueFor(theme, 'article', definitionFor('article', 'Padding bottom'))).toBe('3rem')
    expect(effectiveValueFor(theme, 'article', definitionFor('article', 'Padding left'))).toBe('4rem')
  })

  it('resolve a regra de grupo para os demais controles do grupo', () => {
    expect(effectiveValueFor(presets.Minimal, 'select', definitionFor('select', 'Control background')))
      .toBe('var(--color-surface)')
  })

  it('prefere o override da camada elements sobre a base', () => {
    const theme = structuredClone(presets.Minimal)
    theme.layers.elements.button = { backgroundColor: '#ff0000' }
    expect(effectiveValueFor(theme, 'button', definitionFor('button', 'Control background')))
      .toBe('#ff0000')
  })

  it('distingue override proprio de valor herdado da base para o botao limpar', () => {
    expect(hasElementOverride(presets.Minimal, 'button', definitionFor('button', 'Control background'))).toBe(false)
    const theme = structuredClone(presets.Minimal)
    theme.layers.elements.button = { backgroundColor: '#ff0000' }
    expect(hasElementOverride(theme, 'button', definitionFor('button', 'Control background'))).toBe(true)
  })
})
