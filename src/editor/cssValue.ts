export const numericCssPattern = /^(-?(?:\d+\.?\d*|\.\d+))(px|rem|em|ch|%|vh|vw|vmin|vmax|pt|pc|cm|mm|in|ex)?$/i

function precisionFor(step: number) {
  const text = String(step)
  return text.includes('.') ? text.split('.')[1].length : 0
}

function inferredStep(unit: string, explicit?: number) {
  if (explicit != null) return explicit
  if (unit === 'rem' || unit === 'em' || unit === 'ex') return 0.125
  if (unit === '') return 0.05
  return 1
}

export function isSteppableCssNumericValue(value: string): boolean {
  return value.trim() === '' || numericCssPattern.test(value.trim())
}

export function adjustCssNumericValue(
  value: string,
  direction: -1 | 1,
  defaultUnit = 'rem',
  explicitStep?: number,
): string {
  const trimmed = value.trim()
  const match = trimmed.match(numericCssPattern)
  const unit = match?.[2] ?? defaultUnit
  const current = match ? Number(match[1]) : 0
  const step = inferredStep(unit, explicitStep)
  const precision = Math.max(precisionFor(step), match?.[1]?.split('.')[1]?.length ?? 0)
  const next = current + direction * step
  const normalized = Math.abs(next) < 1e-10 ? 0 : Number(next.toFixed(Math.min(6, precision + 1)))
  return `${normalized}${unit}`
}
