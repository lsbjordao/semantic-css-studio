import { describe, expect, it } from 'vitest'
import {
  adjustCssNumericValue,
  isSteppableCssNumericValue,
} from '../src/editor/cssValue'

describe('CSS numeric steppers', () => {
  it('preserves px units', () => {
    expect(adjustCssNumericValue('16px', 1)).toBe('17px')
    expect(adjustCssNumericValue('16px', -1)).toBe('15px')
  })

  it('uses an eighth-rem step for rem values', () => {
    expect(adjustCssNumericValue('1rem', 1)).toBe('1.125rem')
    expect(adjustCssNumericValue('1rem', -1)).toBe('0.875rem')
  })

  it('supports unitless line-height-style values', () => {
    expect(adjustCssNumericValue('1.5', 1, '', 0.05)).toBe('1.55')
  })

  it('allows a blank value to start from a sensible unit', () => {
    expect(adjustCssNumericValue('', 1, 'rem')).toBe('0.125rem')
  })

  it('does not treat complex CSS expressions as numeric', () => {
    expect(isSteppableCssNumericValue('clamp(1rem, 3vw, 2rem)')).toBe(false)
    expect(isSteppableCssNumericValue('var(--space-md)')).toBe(false)
  })
})
