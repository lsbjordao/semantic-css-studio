const DROP_AROUND = '{};,'

/**
 * Character-scanning minifier. Unlike a regex approach, this respects
 * strings, comments and unquoted `url()`, and only removes space around `:`
 * inside a declaration block — in selector context, `a :hover` and `a:hover`
 * are different rules.
 */
export function minifyCss(css: string): string {
  const out: string[] = []
  const blocks: Array<'at-rule' | 'declarations'> = []
  let pendingAtRule = false
  let i = 0

  const last = (): string => (out.length ? out[out.length - 1] : '')
  const inDeclarations = (): boolean =>
    blocks[blocks.length - 1] === 'declarations'

  while (i < css.length) {
    const char = css[i]

    if (char === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2)
      i = end === -1 ? css.length : end + 2
      continue
    }

    if (char === '"' || char === "'") {
      const quote = char
      let literal = char
      i += 1
      while (i < css.length) {
        if (css[i] === '\\') {
          literal += css.slice(i, i + 2)
          i += 2
          continue
        }
        literal += css[i]
        const closed = css[i] === quote
        i += 1
        if (closed) break
      }
      out.push(literal)
      continue
    }

    if ((char === 'u' || char === 'U') && /^url\(/i.test(css.slice(i, i + 4))) {
      const end = css.indexOf(')', i)
      if (end !== -1 && !/["']/.test(css.slice(i + 4, end))) {
        out.push(css.slice(i, end + 1).replace(/\s+/g, ''))
        i = end + 1
        continue
      }
    }

    if (/\s/.test(char)) {
      while (i < css.length && /\s/.test(css[i])) i += 1
      const next: string | undefined = css[i]
      const prev = last().slice(-1)
      const dropped =
        next === undefined ||
        DROP_AROUND.includes(next) ||
        DROP_AROUND.includes(prev) ||
        (inDeclarations() && (next === ':' || prev === ':'))
      if (!dropped) out.push(' ')
      continue
    }

    if (char === '{') {
      // An at-rule block contains rules, not declarations. Without this
      // distinction, `@media (...) { a :hover { } }` would lose the space in
      // `a :hover`, which is a different selector from `a:hover`.
      blocks.push(pendingAtRule ? 'at-rule' : 'declarations')
      pendingAtRule = false
      out.push('{')
      i += 1
      continue
    }

    if (char === '}') {
      blocks.pop()
      while (last() === ';') out.pop()
      out.push('}')
      i += 1
      continue
    }

    if (char === '@') pendingAtRule = true
    if (char === ';') pendingAtRule = false

    out.push(char)
    i += 1
  }

  return out.join('').trim()
}
