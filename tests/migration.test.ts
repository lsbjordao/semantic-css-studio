import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import type { Theme } from '../src/theme/schema'
import { defaultTheme } from '../src/theme/defaults'
import { migrateThemeV2 } from '../src/theme/migration'
import { presets } from '../src/theme/presets'

// The jsdom environment replaces the global URL, and `new URL(rel,
// import.meta.url)` resolves to http://localhost:3000/... instead of a file
// path. Resolving via node:path keeps the test correct in any environment
// (same solution already used in tests/presets.test.ts).
const here = dirname(fileURLToPath(import.meta.url))

describe('theme migration / validation', () => {
  it('accepts the bundled default theme', () => {
    expect(migrateThemeV2(defaultTheme).metadata.name).toBe('Minimal')
  })

  it('rejects invalid data', () => {
    expect(() => migrateThemeV2({ schemaVersion: 1 })).toThrow(/metadata/i)
  })

  it('rejects future schemas', () => {
    expect(() =>
      migrateThemeV2({ ...defaultTheme, schemaVersion: 999 }),
    ).toThrow(/newer/i)
  })
})

const themeV1 = JSON.parse(
  readFileSync(join(here, 'fixtures', 'theme-v1.json'), 'utf8'),
)

describe('migrateThemeV2', () => {
  it('upgrades the schema version', () => {
    expect(migrateThemeV2(themeV1).schemaVersion).toBe(2)
  })

  it('flattens states without loss', () => {
    const { layers } = migrateThemeV2(themeV1)
    expect(layers.states['a:hover']).toEqual({
      color: 'var(--color-primary-hover)',
    })
    expect(layers.states['button:disabled']).toEqual({
      opacity: '0.55',
      cursor: 'not-allowed',
    })
    expect(layers.states['input:focus-visible']).toBeDefined()
    // no nested keys remain
    expect(Object.keys(layers.states).every((key) => key.includes(':'))).toBe(
      true,
    )
  })

  it('copies elements unchanged', () => {
    const { layers } = migrateThemeV2(themeV1)
    expect(layers.elements.article).toEqual(themeV1.elements.article)
  })

  it('seeds base and responsive', () => {
    const { layers } = migrateThemeV2(themeV1)
    expect(layers.base['input, textarea, select, button']).toBeDefined()
    expect(layers.responsive.tablet).toBeDefined()
    expect(layers.responsive.mobile).toBeDefined()
  })

  it('converts responsive into breakpoints', () => {
    expect(migrateThemeV2(themeV1).breakpoints).toEqual({
      mobile: 390,
      tablet: 768,
      desktop: 1440,
    })
  })

  it('adds scroll tokens and the new spacing and layout tokens', () => {
    const { tokens } = migrateThemeV2(themeV1)
    expect(tokens.scroll.scrollbarSize).toBe('12px')
    expect(tokens.spacing.space2xlXs).toBe('2.5rem')
    expect(tokens.layout.bodyPaddingSm).toBe('1rem')
    expect(tokens.layout.bodyPaddingXs).toBe('0.8rem')
    expect(tokens.layout.sectionSpacingSm).toBe('2rem')
  })

  it('enables reduced motion by default', () => {
    expect(migrateThemeV2(themeV1).options.reducedMotion).toBe(true)
  })

  it('passes a v2 theme through unchanged', () => {
    const migrated = migrateThemeV2(themeV1)
    expect(migrateThemeV2(migrated)).toEqual(migrated)
  })

  it('rejects an invalid selector coming from a file', () => {
    const corrupted = structuredClone(themeV1)
    corrupted.elements['a:not('] = { color: 'red' }
    expect(() => migrateThemeV2(corrupted)).toThrow(/selector/i)
  })

  it('rejects an orphan breakpoint in layers.responsive', () => {
    const migrated = migrateThemeV2(themeV1)
    migrated.layers.responsive.watch = { h1: { fontSize: '1rem' } }
    expect(() => migrateThemeV2(migrated)).toThrow(/breakpoint/i)
  })

  it('refuses a key collision instead of silently overwriting', () => {
    const colliding = structuredClone(themeV1)
    colliding.states = {
      'a:b': { c: { color: 'x' } },
      a: { 'b:c': { color: 'y' } },
    }
    expect(() => migrateThemeV2(colliding)).toThrow(/collision/i)
  })
})

describe('pre code normalisation in an already-saved theme', () => {
  // `pre code` was born in the v2 base layer. There it is emitted as
  // `:where(pre code)` with 0 specificity, and layer order beats specificity:
  // it loses to `code` in @layer elements and never neutralises inline-code
  // chrome. A theme saved in localStorage (or exported to JSON) carries the
  // rule in the wrong place, so loading must move it — otherwise the user
  // theme stays broken until they clear storage.
  it('moves pre code from base to elements in a saved v2', () => {
    const theme: Theme = structuredClone(defaultTheme)
    theme.layers.base['pre code'] = {
      background: 'transparent',
      color: 'inherit',
      padding: '0',
    }
    delete theme.layers.elements['pre code']

    const migrated = migrateThemeV2(theme)
    expect(migrated.layers.base['pre code']).toBeUndefined()
    expect(migrated.layers.elements['pre code']).toEqual({
      background: 'transparent',
      color: 'inherit',
      padding: '0',
    })
  })

  it('does not overwrite a pre code the theme already defines in elements', () => {
    const theme: Theme = structuredClone(defaultTheme)
    theme.layers.base['pre code'] = { background: 'transparent' }
    theme.layers.elements['pre code'] = {
      padding: '0',
      color: 'var(--color-code-text)',
    }

    const migrated = migrateThemeV2(theme)
    expect(migrated.layers.elements['pre code']).toEqual({
      padding: '0',
      color: 'var(--color-code-text)',
    })
  })

  it('upgrades a v1 with pre code in elements, not in base', () => {
    const { layers } = migrateThemeV2(themeV1)
    expect(layers.base['pre code']).toBeUndefined()
    expect(layers.elements['pre code']).toEqual({
      background: 'transparent',
      color: 'inherit',
      padding: '0',
    })
  })
})

