import { describe, expect, it } from 'vitest'
import { isValidSelector, selectorWarnings } from '../src/compiler/selectorValidation'

describe('isValidSelector', () => {
  it('aceita os seletores que o catalogo produz', () => {
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

  it('rejeita parenteses e colchetes desbalanceados', () => {
    expect(isValidSelector('a:not(')).toBe(false)
    expect(isValidSelector('a[href')).toBe(false)
    expect(isValidSelector('a)')).toBe(false)
  })

  it('rejeita combinador solto', () => {
    expect(isValidSelector('article >')).toBe(false)
    expect(isValidSelector('+ p')).toBe(false)
    expect(isValidSelector('h1,')).toBe(false)
  })

  it('rejeita vazio e aspas abertas', () => {
    expect(isValidSelector('')).toBe(false)
    expect(isValidSelector('   ')).toBe(false)
    expect(isValidSelector('a[href="x]')).toBe(false)
  })

  it('rejeita chave, que indicaria bloco e nao seletor', () => {
    expect(isValidSelector('a { color: red }')).toBe(false)
  })
})

describe('selectorWarnings', () => {
  it('nao avisa sobre seletor semantico', () => {
    expect(selectorWarnings('article > p')).toEqual([])
  })

  it('avisa sobre classe', () => {
    expect(selectorWarnings('.card')).toHaveLength(1)
    expect(selectorWarnings('article .card')[0]).toMatch(/classe/i)
  })

  it('avisa sobre id', () => {
    expect(selectorWarnings('#main')[0]).toMatch(/id/i)
  })

  it('nao confunde pseudo-elemento com classe', () => {
    expect(selectorWarnings('a::after')).toEqual([])
    expect(selectorWarnings('li::marker')).toEqual([])
  })
})
