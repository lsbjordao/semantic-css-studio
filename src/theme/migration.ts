import { isValidSelector } from '../compiler/selectorValidation'
import { preCodeNeutraliser, seedBaseRules, seedResponsiveRules } from './baseRules'
import { scrollDefaults } from './scrollDefaults'
import {
  SCHEMA_VERSION,
  type RuleMap,
  type ThemeLayers,
  type ThemeTokensV2,
  type ThemeV1,
  type ThemeV2,
} from './schema'

export function validateTheme(candidate: Partial<ThemeV1>): asserts candidate is ThemeV1 {
  if (!candidate.metadata?.name || !candidate.metadata.version) throw new Error('Theme metadata is incomplete.')
  if (!candidate.tokens?.colors || !candidate.tokens.typography || !candidate.tokens.spacing) {
    throw new Error('Theme tokens are incomplete.')
  }
  if (!candidate.elements || typeof candidate.elements !== 'object') throw new Error('Theme elements are missing.')
  if (!candidate.responsive) throw new Error('Responsive configuration is missing.')
}

const themeTokenGroups: Array<keyof ThemeTokensV2> = [
  'colors', 'typography', 'spacing', 'radius', 'shadow', 'layout', 'scroll',
]
const themeLayerNames: Array<keyof ThemeLayers> = ['base', 'elements', 'states', 'responsive']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * A mensagem chega ao usuário pelo `alert(error.message)` do Topbar, então diz
 * em texto corrido qual campo está faltando ou malformado — não um fragmento
 * de stack trace.
 */
function invalidTheme(detail: string): never {
  throw new Error(`Tema inválido: ${detail}`)
}

/**
 * Confere a estrutura que `migrateThemeV2` promete devolver.
 *
 * Sem isto, um v2 sintaticamente válido mas estruturalmente vazio (sem
 * `tokens`, por exemplo) atravessava a migração intacto, era comitado pela
 * store, gravado no `localStorage` pela subscription e só estourava dentro do
 * `useMemo` do compilador — em pleno render, depois que o `try/catch` do
 * import já tinha retornado. Resultado: tela branca, e o reload lia o mesmo
 * conteúdo e estourava de novo. Recusar na entrada é o que mantém o defeito
 * fora do estado persistido.
 */
export function validateThemeV2(candidate: unknown): asserts candidate is ThemeV2 {
  if (!isRecord(candidate)) invalidTheme('o conteúdo precisa ser um objeto JSON.')

  const metadata = candidate.metadata
  if (!isRecord(metadata)) invalidTheme('falta o bloco "metadata" com o nome e a versão do tema.')
  if (typeof metadata.name !== 'string' || !metadata.name) {
    invalidTheme('"metadata.name" precisa ser o nome do tema.')
  }
  if (typeof metadata.version !== 'string' || !metadata.version) {
    invalidTheme('"metadata.version" precisa ser a versão do tema.')
  }

  const tokens = candidate.tokens
  if (!isRecord(tokens)) invalidTheme('falta o bloco "tokens" com os grupos de variáveis do tema.')
  for (const group of themeTokenGroups) {
    if (!isRecord(tokens[group])) {
      invalidTheme(
        `o grupo de tokens "${group}" está faltando ou não é um objeto. ` +
        `Um tema v2 precisa dos sete grupos: ${themeTokenGroups.join(', ')}.`,
      )
    }
  }

  const modes = candidate.modes
  if (!isRecord(modes)) invalidTheme('falta o bloco "modes" com as cores de cada modo.')
  if (!isRecord(modes.light)) invalidTheme('falta "modes.light", as cores do modo claro.')

  const layers = candidate.layers
  if (!isRecord(layers)) {
    invalidTheme('falta o bloco "layers" com as camadas base, elements, states e responsive.')
  }
  for (const layer of themeLayerNames) {
    if (!isRecord(layers[layer])) {
      invalidTheme(`"layers.${layer}" está faltando ou não é um objeto de regras.`)
    }
  }

  if (!isRecord(candidate.breakpoints)) {
    invalidTheme('"breakpoints" precisa ser um objeto com a largura de cada breakpoint.')
  }

  const options = candidate.options
  if (!isRecord(options)) {
    invalidTheme('falta o bloco "options" com includeMinimalReset e reducedMotion.')
  }
  if (typeof options.includeMinimalReset !== 'boolean') {
    invalidTheme('"options.includeMinimalReset" precisa ser true ou false.')
  }
  if (typeof options.reducedMotion !== 'boolean') {
    invalidTheme('"options.reducedMotion" precisa ser true ou false.')
  }
}

/**
 * `states[el][state]` vira a chave `"el:state"`. Sem perda para entrada
 * bem-formada (seletor de elemento e nome de estado sem ':'); uma chave
 * combinada ambigua e recusada em vez de mesclada.
 */
function flattenStates(states: ThemeV1['states']): RuleMap {
  const flat: RuleMap = {}
  for (const [element, byState] of Object.entries(states ?? {})) {
    for (const [state, declarations] of Object.entries(byState ?? {})) {
      if (!declarations || Object.keys(declarations).length === 0) continue
      const key = `${element}:${state}`
      // A chave combinada e ambigua quando o seletor ou o nome do estado ja
      // contem ':'. Preferimos falhar alto a sobrescrever em silencio: perder
      // regra do usuario sem aviso e pior que recusar o arquivo.
      if (key in flat) {
        throw new Error(
          `Colisao ao achatar estados: a chave "${key}" foi produzida por mais de um par elemento/estado.`,
        )
      }
      flat[key] = { ...declarations }
    }
  }
  return flat
}

