/**
 * One-shot codemod: creates the TypeSafe preset by cloning Minimal and applying
 * a warm, code-native visual system inspired by the public TypeSafe.ai brand.
 *
 * The codemod is intentionally re-runnable: an existing generated TypeSafe
 * block is replaced, WCAG contrast is checked, CSS is compiled deterministically,
 * and the snapshot is refreshed.
 *
 * Run: npx vite-node scripts/add-typesafe-preset.ts
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
const presetFile = join(root, 'src', 'theme', 'presets', 'index.ts')
const snapshotFile = join(root, 'tests', 'snapshots', 'presets', 'typesafe.css')
const registryAnchor = 'export const presets = {'

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

function withoutExistingTypeSafe(input: string): string {
  const start = input.indexOf('export const typeSafePreset =')
  const registry = input.indexOf(registryAnchor, Math.max(0, start))
  let next = input

  if (start >= 0 && registry > start) {
    next = `${input.slice(0, start)}${input.slice(registry)}`
  }

  next = next.replace(
    `${registryAnchor}\n  TypeSafe: typeSafePreset,`,
    registryAnchor,
  )
  return next
}

const source = withoutExistingTypeSafe(readFileSync(presetFile, 'utf8'))
if (!source.includes(registryAnchor))
  throw new Error('preset registry anchor not found')

const theme = structuredClone(minimalPreset) as unknown as Theme

theme.metadata = {
  ...theme.metadata,
  name: 'TypeSafe',
  description:
    'Warm parchment, Space Mono headings and precise code-native surfaces inspired by TypeSafe.ai.',
  version: '1.0.0',
}

// Register the webfont in the Theme itself so preview and exported CSS both
// load the real family instead of silently falling back to the local mono font.
theme.fonts = {
  heading: { family: 'Space Mono', weights: [400, 700] },
  mono: { family: 'Space Mono', weights: [400, 700] },
}

deepMerge(theme.tokens as unknown as Record<string, unknown>, {
  colors: {
    background: '#f1e7d5',
    surface: '#fffaf1',
    surfaceAlt: '#e6dac6',
    text: '#171713',
    textMuted: '#625e55',
    primary: '#171713',
    primaryHover: '#36362f',
    primaryText: '#f7efe2',
    secondary: '#7a725f',
    border: '#bdb3a2',
    success: '#31715f',
    warning: '#8a650f',
    danger: '#a33a2b',
    codeBackground: '#171713',
    codeText: '#f7efe2',
  },
  typography: {
    fontBody:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontHeading:
      '"Space Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    fontMono:
      '"Space Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    fontSizeBase: '16px',
    lineHeightBody: '1.62',
    lineHeightHeading: '1.04',
    fontWeightNormal: '400',
    fontWeightMedium: '600',
    fontWeightBold: '700',
  },
  radius: {
    radiusSm: '0.125rem',
    radiusMd: '0.25rem',
    radiusLg: '0.375rem',
    radiusFull: '999px',
  },
  shadow: {
    shadowSm: '0 1px 0 rgb(23 23 19 / 0.12)',
    shadowMd: '0 3px 0 rgb(23 23 19 / 0.10)',
    shadowLg: '0 6px 0 rgb(23 23 19 / 0.08)',
  },
  spacing: {
    spaceXs: '0.25rem',
    spaceSm: '0.5rem',
    spaceMd: '1rem',
    spaceLg: '1.5rem',
    spaceXl: '2.5rem',
    space2xl: '4.5rem',
    space2xlXs: '2.75rem',
  },
  layout: {
    contentWidth: '76ch',
    wideWidth: '1180px',
    bodyPadding: '1.5rem',
    sectionSpacing: '4rem',
    headerWidth: '1180px',
    footerWidth: '1180px',
    bodyPaddingSm: '1rem',
    bodyPaddingXs: '0.8rem',
    sectionSpacingSm: '2.75rem',
  },
  scroll: {
    scrollbarWidth: 'thin',
    scrollbarSize: '10px',
    scrollbarTrack: 'var(--color-background)',
    scrollbarThumb: 'var(--color-text)',
    scrollbarThumbHover: 'var(--color-primary-hover)',
    scrollbarRadius: '0',
    scrollbarGutter: 'stable',
    scrollBehavior: 'smooth',
    scrollPaddingTop: '1rem',
    overscrollBehavior: 'contain',
  },
})

theme.modes.light = { colors: {} }
theme.modes.dark = {
  colors: {
    ...(minimalPreset as unknown as Theme).modes.dark?.colors,
    background: '#0c0c0a',
    surface: '#151512',
    surfaceAlt: '#20201b',
    text: '#f3eadc',
    textMuted: '#a9a392',
    primary: '#f3eadc',
    primaryHover: '#ffffff',
    primaryText: '#0c0c0a',
    secondary: '#b8ad93',
    border: '#48463e',
    success: '#7fc4aa',
    warning: '#d5b55d',
    danger: '#e08372',
    codeBackground: '#050504',
    codeText: '#f3eadc',
  },
}

const elements = theme.layers.elements
const mergeElement = (
  selector: string,
  declarations: Record<string, string>,
) => {
  elements[selector] = {
    ...(elements[selector] ?? {}),
    ...declarations,
  }
}

mergeElement('body', {
  fontFamily: 'var(--font-body)',
  lineHeight: 'var(--line-height-body)',
  backgroundColor: 'var(--color-background)',
  color: 'var(--color-text)',
})
mergeElement('header', {
  maxWidth: 'var(--header-width)',
  marginInline: 'auto',
  padding: 'var(--space-lg) var(--body-padding)',
  borderBottom: '1px solid var(--color-border)',
})
mergeElement('nav', {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--font-size-sm)',
  letterSpacing: '0.02em',
})
mergeElement('main', {
  maxWidth: 'var(--content-width)',
  marginInline: 'auto',
  padding: 'var(--space-xl) var(--body-padding) var(--space-2xl)',
})
mergeElement('article', {
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  padding: 'clamp(var(--space-lg), 4vw, var(--space-xl))',
  boxShadow: 'none',
})
mergeElement('aside', {
  backgroundColor: 'var(--color-surface-alt)',
  border: '1px solid var(--color-border)',
  borderInlineStart: '4px solid var(--color-text)',
  padding: 'var(--space-md) var(--space-lg)',
})
mergeElement('footer', {
  borderTop: '1px solid var(--color-border)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--font-size-sm)',
})
mergeElement('h1', {
  fontSize: 'clamp(2.6rem, 8vw, 5.6rem)',
  letterSpacing: '-0.055em',
  maxWidth: '14ch',
})
mergeElement('h2', {
  fontSize: 'clamp(1.9rem, 5vw, 3.4rem)',
  letterSpacing: '-0.045em',
})
mergeElement('h3', {
  fontSize: 'clamp(1.35rem, 3vw, 1.8rem)',
  letterSpacing: '-0.025em',
})
mergeElement('h6', {
  fontFamily: 'var(--font-mono)',
  textTransform: 'uppercase',
  letterSpacing: '0.11em',
})
mergeElement('a', {
  color: 'var(--color-text)',
  textDecorationThickness: '1px',
  textUnderlineOffset: '0.22em',
})
mergeElement('blockquote', {
  marginInline: '0',
  borderInlineStart: '2px solid var(--color-text)',
  padding: 'var(--space-sm) var(--space-lg)',
  color: 'var(--color-text)',
  fontStyle: 'normal',
})
mergeElement('hr', {
  border: '0',
  borderTop: '1px solid var(--color-text)',
  marginBlock: 'var(--space-xl)',
})
mergeElement('code', {
  fontFamily: 'var(--font-mono)',
  backgroundColor: 'var(--color-surface-alt)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  padding: '0.08em 0.3em',
})
mergeElement('pre', {
  backgroundColor: 'var(--color-code-background)',
  color: 'var(--color-code-text)',
  border: '1px solid var(--color-text)',
  borderRadius: 'var(--radius-sm)',
  padding: 'var(--space-lg)',
  boxShadow: 'none',
})
mergeElement('kbd', {
  fontFamily: 'var(--font-mono)',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-text)',
  borderBottomWidth: '2px',
  borderRadius: 'var(--radius-sm)',
  padding: '0.12rem 0.4rem',
  boxShadow: 'none',
})
mergeElement('table', {
  width: '100%',
  borderCollapse: 'collapse',
  borderTop: '1px solid var(--color-text)',
  borderBottom: '1px solid var(--color-text)',
})
mergeElement('th', {
  backgroundColor: 'var(--color-surface-alt)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--font-size-sm)',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  textAlign: 'left',
})
mergeElement('td', {
  borderTop: '1px solid var(--color-border)',
})
mergeElement('button', {
  cursor: 'pointer',
  fontFamily: 'var(--font-mono)',
  fontWeight: 'var(--font-weight-bold)',
  letterSpacing: '0.025em',
  borderRadius: 'var(--radius-sm)',
  boxShadow: 'none',
})
mergeElement('input', {
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-sm)',
})
mergeElement('textarea', {
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-sm)',
  minHeight: '7rem',
  resize: 'vertical',
})
mergeElement('select', {
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-sm)',
})
mergeElement('img', {
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '0',
})
mergeElement('details', {
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  padding: 'var(--space-md)',
  backgroundColor: 'var(--color-surface)',
})
mergeElement('summary', {
  cursor: 'pointer',
  fontFamily: 'var(--font-mono)',
  fontWeight: 'var(--font-weight-bold)',
})
mergeElement('progress', {
  accentColor: 'var(--color-text)',
  borderRadius: '0',
})
mergeElement('meter', {
  accentColor: 'var(--color-text)',
})

theme.layers.elements['pre code'] = {
  background: 'transparent',
  border: '0',
  color: 'inherit',
  padding: '0',
}

theme.layers.states = {
  ...theme.layers.states,
  'a:hover': {
    color: 'var(--color-primary-hover)',
    textDecorationThickness: '2px',
  },
  'a:focus-visible': {
    outline: '2px solid var(--color-text)',
    outlineOffset: '4px',
  },
  'button:hover': {
    backgroundColor: 'var(--color-primary-hover)',
  },
  'button:focus-visible': {
    outline: '2px solid var(--color-text)',
    outlineOffset: '3px',
  },
  'button:active': {
    transform: 'none',
  },
  'input:focus-visible': {
    outline: '2px solid var(--color-text)',
    outlineOffset: '2px',
    borderColor: 'var(--color-text)',
  },
  'textarea:focus-visible': {
    outline: '2px solid var(--color-text)',
    outlineOffset: '2px',
  },
  'select:focus-visible': {
    outline: '2px solid var(--color-text)',
    outlineOffset: '2px',
  },
}

const validated = migrateThemeV2(theme)
const light = validated.tokens.colors as unknown as Record<string, string>
const dark = (validated.modes.dark?.colors ?? {}) as Record<string, string>
const checks: Array<[string, string | undefined, string | undefined, number]> = [
  ['text/bg', light.text, light.background, 4.5],
  ['muted/bg', light.textMuted, light.background, 4.5],
  ['text/surface', light.text, light.surface, 4.5],
  ['primaryText/primary', light.primaryText, light.primary, 4.5],
  ['dark text/bg', dark.text, dark.background, 4.5],
  ['dark muted/bg', dark.textMuted, dark.background, 4.5],
  ['dark primaryText/primary', dark.primaryText, dark.primary, 4.5],
]

for (const [label, fg, bg, min] of checks) {
  if (!fg || !bg) continue
  const ratio = contrastRatio(fg, bg)
  console.log(`  ${ratio.toFixed(2)} (min ${min}) ${label}`)
  if (ratio < min)
    throw new Error(`TypeSafe: contrast ${ratio.toFixed(2)} < ${min} on ${label}`)
}

const css = compileTheme(validated)
if (!css.includes('/* TypeSafe v1.0.0'))
  throw new Error('TypeSafe: unexpected header in CSS')
if (!css.includes('family=Space+Mono'))
  throw new Error('TypeSafe: Space Mono webfont import was not emitted')
if (compileTheme(structuredClone(validated)) !== css)
  throw new Error('TypeSafe: compiler output is not deterministic')

const block = `export const typeSafePreset = ${JSON.stringify(validated, null, 2)} as unknown as Theme\n`
let next = source.replace(registryAnchor, `${block}\n${registryAnchor}`)
next = next.replace(
  registryAnchor,
  `${registryAnchor}\n  TypeSafe: typeSafePreset,`,
)

writeFileSync(presetFile, next)
writeFileSync(snapshotFile, css)

console.log(`TypeSafe preset refreshed; snapshot written (${css.length} bytes).`)
