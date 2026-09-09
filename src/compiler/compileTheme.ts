import { supportedElements, type CssPropertyMap, type Theme } from '../theme/schema'

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

function tokenName(key: string): string {
  return kebab(key)
    .replace(/^background$/, 'color-background')
    .replace(/^surface$/, 'color-surface')
    .replace(/^surface-alt$/, 'color-surface-alt')
    .replace(/^text$/, 'color-text')
    .replace(/^text-muted$/, 'color-text-muted')
    .replace(/^primary$/, 'color-primary')
    .replace(/^primary-hover$/, 'color-primary-hover')
    .replace(/^primary-text$/, 'color-primary-text')
    .replace(/^secondary$/, 'color-secondary')
    .replace(/^border$/, 'color-border')
    .replace(/^success$/, 'color-success')
    .replace(/^warning$/, 'color-warning')
    .replace(/^danger$/, 'color-danger')
    .replace(/^code-background$/, 'color-code-background')
    .replace(/^code-text$/, 'color-code-text')
    .replace(/^font-body$/, 'font-body')
    .replace(/^font-heading$/, 'font-heading')
    .replace(/^font-mono$/, 'font-mono')
    .replace(/^font-size-/, 'font-size-')
    .replace(/^line-height-/, 'line-height-')
    .replace(/^font-weight-/, 'font-weight-')
    .replace(/^space-2xl$/, 'space-2xl')
    .replace(/^space-/, 'space-')
    .replace(/^radius-/, 'radius-')
    .replace(/^shadow-/, 'shadow-')
    .replace(/^content-width$/, 'content-width')
    .replace(/^wide-width$/, 'wide-width')
    .replace(/^body-padding$/, 'body-padding')
    .replace(/^section-spacing$/, 'section-spacing')
    .replace(/^header-width$/, 'header-width')
    .replace(/^footer-width$/, 'footer-width')
}

function declarations(styles: CssPropertyMap, indent = '  '): string {
  return Object.entries(styles)
    .filter(([, value]) => value !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([property, value]) => `${indent}${kebab(property)}: ${value};`)
    .join('\n')
}

function rule(selector: string, styles: CssPropertyMap): string {
  const body = declarations(styles)
  return body ? `${selector} {\n${body}\n}` : ''
}

function tokenEntries(theme: Theme): Array<[string, string]> {
  const entries = (group: object): Array<[string, string]> =>
    Object.entries(group).map(([key, value]) => [tokenName(key), String(value)])

  return [
    ...entries(theme.tokens.colors),
    ...entries(theme.tokens.typography),
    ...entries(theme.tokens.spacing),
    ...entries(theme.tokens.radius),
    ...entries(theme.tokens.shadow),
    ...entries(theme.tokens.layout),
  ]
}

function rootVariables(theme: Theme): string {
  const body = tokenEntries(theme)
    .map(([name, value]) => `  --${name}: ${value};`)
    .join('\n')
  return `:root {\n${body}\n}`
}

function baseRules(theme: Theme): string[] {
  const rules: string[] = []
  if (theme.options.includeMinimalReset) {
    rules.push(`*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}`)
  }
  rules.push(`html {\n  color-scheme: light dark;\n  background: var(--color-background);\n}`)
  rules.push(`:root[data-theme="light"] { color-scheme: light; }\n:root[data-theme="dark"] { color-scheme: dark; }`)
  rules.push(`h1, h2, h3, h4, h5, h6 {\n  font-family: var(--font-heading);\n  font-weight: var(--font-weight-bold);\n  line-height: var(--line-height-heading);\n  margin-block: 1.25em 0.5em;\n}`)
  rules.push(`p, ul, ol, dl, blockquote, pre, figure, table, form, details {\n  margin-block: 0 var(--space-lg);\n}`)
  rules.push(`th, td {\n  padding: var(--space-sm) var(--space-md);\n  vertical-align: top;\n}`)
  rules.push(`label {\n  display: block;\n  margin-block: var(--space-sm);\n}`)
  rules.push(`input:not([type="checkbox"]):not([type="radio"]), textarea, select {\n  width: 100%;\n}`)
  rules.push(`input, textarea, select, button {\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-sm);\n  background: var(--color-surface);\n  color: var(--color-text);\n  font: inherit;\n  padding: 0.65rem 0.8rem;\n}`)
  rules.push(`button {\n  background: var(--color-primary);\n  color: var(--color-primary-text);\n}`)
  rules.push(`pre code {\n  background: transparent;\n  color: inherit;\n  padding: 0;\n}`)
  return rules
}

function elementRules(theme: Theme): string[] {
  const known = elementOrder.filter((key) => theme.elements[key])
  const extras = Object.keys(theme.elements).filter((key) => !elementOrder.includes(key)).sort()
  return [...known, ...extras].map((selector) => rule(selector, theme.elements[selector])).filter(Boolean)
}

function stateRules(theme: Theme): string[] {
  const selectors = Object.keys(theme.states).sort((a, b) => {
    const ai = elementOrder.indexOf(a)
    const bi = elementOrder.indexOf(b)
    if (ai === -1 && bi === -1) return a.localeCompare(b)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
  const result: string[] = []
  for (const selector of selectors) {
    for (const state of stateOrder) {
      const styles = theme.states[selector]?.[state]
      if (styles) result.push(rule(`${selector}:${state}`, styles))
    }
  }
  return result.filter(Boolean)
}

function responsiveRules(theme: Theme): string[] {
  return [
    `@media (max-width: ${theme.responsive.tablet}px) {\n  :root {\n    --body-padding: 1rem;\n    --section-spacing: 2rem;\n  }\n  table {\n    font-size: var(--font-size-sm);\n  }\n}`,
    `@media (max-width: ${theme.responsive.mobile}px) {\n  :root {\n    --body-padding: 0.8rem;\n    --space-2xl: 2.5rem;\n  }\n  h1 {\n    overflow-wrap: anywhere;\n  }\n}`,
  ]
}

function darkModeRule(theme: Theme): string {
  const colors = theme.modes.dark?.colors
  if (!colors || Object.keys(colors).length === 0) return ''
  const vars = Object.entries(colors)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `    --${tokenName(key)}: ${value};`)
    .join('\n')
  const manual = `:root[data-theme="dark"] {\n${vars.replaceAll('    ', '  ')}\n}`
  const automatic = `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${vars}\n  }\n}`
  return `${manual}\n\n${automatic}`
}

export function compileTheme(theme: Theme): string {
  const blocks = [
    `/* ${theme.metadata.name} v${theme.metadata.version} — generated by Semantic CSS Studio */`,
    rootVariables(theme),
    ...baseRules(theme),
    ...elementRules(theme),
    ...stateRules(theme),
    ...responsiveRules(theme),
    darkModeRule(theme),
  ].filter(Boolean)
  return `${blocks.join('\n\n')}\n`
}

export function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim()
}
