/**
 * One-shot codemod: creates 11 varied presets (Oceano, Floresta, Pôr-do-sol,
 * Lavanda, Cyberpunk, Drácula, Meia-noite, Brutalista, Jornal, Algodão-doce,
 * Corporativo) by cloning an existing preset and applying curated overrides,
 * with contrast gates (AA) and migrateThemeV2 + compileTheme validation
 * before touching the file.
 *
 * Everything is validated BEFORE any write: if a gate fails, the presets file
 * stays intact. Refuses to run twice (checks exportNames).
 *
 * Run once: npx vite-node scripts/add-varied-presets.ts
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compileTheme } from '../src/compiler/compileTheme'
import {
  editorialPreset,
  minimalPreset,
  terminalPreset,
} from '../src/theme/presets'
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
    console.log(`  ${ratio?.toFixed(2)} (min ${min}) ${label}`)
    if (ratio === null || ratio < min)
      throw new Error(`${spec.mapName}: contrast ${ratio} < ${min} on ${label}`)
  }
  const css = compileTheme(theme)
  if (!css.includes(`/* ${spec.mapName} v1.0.0`))
    throw new Error(`${spec.mapName}: unexpected header in CSS`)
  console.log(
    `  CSS: ${css.length} bytes, deterministico: ${compileTheme(structuredClone(theme)) === css}`,
  )
}

const MINIMAL = minimalPreset as unknown as Theme
const EDITORIAL = editorialPreset as unknown as Theme
const TERMINAL = terminalPreset as unknown as Theme

const specs: PresetSpec[] = [
  {
    exportName: 'oceanoPreset',
    mapName: 'Oceano',
    base: MINIMAL,
    metadata: {
      name: 'Oceano',
      description:
        'Cool aqua mist with deep-sea navy text and ocean-blue accents.',
    },
    tokens: {
      colors: {
        background: '#eef6f8',
        surface: '#ffffff',
        surfaceAlt: '#dcebf1',
        text: '#0f2a36',
        textMuted: '#46626f',
        primary: '#0b6e99',
        primaryHover: '#095a7d',
        primaryText: '#ffffff',
        secondary: '#2a9db8',
        border: '#c3d9e2',
        success: '#1e7d4f',
        warning: '#9a6100',
        danger: '#b42318',
        codeBackground: '#0f2a36',
        codeText: '#dff1f7',
      },
      radius: {
        radiusSm: '0.375rem',
        radiusMd: '0.75rem',
        radiusLg: '1.25rem',
      },
      shadow: {
        shadowSm: '0 1px 2px rgb(11 110 153 / 0.12)',
        shadowMd: '0 10px 28px rgb(11 110 153 / 0.14)',
        shadowLg: '0 24px 55px rgb(11 110 153 / 0.18)',
      },
    },
    darkColors: {
      background: '#081b24',
      surface: '#0e2530',
      surfaceAlt: '#153140',
      text: '#d9ecf3',
      textMuted: '#93b8c7',
      primary: '#5ec8e8',
      primaryHover: '#86d6ef',
      primaryText: '#06121f',
      border: '#234353',
      codeBackground: '#040f14',
      codeText: '#d9ecf3',
    },
    elements: {
      h1: { letterSpacing: '-0.025em' },
      h2: { letterSpacing: '-0.02em' },
      blockquote: { borderInlineStart: '4px solid var(--color-secondary)' },
    },
  },
  {
    exportName: 'florestaPreset',
    mapName: 'Floresta',
    base: MINIMAL,
    metadata: {
      name: 'Floresta',
      description:
        'Rich emerald greens with serif headlines for a deep-woods read.',
    },
    tokens: {
      colors: {
        background: '#eef3e8',
        surface: '#e4ebda',
        surfaceAlt: '#d3ddc4',
        text: '#1e2d1f',
        textMuted: '#4d6350',
        primary: '#2f6b2e',
        primaryHover: '#245423',
        primaryText: '#f5f9f0',
        secondary: '#6a8a3f',
        border: '#c2cfb2',
        success: '#2f6b2e',
        warning: '#8a6d1c',
        danger: '#a8442f',
        codeBackground: '#1e2d1f',
        codeText: '#e4efe0',
      },
      typography: {
        fontHeading: 'Georgia, "Times New Roman", serif',
        lineHeightBody: '1.7',
      },
      radius: { radiusSm: '0.375rem', radiusMd: '0.75rem', radiusLg: '1.5rem' },
      shadow: {
        shadowSm: '0 1px 2px rgb(35 80 40 / 0.12)',
        shadowMd: '0 10px 28px rgb(35 80 40 / 0.14)',
        shadowLg: '0 24px 55px rgb(35 80 40 / 0.18)',
      },
    },
    darkColors: {
      background: '#0f1710',
      surface: '#182117',
      surfaceAlt: '#222f20',
      text: '#e2eddf',
      textMuted: '#9db3a0',
      primary: '#8fce8a',
      primaryHover: '#a9dba9',
      primaryText: '#0d1a0e',
      border: '#2c3a2a',
      codeBackground: '#090e09',
      codeText: '#e2eddf',
    },
    elements: {
      h1: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        letterSpacing: '-0.02em',
      },
      h2: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        letterSpacing: '-0.015em',
      },
      blockquote: { fontStyle: 'italic', fontSize: '1.12em' },
    },
  },
  {
    exportName: 'porDoSolPreset',
    mapName: 'Pôr-do-sol',
    base: MINIMAL,
    metadata: {
      name: 'Pôr-do-sol',
      description: 'Warm cream with burnt-orange glow for a golden-hour read.',
    },
    tokens: {
      colors: {
        background: '#fff5ea',
        surface: '#ffeddb',
        surfaceAlt: '#f9ddc0',
        text: '#3d2314',
        textMuted: '#6e4a38',
        primary: '#c2410c',
        primaryHover: '#9e3409',
        primaryText: '#ffffff',
        secondary: '#d97706',
        border: '#e8cfae',
        success: '#5d8a3f',
        warning: '#b45309',
        danger: '#b42318',
        codeBackground: '#3d2314',
        codeText: '#ffe8d4',
      },
      typography: { lineHeightHeading: '1.1' },
      radius: { radiusSm: '0.5rem', radiusMd: '1rem', radiusLg: '1.5rem' },
      shadow: {
        shadowSm: '0 1px 2px rgb(180 90 20 / 0.12)',
        shadowMd: '0 10px 28px rgb(180 90 20 / 0.15)',
        shadowLg: '0 24px 55px rgb(180 90 20 / 0.20)',
      },
    },
    darkColors: {
      background: '#1f1008',
      surface: '#2b170c',
      surfaceAlt: '#3a2010',
      text: '#f7e3d3',
      textMuted: '#c49a80',
      primary: '#ff9a5c',
      primaryHover: '#ffb183',
      primaryText: '#241005',
      border: '#4a2b18',
      codeBackground: '#100805',
      codeText: '#f7e3d3',
    },
    elements: {
      h1: { fontSize: 'clamp(2.4rem, 7vw, 4.5rem)', letterSpacing: '-0.02em' },
      h2: { letterSpacing: '-0.015em' },
      blockquote: { fontStyle: 'italic' },
    },
  },
  {
    exportName: 'lavandaPreset',
    mapName: 'Lavanda',
    base: MINIMAL,
    metadata: {
      name: 'Lavanda',
      description:
        'Soft lilac mist with violet accents for a calm, dreamy read.',
    },
    tokens: {
      colors: {
        background: '#f4f1fa',
        surface: '#eae4f5',
        surfaceAlt: '#d9cfee',
        text: '#2d2540',
        textMuted: '#5f5478',
        primary: '#6d28d9',
        primaryHover: '#5a20b5',
        primaryText: '#ffffff',
        secondary: '#8b5cf6',
        border: '#d2c7e8',
        success: '#4d8a4a',
        warning: '#96702a',
        danger: '#b42318',
        codeBackground: '#2d2540',
        codeText: '#e8e2f8',
      },
      radius: {
        radiusSm: '0.375rem',
        radiusMd: '0.75rem',
        radiusLg: '1.25rem',
      },
      shadow: {
        shadowSm: '0 1px 2px rgb(110 80 180 / 0.12)',
        shadowMd: '0 10px 28px rgb(110 80 180 / 0.14)',
        shadowLg: '0 24px 55px rgb(110 80 180 / 0.18)',
      },
    },
    darkColors: {
      background: '#17131f',
      surface: '#201b2c',
      surfaceAlt: '#2c2439',
      text: '#e6e0f5',
      textMuted: '#a99ac7',
      primary: '#b79dff',
      primaryHover: '#c9b3ff',
      primaryText: '#1c1033',
      border: '#3a3049',
      codeBackground: '#0e0a14',
      codeText: '#e6e0f5',
    },
    elements: {
      h1: { letterSpacing: '-0.025em' },
      h2: { letterSpacing: '-0.02em' },
    },
  },
  {
    exportName: 'cyberpunkPreset',
    mapName: 'Cyberpunk',
    base: TERMINAL,
    metadata: {
      name: 'Cyberpunk',
      description:
        'Neon pink and cyan on near-black for a high-voltage night drive.',
    },
    tokens: {
      colors: {
        background: '#0a0a12',
        surface: '#131320',
        surfaceAlt: '#1c1c30',
        text: '#e8f0ff',
        textMuted: '#8b93b0',
        primary: '#ff2e88',
        primaryHover: '#ff5fa3',
        primaryText: '#1a0010',
        secondary: '#00e5ff',
        border: '#2e2e4d',
        success: '#00e676',
        warning: '#ffea00',
        danger: '#ff3131',
        codeBackground: '#050508',
        codeText: '#c9f3ff',
      },
      shadow: {
        shadowSm: '0 0 8px rgb(255 46 136 / 0.35)',
        shadowMd: '0 0 20px rgb(255 46 136 / 0.30)',
        shadowLg: '0 0 40px rgb(0 229 255 / 0.25)',
      },
    },
    darkColors: {
      background: '#06060c',
      surface: '#0e0e18',
      surfaceAlt: '#171726',
      text: '#e8f0ff',
      textMuted: '#8b93b0',
      primary: '#ff2e88',
      primaryHover: '#ff5fa3',
      primaryText: '#1a0010',
      border: '#26263c',
      codeBackground: '#030304',
      codeText: '#c9f3ff',
    },
    elements: {
      h1: { color: 'var(--color-primary)', letterSpacing: '0.05em' },
      h2: { color: 'var(--color-secondary)', letterSpacing: '0.04em' },
      a: { color: 'var(--color-secondary)', textDecoration: 'underline' },
      blockquote: { borderInlineStart: '4px solid var(--color-secondary)' },
      button: { textTransform: 'uppercase', letterSpacing: '0.08em' },
      code: { color: 'var(--color-secondary)' },
    },
  },
  {
    exportName: 'draculaPreset',
    mapName: 'Drácula',
    base: MINIMAL,
    metadata: {
      name: 'Drácula',
      description:
        'The beloved dark purple palette with pink and cyan accents.',
    },
    tokens: {
      colors: {
        background: '#282a36',
        surface: '#343746',
        surfaceAlt: '#44475a',
        text: '#f8f8f2',
        textMuted: '#a0a8c8',
        primary: '#bd93f9',
        primaryHover: '#d0aefb',
        primaryText: '#241531',
        secondary: '#8be9fd',
        border: '#4a4e69',
        success: '#50fa7b',
        warning: '#ffb86c',
        danger: '#ff5555',
        codeBackground: '#1e1f29',
        codeText: '#f8f8f2',
      },
      radius: { radiusSm: '0.375rem', radiusMd: '0.5rem', radiusLg: '0.75rem' },
      shadow: {
        shadowSm: '0 1px 2px rgb(0 0 0 / 0.4)',
        shadowMd: '0 12px 30px rgb(0 0 0 / 0.45)',
        shadowLg: '0 24px 55px rgb(40 20 60 / 0.5)',
      },
    },
    darkColors: {
      background: '#191a23',
      surface: '#22232e',
      surfaceAlt: '#2f3142',
      text: '#f8f8f2',
      textMuted: '#a0a8c8',
      primary: '#bd93f9',
      primaryHover: '#d0aefb',
      primaryText: '#241531',
      border: '#3d4058',
      codeBackground: '#121319',
      codeText: '#f8f8f2',
    },
    elements: {
      h1: { letterSpacing: '-0.02em' },
      h2: { letterSpacing: '-0.015em' },
      code: { color: 'var(--color-secondary)' },
      pre: { border: '1px solid var(--color-border)' },
    },
  },
  {
    exportName: 'meiaNoitePreset',
    mapName: 'Meia-noite',
    base: MINIMAL,
    metadata: {
      name: 'Meia-noite',
      description:
        'Deep navy night with electric-blue highlights for late sessions.',
    },
    tokens: {
      colors: {
        background: '#0b1220',
        surface: '#131c30',
        surfaceAlt: '#1c2942',
        text: '#dbe4f5',
        textMuted: '#93a1bd',
        primary: '#5b9cff',
        primaryHover: '#7fb3ff',
        primaryText: '#06121f',
        secondary: '#7dd3fc',
        border: '#25324b',
        success: '#4ade80',
        warning: '#fbbf24',
        danger: '#f87171',
        codeBackground: '#060b14',
        codeText: '#dbe4f5',
      },
      radius: { radiusSm: '0.375rem', radiusMd: '0.625rem', radiusLg: '1rem' },
      shadow: {
        shadowSm: '0 1px 2px rgb(0 0 0 / 0.45)',
        shadowMd: '0 12px 32px rgb(0 0 0 / 0.5)',
        shadowLg: '0 24px 60px rgb(20 60 140 / 0.35)',
      },
    },
    darkColors: {
      background: '#070d18',
      surface: '#0e1626',
      surfaceAlt: '#16233a',
      text: '#dbe4f5',
      textMuted: '#93a1bd',
      primary: '#5b9cff',
      primaryHover: '#7fb3ff',
      primaryText: '#06121f',
      border: '#1e2a42',
      codeBackground: '#04070e',
      codeText: '#dbe4f5',
    },
    elements: {
      h1: { letterSpacing: '-0.025em' },
      h2: { letterSpacing: '-0.02em' },
      blockquote: { color: 'var(--color-text)' },
    },
  },
  {
    exportName: 'brutalistaPreset',
    mapName: 'Brutalista',
    base: MINIMAL,
    metadata: {
      name: 'Brutalista',
      description:
        'Raw black borders, hard shadows and uppercase type. No softness.',
    },
    tokens: {
      colors: {
        background: '#ffffff',
        surface: '#ffffff',
        surfaceAlt: '#ffdd00',
        text: '#000000',
        textMuted: '#333333',
        primary: '#0000ee',
        primaryHover: '#0000bb',
        primaryText: '#ffffff',
        secondary: '#ffdd00',
        border: '#000000',
        success: '#007700',
        warning: '#b26a00',
        danger: '#cc0000',
        codeBackground: '#111111',
        codeText: '#f5f5f5',
      },
      typography: {
        fontBody: 'Arial, Helvetica, sans-serif',
        fontHeading: 'Arial, Helvetica, sans-serif',
        lineHeightBody: '1.5',
        lineHeightHeading: '1.05',
      },
      radius: { radiusSm: '0', radiusMd: '0', radiusLg: '0', radiusFull: '0' },
      shadow: {
        shadowSm: '3px 3px 0 #000000',
        shadowMd: '5px 5px 0 #000000',
        shadowLg: '8px 8px 0 #000000',
      },
    },
    darkColors: {
      background: '#0a0a0a',
      surface: '#141414',
      surfaceAlt: '#3a3405',
      text: '#f5f5f5',
      textMuted: '#b5b5b5',
      primary: '#7a86ff',
      primaryHover: '#9aa3ff',
      primaryText: '#060614',
      border: '#f5f5f5',
      codeBackground: '#000000',
      codeText: '#f5f5f5',
    },
    elements: {
      article: {
        border: '3px solid var(--color-border)',
        borderRadius: '0',
        boxShadow: 'var(--shadow-md)',
        backgroundColor: 'var(--color-background)',
      },
      h1: {
        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
        textTransform: 'uppercase',
        letterSpacing: '-0.01em',
      },
      h2: {
        textTransform: 'uppercase',
        letterSpacing: '0.01em',
        borderBottom: '3px solid var(--color-border)',
        paddingBottom: '0.25em',
      },
      a: { textDecoration: 'underline', textDecorationThickness: '2px' },
      blockquote: {
        borderInlineStart: '6px solid var(--color-border)',
        backgroundColor: 'var(--color-surface-alt)',
        color: 'var(--color-text)',
        fontStyle: 'normal',
      },
      button: {
        border: '3px solid var(--color-border)',
        borderRadius: '0',
        boxShadow: 'var(--shadow-sm)',
        textTransform: 'uppercase',
      },
      code: { border: '2px solid var(--color-border)', borderRadius: '0' },
      details: { border: '3px solid var(--color-border)', borderRadius: '0' },
      th: {
        backgroundColor: 'var(--color-text)',
        color: 'var(--color-background)',
      },
      img: { border: '3px solid var(--color-border)', borderRadius: '0' },
      input: { border: '3px solid var(--color-border)', borderRadius: '0' },
    },
  },
  {
    exportName: 'jornalPreset',
    mapName: 'Jornal',
    base: EDITORIAL,
    metadata: {
      name: 'Jornal',
      description:
        'Newsprint paper, serif columns and double rules. Extra, extra!',
    },
    tokens: {
      colors: {
        background: '#f7f3e8',
        surface: '#fffdf6',
        surfaceAlt: '#ece4d0',
        text: '#1a1a1a',
        textMuted: '#5a5148',
        primary: '#8c1d1d',
        primaryHover: '#6f1414',
        primaryText: '#fff8f0',
        secondary: '#4a5a6a',
        border: '#d8cdb4',
        success: '#4d7a3a',
        warning: '#9c6b12',
        danger: '#8c1d1d',
        codeBackground: '#1a1a1a',
        codeText: '#f2ecdc',
      },
      typography: {
        fontBody: 'Georgia, "Times New Roman", serif',
        fontHeading: '"Times New Roman", Times, Georgia, serif',
        lineHeightBody: '1.7',
      },
      radius: { radiusSm: '0', radiusMd: '0', radiusLg: '0' },
      shadow: { shadowSm: 'none', shadowMd: 'none', shadowLg: 'none' },
    },
    darkColors: {
      background: '#141210',
      surface: '#1d1a15',
      surfaceAlt: '#282219',
      text: '#ece5d8',
      textMuted: '#a89c86',
      primary: '#d9b36a',
      primaryHover: '#e8c987',
      primaryText: '#1a1409',
      border: '#38312a',
      codeBackground: '#0d0b09',
      codeText: '#ece5d8',
    },
    elements: {
      article: {
        backgroundColor: 'transparent',
        border: '0',
        padding: '0',
        boxShadow: 'none',
      },
      h1: {
        fontSize: 'clamp(2.6rem, 7vw, 5rem)',
        textAlign: 'center',
        letterSpacing: '-0.01em',
      },
      h2: {
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        borderBottom: '3px double var(--color-border)',
        paddingBottom: '0.3em',
      },
      blockquote: {
        fontStyle: 'italic',
        textAlign: 'center',
        fontSize: '1.25em',
        borderInlineStart: '0',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--space-lg) var(--space-md)',
      },
      th: {
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontSize: 'var(--font-size-sm)',
      },
      figcaption: { fontStyle: 'italic' },
    },
  },
  {
    exportName: 'algodaoDocePreset',
    mapName: 'Algodão-doce',
    base: MINIMAL,
    metadata: {
      name: 'Algodão-doce',
      description:
        'Candy pinks and baby blues with pill shapes for a sweet, soft read.',
    },
    tokens: {
      colors: {
        background: '#fff7fb',
        surface: '#ffeef6',
        surfaceAlt: '#e0f0fc',
        text: '#4a2b3f',
        textMuted: '#75536a',
        primary: '#c2256a',
        primaryHover: '#a31d57',
        primaryText: '#ffffff',
        secondary: '#2b8fd4',
        border: '#f2c9dd',
        success: '#4d9a5b',
        warning: '#b07d10',
        danger: '#c2256a',
        codeBackground: '#4a2b3f',
        codeText: '#ffe9f3',
      },
      typography: {
        fontBody: 'ui-rounded, "SF Pro Rounded", Inter, system-ui, sans-serif',
        fontHeading:
          'ui-rounded, "SF Pro Rounded", Inter, system-ui, sans-serif',
        lineHeightBody: '1.7',
      },
      radius: { radiusSm: '0.5rem', radiusMd: '1rem', radiusLg: '1.75rem' },
      shadow: {
        shadowSm: '0 1px 2px rgb(200 60 130 / 0.12)',
        shadowMd: '0 10px 28px rgb(200 60 130 / 0.15)',
        shadowLg: '0 24px 55px rgb(200 60 130 / 0.20)',
      },
    },
    darkColors: {
      background: '#201219',
      surface: '#2c1824',
      surfaceAlt: '#3a2230',
      text: '#f9e6ef',
      textMuted: '#c49ab2',
      primary: '#ff8fc0',
      primaryHover: '#ffaed3',
      primaryText: '#3a0a20',
      border: '#4e2c40',
      codeBackground: '#12080e',
      codeText: '#ffd9e8',
    },
    elements: {
      article: {
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
      },
      h1: { letterSpacing: '-0.02em' },
      button: { borderRadius: 'var(--radius-full)', padding: '0.7rem 1.4rem' },
      details: { borderRadius: 'var(--radius-lg)' },
      blockquote: { borderRadius: '0 var(--radius-lg) var(--radius-lg) 0' },
    },
  },
  {
    exportName: 'corporativoPreset',
    mapName: 'Corporativo',
    base: MINIMAL,
    metadata: {
      name: 'Corporativo',
      description:
        'Crisp slate and corporate blue with sharp cards for business docs.',
    },
    tokens: {
      colors: {
        background: '#ffffff',
        surface: '#f1f5f9',
        surfaceAlt: '#e2e8f0',
        text: '#0f172a',
        textMuted: '#475569',
        primary: '#2563eb',
        primaryHover: '#1d4ed8',
        primaryText: '#ffffff',
        secondary: '#0ea5e9',
        border: '#cbd5e1',
        success: '#15803d',
        warning: '#b45309',
        danger: '#dc2626',
        codeBackground: '#0f172a',
        codeText: '#e2e8f0',
      },
      radius: { radiusSm: '0.375rem', radiusMd: '0.5rem', radiusLg: '0.75rem' },
      shadow: {
        shadowSm: '0 1px 2px rgb(15 23 42 / 0.08)',
        shadowMd: '0 8px 24px rgb(15 23 42 / 0.10)',
        shadowLg: '0 20px 50px rgb(15 23 42 / 0.14)',
      },
    },
    darkColors: {
      background: '#0f1724',
      surface: '#151f2e',
      surfaceAlt: '#1d2a3b',
      text: '#e8edf5',
      textMuted: '#a5b1c2',
      primary: '#78b7ff',
      primaryHover: '#a5ceff',
      primaryText: '#11162c',
      border: '#2c3b50',
      codeBackground: '#090d14',
      codeText: '#e8edf5',
    },
    elements: {
      h1: { fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', letterSpacing: '-0.03em' },
      h2: {
        letterSpacing: '-0.02em',
        borderBottom: '2px solid var(--color-primary)',
        paddingBottom: '0.3em',
      },
      article: {
        boxShadow: 'var(--shadow-md)',
        borderRadius: 'var(--radius-lg)',
      },
      th: {
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-primary-text)',
      },
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
      `export const ${spec.exportName} = ${JSON.stringify(theme, null, 2)} satisfies Theme\n`,
  )
  .join('\n')
const withPresets = source.replace(anchor, `${blocks}\n${anchor}`)

const mapAnchor = '  Jacarandá: jacarandaPreset,\n'
if (!withPresets.includes(mapAnchor))
  throw new Error('ancora de registro no mapa nao encontrada')
const entries = built
  .map(({ spec }) =>
    /^[A-Za-z]+$/.test(spec.mapName)
      ? `  ${spec.mapName}: ${spec.exportName},\n`
      : `  '${spec.mapName}': ${spec.exportName},\n`,
  )
  .join('')
const next = withPresets.replace(mapAnchor, `${mapAnchor}${entries}`)

writeFileSync(file, next)
console.log('11 presets inseridos em src/theme/presets/index.ts')
