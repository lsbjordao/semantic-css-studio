import { isValidSelector } from '../compiler/selectorValidation'
import { seedBaseRules, seedResponsiveRules } from './baseRules'
import { scrollDefaults } from './scrollDefaults'
import { SCHEMA_VERSION, type RuleMap, type Theme, type ThemeV1, type ThemeV2 } from './schema'

export function migrateTheme(input: unknown): Theme {
  if (!input || typeof input !== 'object') throw new Error('Theme must be a JSON object.')
  const candidate = input as Partial<Theme>
  if (typeof candidate.schemaVersion !== 'number') throw new Error('Missing schemaVersion.')
  if (candidate.schemaVersion > SCHEMA_VERSION) {
    throw new Error(`Theme schema ${candidate.schemaVersion} is newer than supported schema ${SCHEMA_VERSION}.`)
  }
  if (candidate.schemaVersion < 1) throw new Error('Unsupported theme schema.')
  validateTheme(candidate)
  return structuredClone(candidate as Theme)
}

export function validateTheme(candidate: Partial<Theme>): asserts candidate is Theme {
  if (!candidate.metadata?.name || !candidate.metadata.version) throw new Error('Theme metadata is incomplete.')
  if (!candidate.tokens?.colors || !candidate.tokens.typography || !candidate.tokens.spacing) {
    throw new Error('Theme tokens are incomplete.')
  }
  if (!candidate.elements || typeof candidate.elements !== 'object') throw new Error('Theme elements are missing.')
  if (!candidate.responsive) throw new Error('Responsive configuration is missing.')
}

const SCHEMA_VERSION_V2 = 2

/** `states[el][state]` vira a chave `"el:state"`. Conversão sem perda. */
function flattenStates(states: ThemeV1['states']): RuleMap {
  const flat: RuleMap = {}
  for (const [element, byState] of Object.entries(states ?? {})) {
    for (const [state, declarations] of Object.entries(byState ?? {})) {
      if (declarations && Object.keys(declarations).length > 0) {
        flat[`${element}:${state}`] = { ...declarations }
      }
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

function assertBreakpointsMatch(theme: ThemeV2): void {
  for (const key of Object.keys(theme.layers.responsive)) {
    if (!(key in theme.breakpoints)) {
      throw new Error(`Breakpoint ausente para a chave de layers.responsive: ${key}`)
    }
  }
}

/**
 * Migra um `Theme` (v1 ou v2, vindo de JSON não confiável) para a forma em
 * camadas do v2. Um v2 já pronto passa apenas pelas mesmas validações de
 * seletor e breakpoint, sem outra transformação.
 */
export function migrateThemeV2(input: unknown): ThemeV2 {
  if (!input || typeof input !== 'object') throw new Error('Theme must be a JSON object.')
  const candidate = input as Partial<ThemeV2> & Partial<ThemeV1>

  if (typeof candidate.schemaVersion !== 'number') throw new Error('Missing schemaVersion.')
  if (candidate.schemaVersion > SCHEMA_VERSION_V2) {
    throw new Error(
      `Theme schema ${candidate.schemaVersion} is newer than supported schema ${SCHEMA_VERSION_V2}.`,
    )
  }
  if (candidate.schemaVersion < 1) throw new Error('Unsupported theme schema.')

  const upgraded =
    candidate.schemaVersion === SCHEMA_VERSION_V2
      ? structuredClone(candidate as ThemeV2)
      : upgradeFromV1(candidate as ThemeV1)

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

  return {
    schemaVersion: SCHEMA_VERSION_V2,
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
