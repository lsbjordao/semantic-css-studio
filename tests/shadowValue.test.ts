import { describe, expect, it } from 'vitest'
import {
  formatShadowLayers,
  formatShadowValue,
  parseShadowLayers,
  parseShadowValue,
  resolveShadowTokenValue,
} from '../src/editor/shadowValue'

describe('shadow value editor', () => {
  it('parses CSS Color 4 rgb values without splitting the color function', () => {
    expect(parseShadowValue('0 8px 24px rgb(0 0 0 / 0.10)')).toEqual({
      x: '0',
      y: '8px',
      blur: '24px',
      spread: '0px',
      color: 'rgb(0 0 0 / 0.10)',
      inset: false,
    })
  })

  it('round-trips an editable inset shadow', () => {
    const parsed = parseShadowValue('inset 0 2px 4px 1px #00000055')
    expect(parsed && formatShadowValue(parsed)).toBe(
      'inset 0 2px 4px 1px #00000055',
    )
  })

  it('keeps the legacy single-layer parser strict for multiple layers', () => {
    expect(parseShadowValue('0 1px 2px #000, 0 6px 18px #0003')).toBeNull()
  })

  it('parses and formats external and inner layers together', () => {
    const value = '0 1px 2px #000, inset 0 2px 6px #0003'
    const layers = parseShadowLayers(value)
    expect(layers).toEqual([
      {
        x: '0',
        y: '1px',
        blur: '2px',
        spread: '0px',
        color: '#000',
        inset: false,
      },
      {
        x: '0',
        y: '2px',
        blur: '6px',
        spread: '0px',
        color: '#0003',
        inset: true,
      },
    ])
    expect(layers && formatShadowLayers(layers)).toBe(
      '0 1px 2px 0px #000, inset 0 2px 6px 0px #0003',
    )
  })

  it('does not split commas inside color functions', () => {
    const layers = parseShadowLayers(
      '0 1px 2px rgb(0, 0, 0, .2), inset 0 2px 6px #0002',
    )
    expect(layers).toHaveLength(2)
    expect(layers?.[0].color).toBe('rgb(0, 0, 0, .2)')
    expect(layers?.[1].inset).toBe(true)
  })

  it('resolves a semantic shadow token before visual parsing', () => {
    const tokens = {
      shadowSm: '0 2px 8px rgb(0 0 0 / 0.10)',
      shadowMd: '0 8px 24px rgb(0 0 0 / 0.14)',
      shadowLg: '0 16px 48px rgb(0 0 0 / 0.18)',
    }

    const resolved = resolveShadowTokenValue('var(--shadow-sm)', tokens)
    expect(resolved).toBe('0 2px 8px rgb(0 0 0 / 0.10)')
    expect(parseShadowValue(resolved)).not.toBeNull()
  })

  it('keeps custom shadow expressions untouched', () => {
    const tokens = { shadowSm: '0 2px 8px #0002' }
    expect(resolveShadowTokenValue('var(--custom-shadow)', tokens)).toBe(
      'var(--custom-shadow)',
    )
  })
})
