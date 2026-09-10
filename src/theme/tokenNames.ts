import type { ThemeTokensV2 } from './schema'

/**
 * Prefix applied to each group's kebab name. Only colors get a prefix; the
 * other groups already carry the prefix in their own key (`fontSizeBase`,
 * `spaceMd`, `radiusSm`). A new key in any group is named correctly without
 * needing an exceptions table.
 */
const groupPrefix: Record<keyof ThemeTokensV2, string> = {
  colors: 'color-',
  typography: '',
  spacing: '',
  radius: '',
  shadow: '',
  layout: '',
  scroll: '',
}

/**
 * Token-key-specific kebab. Unlike CSS-property kebab, this also splits
 * letter-to-digit, without which `space2xl` would produce `--space2xl` while
 * the rest of the theme consumes `var(--space-2xl)`.
 */
function kebabToken(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([a-z])(\d)/g, '$1-$2')
    .toLowerCase()
}

export function tokenName(group: keyof ThemeTokensV2, key: string): string {
  return `${groupPrefix[group]}${kebabToken(key)}`
}
