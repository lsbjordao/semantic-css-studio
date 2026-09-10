import {
  supportedElements,
  type CssPropertyMap,
  type Theme,
  type ThemeTokensV2,
} from '../theme/schema'
import { iconControlRules } from '../icons/css'
import { tokenName } from '../theme/tokenNames'
import { scrollRules } from './scrollRules'
import { webfontImportRule } from './webfonts'

const legacyElementOrder = [
  'body',
  'header',
  'nav',
  'main',
  'section',
  'article',
  'aside',
  'footer',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'a',
  'strong',
  'em',
  'small',
  'mark',
  'del',
  'ins',
  'ul',
  'ol',
  'li',
  'dl',
  'dt',
  'dd',
  'blockquote',
  'hr',
  'code',
  'pre',
  'kbd',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'caption',
  'form',
  'fieldset',
  'legend',
  'label',
  'input',
  'textarea',
  'select',
  'option',
  'button',
  'img',
  'figure',
  'figcaption',
  'details',
  'summary',
]
const elementOrder: string[] = [
  ...legacyElementOrder,
  ...supportedElements.filter(
    (selector) => !legacyElementOrder.includes(selector),
  ),
]

const stateOrder = [
  'hover',
  'focus',
  'focus-visible',
  'active',
  'disabled',
  'checked',
] as const

function kebab(value: string): string {
  return value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)
}

function declarations(styles: CssPropertyMap, indent = '  '): string {
  return Object.entries(styles)
    .filter(([, value]) => value !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([property, value]) => {
      // Custom properties are case-sensitive and already come in final form;
      // passing `--myVar` through kebab() would corrupt the name.
      const name = property.startsWith('--') ? property : kebab(property)
      return `${indent}${name}: ${value};`
    })
    .join('\n')
}

function rule(selector: string, styles: CssPropertyMap): string {
  const body = declarations(styles)
  return body ? `${selector} {\n${body}\n}` : ''
}

function scopeSelector(
  selector: string,
  scopes: readonly string[],
  directBody = false,
): string {
  if (!scopes.length && !directBody) return selector
  return selector
    .split(',')
    .flatMap((part) => {
      const trimmed = part.trim()
      if (
        trimmed === ':root' ||
        trimmed.startsWith(':root[') ||
        trimmed === 'html' ||
        trimmed === 'body'
      )
        return [trimmed]
      return [
        ...scopes.map((scope) => `${scope} ${trimmed}`),
        ...(directBody ? [`body > ${trimmed}`] : []),
      ]
    })
    .join(', ')
}

const tokenGroups: Array<keyof ThemeTokensV2> = [
  'colors',
  'typography',
  'spacing',
  'radius',
  'shadow',
  'layout',
  'scroll',
]

function tokenEntries(theme: Theme): Array<[string, string]> {
  return tokenGroups.flatMap((group) =>
    Object.entries(theme.tokens[group]).map(
      ([key, value]) =>
        [tokenName(group, key), String(value)] as [string, string],
    ),
  )
}

function rootVariables(theme: Theme): string {
  const body = tokenEntries(theme)
    .map(([name, value]) => `  --${name}: ${value};`)
    .join('\n')
  return `:root {\n${body}\n}`
}

const LAYER_ORDER = [
  'reset',
  'base',
  'elements',
  'states',
  'responsive',
] as const

function indent(block: string): string {
  return block
    .split('\n')
    .map((line) => (line ? `  ${line}` : line))
    .join('\n')
}

function layerBlock(name: string, rules: string[]): string {
  const body = rules.filter(Boolean).map(indent).join('\n\n')
  return body ? `@layer ${name} {\n${body}\n}` : ''
}

function resetRules(theme: Theme): string[] {
  return theme.options.includeMinimalReset
    ? [`*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}`]
    : []
}

export interface CompileThemeOptions {
  layers?: boolean
  omitElements?: string[]
  scopes?: string[]
  directBody?: boolean
  colorMode?: CompileColorMode
}

export type CompileColorMode = 'light' | 'dark' | 'auto'

function baseRules(
  theme: Theme,
  scopes: readonly string[] = [],
  directBody = false,
  colorMode: CompileColorMode = 'auto',
): string[] {
  const rules: string[] = [rootVariables(theme)]
  for (const [selector, styles] of Object.entries(theme.layers.base)) {
    const emitted = rule(
      `:where(${scopeSelector(selector, scopes, directBody)})`,
      styles,
    )
    if (emitted) rules.push(emitted)
  }
  rules.push(...scrollRules(theme))
  // Structural, not a style choice: still compiler-generated and outside
  // :where() — :root[data-theme] needs attribute specificity to beat the
  // light tokens.
  rules.push(colorSchemeRule(colorMode))
  const dark = darkModeRule(theme, colorMode)
  if (dark) rules.push(dark)
  return rules
}

function elementRules(
  theme: Theme,
  omittedElements: ReadonlySet<string> = new Set(),
  scopes: readonly string[] = [],
  directBody = false,
): string[] {
  const elements = theme.layers.elements
  const known = elementOrder.filter(
    (key) => elements[key] && !omittedElements.has(key),
  )
  const extras = Object.keys(elements)
    .filter((key) => !elementOrder.includes(key) && !omittedElements.has(key))
    .sort()
  return [...known]
    .concat(extras)
    .map((selector) =>
      rule(scopeSelector(selector, scopes, directBody), elements[selector]),
    )
    .filter(Boolean)
    .concat(
      iconControlRules(theme, scopes, directBody),
      taskListRules(theme, scopes, directBody),
    )
}

