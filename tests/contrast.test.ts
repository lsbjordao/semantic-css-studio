import { describe, expect, it } from 'vitest'
import { contrastGrade, contrastRatio } from '../src/validators/contrast'

describe('contrast', () => {
  it('calculates black on white as 21:1', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 2)
  })

  it('grades AA and AAA', () => {
    expect(contrastGrade(7.1)).toEqual({ aa: true, aaa: true, label: 'AAA' })
    expect(contrastGrade(5).label).toBe('AA')
    expect(contrastGrade(2).label).toBe('Fail')
  })
})
