import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { defaultTheme } from '../src/theme/defaults'
import { migrateTheme, migrateThemeV2 } from '../src/theme/migration'

// O ambiente jsdom substitui o URL global, e `new URL(rel, import.meta.url)`
// resolve para http://localhost:3000/... em vez de um caminho de arquivo.
// Resolver por node:path mantem o teste correto em qualquer environment
// (mesma solucao ja usada em tests/presets.test.ts).
const here = dirname(fileURLToPath(import.meta.url))

describe('theme migration / validation', () => {
  it('accepts schema v1', () => {
    expect(migrateTheme(defaultTheme).metadata.name).toBe('Minimal')
  })

  it('rejects invalid data', () => {
    expect(() => migrateTheme({ schemaVersion: 1 })).toThrow(/metadata/i)
  })

  it('rejects future schemas', () => {
    expect(() => migrateTheme({ ...defaultTheme, schemaVersion: 999 })).toThrow(/newer/i)
  })
})

const themeV1 = JSON.parse(readFileSync(join(here, 'fixtures', 'theme-v1.json'), 'utf8'))

describe('migrateThemeV2', () => {
  it('eleva a versao do schema', () => {
    expect(migrateThemeV2(themeV1).schemaVersion).toBe(2)
  })

  it('achata estados sem perda', () => {
    const { layers } = migrateThemeV2(themeV1)
    expect(layers.states['a:hover']).toEqual({ color: 'var(--color-primary-hover)' })
    expect(layers.states['button:disabled']).toEqual({ opacity: '0.55', cursor: 'not-allowed' })
    expect(layers.states['input:focus-visible']).toBeDefined()
    // nenhuma chave aninhada sobrou
    expect(Object.keys(layers.states).every((key) => key.includes(':'))).toBe(true)
  })

  it('copia elements sem alteracao', () => {
    const { layers } = migrateThemeV2(themeV1)
    expect(layers.elements.article).toEqual(themeV1.elements.article)
  })

  it('semeia base e responsive', () => {
    const { layers } = migrateThemeV2(themeV1)
    expect(layers.base['pre code']).toBeDefined()
    expect(layers.responsive.tablet).toBeDefined()
    expect(layers.responsive.mobile).toBeDefined()
  })

  it('converte responsive em breakpoints', () => {
    expect(migrateThemeV2(themeV1).breakpoints).toEqual({ mobile: 390, tablet: 768, desktop: 1440 })
  })

  it('adiciona tokens de scroll e os tokens novos de espacamento e layout', () => {
    const { tokens } = migrateThemeV2(themeV1)
    expect(tokens.scroll.scrollbarSize).toBe('12px')
    expect(tokens.spacing.space2xlXs).toBe('2.5rem')
    expect(tokens.layout.bodyPaddingSm).toBe('1rem')
    expect(tokens.layout.bodyPaddingXs).toBe('0.8rem')
    expect(tokens.layout.sectionSpacingSm).toBe('2rem')
  })

  it('liga movimento reduzido por padrao', () => {
    expect(migrateThemeV2(themeV1).options.reducedMotion).toBe(true)
  })

  it('passa um tema v2 adiante sem alteracao', () => {
    const migrated = migrateThemeV2(themeV1)
    expect(migrateThemeV2(migrated)).toEqual(migrated)
  })

  it('rejeita seletor invalido vindo de arquivo', () => {
    const corrupted = structuredClone(themeV1)
    corrupted.elements['a:not('] = { color: 'red' }
    expect(() => migrateThemeV2(corrupted)).toThrow(/seletor/i)
  })

  it('rejeita breakpoint orfao em layers.responsive', () => {
    const migrated = migrateThemeV2(themeV1)
    migrated.layers.responsive.watch = { h1: { fontSize: '1rem' } }
    expect(() => migrateThemeV2(migrated)).toThrow(/breakpoint/i)
  })

  it('recusa colisao de chave em vez de sobrescrever em silencio', () => {
    const colliding = structuredClone(themeV1)
    colliding.states = {
      'a:b': { c: { color: 'x' } },
      a: { 'b:c': { color: 'y' } },
    }
    expect(() => migrateThemeV2(colliding)).toThrow(/colis/i)
  })
})
