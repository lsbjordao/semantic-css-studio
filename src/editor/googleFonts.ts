import type { FontRole, Theme } from '../theme/schema'

export interface GoogleFontOption {
  family: string
  roles: FontRole[]
  /** Stack applied alongside the family. */
  fallbacks: string
  defaultWeights: number[]
}

/** Small curation of trusted families, with portable fallbacks. */
export const googleFontOptions: GoogleFontOption[] = [
  {
    family: 'Fraunces',
    roles: ['heading'],
    fallbacks: 'Georgia, serif',
    defaultWeights: [400, 600, 700],
  },
  {
    family: 'Playfair Display',
    roles: ['heading'],
    fallbacks: 'Georgia, serif',
    defaultWeights: [400, 600, 700],
  },
  {
    family: 'Newsreader',
    roles: ['body', 'heading'],
    fallbacks: 'Georgia, serif',
    defaultWeights: [400, 500, 600],
  },
  {
    family: 'Lora',
    roles: ['body', 'heading'],
    fallbacks: 'Georgia, serif',
    defaultWeights: [400, 500, 600],
  },
  {
    family: 'Source Serif 4',
    roles: ['body', 'heading'],
    fallbacks: 'Georgia, serif',
    defaultWeights: [400, 600],
  },
  {
    family: 'Inter',
    roles: ['body', 'heading'],
    fallbacks: 'system-ui, sans-serif',
    defaultWeights: [400, 500, 700],
  },
  {
    family: 'DM Sans',
    roles: ['body', 'heading'],
    fallbacks: 'system-ui, sans-serif',
    defaultWeights: [400, 500, 700],
  },
  {
    family: 'Space Grotesk',
    roles: ['body', 'heading'],
    fallbacks: 'system-ui, sans-serif',
    defaultWeights: [400, 500, 700],
  },
  {
    family: 'IBM Plex Mono',
    roles: ['mono'],
    fallbacks: 'ui-monospace, monospace',
    defaultWeights: [400, 500, 600],
  },
  {
    family: 'JetBrains Mono',
    roles: ['mono'],
    fallbacks: 'ui-monospace, monospace',
    defaultWeights: [400, 500, 700],
  },
]

const GENERIC_FALLBACKS: Record<FontRole, string> = {
  body: 'system-ui, sans-serif',
  heading: 'Georgia, serif',
  mono: 'ui-monospace, monospace',
}

export function suggestionsFor(role: FontRole): GoogleFontOption[] {
  return googleFontOptions.filter((option) => option.roles.includes(role))
}

/** Full stack when applying the family; outside the catalog, uses the role's generic fallback. */
export function stackFor(role: FontRole, family: string): string {
  const known = googleFontOptions.find(
    (option) => option.family.toLowerCase() === family.toLowerCase(),
  )
  return `${family}, ${known?.fallbacks ?? GENERIC_FALLBACKS[role]}`
}

export function defaultsFor(family: string): number[] {
  const known = googleFontOptions.find(
    (option) => option.family.toLowerCase() === family.toLowerCase(),
  )
  return known ? [...known.defaultWeights] : [400, 700]
}

/**
 * Stacks of the theme-configured webfonts, so family selects offer them in
 * any control — including on an element that does not inherit that role.
 * Without this, the font only appeared where it was already the current value.
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
