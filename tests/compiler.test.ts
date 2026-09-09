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
    const positions = Object.keys(presets.Minimal.layers.base).map((selector) =>
      css.indexOf(`:where(${selector}) {`),
    )
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

describe('camadas', () => {
  const css = compileTheme(presets.Minimal)

  it('declara a ordem das camadas antes de qualquer regra', () => {
    const declaration = css.indexOf('@layer reset, base, elements, states, responsive;')
    expect(declaration).toBeGreaterThan(-1)
    expect(declaration).toBeLessThan(css.indexOf('@layer base'))
  })

  it('envolve as regras-base em :where()', () => {
    expect(css).toContain(':where(button) {')
    expect(css).toContain(':where(h1, h2, h3, h4, h5, h6) {')
  })

  it('mantem os tokens no :root sem :where, para que o usuario sobrescreva', () => {
    expect(css).toContain(':root {')
    expect(css).not.toContain(':where(:root)')
  })

  it('nao envolve elements e states em :where()', () => {
    expect(css).toContain('\n  article {')
    expect(css).not.toContain(':where(article)')
  })

  it('agrupa cada camada em um bloco', () => {
    for (const layer of ['base', 'elements', 'states', 'responsive']) {
      expect(css, layer).toContain(`@layer ${layer} {`)
    }
  })

  it('continua deterministico', () => {
    expect(compileTheme(presets.Minimal)).toBe(compileTheme(structuredClone(presets.Minimal)))
  })

  it('minifica sem quebrar as camadas', () => {
    const minified = minifyCss(css)
    expect(minified).toContain('@layer reset,base,elements,states,responsive;')
    expect(minified).toContain(':where(h1,h2,h3,h4,h5,h6){')
  })
})

describe('pre code e sobreposicao contextual, nao regra de base', () => {
  // `pre code` so existe para desfazer o chrome do codigo inline dentro de um
  // <pre>. Em @layer base ele sai como `:where(pre code)`, especificidade 0, e
  // a ordem de camadas vence a especificidade sem excecao — perderia sempre
  // para `code` em @layer elements. Na camada elements as duas regras saem sem
  // :where(), e `pre code` (0,0,2) volta a vencer `code` (0,0,1).
  function slices(css: string) {
    const base = css.slice(css.indexOf('@layer base {'), css.indexOf('@layer elements {'))
    const elements = css.slice(css.indexOf('@layer elements {'), css.indexOf('@layer states {'))
    return { base, elements }
  }

  for (const [name, theme] of Object.entries(presets)) {
    it(`${name}: emite pre code em @layer elements, depois de code`, () => {
      const { base, elements } = slices(compileTheme(theme))
      expect(base).not.toContain(':where(pre code)')
      const code = elements.indexOf('\n  code {')
      const preCode = elements.indexOf('\n  pre code {')
      expect(code).toBeGreaterThan(-1)
      expect(preCode).toBeGreaterThan(-1)
      expect(code).toBeLessThan(preCode)
    })
  }
})
