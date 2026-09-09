import type { FontRole, Theme } from '../theme/schema'

export interface GoogleFontOption {
  family: string
  roles: FontRole[]
  /** Pilha que acompanha a família quando ela é aplicada. */
  fallbacks: string
  defaultWeights: number[]
}

/** Curadoria pequena de famílias confiáveis, com fallbacks portáteis. */
export const googleFontOptions: GoogleFontOption[] = [
  { family: 'Fraunces', roles: ['heading'], fallbacks: 'Georgia, serif', defaultWeights: [400, 600, 700] },
  { family: 'Playfair Display', roles: ['heading'], fallbacks: 'Georgia, serif', defaultWeights: [400, 600, 700] },
  { family: 'Newsreader', roles: ['body', 'heading'], fallbacks: 'Georgia, serif', defaultWeights: [400, 500, 600] },
  { family: 'Lora', roles: ['body', 'heading'], fallbacks: 'Georgia, serif', defaultWeights: [400, 500, 600] },
  { family: 'Source Serif 4', roles: ['body', 'heading'], fallbacks: 'Georgia, serif', defaultWeights: [400, 600] },
  { family: 'Inter', roles: ['body', 'heading'], fallbacks: 'system-ui, sans-serif', defaultWeights: [400, 500, 700] },
  { family: 'DM Sans', roles: ['body', 'heading'], fallbacks: 'system-ui, sans-serif', defaultWeights: [400, 500, 700] },
  { family: 'Space Grotesk', roles: ['body', 'heading'], fallbacks: 'system-ui, sans-serif', defaultWeights: [400, 500, 700] },
  { family: 'IBM Plex Mono', roles: ['mono'], fallbacks: 'ui-monospace, monospace', defaultWeights: [400, 500, 600] },
  { family: 'JetBrains Mono', roles: ['mono'], fallbacks: 'ui-monospace, monospace', defaultWeights: [400, 500, 700] },
]

const GENERIC_FALLBACKS: Record<FontRole, string> = {
  body: 'system-ui, sans-serif',
  heading: 'Georgia, serif',
  mono: 'ui-monospace, monospace',
}

export function suggestionsFor(role: FontRole): GoogleFontOption[] {
  return googleFontOptions.filter((option) => option.roles.includes(role))
}

/** Pilha completa ao aplicar a família; fora do catálogo, usa fallback genérico do papel. */
export function stackFor(role: FontRole, family: string): string {
  const known = googleFontOptions.find((option) => option.family.toLowerCase() === family.toLowerCase())
  return `${family}, ${known?.fallbacks ?? GENERIC_FALLBACKS[role]}`
}

export function defaultsFor(family: string): number[] {
  const known = googleFontOptions.find((option) => option.family.toLowerCase() === family.toLowerCase())
  return known ? [...known.defaultWeights] : [400, 700]
}

/**
 * Pilhas das webfonts configuradas no tema, para os selects de família as
 * oferecerem em qualquer controle — inclusive num elemento que não herda
 * aquele papel. Sem isto, a fonte só aparecia onde já era o valor vigente.
 */
export function configuredStacks(theme: Theme, role?: FontRole): string[] {
  const roles: readonly FontRole[] = role ? [role] : ['body', 'heading', 'mono']
  const stacks: string[] = []
  for (const item of roles) {
    const family = theme.fonts?.[item]?.family
    if (!family) continue
    const stack = stackFor(item, family)
    if (!stacks.includes(stack)) stacks.push(stack)
  }
  return stacks
}
