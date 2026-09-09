/**
 * Regera os snapshots de CSS dos presets a partir do compilador atual.
 *
 * Rodar: npx vite-node scripts/regenerate-snapshots.ts
 *
 * Depois de rodar, SEMPRE auditar `git diff tests/snapshots/` antes de
 * commitar: um snapshot regerado sem leitura do diff nao verifica nada.
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
