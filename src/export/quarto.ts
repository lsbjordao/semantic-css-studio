import { compileTheme } from '../compiler'
import type { Theme } from '../theme/schema'

function stableContentWidth(value: string): string {
  return value.replace(/(-?\d*\.?\d+)(ch|em)\b/g, (_, amount: string, unit: string) => {
    const multiplier = unit === 'ch' ? 0.5 : 1
    const rem = Number(amount) * multiplier
    return `${Number.isInteger(rem) ? rem : rem.toFixed(4).replace(/0+$/, '')}rem`
  })
}

function quartoLayout(theme: Theme): string {
  const contentWidth = stableContentWidth(theme.tokens.layout.contentWidth)
  return `:root {
  --quarto-content-width: ${contentWidth};
  --bs-body-bg: var(--color-background);
  --bs-body-color: var(--color-text);
  --bs-body-font-family: var(--font-body);
  --bs-body-font-size: var(--font-size-base);
  --bs-body-font-weight: var(--font-weight-normal);
  --bs-body-line-height: var(--line-height-body);
  --bs-heading-color: var(--color-text);
  --bs-emphasis-color: var(--color-text);
  --bs-secondary-color: var(--color-text-muted);
  --bs-secondary-bg: var(--color-surface);
  --bs-tertiary-bg: var(--color-surface-alt);
  --bs-primary: var(--color-primary);
  --bs-secondary: var(--color-secondary);
  --bs-success: var(--color-success);
  --bs-warning: var(--color-warning);
  --bs-danger: var(--color-danger);
  --bs-border-color: var(--color-border);
  --bs-link-color: var(--color-primary);
  --bs-link-hover-color: var(--color-primary-hover);
  --bs-code-color: var(--color-code-text);
}

#title-block-header, .quarto-title-block {
  margin-inline: auto;
  max-width: var(--header-width);
  padding: var(--space-lg) var(--body-padding);
  width: min(100%, var(--header-width));
}

#title-block-header .author, .quarto-title-block .author {
  color: var(--color-text-muted);
  display: block;
  font-weight: var(--font-weight-medium);
}

body > :is(h1, h2, h3, h4, h5, h6, p, ul, ol, dl, blockquote, pre, figure, table, form, details, article) {
  box-sizing: border-box;
  margin-inline: auto;
  max-width: 100%;
  width: min(100%, var(--quarto-content-width));
}

body > button {
  display: block;
  margin-block: var(--space-lg);
  margin-inline-end: 0;
  margin-inline-start: max(0px, calc((100% - var(--quarto-content-width)) / 2));
  max-width: 100%;
  width: max-content;
}

body :is(h1, h2, h3, h4, h5, h6).anchored {
  scroll-margin-block-start: var(--scroll-padding-top);
}`
}

export function quartoCss(theme: Theme): string {
  return `${compileTheme(theme, {
    layers: false,
    omitElements: ['header', 'main', 'nav'],
    scopes: ['main.content', '#quarto-document-content'],
    directBody: true,
  })}\n${quartoLayout(theme)}\n`
}
