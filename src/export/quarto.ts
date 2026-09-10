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

main.content input:not([type="checkbox"]):not([type="radio"]), #quarto-document-content input:not([type="checkbox"]):not([type="radio"]), main.content textarea, #quarto-document-content textarea, main.content select, #quarto-document-content select, main.content button, #quarto-document-content button {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font: inherit;
  padding: 0.65rem 0.8rem;
}

main.content button, #quarto-document-content button {
  background: var(--color-primary);
  color: var(--color-primary-text);
}

main.content code, #quarto-document-content code {
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font-family: var(--font-mono);
  padding: 0.1em 0.35em;
}

main.content kbd, #quarto-document-content kbd {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-bottom-width: 3px;
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font-family: var(--font-mono);
  padding: 0.12rem 0.4rem;
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

body :is(h1, h2, h3, h4, h5, h6).anchored {
  scroll-margin-block-start: var(--scroll-padding-top);
}`
}

export function quartoCss(theme: Theme): string {
  return `${compileTheme(theme, {
    layers: false,
    omitElements: ['header', 'main', 'nav'],
    scopes: ['main.content', '#quarto-document-content'],
  })}\n${quartoLayout(theme)}\n`
}
