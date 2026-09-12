import type { RuleMap } from './schema'

/**
 * Rules offered by the Print panel. They only reach the exported CSS when the
 * user enables them, so a theme without `layers.print` compiles byte-for-byte
 * as before.
 *
 * Everything here is emitted inside `@media print` in the `print` layer, after
 * every other layer and with normal specificity (no `:where()`): these are
 * print overrides, not defaults.
 *
 * Key order is the seed order shown in the panel and, for enabled rules, the
 * emission order.
 */
export function seedPrintRules(): RuleMap {
  return {
    body: {
      background: '#fff',
      color: '#000',
    },
    a: {
      color: 'inherit',
      textDecoration: 'underline',
    },
    'a[href^="http"]::after': {
      content: '" (" attr(href) ")"',
    },
    'h1, h2, h3, h4, h5, h6': {
      breakAfter: 'avoid',
    },
    'figure, pre, blockquote, table': {
      breakInside: 'avoid',
    },
  }
}