function assertSelectors(rules: RuleMap, layer: string): void {
  for (const selector of Object.keys(rules)) {
    if (!isValidSelector(selector)) {
      throw new Error(`Seletor invalido na camada ${layer}: ${selector}`)
    }
  }
}

/**
 * Move `pre code` de `layers.base` para `layers.elements`.
 *
 * A regra nasceu na camada base do v2 e ficava inerte: em `@layer base` ela sai
 * como `:where(pre code)`, especificidade 0, e a ordem de camadas vence a
 * especificidade sem exceção — `code`, em `@layer elements`, sempre ganhava, e
 * o código dentro de um `<pre>` herdava o chrome do código inline.
 *
 * O código já publicado não carrega mais essa regra na semente, mas todo tema
 * salvo no `localStorage` ou exportado para JSON antes desta correção carrega —
 * e continuaria quebrado. É um caso especial para um seletor só, e assumimos
 * isso conscientemente: a alternativa é o usuário limpar o armazenamento à mão.
 * Só migramos quando `elements` ainda não define `pre code`; se define, a regra
 * dele já é a que vence e não mexemos no que é dele.
 */
function normalisePreCode(theme: ThemeV2): void {
  const fromBase = theme.layers.base['pre code']
  if (!fromBase || theme.layers.elements['pre code']) return
  delete theme.layers.base['pre code']
  theme.layers.elements['pre code'] = fromBase
}

function assertBreakpointsMatch(theme: ThemeV2): void {
  for (const key of Object.keys(theme.layers.responsive)) {
    if (!(key in theme.breakpoints)) {
      throw new Error(`Breakpoint ausente para a chave de layers.responsive: ${key}`)
    }
  }
}

/**
 * Migra um `Theme` (v1 ou v2, vindo de JSON não confiável) para a forma em
 * camadas do v2. Um v2 já pronto é conferido por `validateThemeV2` e passa
 * pelas mesmas validações de seletor e breakpoint, sem outra transformação
 * além da normalização de `pre code`.
 */
export function migrateThemeV2(input: unknown): ThemeV2 {
  if (!input || typeof input !== 'object') throw new Error('Theme must be a JSON object.')
  const candidate = input as Partial<ThemeV2> & Partial<ThemeV1>

  if (typeof candidate.schemaVersion !== 'number') throw new Error('Missing schemaVersion.')
  if (candidate.schemaVersion > SCHEMA_VERSION) {
    throw new Error(
      `Theme schema ${candidate.schemaVersion} is newer than supported schema ${SCHEMA_VERSION}.`,
    )
  }
  if (candidate.schemaVersion < 1) throw new Error('Unsupported theme schema.')

  let upgraded: ThemeV2
  if (candidate.schemaVersion === SCHEMA_VERSION) {
    validateThemeV2(candidate)
    upgraded = structuredClone(candidate)
  } else {
    upgraded = upgradeFromV1(candidate as ThemeV1)
  }

  normalisePreCode(upgraded)

  assertSelectors(upgraded.layers.base, 'base')
  assertSelectors(upgraded.layers.elements, 'elements')
  assertSelectors(upgraded.layers.states, 'states')
  for (const [breakpoint, rules] of Object.entries(upgraded.layers.responsive)) {
    assertSelectors(rules, `responsive.${breakpoint}`)
  }
  assertBreakpointsMatch(upgraded)

  return upgraded
}

function upgradeFromV1(theme: ThemeV1): ThemeV2 {
  validateTheme(theme)

  const elements: RuleMap = {}
  for (const [selector, declarations] of Object.entries(theme.elements)) {
    if (!isValidSelector(selector)) {
      throw new Error(`Seletor invalido na camada elements: ${selector}`)
    }
    elements[selector] = { ...declarations }
  }
  // O compilador v1 emitia `pre code` fixo, fora do modelo. Sem isto, elevar um
  // tema v1 perderia a neutralização do código inline dentro de um `<pre>`.
  elements['pre code'] ??= { ...preCodeNeutraliser }

  return {
    schemaVersion: SCHEMA_VERSION,
    metadata: structuredClone(theme.metadata),
    tokens: {
      colors: structuredClone(theme.tokens.colors),
      typography: structuredClone(theme.tokens.typography),
      radius: structuredClone(theme.tokens.radius),
      shadow: structuredClone(theme.tokens.shadow),
      spacing: { ...structuredClone(theme.tokens.spacing), space2xlXs: '2.5rem' },
      layout: {
        ...structuredClone(theme.tokens.layout),
        bodyPaddingSm: '1rem',
        bodyPaddingXs: '0.8rem',
        sectionSpacingSm: '2rem',
      },
      scroll: { ...scrollDefaults },
    },
    modes: structuredClone(theme.modes),
    layers: {
      base: seedBaseRules(),
      elements,
      states: flattenStates(theme.states),
      responsive: seedResponsiveRules(),
    },
    breakpoints: { ...theme.responsive },
    options: {
      includeMinimalReset: theme.options.includeMinimalReset,
      reducedMotion: true,
    },
  }
}
