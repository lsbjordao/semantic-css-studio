import { describe, expect, it } from 'vitest'
import { quartoCss } from '../src/export/quarto'
import { presets } from '../src/theme/presets'
import type { Theme } from '../src/theme/schema'

describe('Quarto CSS export', () => {
  it('emits one unlayered theme.css without project configuration', () => {
    const css = quartoCss(presets.Minimal)

    expect(css.startsWith('/*-- scss:rules --*/\n')).toBe(true)
    expect(css).not.toContain('@layer')
    expect(css).not.toContain('\nheader {')
    expect(css).not.toContain('\nmain {')
    expect(css).not.toContain('\nnav {')
    expect(css).not.toContain('body > :is(')
    expect(css).toContain('--quarto-content-width: 36rem;')
    expect(css).toContain('--bs-body-bg: var(--color-background);')
    expect(css).toContain('--bs-primary: var(--color-primary);')
    expect(css).toContain(
      'main.content button, #quarto-document-content button',
    )
    expect(css).toContain(
      'main.content form label:has(> input[type="radio"]), #quarto-document-content form label:has(> input[type="radio"])',
    )
    expect(css).toContain(
      'main.content form > p:has(> label > input[type="radio"]), #quarto-document-content form > p:has(> label > input[type="radio"])',
    )
    expect(css).toContain('main.content code, #quarto-document-content code')
    expect(css).toContain('main.content kbd, #quarto-document-content kbd')
    expect(css).toContain('.task-list input[type="checkbox"]')
    expect(css).not.toContain('_quarto.yml')
  })

  it('keeps Quarto task-list checkboxes visible with an icon library', () => {
    const theme = structuredClone(presets.Minimal) as Theme
    theme.icons = { library: 'lucide' }
    const css = quartoCss(theme)

    expect(css).toContain(
      'main.content input[type="checkbox"], #quarto-document-content input[type="checkbox"]',
    )
    expect(css).toContain(
      'main.content .task-list input[type="checkbox"], #quarto-document-content .task-list input[type="checkbox"]',
    )
    const taskRuleStart = css.indexOf('.task-list input[type="checkbox"]')
    const taskRule = css.slice(
      taskRuleStart,
      css.indexOf('\n}', taskRuleStart) + 2,
    )
    expect(taskRule).toContain('margin-inline: 0 var(--space-sm) !important;')
    expect(taskRule).not.toContain('background: transparent;')
  })

  it('keeps the document TOC hover and active items in the primary color', () => {
    const css = quartoCss(presets.Minimal)

    const tocRuleStart = css.indexOf(
      '.sidebar nav[role="doc-toc"] ul > li > a:hover',
    )
    expect(tocRuleStart).toBeGreaterThan(-1)
    const tocRule = css.slice(
      tocRuleStart,
      css.indexOf('\n}', tocRuleStart) + 2,
    )
    expect(tocRule).toContain(
      '.sidebar nav[role="doc-toc"] ul > li > a.active,',
    )
    expect(tocRule).toContain(
      '.sidebar nav[role="doc-toc"] ul > li > ul > li > a.active,',
    )
    expect(tocRule).toContain(
      '.sidebar nav[role="doc-toc"] ul > li > ul > li > ul > li > a.active',
    )
    expect(tocRule).toContain('color: var(--color-primary) !important;')

    const borderIdx = css.indexOf('border-left-color: var(--color-primary);')
    expect(borderIdx).toBeGreaterThan(-1)
    const borderRule = css.slice(
      css.lastIndexOf('.sidebar nav[role="doc-toc"]', borderIdx),
      css.indexOf('\n}', borderIdx) + 2,
    )
    expect(borderRule).toContain('ul > li > a.active')
    expect(borderRule).toContain('ul > li > ul > li > a.active')
    expect(borderRule).toContain('ul > li > ul > li > ul > li > a.active')
    expect(borderRule).not.toContain(':hover')
  })

  it('keeps the website sidebar TOC hover and active items in the primary color', () => {
    const css = quartoCss(presets.Minimal)

    expect(css).toContain('div.sidebar-item-container:hover,')
    expect(css).toContain('div.sidebar-item-container:focus {')
    expect(css).toContain('div.sidebar-item-container .active {')

    const hoverStart = css.indexOf('div.sidebar-item-container:hover,')
    const hoverRule = css.slice(hoverStart, css.indexOf('\n}', hoverStart) + 2)
    expect(hoverRule).toContain('color: var(--color-primary);')

    const activeStart = css.indexOf('div.sidebar-item-container .active {')
    const activeRule = css.slice(
      activeStart,
      css.indexOf('\n}', activeStart) + 2,
    )
    expect(activeRule).toContain('color: var(--color-primary);')
  })

  it('styles the book navigation sidebar with theme tokens', () => {
    const css = quartoCss(presets.Minimal)

    expect(css).toContain('nav.sidebar.sidebar-navigation:not(.rollup) {')
    expect(css).toContain('background-color: var(--color-surface);')

    const containerStart = css.indexOf('div.sidebar-item-container {')
    expect(containerStart).toBeGreaterThan(-1)
    const containerRule = css.slice(
      containerStart,
      css.indexOf('\n}', containerStart) + 2,
    )
    expect(containerRule).toContain('color: var(--color-text-muted);')

    expect(css).toContain('div.sidebar-item-container .show > .nav-link,')
    expect(css).toContain('div.sidebar-item-container .sidebar-link > code {')
    expect(css).toContain('.sidebar-item .chapter-number {')
    expect(css).toContain('.sidebar-title a {')
    expect(css).toContain('.sidebar-title a:hover {')
    expect(css).toContain('.sidebar .sidebar-footer {')
    expect(css).toContain('.sidebar .quarto-alternate-notebooks a:hover {')
    expect(css).toContain('#quarto-content .quarto-sidebar-toggle {')
    expect(css).toContain('#quarto-content .quarto-sidebar-toggle-title {')
    expect(css).toContain('.quarto-sidebar-toggle-icon {')

    const titleStart = css.indexOf('.sidebar-title a {')
    const titleRule = css.slice(titleStart, css.indexOf('\n}', titleStart) + 2)
    expect(titleRule).toContain('color: var(--color-text);')
    expect(titleRule).toContain('font-family: var(--font-heading);')
  })

  it('styles the book secondary navigation with theme tokens', () => {
    const css = quartoCss(presets.Minimal)

    expect(css).toContain('nav.quarto-secondary-nav {')

    const secondaryStart = css.indexOf('nav.quarto-secondary-nav {')
    const secondaryRule = css.slice(
      secondaryStart,
      css.indexOf('\n}', secondaryStart) + 2,
    )
    expect(secondaryRule).toContain('background-color: var(--color-surface);')
    expect(secondaryRule).toContain(
      'border-bottom: 1px solid var(--color-border);',
    )

    expect(css).toContain('.quarto-secondary-nav .quarto-btn-toggle {')
    expect(css).toContain('.quarto-secondary-nav .quarto-btn-toggle:hover {')
    expect(css).toContain('.quarto-secondary-nav nav.quarto-page-breadcrumbs,')
    expect(css).toContain(
      '.quarto-secondary-nav nav.quarto-page-breadcrumbs a:hover {',
    )
  })

  it('locks the exported Quarto CSS to the selected color mode', () => {
    const light = quartoCss(presets.Minimal, 'light')
    expect(light).toContain(':root { color-scheme: light; }')
    expect(light).not.toContain('@media (prefers-color-scheme: dark)')

    const dark = quartoCss(presets.Minimal, 'dark')
    expect(dark).toContain(':root { color-scheme: dark; }')
    expect(dark).not.toContain('@media (prefers-color-scheme: dark)')
  })

  it('paints the book sidebar chrome with the surface color by default', () => {
    const css = quartoCss(presets.Minimal)

    const navStart = css.indexOf(
      'nav.sidebar.sidebar-navigation:not(.rollup) {',
    )
    expect(navStart).toBeGreaterThan(-1)
    const navRule = css.slice(navStart, css.indexOf('\n}', navStart) + 2)
    expect(navRule).toContain('background-color: var(--color-surface);')

    const secondaryStart = css.indexOf('nav.quarto-secondary-nav {')
    const secondaryRule = css.slice(
      secondaryStart,
      css.indexOf('\n}', secondaryStart) + 2,
    )
    expect(secondaryRule).toContain('background-color: var(--color-surface);')

    const toggleStart = css.indexOf('#quarto-content .quarto-sidebar-toggle {')
    const toggleRule = css.slice(
      toggleStart,
      css.indexOf('\n}', toggleStart) + 2,
    )
    expect(toggleRule).toContain('background: var(--color-surface);')
  })

  it('merges the book sidebar chrome into the page background on request', () => {
    const theme = structuredClone(presets.Minimal) as Theme
    theme.quarto = { sidebarTone: 'background' }
    const css = quartoCss(theme)

    const navStart = css.indexOf(
      'nav.sidebar.sidebar-navigation:not(.rollup) {',
    )
    const navRule = css.slice(navStart, css.indexOf('\n}', navStart) + 2)
    expect(navRule).toContain('background-color: var(--color-background);')
    expect(navRule).not.toContain('var(--color-surface)')

    const secondaryStart = css.indexOf('nav.quarto-secondary-nav {')
    const secondaryRule = css.slice(
      secondaryStart,
      css.indexOf('\n}', secondaryStart) + 2,
    )
    expect(secondaryRule).toContain(
      'background-color: var(--color-background);',
    )

    const toggleStart = css.indexOf('#quarto-content .quarto-sidebar-toggle {')
    const toggleRule = css.slice(
      toggleStart,
      css.indexOf('\n}', toggleStart) + 2,
    )
    expect(toggleRule).toContain('background: var(--color-background);')
  })

  it('styles the website top navbar with theme tokens', () => {
    const css = quartoCss(presets.Minimal)

    expect(css).toContain('#quarto-header .navbar {')
    expect(css).toContain('#quarto-header .navbar-brand,')
    expect(css).toContain('#quarto-header .navbar-nav .nav-link {')
    expect(css).toContain('#quarto-header .navbar-nav .nav-link.active,')
    expect(css).toContain('#quarto-header .navbar-toggler {')
    expect(css).toContain('#quarto-header .dropdown-menu {')
    expect(css).toContain('.nav-footer,')

    const varsStart = css.indexOf('#quarto-header .navbar {')
    const varsRule = css.slice(varsStart, css.indexOf('\n}', varsStart) + 2)
    expect(varsRule).toContain('--bs-navbar-color: var(--color-text-muted);')
    expect(varsRule).toContain(
      '--bs-navbar-active-color: var(--color-primary);',
    )
    expect(varsRule).toContain('--bs-navbar-brand-color: var(--color-text);')

    const activeStart = css.indexOf(
      '#quarto-header .navbar-nav .nav-link.active,',
    )
    const activeRule = css.slice(
      activeStart,
      css.indexOf('\n}', activeStart) + 2,
    )
    expect(activeRule).toContain('background-color: transparent;')
    expect(activeRule).toContain('color: var(--color-primary);')

    const headerStart = css.indexOf('#quarto-header,')
    const headerRule = css.slice(
      headerStart,
      css.indexOf('\n}', headerStart) + 2,
    )
    expect(headerRule).toContain('background-color: var(--color-surface);')
    expect(headerRule).toContain(
      'border-bottom: 1px solid var(--color-border);',
    )
  })

  it('paints the website navbar chrome with the configured tone', () => {
    const css = quartoCss(presets.Minimal)
    expect(css).toContain('background-color: var(--color-surface);')

    const themed = structuredClone(presets.Minimal) as Theme
    themed.quarto = { sidebarTone: 'background' }
    const dark = quartoCss(themed)

    const headerStart = dark.indexOf('#quarto-header,')
    const headerRule = dark.slice(
      headerStart,
      dark.indexOf('\n}', headerStart) + 2,
    )
    expect(headerRule).toContain('background-color: var(--color-background);')
    expect(headerRule).not.toContain('var(--color-surface)')

    const footerStart = dark.indexOf('.nav-footer,')
    const footerRule = dark.slice(
      footerStart,
      dark.indexOf('\n}', footerStart) + 2,
    )
    expect(footerRule).toContain('background-color: var(--color-background);')
  })
})
