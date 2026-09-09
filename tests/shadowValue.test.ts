import { describe, expect, it } from 'vitest'
import { formatShadowValue, parseShadowValue } from '../src/editor/shadowValue'

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
})
