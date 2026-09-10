import { tokenName } from '../theme/tokenNames'
import type { Theme, ThemeTokensV2 } from '../theme/schema'

const HEX = /^#[0-9a-f]{6}$/i
const VAR_REF = /^\s*var\(\s*(--[A-Za-z0-9-_]+)\s*(?:,.*)?\)\s*$/

function tokenValueFor(theme: Theme, cssVar: string): string | null {
  const groups = Object.keys(theme.tokens) as Array<keyof ThemeTokensV2>
  for (const group of groups) {
    const entries = Object.entries(
      theme.tokens[group] as Record<string, string>,
    )
    for (const [key, value] of entries) {
      if (`--${tokenName(group, key)}` === cssVar) return String(value)
    }
  }
  return null
}

/**
 * Swatch color for the color control. Preset values are almost always
 * `var(--token)`, and without resolving the reference the swatch falls back
 * to generic black — a blue button showed a black control. Resolves one level
 * of `var()` (tokens may reference other tokens); the field text keeps
 * showing the real value, only the swatch is previewed.
 */
export function swatchColor(value: string, theme: Theme): string {
  if (HEX.test(value)) return value
  const ref = VAR_REF.exec(value)
  if (!ref) return '#000000'
  const tokenValue = tokenValueFor(theme, ref[1])
  if (!tokenValue || tokenValue === value) return '#000000'
  return swatchColor(tokenValue, theme)
}
