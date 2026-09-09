/**
 * Gramática deliberadamente restritiva: cobre o que o catálogo produz e o que
 * um tema classless razoavelmente precisa, e recusa qualquer coisa que
 * indique que o texto não é um seletor (chave, ponto-e-vírgula, arroba).
 */
const ALLOWED = /^[A-Za-z0-9_\-#.[\]="':(),>+~*|\s^$]+$/

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

/**
 * Classe e id não são bloqueados: contrariam a premissa classless do projeto,
 * mas a decisão é de quem usa. O ponto de uma classe é distinguido de um
 * pseudo-elemento (`::after`) e de uma pseudo-classe (`:hover`) pela exigência
 * de que venha no início do seletor ou logo após espaço, combinador ou vírgula.
 */
export function selectorWarnings(selector: string): string[] {
  const warnings: string[] = []
  if (/(^|[\s>+~(,])\.[A-Za-z_-]/.test(selector)) {
    warnings.push('Este seletor usa classe, o que contraria a premissa classless do tema.')
  }
  if (/(^|[\s>+~(,])#[A-Za-z_-]/.test(selector)) {
    warnings.push('Este seletor usa id, o que contraria a premissa classless do tema.')
  }
  return warnings
}
