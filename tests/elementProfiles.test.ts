import { describe, expect, it } from 'vitest'
import {
  propertyGroupsForElement,
  targetList,
} from '../src/editor/elementProfiles'

describe('element-specific property profiles', () => {
  it('exposes the blockquote inline-start border controls', () => {
    const properties = propertyGroupsForElement('blockquote').flatMap(
      (group) => group.properties,
    )
    expect(
      properties.some(
        (property) => property.property === 'borderInlineStartColor',
      ),
    ).toBe(true)
    expect(
      properties.some(
        (property) => property.property === 'borderInlineStartWidth',
      ),
    ).toBe(true)
  })

  it('maps progress value color to cross-browser targets', () => {
    const valueColor = propertyGroupsForElement('progress')
      .flatMap((group) => group.properties)
      .find((property) => property.label === 'Value color')
    expect(valueColor).toBeTruthy()
    expect(
      valueColor &&
        targetList('progress', valueColor).map((target) => target.selector),
    ).toEqual([
      'progress',
      'progress::-webkit-progress-value',
      'progress::-moz-progress-bar',
    ])
  })

  it('offers structured box-shadow editing on surfaced elements', () => {
    const shadow = propertyGroupsForElement('article')
      .flatMap((group) => group.properties)
      .find((property) => property.property === 'boxShadow')
    expect(shadow?.kind).toBe('shadow')
  })
})
