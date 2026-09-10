import { describe, expect, it } from 'vitest'
import {
  isValidSelector,
  selectorWarnings,
} from '../src/compiler/selectorValidation'

describe('isValidSelector', () => {
  it('accepts the selectors the catalog produces', () => {
    for (const selector of [
      'article',
      'tbody tr:nth-child(even)',
      'a[href^="http"]::after',
      'article > p:first-of-type',
      'input:not([type="checkbox"]):not([type="radio"])',
      'h1, h2, h3',
      '::-webkit-scrollbar-thumb:hover',
      ':where(pre code)',
    ]) {
      expect(isValidSelector(selector), selector).toBe(true)
    }
  })

  it('rejects unbalanced parentheses and brackets', () => {
    expect(isValidSelector('a:not(')).toBe(false)
    expect(isValidSelector('a[href')).toBe(false)
    expect(isValidSelector('a)')).toBe(false)
  })

  it('rejects a dangling combinator', () => {
    expect(isValidSelector('article >')).toBe(false)
    expect(isValidSelector('+ p')).toBe(false)
    expect(isValidSelector('h1,')).toBe(false)
  })

  it('rejects empty strings and open quotes', () => {
    expect(isValidSelector('')).toBe(false)
    expect(isValidSelector('   ')).toBe(false)
    expect(isValidSelector('a[href="x]')).toBe(false)
  })

  it('rejects braces, which would indicate a block rather than a selector', () => {
    expect(isValidSelector('a { color: red }')).toBe(false)
  })

  it('accepts escaped quotes in attribute values', () => {
    expect(isValidSelector('[title="say \\"hi\\""]')).toBe(true)
  })

  it('accepts non-ASCII in attribute values', () => {
    expect(isValidSelector('[data-label="café"]')).toBe(true)
  })

  it('accepts attribute operators', () => {
    expect(isValidSelector('a[href$=".pdf"]')).toBe(true)
    expect(isValidSelector('a[href*="example"]')).toBe(true)
    expect(isValidSelector('a[href~="link"]')).toBe(true)
    expect(isValidSelector('a[lang|="pt"]')).toBe(true)
  })

  it('accepts formulas in :nth-child', () => {
    expect(isValidSelector('tbody tr:nth-child(2n+1)')).toBe(true)
  })
})

describe('selectorWarnings', () => {
  it('does not warn about semantic selectors', () => {
    expect(selectorWarnings('article > p')).toEqual([])
  })

  it('warns about classes', () => {
    expect(selectorWarnings('.card')).toHaveLength(1)
    expect(selectorWarnings('article .card')[0]).toMatch(/class/i)
  })

  it('warns about ids', () => {
    expect(selectorWarnings('#main')[0]).toMatch(/id/i)
  })

  it('does not mistake pseudo-elements for classes', () => {
    expect(selectorWarnings('a::after')).toEqual([])
    expect(selectorWarnings('li::marker')).toEqual([])
  })

  it('warns about classes in compound selectors', () => {
    expect(selectorWarnings('div.card')).toHaveLength(1)
    expect(selectorWarnings('div.card')[0]).toMatch(/class/i)
  })

  it('warns about ids in compound selectors', () => {
    expect(selectorWarnings('nav#main')).toHaveLength(1)
    expect(selectorWarnings('nav#main')[0]).toMatch(/id/i)
  })

  it('does not warn about # or . inside attribute values', () => {
    expect(selectorWarnings('[data-note="(#hello)"]')).toEqual([])
    expect(selectorWarnings('[href="a.html"]')).toEqual([])
  })
})
