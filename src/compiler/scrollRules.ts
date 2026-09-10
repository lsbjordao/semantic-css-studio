import type { Theme } from '../theme/schema'

/**
 * Scroll rules for one target. Wrapped in `:where()` because they live in the
 * base layer, alongside the other base rules.
 *
 * The split between gated and ungated output is about compatibility, not
 * style: on Chrome 121+, setting `scrollbar-color` DISABLES the
 * `::-webkit-scrollbar` pseudo-elements. So the rich parts go to
 * Chromium/WebKit, and only `scrollbar-color`/`scrollbar-width` stay behind
 * `@supports not selector(::-webkit-scrollbar)`, for engines without them.
 * The remaining properties are standard in every engine and go ungated.
 */
function rulesForTarget(target: string): string[] {
  const w = `:where(${target})`
  return [
    `${w} {\n  overscroll-behavior: var(--overscroll-behavior);\n  scroll-behavior: var(--scroll-behavior);\n  scroll-padding-top: var(--scroll-padding-top);\n  scrollbar-gutter: var(--scrollbar-gutter);\n}`,
    `${w}::-webkit-scrollbar {\n  height: var(--scrollbar-size);\n  width: var(--scrollbar-size);\n}`,
    `${w}::-webkit-scrollbar-track {\n  background: var(--scrollbar-track);\n}`,
    `${w}::-webkit-scrollbar-thumb {\n  background: var(--scrollbar-thumb);\n  border-radius: var(--scrollbar-radius);\n}`,
    `${w}::-webkit-scrollbar-thumb:hover {\n  background: var(--scrollbar-thumb-hover);\n}`,
    `@supports not selector(::-webkit-scrollbar) {\n  ${w} {\n    scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);\n    scrollbar-width: var(--scrollbar-width);\n  }\n}`,
  ]
}

/**
 * Target fixed to 'html' in this delivery. `theme` stays as an unused
 * parameter because the rules read tokens via `var(...)` in CSS, not the
 * computed value — and because a future delivery swaps this body to read
 * `theme.scrollTargets` (multiple configurable targets) without changing the
 * public signature.
 */
export function scrollRules(theme: Theme): string[] {
  void theme
  return rulesForTarget('html')
}
