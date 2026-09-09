import type { ThemeTokensV2 } from './schema'

/**
 * Prefixo aplicado ao nome kebab de cada grupo. Apenas cores recebem prefixo;
 * os demais grupos já carregam o prefixo na própria chave (`fontSizeBase`,
 * `spaceMd`, `radiusSm`). Uma chave nova em qualquer grupo é nomeada
 * corretamente sem precisar entrar em tabela de exceções.
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
 * Kebab específico de chave de token. Diferente do kebab de propriedade CSS,
 * este também separa letra de dígito, sem o que `space2xl` produziria
 * `--space2xl` enquanto o resto do tema consome `var(--space-2xl)`.
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
