import type { RuleMap } from './schema'

/**
 * As regras que hoje estão hardcoded em `baseRules()` do compilador. Trazê-las
 * para o modelo é o que as torna visíveis e editáveis. A ordem das chaves é a
 * mesma da lista original, porque o compilador emite na ordem de inserção.
 *
 * `:root[data-theme="light"]` e `:root[data-theme="dark"]` continuam gerados
 * pelo compilador: são estruturais, não escolhas de estilo.
 */
export function seedBaseRules(): RuleMap {
  return {
    html: {
      colorScheme: 'light dark',
      background: 'var(--color-background)',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'var(--font-heading)',
      fontWeight: 'var(--font-weight-bold)',
      lineHeight: 'var(--line-height-heading)',
      marginBlock: '1.25em 0.5em',
    },
    'p, ul, ol, dl, blockquote, pre, figure, table, form, details': {
      marginBlock: '0 var(--space-lg)',
    },
    'th, td': {
      padding: 'var(--space-sm) var(--space-md)',
      verticalAlign: 'top',
    },
    label: {
      display: 'block',
      marginBlock: 'var(--space-sm)',
    },
    'input:not([type="checkbox"]):not([type="radio"]), textarea, select': {
      width: '100%',
    },
    'input, textarea, select, button': {
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--color-text)',
      font: 'inherit',
      padding: '0.65rem 0.8rem',
    },
    button: {
      background: 'var(--color-primary)',
      color: 'var(--color-primary-text)',
    },
    'pre code': {
      background: 'transparent',
      color: 'inherit',
      padding: '0',
    },
  }
}

/**
 * As regras de `responsiveRules()` do compilador, com os literais `1rem`,
 * `2rem`, `0.8rem` e `2.5rem` trocados por tokens. O compilador atual grava
 * valores fixos e descarta em silêncio o que o usuário configurou.
 */
export function seedResponsiveRules(): Record<string, RuleMap> {
  return {
    tablet: {
      ':root': {
        '--body-padding': 'var(--body-padding-sm)',
        '--section-spacing': 'var(--section-spacing-sm)',
      },
      table: { fontSize: 'var(--font-size-sm)' },
    },
    mobile: {
      ':root': {
        '--body-padding': 'var(--body-padding-xs)',
        '--space-2xl': 'var(--space-2xl-sm)',
      },
      h1: { overflowWrap: 'anywhere' },
    },
  }
}
