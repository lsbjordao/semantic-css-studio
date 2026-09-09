import { describe, expect, it } from 'vitest'
import { scrollRules } from '../src/compiler/scrollRules'
import { presets } from '../src/theme/presets'

const css = () => scrollRules(presets.Minimal).join('\n\n')

describe('scrollRules', () => {
  it('emite as propriedades padrao sem gate', () => {
    const out = css()
    expect(out).toContain('scrollbar-gutter: var(--scrollbar-gutter);')
    expect(out).toContain('scroll-behavior: var(--scroll-behavior);')
    expect(out).toContain('scroll-padding-top: var(--scroll-padding-top);')
    expect(out).toContain('overscroll-behavior: var(--overscroll-behavior);')
  })

  it('emite as partes WebKit', () => {
    const out = css()
    expect(out).toContain(':where(html)::-webkit-scrollbar {')
    expect(out).toContain(':where(html)::-webkit-scrollbar-track {')
    expect(out).toContain(':where(html)::-webkit-scrollbar-thumb {')
    expect(out).toContain(':where(html)::-webkit-scrollbar-thumb:hover {')
  })

  it('poe scrollbar-color e scrollbar-width atras do gate @supports', () => {
    const out = css()
    // No Chrome 121+, definir scrollbar-color desativa ::-webkit-scrollbar.
    // Emitir os dois sem gate perderia as partes ricas.
    const gate = out.indexOf('@supports not selector(::-webkit-scrollbar)')
    expect(gate).toBeGreaterThan(-1)
    const dentro = out.slice(gate)
    expect(dentro).toContain('scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);')
    expect(dentro).toContain('scrollbar-width: var(--scrollbar-width);')
  })

  it('scrollbar-color e scrollbar-width existem SO dentro do gate', () => {
    const out = css()
    const gate = out.indexOf('@supports not selector(::-webkit-scrollbar)')
    const antes = out.slice(0, gate)
    const dentro = out.slice(gate)

    // Exclusividade nos dois sentidos: fora do gate nenhuma das duas aparece, e
    // dentro do gate ambas aparecem exatamente uma vez. Um emissor que
    // duplicasse scrollbar-width nos dois blocos passaria por uma checagem que
    // so olhasse ausencia.
    for (const prop of ['scrollbar-color', 'scrollbar-width']) {
      expect(antes, `${prop} fora do gate`).not.toContain(prop)
      expect(dentro.split(`${prop}:`).length - 1, `${prop} dentro do gate`).toBe(1)
    }
  })

  it('e deterministico', () => {
    expect(scrollRules(presets.Minimal)).toEqual(scrollRules(structuredClone(presets.Minimal)))
  })
})
