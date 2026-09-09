import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import type { Theme } from '../src/theme/schema'
import { defaultTheme } from '../src/theme/defaults'
import { migrateThemeV2 } from '../src/theme/migration'
import { presets } from '../src/theme/presets'

// O ambiente jsdom substitui o URL global, e `new URL(rel, import.meta.url)`
// resolve para http://localhost:3000/... em vez de um caminho de arquivo.
// Resolver por node:path mantem o teste correto em qualquer environment
// (mesma solucao ja usada em tests/presets.test.ts).
const here = dirname(fileURLToPath(import.meta.url))

describe('theme migration / validation', () => {
  it('accepts the bundled default theme', () => {
    expect(migrateThemeV2(defaultTheme).metadata.name).toBe('Minimal')
  })

  it('rejects invalid data', () => {
    expect(() => migrateThemeV2({ schemaVersion: 1 })).toThrow(/metadata/i)
  })

  it('rejects future schemas', () => {
    expect(() => migrateThemeV2({ ...defaultTheme, schemaVersion: 999 })).toThrow(/newer/i)
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
    expect(layers.base['input, textarea, select, button']).toBeDefined()
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

describe('normalizacao de pre code em tema ja salvo', () => {
  // `pre code` nasceu na camada base do v2. La ele sai como `:where(pre code)`,
  // especificidade 0, e a ordem de camadas vence a especificidade: perde para
  // `code` em @layer elements e nunca neutraliza o chrome do codigo inline.
  // Um tema salvo no localStorage (ou exportado para JSON) carrega a regra no
  // lugar errado, entao a leitura tem que move-la — senao o tema do usuario
  // continua quebrado ate ele apagar o armazenamento.
  it('move pre code de base para elements num v2 salvo', () => {
    const theme: Theme = structuredClone(defaultTheme)
    theme.layers.base['pre code'] = { background: 'transparent', color: 'inherit', padding: '0' }
    delete theme.layers.elements['pre code']

    const migrated = migrateThemeV2(theme)
    expect(migrated.layers.base['pre code']).toBeUndefined()
    expect(migrated.layers.elements['pre code']).toEqual({
      background: 'transparent',
      color: 'inherit',
      padding: '0',
    })
  })

  it('nao sobrescreve um pre code que o tema ja define em elements', () => {
    const theme: Theme = structuredClone(defaultTheme)
    theme.layers.base['pre code'] = { background: 'transparent' }
    theme.layers.elements['pre code'] = { padding: '0', color: 'var(--color-code-text)' }

    const migrated = migrateThemeV2(theme)
    expect(migrated.layers.elements['pre code']).toEqual({
      padding: '0',
      color: 'var(--color-code-text)',
    })
  })

  it('eleva um v1 com pre code em elements, nao em base', () => {
    const { layers } = migrateThemeV2(themeV1)
    expect(layers.base['pre code']).toBeUndefined()
    expect(layers.elements['pre code']).toEqual({
      background: 'transparent',
      color: 'inherit',
      padding: '0',
    })
  })
})

// Um v2 estruturalmente invalido passava direto: o ramo `schemaVersion === 2`
// era um structuredClone sem nenhuma checagem, e so os seletores e breakpoints
// eram validados depois. O payload abaixo e aceito, gravado no localStorage
// pela subscription da store e so estoura dentro do useMemo do compilador —
// depois que o try/catch do Topbar ja retornou. A tela some, e o reload le o
// mesmo payload e estoura de novo: so limpando o localStorage se recupera.
const poison = {
  schemaVersion: 2,
  metadata: { name: 'Poison', version: '1' },
  layers: { base: {}, elements: {}, states: {}, responsive: {} },
  breakpoints: {},
}

describe('validacao estrutural do v2', () => {
  it('recusa o tema sem tokens em vez de aceita-lo', () => {
    expect(() => migrateThemeV2(poison)).toThrow()
  })

  it('explica o que falta, em texto legivel para o alert do Topbar', () => {
    let message = ''
    try {
      migrateThemeV2(poison)
    } catch (error) {
      message = error instanceof Error ? error.message : String(error)
    }
    expect(message).toMatch(/tokens/i)
    expect(message).not.toMatch(/undefined|TypeError|Object\.entries/)
  })

  it('nomeia o grupo de tokens ausente', () => {
    const theme = structuredClone(defaultTheme) as unknown as Record<string, unknown>
    const tokens = theme.tokens as Record<string, unknown>
    delete tokens.scroll
    expect(() => migrateThemeV2(theme)).toThrow(/scroll/i)
  })

  it('recusa modes sem light', () => {
    const theme = structuredClone(defaultTheme) as unknown as Record<string, unknown>
    theme.modes = {}
    expect(() => migrateThemeV2(theme)).toThrow(/modes\.light|modo claro/i)
  })

  it('recusa uma camada que nao e objeto', () => {
    const theme = structuredClone(defaultTheme) as unknown as Record<string, unknown>
    ;(theme.layers as Record<string, unknown>).states = 'nao e objeto'
    expect(() => migrateThemeV2(theme)).toThrow(/layers\.states/i)
  })

  it('recusa options sem os dois booleanos', () => {
    const theme = structuredClone(defaultTheme) as unknown as Record<string, unknown>
    theme.options = { includeMinimalReset: true }
    expect(() => migrateThemeV2(theme)).toThrow(/reducedMotion|options/i)
  })

  // Guarda contra validacao rigida demais: o tema bem formado tem que
  // atravessar sem alteracao nenhuma.
  it('deixa um v2 bem formado passar identico', () => {
    const theme: Theme = structuredClone(defaultTheme)
    expect(migrateThemeV2(theme)).toEqual(theme)
  })

  it('deixa todos os presets passarem identicos', () => {
    for (const [name, preset] of Object.entries(presets)) {
      expect(migrateThemeV2(structuredClone(preset)), name).toEqual(preset)
    }
  })
})
