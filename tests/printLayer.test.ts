import { describe, expect, it } from 'vitest'
import { compileTheme, minifyCss } from '../src/compiler'
import { defaultTheme } from '../src/theme/defaults'
import { migrateThemeV2 } from '../src/theme/migration'
import { seedPrintRules } from '../src/theme/printRules'
import type { Theme } from '../src/theme/schema'

function themeWithPrint(): Theme {
  const theme = structuredClone(defaultTheme) as Theme
  theme.layers.print = {
    body: { background: '#fff', color: '#000' },
    'a[href^="http"]::after': { content: '" (" attr(href) ")"' },
  }
  return theme
}

describe('print layer compilation', () => {
  it('emits nothing while no print rule is enabled', () => {
    const css = compileTheme(defaultTheme)
    expect(css).not.toContain('@media print')
    expect(css).not.toContain('@layer print')
    expect(css).toContain('@layer reset, base, elements, states, responsive;')
  })

  it('declares the print layer last, after responsive', () => {
    const css = compileTheme(themeWithPrint())
    expect(css).toContain(
      '@layer reset, base, elements, states, responsive, print;',
    )
    expect(css.indexOf('@layer print {')).toBeGreaterThan(
      css.indexOf('@layer responsive {'),
    )
  })

  it('wraps print rules in @media print with normal specificity', () => {
    const css = compileTheme(themeWithPrint())
    const print = css.slice(css.indexOf('@layer print {'))
    expect(print).toContain('@media print {')
    expect(print).toContain('body {')
    expect(print).toContain('background: #fff;')
    expect(print).not.toContain(':where(body)')
  })

  it('scopes print selectors for the Quarto exporter', () => {
    const css = compileTheme(themeWithPrint(), {
      scopes: ['body.quarto-document'],
    })
    expect(css).toContain('body.quarto-document a[href^="http"]::after {')
  })

  it('emits the media block directly when layers are disabled', () => {
    const css = compileTheme(themeWithPrint(), { layers: false })
    expect(css).toContain('@media print {')
    expect(css).not.toContain('@layer')
  })

  it('minifies without dropping the print layer', () => {
    const minified = minifyCss(compileTheme(themeWithPrint()))
    expect(minified).toContain('@media print')
    expect(minified).toContain('background:#fff')
  })
})

describe('pseudo-element compilation', () => {
  it('emits pseudo-element rules from the elements layer without :where()', () => {
    const theme = structuredClone(defaultTheme) as Theme
    theme.layers.elements['p::first-letter'] = {
      float: 'left',
      fontSize: '3em',
    }
    const css = compileTheme(theme)
    expect(css).toContain('p::first-letter {')
    expect(css).toContain('font-size: 3em;')
    expect(css).not.toContain(':where(p::first-letter)')
  })

  it('keeps the element before its pseudo-element rules', () => {
    const theme = structuredClone(defaultTheme) as Theme
    theme.layers.elements.p = { color: 'red' }
    theme.layers.elements['p::selection'] = { backgroundColor: 'yellow' }
    const css = compileTheme(theme)
    expect(css.indexOf('p {')).toBeLessThan(css.indexOf('p::selection {'))
  })
})

describe('migration of the optional print layer', () => {
  it('lets a theme without print pass through identical', () => {
    const theme: Theme = structuredClone(defaultTheme)
    expect(migrateThemeV2(theme)).toEqual(theme)
  })

  it('accepts a well-formed print layer', () => {
    const theme = themeWithPrint()
    expect(migrateThemeV2(theme).layers.print).toEqual(theme.layers.print)
  })

  it('refuses a print layer that is not a rule object', () => {
    const theme = structuredClone(defaultTheme) as unknown as Record<
      string,
      unknown
    >
    ;(theme.layers as Record<string, unknown>).print = 'not an object'
    expect(() => migrateThemeV2(theme)).toThrow(/layers\.print/i)
  })

  it('validates the selectors inside the print layer', () => {
    const theme = structuredClone(defaultTheme) as Theme
    theme.layers.print = { 'a {': { color: 'red' } }
    expect(() => migrateThemeV2(theme)).toThrow(
      /Invalid selector in layer print/i,
    )
  })

  it('seeds exactly the selectors the editor offers', () => {
    const theme = themeWithPrint()
    theme.layers.print = seedPrintRules()
    expect(Object.keys(theme.layers.print)).toContain('a[href^="http"]::after')
    expect(migrateThemeV2(theme).layers.print).toEqual(seedPrintRules())
  })
})
