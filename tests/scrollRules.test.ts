import { describe, expect, it } from 'vitest'
import { scrollRules } from '../src/compiler/scrollRules'
import { presets } from '../src/theme/presets'

const css = () => scrollRules(presets.Minimal).join('\n\n')

describe('scrollRules', () => {
  it('emits the default properties without a gate', () => {
    const out = css()
    expect(out).toContain('scrollbar-gutter: var(--scrollbar-gutter);')
    expect(out).toContain('scroll-behavior: var(--scroll-behavior);')
    expect(out).toContain('scroll-padding-top: var(--scroll-padding-top);')
    expect(out).toContain('overscroll-behavior: var(--overscroll-behavior);')
  })

  it('emits the WebKit parts', () => {
    const out = css()
    expect(out).toContain(':where(html)::-webkit-scrollbar {')
    expect(out).toContain(':where(html)::-webkit-scrollbar-track {')
    expect(out).toContain(':where(html)::-webkit-scrollbar-thumb {')
    expect(out).toContain(':where(html)::-webkit-scrollbar-thumb:hover {')
  })

  it('puts scrollbar-color and scrollbar-width behind the @supports gate', () => {
    const out = css()
    // On Chrome 121+, setting scrollbar-color disables ::-webkit-scrollbar.
    // Emitting both without a gate would lose the rich parts.
    const gate = out.indexOf('@supports not selector(::-webkit-scrollbar)')
    expect(gate).toBeGreaterThan(-1)
    const inside = out.slice(gate)
    expect(inside).toContain(
      'scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);',
    )
    expect(inside).toContain('scrollbar-width: var(--scrollbar-width);')
  })

  it('scrollbar-color and scrollbar-width exist ONLY inside the gate', () => {
    const out = css()
    const gate = out.indexOf('@supports not selector(::-webkit-scrollbar)')
    const before = out.slice(0, gate)
    const inside = out.slice(gate)

    // Exclusivity in both directions: outside the gate neither appears, and
    // inside the gate both appear exactly once. An emitter duplicating
    // scrollbar-width in both blocks would pass a check looking only at
    // absence.
    for (const prop of ['scrollbar-color', 'scrollbar-width']) {
      expect(before, `${prop} outside the gate`).not.toContain(prop)
      expect(
        inside.split(`${prop}:`).length - 1,
        `${prop} inside the gate`,
      ).toBe(1)
    }
  })

  it('is deterministic', () => {
    expect(scrollRules(presets.Minimal)).toEqual(
      scrollRules(structuredClone(presets.Minimal)),
    )
  })
})
