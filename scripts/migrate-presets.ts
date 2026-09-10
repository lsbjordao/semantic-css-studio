/**
 * One-shot codemod. Imports the presets and the default theme still in v1,
 * runs the migration and rewrites the files as v2 literals, so presets stay
 * readable and do not need runtime migration.
 *
 * Run once: npx vite-node scripts/migrate-presets.ts
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defaultTheme } from '../src/theme/defaults'
import { migrateThemeV2 } from '../src/theme/migration'
import { presets } from '../src/theme/presets'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function literal(value: unknown): string {
  return JSON.stringify(value, null, 2)
}

/**
 * `Simple.css` -> `simpleCssPreset`, `Minimal` -> `minimalPreset`. Preserves
 * the export names the file already used.
 */
function constName(presetName: string): string {
  const parts = presetName.split(/[^A-Za-z0-9]+/).filter(Boolean)
  const camel = parts
    .map((part, index) =>
      index === 0
        ? part[0].toLowerCase() + part.slice(1)
        : part[0].toUpperCase() + part.slice(1),
    )
    .join('')
  return `${camel}Preset`
}

writeFileSync(
  join(root, 'src/theme/defaults.ts'),
  `import type { Theme } from './schema'\n\n` +
    `export const defaultTheme = ${literal(migrateThemeV2(defaultTheme))} as unknown as Theme\n`,
)

const entries = Object.entries(presets).map(
  ([name, theme]) => [name, constName(name), migrateThemeV2(theme)] as const,
)

const body = entries
  .map(
    ([, variable, theme]) =>
      `export const ${variable} = ${literal(theme)} as unknown as Theme\n`,
  )
  .join('\n')

const map = entries
  .map(
    ([name, variable]) =>
      `  ${/^[A-Za-z_$][\w$]*$/.test(name) ? name : `'${name}'`}: ${variable},`,
  )
  .join('\n')

writeFileSync(
  join(root, 'src/theme/presets/index.ts'),
  `import type { Theme } from '../schema'\n\n` +
    `${body}\n` +
    `export const presets = {\n${map}\n} as const\n\n` +
    `export type PresetName = keyof typeof presets\n`,
)

console.log('defaults e presets reescritos em v2')
