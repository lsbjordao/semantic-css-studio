import { tokenName } from '../theme/tokenNames'
import type { Theme, ThemeTokensV2 } from '../theme/schema'

const HEX = /^#[0-9a-f]{6}$/i
const VAR_REF = /^\s*var\(\s*(--[A-Za-z0-9-_]+)\s*(?:,.*)?\)\s*$/

function tokenValueFor(theme: Theme, cssVar: string): string | null {
  const groups = Object.keys(theme.tokens) as Array<keyof ThemeTokensV2>
  for (const group of groups) {
    const entries = Object.entries(theme.tokens[group] as Record<string, string>)
    for (const [key, value] of entries) {
      if (`--${tokenName(group, key)}` === cssVar) return String(value)
    }
  }
  return null
}

/**
 * Cor para a pastilha do controle de cor. Valores de preset quase sempre sao
 * `var(--token)`, e sem resolver a referencia a pastilha cai no preto
 * genérico — o botao azul aparecia com controle preto. Resolve um nivel de
 * `var()` (tokens podem referenciar outros tokens); o texto do campo segue
 * mostrando o valor real, so a pastilha e prevista.
 */
export function swatchColor(value: string, theme: Theme): string {
  if (HEX.test(value)) return value
  const ref = VAR_REF.exec(value)
  if (!ref) return '#000000'
  const tokenValue = tokenValueFor(theme, ref[1])
  if (!tokenValue || tokenValue === value) return '#000000'
  return swatchColor(tokenValue, theme)
}
