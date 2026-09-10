import { isValidSelector } from '../compiler/selectorValidation'
import { isIconLibraryId } from '../icons/types'
import {
  preCodeNeutraliser,
  seedBaseRules,
  seedResponsiveRules,
} from './baseRules'
import { scrollDefaults } from './scrollDefaults'
import {
  SCHEMA_VERSION,
  type RuleMap,
  type ThemeLayers,
  type ThemeTokensV2,
  type ThemeV1,
  type ThemeV2,
} from './schema'

export function validateTheme(
  candidate: Partial<ThemeV1>,
): asserts candidate is ThemeV1 {
  if (!candidate.metadata?.name || !candidate.metadata.version)
    throw new Error('Theme metadata is incomplete.')
  if (
    !candidate.tokens?.colors ||
    !candidate.tokens.typography ||
    !candidate.tokens.spacing
  ) {
    throw new Error('Theme tokens are incomplete.')
  }
  if (!candidate.elements || typeof candidate.elements !== 'object')
    throw new Error('Theme elements are missing.')
  if (!candidate.responsive)
    throw new Error('Responsive configuration is missing.')
}

const themeTokenGroups: Array<keyof ThemeTokensV2> = [
  'colors',
  'typography',
  'spacing',
  'radius',
  'shadow',
  'layout',
  'scroll',
]
const themeLayerNames: Array<keyof ThemeLayers> = [
  'base',
  'elements',
  'states',
  'responsive',
]

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * The message reaches the user via the Topbar's `alert(error.message)`, so it
 * states in plain prose which field is missing or malformed — not a stack
 * trace fragment.
 */
function invalidTheme(detail: string): never {
  throw new Error(`Invalid theme: ${detail}`)
}

/**
 * Checks the structure that `migrateThemeV2` promises to return.
 *
 * Without this, a syntactically valid but structurally empty v2 (without
 * `tokens`, for example) passed through migration untouched, was committed by
 * the store, written to `localStorage` by the subscription, and only blew up
 * inside the compiler's `useMemo` — mid-render, after the import's `try/catch`
 * had already returned. Result: a white screen, and reloading read the same
 * content and blew up again. Rejecting at the entry point is what keeps the
 * defect out of persisted state.
 */
export function validateThemeV2(
  candidate: unknown,
): asserts candidate is ThemeV2 {
  if (!isRecord(candidate)) invalidTheme('content must be a JSON object.')

  const metadata = candidate.metadata
  if (!isRecord(metadata))
    invalidTheme('missing "metadata" block with the theme name and version.')
  if (typeof metadata.name !== 'string' || !metadata.name) {
    invalidTheme('"metadata.name" must be the theme name.')
  }
  if (typeof metadata.version !== 'string' || !metadata.version) {
    invalidTheme('"metadata.version" must be the theme version.')
  }

  const tokens = candidate.tokens
  if (!isRecord(tokens))
    invalidTheme('missing "tokens" block with the theme variable groups.')
  for (const group of themeTokenGroups) {
    if (!isRecord(tokens[group])) {
      invalidTheme(
        `token group "${group}" is missing or not an object. ` +
          `A v2 theme needs all seven groups: ${themeTokenGroups.join(', ')}.`,
      )
    }
  }

  const modes = candidate.modes
  if (!isRecord(modes))
    invalidTheme('missing "modes" block with the colors for each mode.')
  if (!isRecord(modes.light))
    invalidTheme('missing "modes.light", the light-mode colors.')

  const layers = candidate.layers
  if (!isRecord(layers)) {
    invalidTheme(
      'missing "layers" block with the base, elements, states and responsive layers.',
    )
  }
  for (const layer of themeLayerNames) {
    if (!isRecord(layers[layer])) {
      invalidTheme(`"layers.${layer}" is missing or not a rule object.`)
    }
  }

  if (!isRecord(candidate.breakpoints)) {
    invalidTheme(
      '"breakpoints" must be an object with the width of each breakpoint.',
    )
  }

  const options = candidate.options
  if (!isRecord(options)) {
    invalidTheme(
      'missing "options" block with includeMinimalReset and reducedMotion.',
    )
  }
  if (typeof options.includeMinimalReset !== 'boolean') {
    invalidTheme('"options.includeMinimalReset" must be true or false.')
  }
  if (typeof options.reducedMotion !== 'boolean') {
    invalidTheme('"options.reducedMotion" must be true or false.')
  }

  const icons = candidate.icons
  if (icons !== undefined) {
    if (
      !isRecord(icons) ||
      !isIconLibraryId((icons as { library?: unknown }).library)
    ) {
      invalidTheme(
        '"icons.library" must be one of the supported libraries (or "none").',
      )
    }
  }

  const quarto = candidate.quarto
  if (quarto !== undefined) {
    if (!isRecord(quarto)) {
      invalidTheme(
        '"quarto" must be an object with the Quarto export settings.',
      )
    }
    const sidebarTone = (quarto as { sidebarTone?: unknown }).sidebarTone
    if (
      sidebarTone !== undefined &&
      sidebarTone !== 'surface' &&
      sidebarTone !== 'background'
    ) {
      invalidTheme('"quarto.sidebarTone" must be "surface" or "background".')
    }
  }
}