// A structurally invalid v2 used to pass straight through: the
// `schemaVersion === 2` branch was a structuredClone with no checks, and only
// selectors and breakpoints were validated afterwards. The payload below is
// accepted, written to localStorage by the store subscription, and only blows
// up inside the compiler's useMemo — after the Topbar try/catch already
// returned. The screen goes blank, and reload reads the same payload and blows
// up again: only clearing localStorage recovers.
const poison = {
  schemaVersion: 2,
  metadata: { name: 'Poison', version: '1' },
  layers: { base: {}, elements: {}, states: {}, responsive: {} },
  breakpoints: {},
}

describe('v2 structural validation', () => {
  it('refuses the theme without tokens instead of accepting it', () => {
    expect(() => migrateThemeV2(poison)).toThrow()
  })

  it('explains what is missing, in readable text for the Topbar alert', () => {
    let message = ''
    try {
      migrateThemeV2(poison)
    } catch (error) {
      message = error instanceof Error ? error.message : String(error)
    }
    expect(message).toMatch(/tokens/i)
    expect(message).not.toMatch(/undefined|TypeError|Object\.entries/)
  })

  it('names the missing token group', () => {
    const theme = structuredClone(defaultTheme) as unknown as Record<
      string,
      unknown
    >
    const tokens = theme.tokens as Record<string, unknown>
    delete tokens.scroll
    expect(() => migrateThemeV2(theme)).toThrow(/scroll/i)
  })

  it('refuses modes without light', () => {
    const theme = structuredClone(defaultTheme) as unknown as Record<
      string,
      unknown
    >
    theme.modes = {}
    expect(() => migrateThemeV2(theme)).toThrow(/modes\.light/i)
  })

  it('refuses a layer that is not an object', () => {
    const theme = structuredClone(defaultTheme) as unknown as Record<
      string,
      unknown
    >
    ;(theme.layers as Record<string, unknown>).states = 'not an object'
    expect(() => migrateThemeV2(theme)).toThrow(/layers\.states/i)
  })

  it('refuses options without both booleans', () => {
    const theme = structuredClone(defaultTheme) as unknown as Record<
      string,
      unknown
    >
    theme.options = { includeMinimalReset: true }
    expect(() => migrateThemeV2(theme)).toThrow(/reducedMotion|options/i)
  })

  // Guards against overly strict validation: a well-formed theme must pass
  // through with no changes at all.
  it('lets a well-formed v2 pass through identical', () => {
    const theme: Theme = structuredClone(defaultTheme)
    expect(migrateThemeV2(theme)).toEqual(theme)
  })

  it('lets every preset pass through identical', () => {
    for (const [name, preset] of Object.entries(presets)) {
      expect(migrateThemeV2(structuredClone(preset)), name).toEqual(preset)
    }
  })

  it('accepts a missing quarto block (old themes stay valid)', () => {
    const theme = structuredClone(defaultTheme) as unknown as Record<
      string,
      unknown
    >
    delete theme.quarto
    expect(migrateThemeV2(theme)).toEqual({ ...structuredClone(defaultTheme) })
  })

  it('accepts sidebarTone surface or background', () => {
    for (const sidebarTone of ['surface', 'background'] as const) {
      const theme = structuredClone(defaultTheme) as Theme
      theme.quarto = { sidebarTone }
      expect(migrateThemeV2(theme)).toEqual(theme)
    }
  })

  it('refuses a sidebarTone outside the vocabulary', () => {
    const theme = structuredClone(defaultTheme) as unknown as Record<
      string,
      unknown
    >
    theme.quarto = { sidebarTone: 'translucent' }
    expect(() => migrateThemeV2(theme)).toThrow(/sidebarTone/i)
  })

  it('refuses a quarto block that is not an object', () => {
    const theme = structuredClone(defaultTheme) as unknown as Record<
      string,
      unknown
    >
    theme.quarto = 'surface'
    expect(() => migrateThemeV2(theme)).toThrow(/"quarto"/i)
  })
})

describe('structural validation applies to both branches', () => {
  // The v1 branch had the SAME gap as the v2 branch: validateTheme only checks
  // colors/typography/spacing, so a theme without radius/shadow/modes passed,
  // was persisted, and blew up inside render — a white screen surviving
  // reload, recoverable only by clearing localStorage.
  it('refuses a structurally incomplete v1', () => {
    const incomplete = {
      schemaVersion: 1,
      metadata: { name: 'Poison v1', version: '1' },
      tokens: { colors: {}, typography: {}, spacing: {} },
      elements: {},
      states: {},
      responsive: { tablet: 800, mobile: 480 },
      options: { includeMinimalReset: true },
    }
    expect(() => migrateThemeV2(incomplete)).toThrow(/Invalid theme/i)
  })

  it('the legitimate v1 theme still passes', () => {
    expect(migrateThemeV2(themeV1).schemaVersion).toBe(2)
  })
})
