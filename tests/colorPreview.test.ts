import { describe, expect, it } from 'vitest'
import { presets } from '../src/theme/presets'
import { swatchColor } from '../src/editor/colorPreview'

describe('swatchColor', () => {
  it('resolves var(--token) to the preset hex', () => {
    expect(swatchColor('var(--color-primary)', presets.Minimal)).toBe('#3157d5')
  })

  it('resolves var() chains across tokens', () => {
    // scrollbarTrack is var(--color-surface); Minimal surface is #f7f7f5
    expect(swatchColor('var(--scrollbar-track)', presets.Minimal)).toBe(
      '#f7f7f5',
    )
  })

  it('keeps direct hex', () => {
    expect(swatchColor('#ff0000', presets.Minimal)).toBe('#ff0000')
  })

  it('falls back to black when it cannot preview', () => {
    expect(swatchColor('', presets.Minimal)).toBe('#000000')
    expect(swatchColor('var(--missing)', presets.Minimal)).toBe('#000000')
    expect(
      swatchColor('color-mix(in srgb, red 50%, blue)', presets.Minimal),
    ).toBe('#000000')
  })
})