function taskListRules(
  theme: Theme,
  scopes: readonly string[] = [],
  directBody = false,
): string[] {
  const taskCheckboxSelector = scopeSelector(
    '.task-list input[type="checkbox"]',
    scopes,
    directBody,
  )
  const rules = [
    rule(scopeSelector('.task-list, .task-list-item', scopes, directBody), {
      listStyle: 'none',
      paddingInlineStart: '0',
    }),
    rule(
      taskCheckboxSelector,
      (theme.icons?.library ?? 'none') === 'none'
        ? {
            accentColor: 'var(--color-primary)',
            background: 'transparent',
            border: '0',
            inlineSize: 'auto',
            marginBlock: '0 !important',
            marginInline: '0 var(--space-sm) !important',
            padding: '0',
            width: 'auto',
          }
        : {
            marginBlock: '0 !important',
            marginInline: '0 var(--space-sm) !important',
          },
    ),
    rule(scopeSelector('.task-list-item', scopes, directBody), {
      alignItems: 'baseline',
      display: 'flex',
      gap: 'var(--space-sm)',
    }),
  ]
  return rules
}

/**
 * `layers.states` keys are already complete selectors (`button:hover`).
 * Ordering stays element-first (by `elementOrder`) then state (by
 * `stateOrder`): the order between `:hover`, `:active` and `:disabled` of the
 * same element decides what wins at equal specificity, so alphabetical
 * sorting would change behavior instead of just moving lines.
 */
function splitState(selector: string): [string, string] {
  const at = selector.indexOf(':')
  return at === -1
    ? [selector, '']
    : [selector.slice(0, at), selector.slice(at + 1)]
}

function stateRank(state: string): number {
  const index = (stateOrder as readonly string[]).indexOf(state)
  return index === -1 ? stateOrder.length : index
}

function stateRules(
  theme: Theme,
  scopes: readonly string[] = [],
  directBody = false,
): string[] {
  const states = theme.layers.states
  const selectors = Object.keys(states).sort((a, b) => {
    const [aElement, aState] = splitState(a)
    const [bElement, bState] = splitState(b)
    const ai = elementOrder.indexOf(aElement)
    const bi = elementOrder.indexOf(bElement)
    if (ai !== bi) {
      if (ai === -1) return 1
      if (bi === -1) return -1
      return ai - bi
    }
    if (aElement !== bElement) return aElement.localeCompare(bElement)
    const as = stateRank(aState)
    const bs = stateRank(bState)
    if (as !== bs) return as - bs
    return a.localeCompare(b)
  })
  return selectors
    .map((selector) =>
      rule(scopeSelector(selector, scopes, directBody), states[selector]),
    )
    .filter(Boolean)
}

function responsiveRules(
  theme: Theme,
  scopes: readonly string[] = [],
  directBody = false,
): string[] {
  const order = ['tablet', 'mobile']
  const keys = [
    ...order.filter((key) => key in theme.layers.responsive),
    ...Object.keys(theme.layers.responsive)
      .filter((key) => !order.includes(key))
      .sort(),
  ]
  return keys
    .map((key) => {
      const body = Object.entries(theme.layers.responsive[key])
        .map(([selector, styles]) => {
          const inner = declarations(styles, '    ')
          const scoped = scopeSelector(selector, scopes, directBody)
          return inner ? `  ${scoped} {\n${inner}\n  }` : ''
        })
        .filter(Boolean)
        .join('\n')
      return body
        ? `@media (max-width: ${theme.breakpoints[key]}px) {\n${body}\n}`
        : ''
    })
    .filter(Boolean)
}

function colorSchemeRule(mode: CompileColorMode): string {
  if (mode === 'light') return ':root { color-scheme: light; }'
  if (mode === 'dark') return ':root { color-scheme: dark; }'
  return `:root[data-theme="light"] { color-scheme: light; }\n:root[data-theme="dark"] { color-scheme: dark; }`
}

function darkModeRule(theme: Theme, mode: CompileColorMode = 'auto'): string {
  const colors = theme.modes.dark?.colors
  if (mode === 'light' || !colors || Object.keys(colors).length === 0) return ''
  const vars = Object.entries(colors)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `    --${tokenName('colors', key)}: ${value};`)
    .join('\n')
  if (mode === 'dark') return `:root {\n${vars.replaceAll('    ', '  ')}\n}`
  const manual = `:root[data-theme="dark"] {\n${vars.replaceAll('    ', '  ')}\n}`
  const automatic = `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${vars}\n  }\n}`
  return `${manual}\n\n${automatic}`
}

export function compileTheme(
  theme: Theme,
  options: CompileThemeOptions = {},
): string {
  const layers = options.layers ?? true
  const omittedElements = new Set(options.omitElements)
  const scopes = options.scopes ?? []
  const directBody = options.directBody ?? false
  const colorMode = options.colorMode ?? 'auto'
  const blocks = [
    `/* ${theme.metadata.name} v${theme.metadata.version} — generated by Semantic CSS Studio */`,
    // @import precedes the layer declaration: otherwise CSS would ignore it.
    webfontImportRule(theme.fonts),
    ...(layers
      ? [
          `@layer ${LAYER_ORDER.join(', ')};`,
          layerBlock('reset', resetRules(theme)),
          layerBlock('base', baseRules(theme, scopes, directBody, colorMode)),
          layerBlock(
            'elements',
            elementRules(theme, omittedElements, scopes, directBody),
          ),
          layerBlock('states', stateRules(theme, scopes, directBody)),
          layerBlock('responsive', responsiveRules(theme, scopes, directBody)),
        ]
      : [
          ...resetRules(theme),
          ...baseRules(theme, scopes, directBody, colorMode),
          ...elementRules(theme, omittedElements, scopes, directBody),
          ...stateRules(theme, scopes, directBody),
          ...responsiveRules(theme, scopes, directBody),
        ]),
  ].filter(Boolean)
  return `${blocks.join('\n\n')}\n`
}
