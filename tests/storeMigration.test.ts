import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// The jsdom environment replaces the global URL, and `new URL(rel,
// import.meta.url)` resolves to http://localhost:3000/... instead of a file
// path. Resolving via node:path keeps the test correct in any environment
// (same solution already used in tests/presets.test.ts and tests/migration.test.ts).
const here = dirname(fileURLToPath(import.meta.url))
const themeV1Raw = readFileSync(join(here, 'fixtures', 'theme-v1.json'), 'utf8')
const STORAGE_KEY = 'semantic-css-studio/theme-v1'

describe('saved-theme loading', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  it('migrates a saved v1 theme instead of discarding it', async () => {
    // Customises the fixture to prove MIGRATION, not fallback: a test checking
    // only schemaVersion would pass even if readStoredTheme returned the
    // default, because the default is also v2. The name and custom declaration
    // below only survive if the saved content is upgraded.
    const customized = JSON.parse(themeV1Raw)
    customized.metadata.name = 'User theme'
    customized.elements.article = {
      ...customized.elements.article,
      marginBlock: '9rem',
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customized))
    const { useStudioStore } = await import('../src/theme/store')
    const theme = useStudioStore.getState().theme
    expect(theme.schemaVersion).toBe(2)
    // the user content survived
    expect(theme.metadata.name).toBe('User theme')
    expect(theme.layers.elements.article).toMatchObject({ marginBlock: '9rem' })
    expect(theme.layers.states['a:hover']).toBeDefined()
  })

  it('falls back to the default theme when saved content is unreadable', async () => {
    localStorage.setItem(STORAGE_KEY, '{ not json')
    const { useStudioStore } = await import('../src/theme/store')
    expect(useStudioStore.getState().theme.schemaVersion).toBe(2)
  })

  it('falls back to the default theme when the schema is newer than supported', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 99 }))
    const { useStudioStore } = await import('../src/theme/store')
    expect(useStudioStore.getState().theme.metadata.name).toBe('Minimal')
  })
})

describe('structurally invalid saved theme', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  // Without structural validation, this payload was accepted by migrateThemeV2,
  // rewritten to localStorage by the store subscription, and only blew up
  // inside the compiler, mid-render. Reload read the same content and blew up
  // again: a permanent white screen until storage was cleared by hand.
  it('falls back to the default theme instead of blowing up in render', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        schemaVersion: 2,
        metadata: { name: 'Poison', version: '1' },
        layers: { base: {}, elements: {}, states: {}, responsive: {} },
        breakpoints: {},
      }),
    )
    const { useStudioStore } = await import('../src/theme/store')
    const theme = useStudioStore.getState().theme
    expect(theme.metadata.name).toBe('Minimal')
    expect(theme.tokens.colors.primary).toBeTypeOf('string')
  })

  it('the recovered theme still compiles', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        schemaVersion: 2,
        metadata: { name: 'Poison', version: '1' },
        layers: { base: {}, elements: {}, states: {}, responsive: {} },
        breakpoints: {},
      }),
    )
    const { useStudioStore } = await import('../src/theme/store')
    const { compileTheme } = await import('../src/compiler')
    expect(() => compileTheme(useStudioStore.getState().theme)).not.toThrow()
  })
})
