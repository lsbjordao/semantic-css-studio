import { describe, expect, it } from 'vitest'
import { demoHtml } from '../src/export/exporters'
import { presets } from '../src/theme/presets'

describe('demoHtml color mode', () => {
  it('defaults to auto (no data-theme, follows prefers-color-scheme)', () => {
    const html = demoHtml(presets.Brutalista)
    expect(html).toContain('<html lang="en">')
    expect(html).not.toContain('data-theme')
  })

  it('locks light so the demo opens light even on a dark OS', () => {
    const html = demoHtml(presets.Brutalista, 'light')
    expect(html).toContain('<html lang="en" data-theme="light">')
  })

  it('locks dark when the preview is dark', () => {
    const html = demoHtml(presets.Brutalista, 'dark')
    expect(html).toContain('<html lang="en" data-theme="dark">')
  })
})
