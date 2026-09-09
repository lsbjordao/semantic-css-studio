import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { compileTheme } from '../src/compiler'
import { presets } from '../src/theme/presets'

function snapshotFile(name: string): URL {
  const safeName = name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-')
  return new URL(`./snapshots/presets/${safeName}.css`, import.meta.url)
}

describe('presets', () => {
  for (const [name, theme] of Object.entries(presets)) {
    it(`${name} compiles to a stable CSS snapshot`, () => {
      const expected = readFileSync(snapshotFile(name), 'utf8')
      expect(compileTheme(theme)).toBe(expected)
    })
  }
})
