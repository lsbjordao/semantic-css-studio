/**
 * Codemod de uso único: cria o preset Açaí (dark-first arroxeado) clonando o
 * Minimal e aplicando overrides curados, com gates de contraste (AA) e
 * validação pelo migrateThemeV2 + compileTheme antes de tocar o arquivo.
 *
 * Rodar uma vez: npx vite-node scripts/add-acai-preset.ts
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compileTheme } from '../src/compiler/compileTheme'
import { minimalPreset } from '../src/theme/presets'
import { migrateThemeV2 } from '../src/theme/migration'
import type { Theme } from '../src/theme/schema'
import { contrastRatio } from '../src/validators/contrast'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function deepMerge(target: Record<string, unknown>, patch: Record<string, unknown>): void {
  for (const [key, value] of Object.entries(patch)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const slot = (target[key] ??= {}) as Record<string, unknown>
      deepMerge(slot, value as Record<string, unknown>)
    } else {
      target[key] = value
    }
  }
}

const theme = structuredClone(minimalPreset) as unknown as Theme
theme.metadata = {
  ...theme.metadata,
  name: 'Açaí',
  description: 'Deep berry purples with vibrant orchid accents for a bold dark theme.',
}
deepMerge(theme.tokens as unknown as Record<string, unknown>, {
  colors: {
    background: '#17121f',
    surface: '#201831',
    surfaceAlt: '#2a2040',
    text: '#efe8f7',
    textMuted: '#a79ec2',
    primary: '#b388e6',
    primaryHover: '#c6a4ee',
    primaryText: '#221031',
    secondary: '#8d7fa8',
    border: '#3a2d55',
    success: '#9ccb8f',
    warning: '#e0b45c',
    danger: '#ef8f8a',
    codeBackground: '#100b18',
    codeText: '#f0e6fa',
  },
  typography: {
    lineHeightBody: '1.7',
    lineHeightHeading: '1.08',
  },
  radius: { radiusSm: '0.375rem', radiusMd: '0.75rem', radiusLg: '1.25rem' },
  shadow: {
    shadowSm: '0 1px 2px rgb(10 4 24 / 0.5)',
    shadowMd: '0 12px 32px rgb(60 30 110 / 0.45)',
    shadowLg: '0 24px 60px rgb(60 30 110 / 0.5)',
  },
})
theme.modes.dark = {
  colors: {
    ...(minimalPreset as unknown as Theme).modes.dark?.colors,
    background: '#120d1a',
    surface: '#1a1328',
    surfaceAlt: '#241a36',
    text: '#efe8f7',
    textMuted: '#a79ec2',
    primary: '#b388e6',
    primaryHover: '#c6a4ee',
    primaryText: '#221031',
    border: '#33264c',
    codeBackground: '#0c0812',
    codeText: '#f0e6fa',
  },
}
for (const [selector, declarations] of Object.entries({
  h1: { fontSize: 'clamp(2.4rem, 7vw, 4.4rem)', letterSpacing: '-0.03em' },
  h2: { fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-0.02em' },
  blockquote: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontStyle: 'italic',
    fontSize: '1.15em',
    color: 'var(--color-text)',
    borderInlineStart: '3px solid var(--color-primary)',
  },
} as Record<string, Record<string, string>>)) {
  theme.layers.elements[selector] = { ...(theme.layers.elements[selector] ?? {}), ...declarations }
}

const validated = migrateThemeV2(theme)

const light = validated.tokens.colors as unknown as Record<string, string>
const dark = (validated.modes.dark?.colors ?? {}) as Record<string, string>
const checks: Array<[string, string | undefined, string | undefined, number]> = [
  ['text/bg', light.text, light.background, 4.5],
  ['muted/bg', light.textMuted, light.background, 4.5],
  ['primaryText/primary', light.primaryText, light.primary, 4.5],
  ['primary/bg', light.primary, light.background, 3],
  ['dark text/bg', dark.text, dark.background, 4.5],
  ['dark muted/bg', dark.textMuted, dark.background, 4.5],
  ['dark primaryText/primary', dark.primaryText, dark.primary, 4.5],
]
for (const [label, fg, bg, min] of checks) {
  if (!fg || !bg) continue
  const ratio = contrastRatio(fg, bg)
  console.log(`  ${ratio.toFixed(2)} (min ${min}) ${label}`)
  if (ratio < min) throw new Error(`Açaí: contraste ${ratio.toFixed(2)} < ${min} em ${label}`)
}
const css = compileTheme(validated)
if (!css.includes('/* Açaí v1.0.0')) throw new Error('Açaí: cabecalho inesperado no CSS')
console.log(`  CSS: ${css.length} bytes, deterministico: ${compileTheme(structuredClone(validated)) === css}`)

const file = join(root, 'src', 'theme', 'presets', 'index.ts')
const source = readFileSync(file, 'utf8')

const anchor = 'export const presets = {'
if (!source.includes(anchor)) throw new Error('ancora do mapa de presets nao encontrada')
const block = `export const acaiPreset = ${JSON.stringify(validated, null, 2)} as unknown as Theme\n`
const withPreset = source.replace(anchor, `${block}\n${anchor}`)

const mapAnchor = '  Sage: sagePreset,\n'
if (!withPreset.includes(mapAnchor)) throw new Error('ancora de registro no mapa nao encontrada')
const next = withPreset.replace(mapAnchor, `${mapAnchor}  'Açaí': acaiPreset,\n`)

writeFileSync(file, next)
console.log('preset Açaí inserido em src/theme/presets/index.ts')
