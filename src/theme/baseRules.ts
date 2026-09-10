import type { CssPropertyMap, RuleMap } from './schema'

/**
 * Neutralises inline-code chrome inside a `<pre>`.
 *
 * Lives in `layers.elements`, never in `layers.base`: it is a contextual
 * `code` override, and only works where specificity still decides —
 * `pre code` (0,0,2) vs `code` (0,0,1), both without `:where()`.
 */
export const preCodeNeutraliser: CssPropertyMap = {
  background: 'transparent',
  color: 'inherit',
  padding: '0',
}

/**
 * The rules that are currently hardcoded in the compiler's `baseRules()`.
 * Bringing them into the model is what makes them visible and editable. Key
 * order matches the original list, because the compiler emits in insertion
 * order.
 *
 * `:root[data-theme="light"]` and `:root[data-theme="dark"]` stay
 * compiler-generated: they are structural, not style choices.
 *
 * CONSTRAINT: everything here is emitted inside `@layer base` wrapped in
 * `:where()`, i.e. with zero specificity. Since layer order beats specificity
 * without exception, a rule that exists to override another element rule must
 * NOT live here: it would always lose to the `elements` layer. Contextual
 * overrides of that kind — `pre code` undoing `code` is the concrete case —
 * go to `layers.elements`, where both rules are emitted without `:where()`
 * and specificity decides again. The base layer is a floor of defaults, not a
 * place to fix another rule.
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
  }
}

/**
 * The compiler's `responsiveRules()`, with the `1rem`, `2rem`, `0.8rem` and
 * `2.5rem` literals replaced by tokens. The current compiler writes fixed
 * values and silently discards what the user configured.
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
        '--space-2xl': 'var(--space-2xl-xs)',
      },
      h1: { overflowWrap: 'anywhere' },
    },
  }
}
