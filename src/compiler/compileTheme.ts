import { supportedElements, type CssPropertyMap, type Theme, type ThemeTokensV2 } from '../theme/schema'
import { tokenName } from '../theme/tokenNames'
import { scrollRules } from './scrollRules'
import { webfontImportRule } from './webfonts'

const legacyElementOrder = [
  'body','header','nav','main','section','article','aside','footer',
  'h1','h2','h3','h4','h5','h6','p','a','strong','em','small','mark','del','ins',
  'ul','ol','li','dl','dt','dd','blockquote','hr','code','pre','kbd',
  'table','thead','tbody','tfoot','tr','th','td','caption',
  'form','fieldset','legend','label','input','textarea','select','option','button',
  'img','figure','figcaption','details','summary',
]
const elementOrder: string[] = [
  ...legacyElementOrder,
  ...supportedElements.filter((selector) => !legacyElementOrder.includes(selector)),
]

const stateOrder = ['hover', 'focus', 'focus-visible', 'active', 'disabled', 'checked'] as const

function kebab(value: string): string {
  return value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)
}

function declarations(styles: CssPropertyMap, indent = '  '): string {
  return Object.entries(styles)
    .filter(([, value]) => value !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([property, value]) => {
      // Custom properties sao case-sensitive e ja vem no formato final;
      // passar `--myVar` por kebab() corromperia o nome.
      const name = property.startsWith('--') ? property : kebab(property)
      return `${indent}${name}: ${value};`
    })
    .join('\n')
}

function rule(selector: string, styles: CssPropertyMap): string {
  const body = declarations(styles)
  return body ? `${selector} {\n${body}\n}` : ''
}

const tokenGroups: Array<keyof ThemeTokensV2> = [
  'colors', 'typography', 'spacing', 'radius', 'shadow', 'layout', 'scroll',
]

function tokenEntries(theme: Theme): Array<[string, string]> {
  return tokenGroups.flatMap((group) =>
    Object.entries(theme.tokens[group]).map(
      ([key, value]) => [tokenName(group, key), String(value)] as [string, string],
    ),
  )
}

function rootVariables(theme: Theme): string {
  const body = tokenEntries(theme)
    .map(([name, value]) => `  --${name}: ${value};`)
    .join('\n')
  return `:root {\n${body}\n}`
}

const LAYER_ORDER = ['reset', 'base', 'elements', 'states', 'responsive'] as const

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

function baseRules(theme: Theme): string[] {
  const rules: string[] = [rootVariables(theme)]
  for (const [selector, styles] of Object.entries(theme.layers.base)) {
    const emitted = rule(`:where(${selector})`, styles)
    if (emitted) rules.push(emitted)
  }
  rules.push(...scrollRules(theme))
  // Estrutural, nao escolha de estilo: continua gerado pelo compilador e fora
  // do :where() — :root[data-theme] precisa da especificidade de atributo
  // para vencer os tokens claros.
  rules.push(`:root[data-theme="light"] { color-scheme: light; }\n:root[data-theme="dark"] { color-scheme: dark; }`)
  const dark = darkModeRule(theme)
  if (dark) rules.push(dark)
  return rules
}

function elementRules(theme: Theme): string[] {
  const elements = theme.layers.elements
  const known = elementOrder.filter((key) => elements[key])
  const extras = Object.keys(elements).filter((key) => !elementOrder.includes(key)).sort()
  return [...known, ...extras].map((selector) => rule(selector, elements[selector])).filter(Boolean)
}

/**
 * As chaves de `layers.states` ja sao seletores completos (`button:hover`).
 * A ordenacao continua sendo elemento (por `elementOrder`) e depois estado
 * (por `stateOrder`): a ordem entre `:hover`, `:active` e `:disabled` do mesmo
 * elemento decide quem vence com especificidade igual, entao ordenar em
 * alfabetica trocaria o comportamento em vez de so mover linhas.
 */
function splitState(selector: string): [string, string] {
  const at = selector.indexOf(':')
  return at === -1 ? [selector, ''] : [selector.slice(0, at), selector.slice(at + 1)]
}

function stateRank(state: string): number {
  const index = (stateOrder as readonly string[]).indexOf(state)
  return index === -1 ? stateOrder.length : index
}

function stateRules(theme: Theme): string[] {
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
  return selectors.map((selector) => rule(selector, states[selector])).filter(Boolean)
}

function responsiveRules(theme: Theme): string[] {
  const order = ['tablet', 'mobile']
  const keys = [
    ...order.filter((key) => key in theme.layers.responsive),
    ...Object.keys(theme.layers.responsive).filter((key) => !order.includes(key)).sort(),
  ]
  return keys
    .map((key) => {
      const body = Object.entries(theme.layers.responsive[key])
        .map(([selector, styles]) => {
          const inner = declarations(styles, '    ')
          return inner ? `  ${selector} {\n${inner}\n  }` : ''
        })
        .filter(Boolean)
        .join('\n')
      return body ? `@media (max-width: ${theme.breakpoints[key]}px) {\n${body}\n}` : ''
    })
    .filter(Boolean)
}

function darkModeRule(theme: Theme): string {
  const colors = theme.modes.dark?.colors
  if (!colors || Object.keys(colors).length === 0) return ''
  const vars = Object.entries(colors)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `    --${tokenName('colors', key)}: ${value};`)
    .join('\n')
  const manual = `:root[data-theme="dark"] {\n${vars.replaceAll('    ', '  ')}\n}`
  const automatic = `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${vars}\n  }\n}`
  return `${manual}\n\n${automatic}`
}

export function compileTheme(theme: Theme): string {
  const blocks = [
    `/* ${theme.metadata.name} v${theme.metadata.version} — generated by Semantic CSS Studio */`,
    // O @import precede a declaração de camadas: fora isso o CSS o ignoraria.
    webfontImportRule(theme.fonts),
    `@layer ${LAYER_ORDER.join(', ')};`,
    layerBlock('reset', resetRules(theme)),
    layerBlock('base', baseRules(theme)),
    layerBlock('elements', elementRules(theme)),
    layerBlock('states', stateRules(theme)),
    layerBlock('responsive', responsiveRules(theme)),
  ].filter(Boolean)
  return `${blocks.join('\n\n')}\n`
}
