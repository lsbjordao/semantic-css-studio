import { tokenName } from '../theme/tokenNames'

export type ParsedShadow = {
  x: string
  y: string
  blur: string
  spread: string
  color: string
  inset: boolean
}

const lengthPattern =
  /^-?(?:\d+\.?\d*|\.\d+)(?:px|rem|em|ch|%|vh|vw|vmin|vmax|pt|pc|cm|mm|in|ex)?$/i

function splitTopLevel(value: string): string[] {
  const tokens: string[] = []
  let current = ''
  let depth = 0
  let quote: string | null = null

  for (let i = 0; i < value.length; i += 1) {
    const char = value[i]
    if (quote) {
      current += char
      if (char === quote && value[i - 1] !== '\\') quote = null
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

function hasTopLevelComma(value: string): boolean {
  let depth = 0
  let quote: string | null = null
  for (let i = 0; i < value.length; i += 1) {
    const char = value[i]
    if (quote) {
      if (char === quote && value[i - 1] !== '\\') quote = null
      continue
    }
    if (char === '"' || char === "'") quote = char
    else if (char === '(') depth += 1
    else if (char === ')') depth = Math.max(0, depth - 1)
    else if (char === ',' && depth === 0) return true
  }
  return false
}

function splitTopLevelCommas(value: string): string[] {
  const parts: string[] = []
  let current = ''
  let depth = 0
  let quote: string | null = null
  for (let i = 0; i < value.length; i += 1) {
    const char = value[i]
    if (quote) {
      current += char
      if (char === quote && value[i - 1] !== '\\') quote = null
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      current += char
      continue
    }
    if (char === '(') depth += 1
    else if (char === ')') depth = Math.max(0, depth - 1)
    else if (char === ',' && depth === 0) {
      parts.push(current)
      current = ''
      continue
    }
    current += char
  }
  parts.push(current)
  return parts.map((part) => part.trim()).filter(Boolean)
}

function parseSingleLayer(text: string): ParsedShadow | null {
  const tokens = splitTopLevel(text)
  const inset = tokens.includes('inset')
  const withoutInset = tokens.filter((token) => token !== 'inset')
  const lengths: string[] = []
  const rest: string[] = []

  for (const token of withoutInset) {
    if (lengths.length < 4 && lengthPattern.test(token)) lengths.push(token)
    else rest.push(token)
  }

  if (lengths.length < 2) return null
  return {
    x: lengths[0],
    y: lengths[1],
    blur: lengths[2] ?? '0px',
    spread: lengths[3] ?? '0px',
    color: rest.join(' ') || 'rgb(0 0 0 / 0.15)',
    inset,
  }
}

export function parseShadowValue(value: string): ParsedShadow | null {
  const trimmed = value.trim()
  if (!trimmed || trimmed === 'none' || hasTopLevelComma(trimmed)) return null
  return parseSingleLayer(trimmed)
}

/**
 * Todas as camadas de um `box-shadow`, cada uma com seu próprio `inset` —
 * é o que permite combinar sombra externa e interna na mesma regra.
 * Devolve `null` quando alguma camada não é editável estruturalmente.
 */
export function parseShadowLayers(value: string): ParsedShadow[] | null {
  const trimmed = value.trim()
  if (!trimmed || trimmed === 'none') return null
  const layers: ParsedShadow[] = []
  for (const part of splitTopLevelCommas(trimmed)) {
    const layer = parseSingleLayer(part)
    if (!layer) return null
    layers.push(layer)
  }
  return layers.length ? layers : null
}

export function formatShadowValue(shadow: ParsedShadow): string {
  const parts = [
    shadow.inset ? 'inset' : '',
    shadow.x,
    shadow.y,
    shadow.blur,
    shadow.spread,
    shadow.color,
  ].filter(Boolean)
  return parts.join(' ')
}

export function formatShadowLayers(layers: ParsedShadow[]): string {
  return layers.map(formatShadowValue).join(', ')
}

/** Resolve direct var(--shadow-*) references without mutating the stored rule. */
export function resolveShadowTokenValue(value: string, tokens: object): string {
  const trimmed = value.trim()
  for (const [key, tokenValue] of Object.entries(tokens)) {
    if (trimmed === `var(--${tokenName('shadow', key)})`)
      return String(tokenValue)
  }
  return value
}

export const defaultShadowValue = '0 8px 24px 0px rgb(0 0 0 / 0.14)'

export const defaultInnerShadowValue = 'inset 0 2px 6px 0px rgb(0 0 0 / 0.12)'

/** Camada inicial para os botões "add layer" do painel. */
export function defaultShadowLayer(inset: boolean): ParsedShadow {
  return (
    parseSingleLayer(inset ? defaultInnerShadowValue : defaultShadowValue) ?? {
      x: '0',
      y: '0',
      blur: '0px',
      spread: '0px',
      color: 'rgb(0 0 0 / 0.15)',
      inset,
    }
  )
}
