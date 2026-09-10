import { compileTheme, type CompileColorMode } from '../compiler'
import type { Theme } from '../theme/schema'

export type QuartoColorMode = CompileColorMode

function stableContentWidth(value: string): string {
  return value.replace(
    /(-?\d*\.?\d+)(ch|em)\b/g,
    (_, amount: string, unit: string) => {
      const multiplier = unit === 'ch' ? 0.5 : 1
      const rem = Number(amount) * multiplier
      return `${Number.isInteger(rem) ? rem : rem.toFixed(4).replace(/0+$/, '')}rem`
    },
  )
}

function quartoLayout(theme: Theme): string {
  const contentWidth = stableContentWidth(theme.tokens.layout.contentWidth)
  const sidebarChrome =
    theme.quarto?.sidebarTone === 'background'
      ? 'var(--color-background)'
      : 'var(--color-surface)'
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

main.content form label:has(> input[type="radio"]), #quarto-document-content form label:has(> input[type="radio"]) {
  align-items: center;
  display: flex;
  gap: var(--space-sm);
  margin-block: var(--space-sm);
}

main.content form > p:has(> label > input[type="radio"]), #quarto-document-content form > p:has(> label > input[type="radio"]) {
  margin-block: 0;
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

.sidebar nav[role="doc-toc"] ul > li > a:hover,
.sidebar nav[role="doc-toc"] ul > li > a.active,
.sidebar nav[role="doc-toc"] ul > li > ul > li > a:hover,
.sidebar nav[role="doc-toc"] ul > li > ul > li > a.active,
.sidebar nav[role="doc-toc"] ul > li > ul > li > ul > li > a:hover,
.sidebar nav[role="doc-toc"] ul > li > ul > li > ul > li > a.active {
  color: var(--color-primary) !important;
}

.sidebar nav[role="doc-toc"] ul > li > a.active,
.sidebar nav[role="doc-toc"] ul > li > ul > li > a.active,
.sidebar nav[role="doc-toc"] ul > li > ul > li > ul > li > a.active {
  border-left-color: var(--color-primary);
}

div.sidebar-item-container:hover,
div.sidebar-item-container:focus {
  color: var(--color-primary);
}

div.sidebar-item-container .active {
  color: var(--color-primary);
}

div.sidebar.sidebar-navigation.rollup.quarto-sidebar-toggle-contents,
nav.sidebar.sidebar-navigation:not(.rollup) {
  background-color: ${sidebarChrome};
}

div.sidebar-item-container {
  color: var(--color-text-muted);
}

div.sidebar-item-container .show > .nav-link,
div.sidebar-item-container .sidebar-link > code {
  color: var(--color-primary);
}

.sidebar-item .chapter-number {
  color: var(--color-text-muted);
}

.sidebar-title a {
  color: var(--color-text);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-medium);
}

.sidebar-title a:hover {
  color: var(--color-primary);
}

.sidebar .sidebar-footer {
  color: var(--color-text-muted);
}

.sidebar .toc-actions a:hover,
.sidebar .quarto-other-links a:hover,
.sidebar .quarto-code-links a:hover,
.sidebar .quarto-alternate-formats a:hover,
.sidebar .quarto-alternate-notebooks a:hover {
  color: var(--color-primary-hover);
}

#quarto-content .quarto-sidebar-toggle {
  background: ${sidebarChrome};
  border-color: var(--color-border);
}

#quarto-content .quarto-sidebar-toggle-title {
  color: var(--color-text);
}

.quarto-sidebar-toggle-icon {
  color: var(--color-text-muted);
}

nav.quarto-secondary-nav {
  background-color: ${sidebarChrome};
  border-bottom: 1px solid var(--color-border);
}

.quarto-secondary-nav .quarto-btn-toggle {
  color: var(--color-text-muted);
}

.quarto-secondary-nav .quarto-btn-toggle:hover {
  color: var(--color-primary);
}

