/**
 * One-shot codemod: creates 5 fruity presets (Açaí com Banana, Lima-limão,
 * Morango, Melancia, Fruta-do-conde) and 3 woody ones (Mogno, Carvalho,
 * Jacarandá) by cloning an existing preset and applying curated overrides,
 * with contrast gates (AA) and migrateThemeV2 + compileTheme validation
 * before touching the file.
 *
 * Everything is validated BEFORE any write: if a gate fails, the presets file
 * stays intact. Refuses to run twice (checks exportNames).
 *
 * Run once: npx vite-node scripts/add-fruit-wood-presets.ts
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compileTheme } from '../src/compiler/compileTheme'
import { acaiPreset, minimalPreset } from '../src/theme/presets'
import { migrateThemeV2 } from '../src/theme/migration'
import type { Theme } from '../src/theme/schema'
import { contrastRatio } from '../src/validators/contrast'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function deepMerge(
  target: Record<string, unknown>,
  patch: Record<string, unknown>,
): void {
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
  theme.metadata = {
    ...theme.metadata,
    name: spec.metadata.name,
    description: spec.metadata.description,
  }
  deepMerge(theme.tokens as unknown as Record<string, unknown>, spec.tokens)
  theme.modes.dark = {
    colors: { ...(spec.base.modes.dark?.colors ?? {}), ...spec.darkColors },
  }
  for (const [selector, declarations] of Object.entries(spec.elements)) {
    theme.layers.elements[selector] = {
      ...(theme.layers.elements[selector] ?? {}),
      ...declarations,
    }
  }
  return migrateThemeV2(theme)
}

function gate(spec: PresetSpec, theme: Theme): void {
  const light = theme.tokens.colors as unknown as Record<string, string>
  const dark = (theme.modes.dark?.colors ?? {}) as Record<string, string>
  const checks: Array<
    [string, string | undefined, string | undefined, number]
  > = [
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
    if (ratio < min)
      throw new Error(
        `${spec.mapName}: contrast ${ratio.toFixed(2)} < ${min} on ${label}`,
      )
  }
  const css = compileTheme(theme)
  if (!css.includes(`/* ${spec.mapName} v1.0.0`))
    throw new Error(`${spec.mapName}: unexpected header in CSS`)
  console.log(
    `  CSS: ${css.length} bytes, deterministico: ${compileTheme(structuredClone(theme)) === css}`,
  )
}

const MINIMAL = minimalPreset as unknown as Theme
const ACAI = acaiPreset as unknown as Theme

const specs: PresetSpec[] = [
  {
    exportName: 'acaiBananaPreset',
    mapName: 'Açaí com Banana',
    base: ACAI,
    metadata: {
      name: 'Açaí com Banana',
      description: 'Deep açaí purples with banana-yellow letters and accents.',
    },
    tokens: {
      colors: {
        background: '#1a1026',
        surface: '#251737',
        surfaceAlt: '#302045',
        text: '#f6efdc',
        textMuted: '#b3a3c7',
        primary: '#f2c42c',
        primaryHover: '#ffd94d',
        primaryText: '#2a1230',
        secondary: '#a08fb5',
        border: '#3d2a58',
        success: '#9ccb8f',
        warning: '#f2c42c',
        danger: '#ef8f8a',
        codeBackground: '#120a1c',
        codeText: '#f7ecd2',
      },
    },
    darkColors: {
      background: '#130b1d',
      surface: '#1d1229',
      surfaceAlt: '#281a38',
      text: '#f6efdc',
      textMuted: '#b3a3c7',
      primary: '#f2c42c',
      primaryHover: '#ffd94d',
      primaryText: '#2a1230',
      border: '#36234e',
      codeBackground: '#0d0714',
      codeText: '#f7ecd2',
    },
    elements: {},
  },
  {
    exportName: 'limaLimaoPreset',
    mapName: 'Lima-limão',
    base: MINIMAL,
    metadata: {
      name: 'Lima-limão',
      description:
        'Zesty lime-leaf greens with a squeeze of lemon on pale citrus mist.',
    },
    tokens: {
      colors: {
        background: '#f2f6e5',
        surface: '#e6eed4',
        surfaceAlt: '#d8e3c0',
        text: '#22301a',
        textMuted: '#4f6139',
        primary: '#42751a',
        primaryHover: '#335c12',
        primaryText: '#f6faec',
        secondary: '#6f7a2e',
        border: '#c2cfa4',
        success: '#4d8a1f',
        warning: '#96702a',
        danger: '#b0472f',
        codeBackground: '#22301a',
        codeText: '#edf3da',
      },
      radius: { radiusSm: '0.5rem', radiusMd: '1rem', radiusLg: '1.5rem' },
      shadow: {
        shadowSm: '0 1px 2px rgb(50 80 20 / 0.10)',
        shadowMd: '0 10px 28px rgb(50 80 20 / 0.12)',
        shadowLg: '0 24px 55px rgb(50 80 20 / 0.16)',
      },
    },
    darkColors: {
      background: '#131a0d',
      surface: '#1b2413',
      surfaceAlt: '#26311a',
      text: '#e9f1d8',
      textMuted: '#9dab86',
      primary: '#a4d65c',
      primaryHover: '#bde37e',
      primaryText: '#17220b',
      border: '#31401f',
      codeBackground: '#0c1107',
      codeText: '#edf3da',
    },
    elements: {
      h1: { letterSpacing: '-0.025em' },
      h2: { letterSpacing: '-0.02em' },
    },
  },
  {
    exportName: 'morangoPreset',
    mapName: 'Morango',
    base: MINIMAL,
    metadata: {
      name: 'Morango',
      description:
        'Blush cream with ripe strawberry reds for a sweet, warm read.',
    },
    tokens: {
      colors: {
        background: '#fdf3f1',
        surface: '#f9e4e0',
        surfaceAlt: '#f3d0ca',
        text: '#471b1e',
        textMuted: '#8a5a5e',
        primary: '#cf3249',
        primaryHover: '#ad2940',
        primaryText: '#fff5f3',
        secondary: '#a06a70',
        border: '#e6c2bb',
        success: '#5d8a4a',
        warning: '#a8791f',
        danger: '#cf3249',
        codeBackground: '#471b1e',
        codeText: '#ffe9e4',
      },
      typography: { lineHeightBody: '1.7' },
      radius: { radiusSm: '0.375rem', radiusMd: '0.9rem', radiusLg: '1.4rem' },
      shadow: {
        shadowSm: '0 1px 2px rgb(140 40 55 / 0.10)',
        shadowMd: '0 10px 28px rgb(140 40 55 / 0.12)',
        shadowLg: '0 24px 55px rgb(140 40 55 / 0.16)',
      },
    },
    darkColors: {
      background: '#1f1114',
      surface: '#2a161b',
      surfaceAlt: '#382027',
      text: '#f9e6e3',
      textMuted: '#c09a9e',
      primary: '#f06078',
      primaryHover: '#ff8296',
      primaryText: '#33090f',
      border: '#4c2633',
      codeBackground: '#120809',
      codeText: '#ffe4e1',
    },
    elements: {
      h1: { letterSpacing: '-0.02em' },
      blockquote: { fontStyle: 'italic' },
    },
  },
  {
    exportName: 'melanciaPreset',
    mapName: 'Melancia',
    base: MINIMAL,
    metadata: {
      name: 'Melancia',
      description:
        'Watermelon flesh pinks with rind-green details on pale cream.',
    },
    tokens: {
      colors: {
        background: '#f7f3ee',
        surface: '#f0e6e0',
        surfaceAlt: '#e6d2d2',
        text: '#37222b',
        textMuted: '#7c5c68',
        primary: '#c72f4f',
        primaryHover: '#a82540',
        primaryText: '#fff3f5',
        secondary: '#2e7d4f',
        border: '#dfc5c4',
        success: '#2e7d4f',
        warning: '#a8791f',
        danger: '#c72f4f',
        codeBackground: '#37222b',
        codeText: '#ffe9ee',
      },
      radius: { radiusSm: '0.5rem', radiusMd: '1rem', radiusLg: '1.5rem' },
      shadow: {
        shadowSm: '0 1px 2px rgb(150 50 70 / 0.10)',
        shadowMd: '0 10px 28px rgb(150 50 70 / 0.12)',
        shadowLg: '0 24px 55px rgb(150 50 70 / 0.16)',
      },
    },
    darkColors: {
      background: '#1a1015',
      surface: '#25161d',
      surfaceAlt: '#311d27',
      text: '#f6e3e8',
      textMuted: '#bb95a2',
      primary: '#f4607e',
      primaryHover: '#ff85a0',
      primaryText: '#38060f',
      border: '#472331',
      codeBackground: '#0e070b',
      codeText: '#ffe0e8',
    },
    elements: {
      h1: { letterSpacing: '-0.025em' },
      blockquote: { borderInlineStart: '4px solid var(--color-secondary)' },
    },
  },
  {
    exportName: 'frutaDoCondePreset',
    mapName: 'Fruta-do-conde',
    base: MINIMAL,
    metadata: {
      name: 'Fruta-do-conde',
      description:
        'Custard cream with sugar-apple greens for a soft orchard read.',
    },
    tokens: {
      colors: {
        background: '#f6f4e8',
        surface: '#ebe6d2',
        surfaceAlt: '#ded5ba',
        text: '#2e2b1d',
        textMuted: '#6b6350',
        primary: '#4e7523',
        primaryHover: '#3c5a1a',
        primaryText: '#f7f9ec',
        secondary: '#8a7a3a',
        border: '#d3cba9',
        success: '#4e7523',
        warning: '#9c7a1c',
        danger: '#a8442f',
        codeBackground: '#2e2b1d',
        codeText: '#f1ecd9',
      },
      radius: {
        radiusSm: '0.375rem',
        radiusMd: '0.75rem',
        radiusLg: '1.25rem',
      },
      shadow: {
        shadowSm: '0 1px 2px rgb(90 90 40 / 0.10)',
        shadowMd: '0 10px 28px rgb(90 90 40 / 0.12)',
        shadowLg: '0 24px 55px rgb(90 90 40 / 0.16)',
      },
    },
    darkColors: {
      background: '#15130c',
      surface: '#1e1a10',
      surfaceAlt: '#2a2517',
      text: '#ece5cf',
      textMuted: '#a89f82',
      primary: '#a4c25e',
      primaryHover: '#bcd67e',
      primaryText: '#1a2008',
      border: '#38311c',
      codeBackground: '#0d0b06',
      codeText: '#f0e9d2',
    },
    elements: {
      h1: { letterSpacing: '-0.02em' },
      h2: { letterSpacing: '-0.015em' },
    },
  },
  {
    exportName: 'mognoPreset',
    mapName: 'Mogno',
    base: MINIMAL,
    metadata: {
      name: 'Mogno',
      description:
        'Polished mahogany browns with amber glow for a classic library feel.',
    },
    tokens: {
      colors: {
        background: '#1c1210',
        surface: '#291917',
        surfaceAlt: '#35211d',
        text: '#f0e4d8',
        textMuted: '#b49a86',
        primary: '#d07a4a',
        primaryHover: '#e08f5c',
        primaryText: '#2c1006',
        secondary: '#9a7a63',
        border: '#453027',
        success: '#9ccb8f',
        warning: '#dfa04e',
        danger: '#e07a6a',
        codeBackground: '#100a08',
        codeText: '#f3e2d2',
      },
      typography: {
        fontHeading: 'Georgia, "Times New Roman", serif',
        lineHeightBody: '1.7',
        lineHeightHeading: '1.12',
      },
      radius: { radiusSm: '0.25rem', radiusMd: '0.5rem', radiusLg: '0.75rem' },
      shadow: {
        shadowSm: '0 1px 2px rgb(0 0 0 / 0.4)',
        shadowMd: '0 12px 30px rgb(0 0 0 / 0.42)',
        shadowLg: '0 24px 55px rgb(0 0 0 / 0.48)',
      },
    },
    darkColors: {
      background: '#150d0b',
      surface: '#201310',
      surfaceAlt: '#2b1a16',
      text: '#f0e4d8',
      textMuted: '#b49a86',
      primary: '#d07a4a',
      primaryHover: '#e08f5c',
      primaryText: '#2c1006',
      border: '#3a271f',
      codeBackground: '#0c0705',
      codeText: '#f3e2d2',
    },
    elements: {
      h1: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: 'clamp(2.3rem, 6vw, 4.2rem)',
        letterSpacing: '-0.01em',
      },
      h2: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        letterSpacing: '-0.01em',
      },
      blockquote: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontStyle: 'italic',
        fontSize: '1.15em',
        color: 'var(--color-text)',
      },
    },
  },
  {
    exportName: 'carvalhoPreset',
    mapName: 'Carvalho',
    base: MINIMAL,
    metadata: {
      name: 'Carvalho',
      description:
        'Sturdy honey-oak tones with bronze accents for a warm, grounded read.',
    },
    tokens: {
      colors: {
        background: '#f7f2e8',
        surface: '#efe4d0',
        surfaceAlt: '#e4d3b4',
        text: '#3a2c1c',
        textMuted: '#75603f',
        primary: '#9a6420',
        primaryHover: '#7d5018',
        primaryText: '#fdf6e7',
        secondary: '#7a6a45',
        border: '#d9c6a1',
        success: '#6d8a3f',
        warning: '#9a6420',
        danger: '#b0472f',
        codeBackground: '#3a2c1c',
        codeText: '#f5e8d2',
      },
      radius: { radiusSm: '0.25rem', radiusMd: '0.5rem', radiusLg: '0.875rem' },
      shadow: {
        shadowSm: '0 1px 2px rgb(100 70 25 / 0.12)',
        shadowMd: '0 10px 26px rgb(100 70 25 / 0.14)',
        shadowLg: '0 22px 50px rgb(100 70 25 / 0.18)',
      },
    },
    darkColors: {
      background: '#1a140d',
      surface: '#241b10',
      surfaceAlt: '#302515',
      text: '#eee2cb',
      textMuted: '#b39f78',
      primary: '#d29a4a',
      primaryHover: '#e2ad60',
      primaryText: '#2a1a05',
      border: '#3d2f1a',
      codeBackground: '#100b06',
      codeText: '#f2e4c8',
    },
    elements: {
      h1: { letterSpacing: '-0.02em' },
      blockquote: { borderInlineStart: '5px solid var(--color-primary)' },
    },
  },
  {
    exportName: 'jacarandaPreset',
    mapName: 'Jacarandá',
    base: MINIMAL,
    metadata: {
      name: 'Jacarandá',
      description:
        'Deep rosewood espresso with dusty-rose highlights for quiet drama.',
    },
    tokens: {
      colors: {
        background: '#161216',
        surface: '#211a21',
        surfaceAlt: '#2c232c',
        text: '#ece2e8',
        textMuted: '#ab9aa8',
        primary: '#c083b0',
        primaryHover: '#d29ac2',
        primaryText: '#2b0f24',
        secondary: '#8a7586',
        border: '#3d2f3d',
        success: '#93bd8b',
        warning: '#d9a441',
        danger: '#e08073',
        codeBackground: '#0e0a0e',
        codeText: '#f2e2ec',
      },
      typography: { lineHeightBody: '1.7', lineHeightHeading: '1.1' },
      radius: { radiusSm: '0.375rem', radiusMd: '0.625rem', radiusLg: '1rem' },
      shadow: {
        shadowSm: '0 1px 2px rgb(0 0 0 / 0.4)',
        shadowMd: '0 12px 30px rgb(40 10 35 / 0.45)',
        shadowLg: '0 24px 55px rgb(40 10 35 / 0.5)',
      },
    },
    darkColors: {
      background: '#110d11',
      surface: '#1a141a',
      surfaceAlt: '#251d25',
      text: '#ece2e8',
      textMuted: '#ab9aa8',
      primary: '#c083b0',
      primaryHover: '#d29ac2',
      primaryText: '#2b0f24',
      border: '#342834',
      codeBackground: '#0b070b',
      codeText: '#f2e2ec',
    },
    elements: {
      h1: { fontSize: 'clamp(2.4rem, 7vw, 4.4rem)', letterSpacing: '-0.025em' },
      h2: { letterSpacing: '-0.02em' },
      blockquote: { fontStyle: 'italic', color: 'var(--color-text)' },
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

for (const { spec } of built) {
  if (source.includes(`export const ${spec.exportName} =`)) {
    throw new Error(
      `${spec.exportName} already exists — revert before running again`,
    )
  }
}

const anchor = 'export const presets = {'
if (!source.includes(anchor))
  throw new Error('ancora do mapa de presets nao encontrada')
const blocks = built
  .map(
    ({ spec, theme }) =>
      `export const ${spec.exportName} = ${JSON.stringify(theme, null, 2)} as unknown as Theme\n`,
  )
  .join('\n')
const withPresets = source.replace(anchor, `${blocks}\n${anchor}`)

const mapAnchor = '  Açaí: acaiPreset,\n'
if (!withPresets.includes(mapAnchor))
  throw new Error('ancora de registro no mapa nao encontrada')
const entries = built
  .map(({ spec }) => `  '${spec.mapName}': ${spec.exportName},\n`)
  .join('')
const next = withPresets.replace(mapAnchor, `${mapAnchor}${entries}`)

writeFileSync(file, next)
console.log('8 presets inseridos em src/theme/presets/index.ts')
