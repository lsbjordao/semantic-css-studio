import { describe, expect, it } from 'vitest'
import { quartoCss } from '../src/export/quarto'
import { presets } from '../src/theme/presets'

describe('Quarto CSS export', () => {
  it('emits one unlayered theme.css without project configuration', () => {
    const css = quartoCss(presets.Minimal)

    expect(css).not.toContain('@layer')
    expect(css).not.toContain('\nheader {')
    expect(css).not.toContain('\nmain {')
    expect(css).not.toContain('\nnav {')
    expect(css).toContain('body > h1')
    expect(css).toContain('--quarto-content-width: 36rem;')
    expect(css).toContain('--bs-body-bg: var(--color-background);')
    expect(css).toContain('--bs-primary: var(--color-primary);')
    expect(css).toContain('body > :is(h1, h2, h3, h4, h5, h6, p, ul, ol, dl, blockquote, pre, figure, table, form, details, article)')
    expect(css).toContain('.task-list input[type="checkbox"]')
    expect(css).not.toContain('_quarto.yml')
  })
})
