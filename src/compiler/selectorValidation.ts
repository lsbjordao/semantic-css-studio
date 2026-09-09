/**
 * Gramática deliberadamente restritiva: cobre o que o catálogo produz e o que
 * um tema classless razoavelmente precisa, e recusa qualquer coisa que
 * indique que o texto não é um seletor (chave, ponto-e-vírgula, arroba).
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

/** Substitui o conteudo de cada string literal, para que texto dentro de valor
 *  de atributo nunca seja lido como seletor de classe ou de id. */
function stripQuoted(selector: string): string {
  return selector.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, '""')
}

/**
 * Classe e id não são bloqueados: contrariam a premissa classless do projeto,
 * mas a decisão é de quem usa. A função agora:
 * 1. Remove conteúdo entre aspas para evitar falsos positivos
 * 2. Procura `.` ou `#` que não sejam escapados em qualquer posição
 */
export function selectorWarnings(selector: string): string[] {
  const warnings: string[] = []
  const bare = stripQuoted(selector)
  if (/(?<!\\)\.[A-Za-z_-]/.test(bare)) {
    warnings.push('Este seletor usa classe, o que contraria a premissa classless do tema.')
  }
  if (/(?<!\\)#[A-Za-z_-]/.test(bare)) {
    warnings.push('Este seletor usa id, o que contraria a premissa classless do tema.')
  }
  return warnings
}
