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
  if (!found)
    throw new Error(`control "${label}" does not exist for ${element}`)
  return found
}

describe('effective value in the element panel', () => {
  it('shows the button background coming from the base layer', () => {
    expect(
      effectiveValueFor(
        presets.Minimal,
        'button',
        definitionFor('button', 'Control background'),
      ),
    ).toBe('var(--color-primary)')
  })

  it('shows the button text coming from the base layer', () => {
    expect(
      effectiveValueFor(
        presets.Minimal,
        'button',
        definitionFor('button', 'Control text'),
      ),
    ).toBe('var(--color-primary-text)')
  })

  it('resolves the group-rule border shorthand to longhands', () => {
    expect(
      effectiveValueFor(
        presets.Minimal,
        'button',
        definitionFor('button', 'Border width'),
      ),
    ).toBe('1px solid var(--color-border)')
    expect(
      effectiveValueFor(
        presets.Minimal,
        'button',
        definitionFor('button', 'Border style'),
      ),
    ).toBe('1px solid var(--color-border)')
  })

  it('resolves the group rule for the other controls in the group', () => {
    expect(
      effectiveValueFor(
        presets.Minimal,
        'select',
        definitionFor('select', 'Control background'),
      ),
    ).toBe('var(--color-surface)')
  })

  it('prefers the elements-layer override over base', () => {
    const theme: Theme = structuredClone(presets.Minimal)
    theme.layers.elements.button = { backgroundColor: '#ff0000' }
    expect(
      effectiveValueFor(
        theme,
        'button',
        definitionFor('button', 'Control background'),
      ),
    ).toBe('#ff0000')
  })

  it('tells an own override apart from a base-inherited value for the clear button', () => {
    expect(
      hasElementOverride(
        presets.Minimal,
        'button',
        definitionFor('button', 'Control background'),
      ),
    ).toBe(false)
    const theme: Theme = structuredClone(presets.Minimal)
    theme.layers.elements.button = { backgroundColor: '#ff0000' }
    expect(
      hasElementOverride(
        theme,
        'button',
        definitionFor('button', 'Control background'),
      ),
    ).toBe(true)
  })
})

describe('effective font family in the element panel', () => {
  it('shows the heading token for h1 via the base var', () => {
    expect(
      effectiveValueFor(
        presets.Minimal,
        'h1',
        definitionFor('h1', 'Font family'),
      ),
    ).toBe('Inter, ui-sans-serif, system-ui, sans-serif')
  })

  it('shows the mono token for code via the elements var', () => {
    expect(
      effectiveValueFor(
        presets.Minimal,
        'code',
        definitionFor('code', 'Font family'),
      ),
    ).toBe('ui-monospace, SFMono-Regular, Menlo, Consolas, monospace')
  })

  it('shows the body token for paragraphs', () => {
    expect(
      effectiveValueFor(
        presets.Minimal,
        'p',
        definitionFor('p', 'Font family'),
      ),
    ).toBe('Inter, ui-sans-serif, system-ui, sans-serif')
  })

  it('reflects the webfont chosen in Typography', () => {
    const theme: Theme = structuredClone(presets.Minimal)
    theme.fonts = {
      heading: { family: 'Bitcount Prop Double Ink', weights: [400, 700] },
    }
    theme.tokens.typography.fontHeading =
      'Bitcount Prop Double Ink, system-ui, sans-serif'
    expect(
      effectiveValueFor(theme, 'h2', definitionFor('h2', 'Font family')),
    ).toBe('Bitcount Prop Double Ink, system-ui, sans-serif')
  })

  it('an explicit override beats the token', () => {
    const theme: Theme = structuredClone(presets.Minimal)
    theme.layers.elements.h1 = { fontFamily: 'Georgia, serif' }
    expect(
      effectiveValueFor(theme, 'h1', definitionFor('h1', 'Font family')),
    ).toBe('Georgia, serif')
  })
})
