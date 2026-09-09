/**
 * Codemod de uso unico. Importa os presets e o tema padrao ainda em v1,
 * roda a migracao e reescreve os arquivos como literais v2, para que os
 * presets sigam legiveis e nao precisem ser migrados em runtime.
 *
 * Rodar uma vez: npx vite-node scripts/migrate-presets.ts
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
 * `Simple.css` -> `simpleCssPreset`, `Minimal` -> `minimalPreset`. Preserva os
 * nomes de export que o arquivo ja usava.
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
