import { describe, expect, it } from 'vitest'
import type { Theme } from '../src/theme/schema'
import { compileTheme, minifyCss } from '../src/compiler'
import { webfontImportRule } from '../src/compiler/webfonts'
import { presets } from '../src/theme/presets'

describe('webfontImportRule', () => {
  it('devolve vazio quando o tema nao pede webfonts', () => {
    expect(webfontImportRule(undefined)).toBe('')
    expect(webfontImportRule({})).toBe('')
  })

  it('monta a URL do css2 com pesos e italico', () => {
    expect(
      webfontImportRule({ heading: { family: 'Fraunces', weights: [400, 700], italic: true } }),
    ).toBe(
      '@import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;1,400;1,700&display=swap");',
    )
  })

  it('acumula familias distintas numa unica requisicao', () => {
    const rule = webfontImportRule({
      body: { family: 'Newsreader', weights: [400] },
      heading: { family: 'Fraunces', weights: [600] },
    })
    expect(rule).toContain('family=Newsreader:wght@400')
    expect(rule).toContain('family=Fraunces:wght@600')
    expect(rule.match(/@import/g)).toHaveLength(1)
  })

  it('unifica a mesma familia pedida em dois lugares', () => {
    const rule = webfontImportRule({
      body: { family: 'Fraunces', weights: [400] },
      heading: { family: 'fraunces', weights: [700], italic: true },
    })
    expect(rule.match(/family=Fraunces/g)).toHaveLength(1)
    expect(rule).toContain('1,700')
  })

  it('descarta familia com injecao em vez de emiti-la', () => {
    expect(webfontImportRule({ heading: { family: 'X"); evil(' } })).toBe('')
    expect(webfontImportRule({ heading: { family: '../../etc' } })).toBe('')
  })

  it('descarta pesos invalidos e cai no padrao quando nao sobra nenhum', () => {
    expect(webfontImportRule({ heading: { family: 'Fraunces', weights: [999] } })).toContain('wght@400;700')
  })
})

describe('compilador com webfonts', () => {
  it('emite o @import antes da declaracao de camadas', () => {
    const theme: Theme = structuredClone(presets.Minimal)
    theme.fonts = { heading: { family: 'Fraunces', weights: [600] } }
    const css = compileTheme(theme)
    const atImport = css.indexOf('@import')
    expect(atImport).toBeGreaterThan(-1)
    expect(atImport).toBeLessThan(css.indexOf('@layer reset, base, elements, states, responsive;'))
  })

  it('nao emite @import para temas sem fonts', () => {
    expect(compileTheme(presets.Minimal)).not.toContain('@import')
  })

  it('minifica preservando o @import', () => {
    const theme: Theme = structuredClone(presets.Minimal)
    theme.fonts = { heading: { family: 'Fraunces', weights: [400, 700], italic: true } }
    const minified = minifyCss(compileTheme(theme))
    expect(minified).toContain('@import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;1,400;1,700&display=swap");')
  })
})
