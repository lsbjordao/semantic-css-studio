import { describe, expect, it } from 'vitest'
import { presets } from '../src/theme/presets'
import { swatchColor } from '../src/editor/colorPreview'

describe('swatchColor', () => {
  it('resolve var(--token) para o hex do preset', () => {
    expect(swatchColor('var(--color-primary)', presets.Minimal)).toBe('#3157d5')
  })

  it('resolve cadeia de var() entre tokens', () => {
    // scrollbarTrack vale var(--color-surface); a superficie do Minimal e #f7f7f5
    expect(swatchColor('var(--scrollbar-track)', presets.Minimal)).toBe('#f7f7f5')
  })

  it('mantem hex direto', () => {
    expect(swatchColor('#ff0000', presets.Minimal)).toBe('#ff0000')
  })

  it('cai no preto quando nao ha como prever', () => {
    expect(swatchColor('', presets.Minimal)).toBe('#000000')
    expect(swatchColor('var(--inexistente)', presets.Minimal)).toBe('#000000')
    expect(swatchColor('color-mix(in srgb, red 50%, blue)', presets.Minimal)).toBe('#000000')
  })
})
