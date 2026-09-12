import { describe, expect, it } from 'vitest'
import {
  propertyGroupsForElement,
  targetList,
} from '../src/editor/elementProfiles'

function group(element: string, title: string) {
  return propertyGroupsForElement(element).find(
    (candidate) => candidate.title === title,
  )
}

function properties(element: string, title: string): string[] {
  return (
    group(element, title)?.properties.map((property) => property.property) ?? []
  )
}

describe('long-form typography profile', () => {
  it('exposes the prose properties on text elements', () => {
    expect(properties('p', 'Long-form')).toEqual([
      'hyphens',
      'textWrap',
      'textIndent',
      'wordSpacing',
      'fontVariant',
      'fontFeatureSettings',
      'orphans',
      'widows',
    ])
  })

  it('does not show the long-form group on controls', () => {
    expect(group('input', 'Long-form')).toBeUndefined()
  })
})

describe('columns profile', () => {
  it('exposes column controls on block containers', () => {
    expect(properties('article', 'Columns')).toEqual([
      'columnCount',
      'columnWidth',
      'columnRule',
    ])
  })

  it('does not show columns on inline text elements', () => {
    expect(group('p', 'Columns')).toBeUndefined()
  })
})

describe('pseudo-element profiles', () => {
  it('writes first-letter, first-line and selection to the pseudo selector', () => {
    for (const [title, suffix] of [
      ['First letter', '::first-letter'],
      ['First line', '::first-line'],
      ['Selection', '::selection'],
    ] as const) {
      const definitions = group('p', title)?.properties ?? []
      expect(definitions.length, title).toBeGreaterThan(0)
      for (const definition of definitions) {
        expect(
          targetList('p', definition).map((target) => target.selector),
          `${title} ${definition.property}`,
        ).toEqual([`p${suffix}`])
      }
    }
  })

  it('offers the marker only where a marker exists', () => {
    expect(group('li', 'Marker')).toBeTruthy()
    expect(group('summary', 'Marker')).toBeTruthy()
    expect(group('p', 'Marker')).toBeUndefined()
    const marker = group('li', 'Marker')?.properties ?? []
    for (const definition of marker) {
      expect(targetList('li', definition)[0].selector).toBe('li::marker')
    }
  })

  it('keeps pseudo rules out of the plain element target', () => {
    const selection = group('p', 'Selection')?.properties ?? []
    expect(
      selection.every(
        (definition) => targetList('p', definition)[0].selector !== 'p',
      ),
    ).toBe(true)
  })
})
