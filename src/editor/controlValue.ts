import type { Theme } from '../theme/schema'

type ShorthandPart = 'top' | 'right' | 'bottom' | 'left' | 'width' | 'style' | 'color' | 'value'
type ShorthandSource = { property: string; part: ShorthandPart }

/** Split CSS tokens while preserving functions such as var(), rgb() and calc(). */
function splitTopLevel(value: string): string[] {
  const tokens: string[] = []
  let current = ''
  let depth = 0
  let quote: string | null = null

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index]
    if (quote) {
      current += char
      if (char === quote && value[index - 1] !== '\\') quote = null
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      current += char
      continue
    }
    if (char === '(') depth += 1
    if (char === ')') depth = Math.max(0, depth - 1)
    if (/\s/.test(char) && depth === 0) {
      if (current) {
        tokens.push(current)
        current = ''
      }
      continue
    }
    current += char
  }

  if (current) tokens.push(current)
  return tokens
}

function boxPart(value: string, part: Extract<ShorthandPart, 'top' | 'right' | 'bottom' | 'left'>): string {
  const tokens = splitTopLevel(value)
  if (tokens.length === 0 || tokens.length > 4) return value

  const [top, second = top, third = top, fourth = second] = tokens
  const expanded = tokens.length === 1
    ? { top, right: top, bottom: top, left: top }
    : tokens.length === 2
      ? { top, right: second, bottom: top, left: second }
      : tokens.length === 3
        ? { top, right: second, bottom: third, left: second }
        : { top, right: second, bottom: third, left: fourth }

  return expanded[part]
}

const borderStyles = new Set([
  'none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset',
])
const borderWidthPattern = /^(?:0|thin|medium|thick|-?(?:\d+\.?\d*|\.\d+)(?:px|rem|em|ch|%|vh|vw|vmin|vmax|pt|pc|cm|mm|in|ex)?)$/i
const functionalLengthPattern = /^(?:calc|min|max|clamp)\(/i

function borderPart(value: string, part: Extract<ShorthandPart, 'width' | 'style' | 'color'>): string {
  const tokens = splitTopLevel(value)
  const width = tokens.find((token) => borderWidthPattern.test(token) || functionalLengthPattern.test(token)) ?? ''
  const style = tokens.find((token) => borderStyles.has(token.toLowerCase())) ?? ''

  if (part === 'width') return width || value
  if (part === 'style') return style || value

  const colorTokens = tokens.filter((token) => token !== width && token !== style)
  return colorTokens.join(' ') || value
}

const shorthandSources: Record<string, ShorthandSource> = {
  backgroundColor: { property: 'background', part: 'value' },
  borderWidth: { property: 'border', part: 'width' },
  borderStyle: { property: 'border', part: 'style' },
  borderColor: { property: 'border', part: 'color' },
  borderInlineStartWidth: { property: 'borderInlineStart', part: 'width' },
  borderInlineStartStyle: { property: 'borderInlineStart', part: 'style' },
  borderInlineStartColor: { property: 'borderInlineStart', part: 'color' },
  marginTop: { property: 'margin', part: 'top' },
  marginRight: { property: 'margin', part: 'right' },
  marginBottom: { property: 'margin', part: 'bottom' },
  marginLeft: { property: 'margin', part: 'left' },
  paddingTop: { property: 'padding', part: 'top' },
  paddingRight: { property: 'padding', part: 'right' },
  paddingBottom: { property: 'padding', part: 'bottom' },
  paddingLeft: { property: 'padding', part: 'left' },
}

function baseRuleApplies(ruleSelector: string, element: string): boolean {
  return ruleSelector.split(',').some((part) => part.trim() === element)
}

function shorthandValueFor(theme: Theme, element: string, property: string): string {
  const source = shorthandSources[property]
  if (!source) return ''

  const elementValue = theme.layers.elements[element]?.[source.property]
  if (elementValue) return elementValue

  let found = ''
  for (const [selector, declarations] of Object.entries(theme.layers.base)) {
    if (baseRuleApplies(selector, element) && declarations[source.property]) {
      found = declarations[source.property]
    }
  }
  return found
}

function extractPart(value: string, part: ShorthandPart): string {
  if (part === 'value') return value
  if (part === 'top' || part === 'right' || part === 'bottom' || part === 'left') {
    return boxPart(value, part)
  }
  return borderPart(value, part)
}

/**
 * Convert an effective CSS value into the focused value expected by one UI
 * control. When the effective-value lookup cannot see a logical shorthand
 * (for example blockquote's borderInlineStart), this function also looks up
 * the shorthand directly in the element/base layers.
 */
export function controlValueFor(
  theme: Theme,
  element: string,
  property: string,
  effectiveValue: string,
): string {
  const source = shorthandSources[property]
  if (!source) return effectiveValue

  const value = effectiveValue || shorthandValueFor(theme, element, property)
  if (!value) return ''
  return extractPart(value, source.part)
}
