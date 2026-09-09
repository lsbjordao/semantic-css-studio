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

describe('familia de fonte efetiva no painel de elementos', () => {
  it('mostra o token de titulo para h1 via var da base', () => {
    expect(effectiveValueFor(presets.Minimal, 'h1', definitionFor('h1', 'Font family')))
      .toBe('Inter, ui-sans-serif, system-ui, sans-serif')
  })

  it('mostra o token mono para code via var dos elements', () => {
    expect(effectiveValueFor(presets.Minimal, 'code', definitionFor('code', 'Font family')))
      .toBe('ui-monospace, SFMono-Regular, Menlo, Consolas, monospace')
  })

  it('mostra o token de texto para paragrafo', () => {
    expect(effectiveValueFor(presets.Minimal, 'p', definitionFor('p', 'Font family')))
      .toBe('Inter, ui-sans-serif, system-ui, sans-serif')
  })

  it('reflete a webfont escolhida na Tipografia', () => {
    const theme: Theme = structuredClone(presets.Minimal)
    theme.fonts = { heading: { family: 'Bitcount Prop Double Ink', weights: [400, 700] } }
    theme.tokens.typography.fontHeading = 'Bitcount Prop Double Ink, system-ui, sans-serif'
    expect(effectiveValueFor(theme, 'h2', definitionFor('h2', 'Font family')))
      .toBe('Bitcount Prop Double Ink, system-ui, sans-serif')
  })

  it('override explicito vence o token', () => {
    const theme: Theme = structuredClone(presets.Minimal)
    theme.layers.elements.h1 = { fontFamily: 'Georgia, serif' }
    expect(effectiveValueFor(theme, 'h1', definitionFor('h1', 'Font family'))).toBe('Georgia, serif')
  })
})
