/**
 * Deliberately restrictive grammar: covers what the catalog produces and what
 * a classless theme reasonably needs, and rejects anything suggesting the
 * text is not a selector (brace, semicolon, at-sign).
 */
const ALLOWED = /^[A-Za-z0-9_\-#.[\]="':(),>+~*|\s^$\\-￿]+$/

function balanced(selector: string): boolean {
  let round = 0
  let square = 0
  let quote: string | null = null

  for (let i = 0; i < selector.length; i += 1) {
    const char = selector[i]
    if (quote) {
      if (char === quote && selector[i - 1] !== '\\') quote = null
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      continue
    }
    if (char === '(') round += 1
    else if (char === ')') {
      round -= 1
      if (round < 0) return false
    } else if (char === '[') square += 1
    else if (char === ']') {
      square -= 1
      if (square < 0) return false
    }
  }

  return round === 0 && square === 0 && quote === null
}

export function isValidSelector(selector: string): boolean {
  const trimmed = selector.trim()
  if (!trimmed) return false
  if (!ALLOWED.test(trimmed)) return false
  if (!balanced(trimmed)) return false
  if (/[>+~,]\s*$/.test(trimmed)) return false
  if (/^[>+~,]/.test(trimmed)) return false
  return true
}

/** Replaces the contents of each string literal, so text inside an attribute
 *  value is never read as a class or id selector. */
function stripQuoted(selector: string): string {
  return selector.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, '""')
}

/**
 * Class and id are not blocked: they go against the project's classless
 * premise, but the decision belongs to the user. The function now:
 * 1. Removes quoted content to avoid false positives
 * 2. Looks for unescaped `.` or `#` in any position
 */
export function selectorWarnings(selector: string): string[] {
  const warnings: string[] = []
  const bare = stripQuoted(selector)
  if (/(?<!\\)\.[A-Za-z_-]/.test(bare)) {
    warnings.push(
      'This selector uses a class, which goes against the theme classless premise.',
    )
  }
  if (/(?<!\\)#[A-Za-z_-]/.test(bare)) {
    warnings.push(
      'This selector uses an id, which goes against the theme classless premise.',
    )
  }
  return warnings
}
