import type { ThemeFonts } from '../theme/schema'

const FAMILY = /^[A-Za-z0-9][A-Za-z0-9 ]{0,48}$/
const DEFAULT_WEIGHTS = [400, 700]

function cleanWeights(weights: number[] | undefined): number[] {
  const valid = [...new Set(weights ?? [])].filter(
    (weight) =>
      Number.isInteger(weight) &&
      weight >= 100 &&
      weight <= 900 &&
      weight % 100 === 0,
  )
  return valid.length ? valid.sort((a, b) => a - b) : [...DEFAULT_WEIGHTS]
}

/**
 * Builds the Google Fonts `@import` (css2 API) for the theme families.
 * Pure and defensive: the family comes from potentially user-imported JSON,
 * so any off-pattern name is discarded instead of ending up in the URL.
 * Without valid families, returns '' and the CSS stays portable.
 */
export function webfontImportRule(fonts: ThemeFonts | undefined): string {
  const href = googleFontsHref(fonts)
  return href ? `@import url("${href}");` : ''
}

/** The raw css2 URL, for the panel preview to inject via <link>. */
export function googleFontsHref(fonts: ThemeFonts | undefined): string {
  if (!fonts) return ''
  const merged = new Map<
    string,
    { family: string; weights: Set<number>; italic: boolean }
  >()
  for (const spec of [fonts.body, fonts.heading, fonts.mono]) {
    const family = spec?.family?.trim()
    if (!family || !FAMILY.test(family)) continue
    const key = family.toLowerCase()
    const slot = merged.get(key) ?? {
      family,
      weights: new Set<number>(),
      italic: false,
    }
    for (const weight of cleanWeights(spec?.weights)) slot.weights.add(weight)
    if (spec?.italic) slot.italic = true
    merged.set(key, slot)
  }
  if (merged.size === 0) return ''

  const params = [...merged.values()].map((entry) => {
    const slug = entry.family.replaceAll(' ', '+')
    const weights = [...entry.weights].sort((a, b) => a - b)
    if (!entry.italic) return `family=${slug}:wght@${weights.join(';')}`
    // Canonical API order (roman axis first, then italic).
    const tuples = [
      ...weights.map((weight) => `0,${weight}`),
      ...weights.map((weight) => `1,${weight}`),
    ]
    return `family=${slug}:ital,wght@${tuples.join(';')}`
  })
  return `https://fonts.googleapis.com/css2?${params.join('&')}&display=swap`
}
