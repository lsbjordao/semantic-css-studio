function normalizeHex(hex: string): string | null {
  const value = hex.trim().replace('#', '')
  if (/^[0-9a-f]{3}$/i.test(value)) return value.split('').map((c) => c + c).join('')
  if (/^[0-9a-f]{6}$/i.test(value)) return value
  return null
}

function luminance(hex: string): number | null {
  const normalized = normalizeHex(hex)
  if (!normalized) return null
  const rgb = [0, 2, 4].map((index) => parseInt(normalized.slice(index, index + 2), 16) / 255)
  const linear = rgb.map((value) => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4))
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]
}

export function contrastRatio(foreground: string, background: string): number | null {
  const a = luminance(foreground)
  const b = luminance(background)
  if (a === null || b === null) return null
  const lighter = Math.max(a, b)
  const darker = Math.min(a, b)
  return (lighter + 0.05) / (darker + 0.05)
}

export function contrastGrade(ratio: number | null) {
  if (ratio === null) return { aa: false, aaa: false, label: 'N/A' }
  return {
    aa: ratio >= 4.5,
    aaa: ratio >= 7,
    label: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA Large' : 'Fail',
  }
}
