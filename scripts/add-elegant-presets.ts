/**
 * Codemod de uso único: cria os presets Noir, Porcelain e Sage clonando um
 * preset existente e aplicando overrides curados, com gates de contraste (AA)
 * e validação pelo migrateThemeV2 + compileTheme antes de tocar o arquivo.
 *
 * Rodar uma vez: npx vite-node scripts/add-elegant-presets.ts
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compileTheme } from '../src/compiler/compileTheme'
import { editorialPreset, minimalPreset } from '../src/theme/presets'
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

interface PresetSpec {
  exportName: string
  mapName: string
  base: Theme
  metadata: { name: string; description: string }
  tokens: Record<string, unknown>
  darkColors: Record<string, string>
  elements: Record<string, Record<string, string>>
}

function buildPreset(spec: PresetSpec): Theme {
  const theme = structuredClone(spec.base)
  theme.metadata = { ...theme.metadata, name: spec.metadata.name, description: spec.metadata.description }
  deepMerge(theme.tokens as unknown as Record<string, unknown>, spec.tokens)
  theme.modes.dark = { colors: { ...(spec.base.modes.dark?.colors ?? {}), ...spec.darkColors } }
  for (const [selector, declarations] of Object.entries(spec.elements)) {
    theme.layers.elements[selector] = { ...(theme.layers.elements[selector] ?? {}), ...declarations }
  }
  return migrateThemeV2(theme)
}

function gate(spec: PresetSpec, theme: Theme): void {
  const light = theme.tokens.colors as unknown as Record<string, string>
  const dark = (theme.modes.dark?.colors ?? {}) as Record<string, string>
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
    if (ratio < min) throw new Error(`${spec.mapName}: contraste ${ratio.toFixed(2)} < ${min} em ${label}`)
  }
  const css = compileTheme(theme)
  if (!css.includes(`/* ${spec.mapName} v1.0.0`)) throw new Error(`${spec.mapName}: cabecalho inesperado no CSS`)
  console.log(`  CSS: ${css.length} bytes, deterministico: ${compileTheme(structuredClone(theme)) === css}`)
}

const specs: PresetSpec[] = [
  {
    exportName: 'noirPreset',
    mapName: 'Noir',
    base: minimalPreset as unknown as Theme,
    metadata: {
      name: 'Noir',
      description: 'A dark, editorial theme with champagne accents and serif display type.',
    },
    tokens: {
      colors: {
        background: '#141210',
        surface: '#1d1a16',
        surfaceAlt: '#26211b',
        text: '#ece5d8',
        textMuted: '#a89c86',
        primary: '#d9b36a',
        primaryHover: '#e8c987',
        primaryText: '#1a1409',
        secondary: '#8a7f6a',
        border: '#38312a',
        success: '#9dc08b',
        warning: '#d9a441',
        danger: '#e08073',
        codeBackground: '#0d0b09',
        codeText: '#f0e8d5',
      },
      typography: {
        fontHeading: 'Didot, "Bodoni MT", "Playfair Display", Georgia, serif',
        lineHeightBody: '1.7',
        lineHeightHeading: '1.1',
      },
      radius: { radiusSm: '0.25rem', radiusMd: '0.5rem', radiusLg: '0.9rem' },
      shadow: {
        shadowSm: '0 1px 2px rgb(0 0 0 / 0.35)',
        shadowMd: '0 12px 32px rgb(0 0 0 / 0.38)',
        shadowLg: '0 24px 60px rgb(0 0 0 / 0.45)',
      },
    },
    darkColors: {
      background: '#100e0c',
      surface: '#171310',
      surfaceAlt: '#201a14',
      text: '#ece5d8',
      textMuted: '#a89c86',
      primary: '#d9b36a',
      primaryHover: '#e8c987',
      primaryText: '#1a1409',
      border: '#2e2822',
      codeBackground: '#0d0b09',
      codeText: '#f0e8d5',
    },
    elements: {
      h1: { fontSize: 'clamp(2.4rem, 7vw, 4.5rem)', letterSpacing: '-0.02em' },
      h2: { fontSize: 'clamp(1.8rem, 4.5vw, 2.9rem)', letterSpacing: '-0.015em' },
      blockquote: {
        fontSize: '1.15em',
        fontStyle: 'italic',
        color: 'var(--color-text)',
        borderInlineStart: '2px solid var(--color-primary)',
      },
    },
  },
  {
    exportName: 'porcelainPreset',
    mapName: 'Porcelain',
    base: editorialPreset as unknown as Theme,
    metadata: {
      name: 'Porcelain',
      description: 'Warm paper, terracotta accents and serif headlines for long reads.',
    },
    tokens: {
      colors: {
        background: '#faf7f1',
        surface: '#f3eee4',
        surfaceAlt: '#e9e1d2',
        text: '#2b2620',
        textMuted: '#6a5c48',
        primary: '#b4552d',
        primaryHover: '#93431f',
        primaryText: '#fffaf3',
        secondary: '#7d7466',
        border: '#ded4c2',
        success: '#5d7f4f',
        warning: '#a86e12',
        danger: '#b03a2e',
        codeBackground: '#2b2620',
        codeText: '#f5efe2',
      },
      typography: {
        fontHeading: '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif',
      },
      radius: { radiusMd: '0.75rem', radiusLg: '1.25rem' },
      shadow: {
        shadowSm: '0 1px 2px rgb(80 60 30 / 0.10)',
        shadowMd: '0 10px 28px rgb(80 60 30 / 0.12)',
        shadowLg: '0 24px 55px rgb(80 60 30 / 0.16)',
      },
    },
    darkColors: {
      background: '#1c1814',
      surface: '#241f18',
      surfaceAlt: '#2e271d',
      text: '#efe7d7',
      textMuted: '#b3a48c',
      primary: '#d08a4e',
      primaryHover: '#df9c60',
      primaryText: '#241207',
      border: '#3a3227',
      codeBackground: '#100d0a',
      codeText: '#f2e9d6',
    },
    elements: {
      h1: { letterSpacing: '-0.02em' },
      blockquote: {
        borderInlineStart: '3px solid var(--color-primary)',
        borderBlock: '0',
        padding: 'var(--space-md) var(--space-lg)',
      },
    },
  },
  {
    exportName: 'sagePreset',
    mapName: 'Sage',
    base: minimalPreset as unknown as Theme,
    metadata: {
      name: 'Sage',
      description: 'A cool botanical light theme with deep-green accents and crisp grotesque type.',
    },
    tokens: {
      colors: {
        background: '#f4f6f3',
        surface: '#e9ede6',
        surfaceAlt: '#dde4d8',
        text: '#232b24',
        textMuted: '#57685b',
        primary: '#3f6b4f',
        primaryHover: '#2f5440',
        primaryText: '#f4f8f2',
        secondary: '#64766a',
        border: '#cfd8cc',
        success: '#3f6b4f',
        warning: '#96702a',
        danger: '#a8443a',
        codeBackground: '#232b24',
        codeText: '#e6eee4',
      },
      radius: { radiusSm: '0.375rem', radiusMd: '0.625rem', radiusLg: '1rem' },
      shadow: {
        shadowSm: '0 1px 2px rgb(30 50 35 / 0.10)',
        shadowMd: '0 10px 28px rgb(30 50 35 / 0.12)',
        shadowLg: '0 24px 55px rgb(30 50 35 / 0.16)',
      },
    },
    darkColors: {
      background: '#131814',
      surface: '#1a211c',
      surfaceAlt: '#232c25',
      text: '#e4eae2',
      textMuted: '#9fada1',
      primary: '#8fbf9a',
      primaryHover: '#aad4b4',
      primaryText: '#0f1a12',
      border: '#2c362e',
      codeBackground: '#0c100d',
      codeText: '#e8f0e6',
    },
    elements: {
      h1: { letterSpacing: '-0.025em' },
      h2: { letterSpacing: '-0.02em' },
    },
  },
]

const built = specs.map((spec) => {
  console.log(`${spec.mapName}:`)
  const theme = buildPreset(spec)
  gate(spec, theme)
  return { spec, theme }
})

const file = join(root, 'src', 'theme', 'presets', 'index.ts')
const source = readFileSync(file, 'utf8')

const anchor = 'export const presets = {'
if (!source.includes(anchor)) throw new Error('ancora do mapa de presets nao encontrada')
const blocks = built
  .map(({ spec, theme }) => `export const ${spec.exportName} = ${JSON.stringify(theme, null, 2)} as unknown as Theme\n`)
  .join('\n')
const withPresets = source.replace(anchor, `${blocks}\n${anchor}`)

const mapAnchor = "  'Simple.css': simpleCssPreset,\n"
if (!withPresets.includes(mapAnchor)) throw new Error('ancora de registro no mapa nao encontrada')
const entries = built.map(({ spec }) => `  ${spec.mapName}: ${spec.exportName},\n`).join('')
const next = withPresets.replace(mapAnchor, `${mapAnchor}${entries}`)

writeFileSync(file, next)
console.log('presets inseridos em src/theme/presets/index.ts')