/**
 * `states[el][state]` becomes the `"el:state"` key. Lossless for well-formed
 * input (element selector and state name without ':'); an ambiguous combined
 * key is rejected instead of merged.
 */
function flattenStates(states: ThemeV1['states']): RuleMap {
  const flat: RuleMap = {}
  for (const [element, byState] of Object.entries(states ?? {})) {
    for (const [state, declarations] of Object.entries(byState ?? {})) {
      if (!declarations || Object.keys(declarations).length === 0) continue
      const key = `${element}:${state}`
      // The combined key is ambiguous when the selector or the state name
      // already contains ':'. We prefer failing loudly over silently
      // overwriting: losing a user rule without warning is worse than
      // rejecting the file.
      if (key in flat) {
        throw new Error(
          `Collision while flattening states: key "${key}" was produced by more than one element/state pair.`,
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
      throw new Error(`Invalid selector in layer ${layer}: ${selector}`)
    }
  }
}

/**
 * Moves `pre code` from `layers.base` to `layers.elements`.
 *
 * The rule was born in the v2 base layer and stayed inert: in `@layer base` it
 * is emitted as `:where(pre code)` with 0 specificity, and layer order beats
 * specificity without exception — `code` in `@layer elements` always won, and
 * code inside a `<pre>` inherited the inline-code chrome.
 *
 * Already published code no longer carries this rule in the seed, but every
 * theme saved in `localStorage` or exported to JSON before this fix carries
 * it — and would stay broken. This is a special case for a single selector,
 * assumed deliberately: the alternative is asking the user to clear storage
 * by hand. We only migrate when `elements` does not define `pre code` yet; if
 * it does, its rule already wins and we leave it alone.
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
      throw new Error(`Missing breakpoint for layers.responsive key: ${key}`)
    }
  }
}

/**
 * Migrates a `Theme` (v1 or v2, from untrusted JSON) to the layered v2 shape.
 * An already-ready v2 is checked by `validateThemeV2` and goes through the
 * same selector and breakpoint validations, with no other transformation
 * besides `pre code` normalisation.
 */
export function migrateThemeV2(input: unknown): ThemeV2 {
  if (!input || typeof input !== 'object')
    throw new Error('Theme must be a JSON object.')
  const candidate = input as Partial<ThemeV2> & Partial<ThemeV1>

  if (typeof candidate.schemaVersion !== 'number')
    throw new Error('Missing schemaVersion.')
  if (candidate.schemaVersion > SCHEMA_VERSION) {
    throw new Error(
      `Theme schema ${candidate.schemaVersion} is newer than supported schema ${SCHEMA_VERSION}.`,
    )
  }
  if (candidate.schemaVersion < 1) throw new Error('Unsupported theme schema.')

  let upgraded: ThemeV2
  if (candidate.schemaVersion === SCHEMA_VERSION) {
    upgraded = structuredClone(candidate as ThemeV2)
  } else {
    upgraded = upgradeFromV1(candidate as ThemeV1)
  }

  // The guard applies to BOTH branches, not just v2. `validateTheme` only
  // covers colors/typography/spacing, so a v1 without `radius`, `shadow` or
  // `modes` was accepted, persisted, and only blew up inside the React render —
  // a white screen surviving reload. Validating the result, not the input,
  // closes the whole class at once.
  validateThemeV2(upgraded)

  normalisePreCode(upgraded)

  assertSelectors(upgraded.layers.base, 'base')
  assertSelectors(upgraded.layers.elements, 'elements')
  assertSelectors(upgraded.layers.states, 'states')
  for (const [breakpoint, rules] of Object.entries(
    upgraded.layers.responsive,
  )) {
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
      throw new Error(`Invalid selector in elements layer: ${selector}`)
    }
    elements[selector] = { ...declarations }
  }
  // The v1 compiler emitted a fixed `pre code`, outside the model. Without this,
  // upgrading a v1 theme would lose the inline-code neutralisation inside `<pre>`.
  elements['pre code'] ??= { ...preCodeNeutraliser }

  return {
    schemaVersion: SCHEMA_VERSION,
    metadata: structuredClone(theme.metadata),
    tokens: {
      colors: structuredClone(theme.tokens.colors),
      typography: structuredClone(theme.tokens.typography),
      radius: structuredClone(theme.tokens.radius),
      shadow: structuredClone(theme.tokens.shadow),
      spacing: {
        ...structuredClone(theme.tokens.spacing),
        space2xlXs: '2.5rem',
      },
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
