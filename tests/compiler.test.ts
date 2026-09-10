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

  it('keeps task-list checkboxes inside the content margin', () => {
    const css = compileTheme(presets.Minimal)

    expect(css).toContain('.task-list, .task-list-item {')
    expect(css).toContain('.task-list input[type="checkbox"] {')
    expect(css).toContain('margin-inline: 0 var(--space-sm) !important;')
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

  // Flattened keys like `button:hover` are complete selectors, but sorting them
  // alphabetically would change behavior: `:hover`, `:active` and `:disabled`
  // of the same element share specificity, so the later one wins.
  it('orders state rules by stateOrder, not alphabetically', () => {
    const css = compileTheme(presets.Minimal)
    const at = (selector: string) => css.indexOf(`${selector} {`)
    expect(at('button:hover')).toBeGreaterThan(-1)
    expect(at('button:hover')).toBeLessThan(at('button:focus-visible'))
    expect(at('button:focus-visible')).toBeLessThan(at('button:active'))
    expect(at('button:active')).toBeLessThan(at('button:disabled'))
    expect(at('a:hover')).toBeLessThan(at('a:focus-visible'))
    // and elements stay in elementOrder: input before button
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
    // normal properties stay kebab-cased
    expect(css).toContain('background-color: red;')
  })

  it('Simple.css scroll-behavior goes through the token, not an element rule', () => {
    const css = compileTheme(presets['Simple.css'])
    // Layer beats specificity: an element rule here would render the token
    // inert and the panel control silently inoperative.
    const elementsSlice = css.slice(
      css.indexOf('@layer elements'),
      css.indexOf('@layer states'),
    )
    expect(elementsSlice).not.toContain('scroll-behavior')
    expect(css).toContain('--scroll-behavior: smooth;')
  })
})

describe('layers', () => {
  const css = compileTheme(presets.Minimal)

  it('declares the layer order before any rule', () => {
    const declaration = css.indexOf(
      '@layer reset, base, elements, states, responsive;',
    )
    expect(declaration).toBeGreaterThan(-1)
    expect(declaration).toBeLessThan(css.indexOf('@layer base'))
  })

  it('wraps base rules in :where()', () => {
    expect(css).toContain(':where(button) {')
    expect(css).toContain(':where(h1, h2, h3, h4, h5, h6) {')
  })

  it('keeps tokens in :root without :where, so users can override', () => {
    expect(css).toContain(':root {')
    expect(css).not.toContain(':where(:root)')
  })

  it('does not wrap elements and states in :where()', () => {
    expect(css).toContain('\n  article {')
    expect(css).not.toContain(':where(article)')
  })

  it('groups each layer in one block', () => {
    for (const layer of ['base', 'elements', 'states', 'responsive']) {
      expect(css, layer).toContain(`@layer ${layer} {`)
    }
  })

  it('stays deterministic', () => {
    expect(compileTheme(presets.Minimal)).toBe(
      compileTheme(structuredClone(presets.Minimal)),
    )
  })

  it('minifies without breaking layers', () => {
    const minified = minifyCss(css)
    expect(minified).toContain('@layer reset,base,elements,states,responsive;')
    expect(minified).toContain(':where(h1,h2,h3,h4,h5,h6){')
  })
})

describe('pre code is a contextual override, not a base rule', () => {
  // `pre code` only exists to undo inline-code chrome inside a <pre>. In
  // @layer base it would be emitted as `:where(pre code)` with 0 specificity,
  // and layer order beats specificity without exception — it would always lose
  // to `code` in @layer elements. In the elements layer both rules are emitted
  // without :where(), and `pre code` (0,0,2) beats `code` (0,0,1) again.
  function slices(css: string) {
    const base = css.slice(
      css.indexOf('@layer base {'),
      css.indexOf('@layer elements {'),
    )
    const elements = css.slice(
      css.indexOf('@layer elements {'),
      css.indexOf('@layer states {'),
    )
    return { base, elements }
  }

  for (const [name, theme] of Object.entries(presets)) {
    it(`${name}: emits pre code in @layer elements, after code`, () => {
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
