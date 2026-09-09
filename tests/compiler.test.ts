import { describe, expect, it } from 'vitest'
import { compileTheme, minifyCss } from '../src/compiler'
import { presets } from '../src/theme/presets'
import type { Theme } from '../src/theme/schema'

describe('CSS compiler', () => {
  it('is deterministic', () => {
    const first = compileTheme(presets.Minimal)
    const second = compileTheme(structuredClone(presets.Minimal))
    expect(first).toBe(second)
  })

  it('emits variables, semantic selectors, states, responsive rules and dark mode', () => {
    const css = compileTheme(presets.Minimal)
    expect(css).toContain('--color-primary: #3157d5;')
    expect(css).toContain('article {')
    expect(css).toContain('button:hover {')
    expect(css).toContain('@media (max-width: 768px)')
    expect(css).toContain('@media (prefers-color-scheme: dark)')
    expect(css).toContain(':root[data-theme="dark"]')
  })

  it('minifies generated CSS', () => {
    const readable = compileTheme(presets.Minimal)
    const minified = minifyCss(readable)
    expect(minified.length).toBeLessThan(readable.length)
    expect(minified).not.toContain('\n')
  })
})

describe('layered theme compilation', () => {
  it('emits the scroll tokens in :root', () => {
    const css = compileTheme(presets.Minimal)
    expect(css).toContain('--scrollbar-thumb-hover: var(--color-text-muted);')
    expect(css).toContain('--scroll-padding-top: 0;')
    expect(css).toContain('--overscroll-behavior: auto;')
  })

  it('emits every rule of layers.base, in insertion order', () => {
    const css = compileTheme(presets.Minimal)
    const positions = Object.keys(presets.Minimal.layers.base).map((selector) => css.indexOf(`${selector} {`))
    expect(positions.every((position) => position !== -1)).toBe(true)
    expect([...positions].sort((a, b) => a - b)).toEqual(positions)
  })

  // Chaves achatadas como `button:hover` sao seletores completos, mas ordena-las
  // em alfabetica trocaria o comportamento: `:hover`, `:active` e `:disabled` do
  // mesmo elemento tem a mesma especificidade, entao quem vem depois vence.
  it('orders state rules by stateOrder, not alphabetically', () => {
    const css = compileTheme(presets.Minimal)
    const at = (selector: string) => css.indexOf(`${selector} {`)
    expect(at('button:hover')).toBeGreaterThan(-1)
    expect(at('button:hover')).toBeLessThan(at('button:focus-visible'))
    expect(at('button:focus-visible')).toBeLessThan(at('button:active'))
    expect(at('button:active')).toBeLessThan(at('button:disabled'))
    expect(at('a:hover')).toBeLessThan(at('a:focus-visible'))
    // e os elementos continuam na ordem de elementOrder: input antes de button
    expect(at('input:focus-visible')).toBeLessThan(at('button:hover'))
  })

  it('never kebab-cases a custom property', () => {
    const theme = structuredClone(presets.Minimal) as Theme
    theme.layers.base[':root'] = { '--myVar': '1px', backgroundColor: 'red' }
    theme.layers.responsive.tablet[':root'] = { '--otherVar': '2px' }
    const css = compileTheme(theme)
    expect(css).toContain('--myVar: 1px;')
    expect(css).toContain('--otherVar: 2px;')
    expect(css).not.toContain('--my-var')
    expect(css).not.toContain('--other-var')
    // propriedades normais seguem kebabizadas
    expect(css).toContain('background-color: red;')
  })
})
