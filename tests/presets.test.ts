import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { compileTheme } from '../src/compiler'
import { presets } from '../src/theme/presets'

// O ambiente jsdom substitui o URL global, e `new URL(rel, import.meta.url)`
// resolve para http://localhost:3000/... em vez de um caminho de arquivo.
// Resolver por node:path mantem o teste correto em qualquer environment.
const here = dirname(fileURLToPath(import.meta.url))

function snapshotFile(name: string): string {
  const safeName = name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-')
  return join(here, 'snapshots', 'presets', `${safeName}.css`)
}

describe('presets', () => {
  for (const [name, theme] of Object.entries(presets)) {
    it(`${name} compiles to a stable CSS snapshot`, () => {
      const expected = readFileSync(snapshotFile(name), 'utf8')
      expect(compileTheme(theme)).toBe(expected)
    })
  }
})
