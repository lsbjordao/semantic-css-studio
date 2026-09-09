import { describe, expect, it } from 'vitest'
import { defaultTheme } from '../src/theme/defaults'
import { migrateTheme } from '../src/theme/migration'

describe('theme migration / validation', () => {
  it('accepts schema v1', () => {
    expect(migrateTheme(defaultTheme).metadata.name).toBe('Minimal')
  })

  it('rejects invalid data', () => {
    expect(() => migrateTheme({ schemaVersion: 1 })).toThrow(/metadata/i)
  })

  it('rejects future schemas', () => {
    expect(() => migrateTheme({ ...defaultTheme, schemaVersion: 999 })).toThrow(/newer/i)
  })
})
