import { describe, expect, it } from 'vitest'
import { formatShadowValue, parseShadowValue, resolveShadowTokenValue } from '../src/editor/shadowValue'

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
    expect(parsed && formatShadowValue(parsed)).toBe('inset 0 2px 4px 1px #00000055')
  })

  it('falls back to raw editing for multiple shadow layers', () => {
    expect(parseShadowValue('0 1px 2px #000, 0 6px 18px #0003')).toBeNull()
  })

  it('resolves a semantic shadow token before visual parsing', () => {
    const tokens = {
      shadowSm: '0 2px 8px rgb(0 0 0 / 0.10)',
      shadowMd: '0 8px 24px rgb(0 0 0 / 0.14)',
      shadowLg: '0 16px 48px rgb(0 0 0 / 0.18)',
    }
    expect(resolveShadowTokenValue('var(--shadow-sm)', tokens))
      .toBe('0 2px 8px rgb(0 0 0 / 0.10)')
    expect(parseShadowValue(resolveShadowTokenValue('var(--shadow-sm)', tokens))).not.toBeNull()
  })

  it('keeps custom shadow expressions untouched', () => {
    const tokens = { shadowSm: '0 2px 8px #0002' }
    expect(resolveShadowTokenValue('var(--custom-shadow)', tokens)).toBe('var(--custom-shadow)')
  })
})
