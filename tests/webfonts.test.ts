import { describe, expect, it } from 'vitest'
import type { Theme } from '../src/theme/schema'
import { compileTheme, minifyCss } from '../src/compiler'
import { webfontImportRule } from '../src/compiler/webfonts'
import { presets } from '../src/theme/presets'

describe('webfontImportRule', () => {
  it('returns empty when the theme requests no webfonts', () => {
    expect(webfontImportRule(undefined)).toBe('')
    expect(webfontImportRule({})).toBe('')
  })

  it('builds the css2 URL with weights and italic', () => {
    expect(
      webfontImportRule({
        heading: { family: 'Fraunces', weights: [400, 700], italic: true },
      }),
    ).toBe(
      '@import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;1,400;1,700&display=swap");',
    )
  })

  it('bundles distinct families into a single request', () => {
    const rule = webfontImportRule({
      body: { family: 'Newsreader', weights: [400] },
      heading: { family: 'Fraunces', weights: [600] },
    })
    expect(rule).toContain('family=Newsreader:wght@400')
    expect(rule).toContain('family=Fraunces:wght@600')
    expect(rule.match(/@import/g)).toHaveLength(1)
  })

  it('merges the same family requested in two places', () => {
    const rule = webfontImportRule({
      body: { family: 'Fraunces', weights: [400] },
      heading: { family: 'fraunces', weights: [700], italic: true },
    })
    expect(rule.match(/family=Fraunces/g)).toHaveLength(1)
    expect(rule).toContain('1,700')
  })

  it('discards injected families instead of emitting them', () => {
    expect(webfontImportRule({ heading: { family: 'X"); evil(' } })).toBe('')
    expect(webfontImportRule({ heading: { family: '../../etc' } })).toBe('')
  })

  it('discards invalid weights and falls back to the default when none remain', () => {
    expect(
      webfontImportRule({ heading: { family: 'Fraunces', weights: [999] } }),
    ).toContain('wght@400;700')
  })
})

describe('compiler with webfonts', () => {
  it('emits @import before the layer declaration', () => {
    const theme: Theme = structuredClone(presets.Minimal)
    theme.fonts = { heading: { family: 'Fraunces', weights: [600] } }
    const css = compileTheme(theme)
    const atImport = css.indexOf('@import')
    expect(atImport).toBeGreaterThan(-1)
    expect(atImport).toBeLessThan(
      css.indexOf('@layer reset, base, elements, states, responsive;'),
    )
  })

  it('emits no @import for themes without fonts', () => {
    expect(compileTheme(presets.Minimal)).not.toContain('@import')
  })

  it('minifies while preserving @import', () => {
    const theme: Theme = structuredClone(presets.Minimal)
    theme.fonts = {
      heading: { family: 'Fraunces', weights: [400, 700], italic: true },
    }
    const minified = minifyCss(compileTheme(theme))
    expect(minified).toContain(
      '@import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;1,400;1,700&display=swap");',
    )
  })
})
