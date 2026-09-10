/**
 * Regenerates the preset CSS snapshots from the current compiler.
 *
 * Run: npx vite-node scripts/regenerate-snapshots.ts
 *
 * After running, ALWAYS audit `git diff tests/snapshots/` before committing:
 * a regenerated snapshot without reading the diff verifies nothing.
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compileTheme } from '../src/compiler'
import { presets } from '../src/theme/presets'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

for (const [name, theme] of Object.entries(presets)) {
  const safeName = name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-')
  const file = join(root, 'tests', 'snapshots', 'presets', `${safeName}.css`)
  writeFileSync(file, compileTheme(theme))
  console.log('regerado:', safeName)
}
