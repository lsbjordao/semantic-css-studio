import { describe, expect, it } from 'vitest'
import { compileTheme, minifyCss } from '../src/compiler'
import { presets } from '../src/theme/presets'

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
