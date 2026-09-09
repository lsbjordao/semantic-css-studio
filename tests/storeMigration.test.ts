import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// O ambiente jsdom substitui o URL global, e `new URL(rel, import.meta.url)`
// resolve para http://localhost:3000/... em vez de um caminho de arquivo.
// Resolver por node:path mantem o teste correto em qualquer environment
// (mesma solucao ja usada em tests/presets.test.ts e tests/migration.test.ts).
const here = dirname(fileURLToPath(import.meta.url))
const themeV1Raw = readFileSync(join(here, 'fixtures', 'theme-v1.json'), 'utf8')
const STORAGE_KEY = 'semantic-css-studio/theme-v1'

describe('leitura do tema salvo', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  it('migra um tema v1 salvo em vez de descarta-lo', async () => {
    // Personaliza a fixture para provar MIGRACAO, nao fallback: um teste que so
    // checasse schemaVersion passaria mesmo se readStoredTheme devolvesse o
    // default, porque o default tambem e v2. O nome e a declaracao customizada
    // abaixo so sobrevivem se o conteudo salvo for elevado.
    const customized = JSON.parse(themeV1Raw)
    customized.metadata.name = 'Tema do usuario'
    customized.elements.article = {
      ...customized.elements.article,
      marginBlock: '9rem',
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customized))
    const { useStudioStore } = await import('../src/theme/store')
    const theme = useStudioStore.getState().theme
    expect(theme.schemaVersion).toBe(2)
    // o conteudo do usuario sobreviveu
    expect(theme.metadata.name).toBe('Tema do usuario')
    expect(theme.layers.elements.article).toMatchObject({ marginBlock: '9rem' })
    expect(theme.layers.states['a:hover']).toBeDefined()
  })

  it('cai no tema padrao quando o conteudo salvo e ilegivel', async () => {
    localStorage.setItem(STORAGE_KEY, '{ nao e json')
    const { useStudioStore } = await import('../src/theme/store')
    expect(useStudioStore.getState().theme.schemaVersion).toBe(2)
  })

  it('cai no tema padrao quando o schema e mais novo que o suportado', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 99 }))
    const { useStudioStore } = await import('../src/theme/store')
    expect(useStudioStore.getState().theme.metadata.name).toBe('Minimal')
  })
})