.quarto-secondary-nav nav.quarto-page-breadcrumbs,
.quarto-secondary-nav nav.quarto-page-breadcrumbs a {
  color: var(--color-text-muted);
}

.quarto-secondary-nav nav.quarto-page-breadcrumbs a:hover {
  color: var(--color-primary);
}

.quarto-secondary-nav nav.quarto-page-breadcrumbs .breadcrumb-item::before {
  color: var(--color-border);
}

#quarto-header,
#quarto-header > nav.navbar,
header#quarto-header.headroom {
  background-color: ${sidebarChrome};
  border-bottom: 1px solid var(--color-border);
}

#quarto-header .navbar {
  --bs-navbar-color: var(--color-text-muted);
  --bs-navbar-hover-color: var(--color-primary);
  --bs-navbar-disabled-color: color-mix(in srgb, var(--color-text-muted) 60%, transparent);
  --bs-navbar-active-color: var(--color-primary);
  --bs-navbar-brand-color: var(--color-text);
  --bs-navbar-brand-hover-color: var(--color-primary);
  --bs-navbar-toggler-border-color: var(--color-border);
  --bs-nav-link-color: var(--color-text-muted);
  --bs-nav-link-hover-color: var(--color-primary);
}

#quarto-header .navbar-brand,
#quarto-header .navbar-title,
#quarto-header .navbar-title a {
  color: var(--color-text);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-medium);
}

#quarto-header .navbar-brand:hover,
#quarto-header .navbar-title a:hover {
  color: var(--color-primary);
}

#quarto-header .navbar-nav .nav-link {
  color: var(--color-text-muted);
}

#quarto-header .navbar-nav .nav-link:hover,
#quarto-header .navbar-nav .nav-link:focus {
  color: var(--color-primary);
}

#quarto-header .navbar-nav .nav-link.active,
#quarto-header .navbar-nav .show > .nav-link {
  background-color: transparent;
  color: var(--color-primary);
}

#quarto-header .navbar-toggler {
  border-color: var(--color-border);
  color: var(--color-text-muted);
}

#quarto-header .navbar-toggler:hover {
  color: var(--color-primary);
}

#quarto-header .navbar-toggler:focus {
  box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--color-primary) 35%, transparent);
}

#quarto-header #quarto-search,
#quarto-header #quarto-search button,
#quarto-header .quarto-navbar-tools,
#quarto-header .quarto-navbar-tools a,
#quarto-header .quarto-color-scheme-toggle {
  color: var(--color-text-muted);
}

#quarto-header #quarto-search:hover,
#quarto-header .quarto-navbar-tools a:hover,
#quarto-header .quarto-color-scheme-toggle:hover {
  color: var(--color-primary);
}

#quarto-header .dropdown-menu {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
}

#quarto-header .dropdown-item {
  color: var(--color-text-muted);
}

#quarto-header .dropdown-item:hover,
#quarto-header .dropdown-item:focus {
  background-color: color-mix(in srgb, var(--color-primary) 15%, transparent);
  color: var(--color-primary);
}

.nav-footer,
footer.footer .nav-footer {
  background-color: ${sidebarChrome};
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
}

.nav-footer a,
footer.footer .nav-footer a {
  color: var(--color-text-muted);
}

.nav-footer a:hover,
footer.footer .nav-footer a:hover {
  color: var(--color-primary);
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

export function quartoCss(
  theme: Theme,
  colorMode: QuartoColorMode = 'auto',
): string {
  // Quarto Sass layer marker: allows listing the same file under the `theme:`
  // key (e.g. `theme: {light: [..., theme-light.css], dark: [...]}`) besides
  // `css:` usage. As a CSS comment, it is inert on the `css:` path.
  return `/*-- scss:rules --*/\n${compileTheme(theme, {
    layers: false,
    omitElements: ['header', 'main', 'nav'],
    scopes: ['main.content', '#quarto-document-content'],
    colorMode,
  })}\n${quartoLayout(theme)}\n`
}
