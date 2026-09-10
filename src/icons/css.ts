import type { Theme } from '../theme/schema'
import { getIconSourceFor, isFillLibrary, strokeWidthFor } from './registry'
import type { IconLibraryId, IconName } from './types'

function svgFor(
  library: Exclude<IconLibraryId, 'none'>,
  name: IconName,
  color: string,
): string {
  const { body, viewBox } = getIconSourceFor(library, name)
  const inner = body.replaceAll('currentColor', color)
  const open = isFillLibrary(library)
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="${color}">`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none" stroke="${color}" stroke-width="${strokeWidthFor(library)}" stroke-linecap="round" stroke-linejoin="round">`
  return `${open}${inner}</svg>`
}

function dataUri(svg: string): string {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

function scopedSelector(
  selector: string,
  scopes: readonly string[],
  directBody = false,
): string {
  if (!scopes.length && !directBody) return selector
  return selector
    .split(',')
    .flatMap((part) => [
      ...scopes.map((scope) => `${scope} ${part.trim()}`),
      ...(directBody ? [`body > ${part.trim()}`] : []),
    ])
    .join(', ')
}

function scopedModeSelector(
  mode: string,
  selector: string,
  scopes: readonly string[],
  directBody = false,
): string {
  return scopedSelector(selector, scopes, directBody)
    .split(',')
    .map((part) => `${mode} ${part.trim()}`)
    .join(', ')
}

export interface ControlIconColors {
  primaryText: string
  primary: string
  textMuted: string
}

/** Data-URIs of the four glyphs used in controls, with baked-in colors. */
export function controlIconUris(
  library: Exclude<IconLibraryId, 'none'>,
  colors: ControlIconColors,
): { check: string; dot: string; chevronDown: string; chevronRight: string } {
  return {
    check: dataUri(svgFor(library, 'check', colors.primaryText)),
    dot: dataUri(svgFor(library, 'dot', colors.primary)),
    chevronDown: dataUri(svgFor(library, 'chevron-down', colors.textMuted)),
    chevronRight: dataUri(svgFor(library, 'chevron-right', colors.textMuted)),
  }
}

/**
 * Custom controls (`appearance: none`) with glyphs from the chosen library
 * embedded as data-URIs.
 *
 * Portable by construction: pure CSS, no runtime, font or network request.
 * `library: 'none'` (or absent in old themes) = previous native behavior
 * (`accent-color`), snapshots intact.
 */
export function iconControlRules(
  theme: Theme,
  scopes: readonly string[] = [],
  directBody = false,
): string[] {
  const library = theme.icons?.library ?? 'none'
  if (library === 'none') return []

  const colors = theme.tokens.colors
  const dark = { ...colors, ...theme.modes.dark?.colors }

  const light = controlIconUris(library, colors)
  const darkUris = controlIconUris(library, dark)

  const rules = [
    `${scopedSelector('input[type="checkbox"]', scopes, directBody)} {\n  appearance: none;\n  -webkit-appearance: none;\n  width: 1.15em;\n  height: 1.15em;\n  margin: 0;\n  padding: 0;\n  display: inline-grid;\n  place-content: center;\n  vertical-align: middle;\n  flex-shrink: 0;\n  cursor: pointer;\n  background-color: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-sm);\n}`,
    `${scopedSelector('input[type="checkbox"]:checked', scopes, directBody)} {\n  background-color: var(--color-primary);\n  border-color: var(--color-primary);\n  background-image: ${light.check};\n  background-size: 75%;\n  background-position: center;\n  background-repeat: no-repeat;\n}`,
    `${scopedSelector('input[type="radio"]', scopes, directBody)} {\n  appearance: none;\n  -webkit-appearance: none;\n  width: 1.15em;\n  height: 1.15em;\n  margin: 0;\n  padding: 0;\n  display: inline-grid;\n  place-content: center;\n  vertical-align: middle;\n  flex-shrink: 0;\n  cursor: pointer;\n  background-color: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: 999px;\n}`,
    `${scopedSelector('input[type="radio"]:checked', scopes, directBody)} {\n  border-color: var(--color-primary);\n  background-image: ${light.dot};\n  background-size: 60%;\n  background-position: center;\n  background-repeat: no-repeat;\n}`,
    `${scopedSelector('select', scopes, directBody)} {\n  appearance: none;\n  -webkit-appearance: none;\n  background-image: ${light.chevronDown};\n  background-repeat: no-repeat;\n  background-position: right 0.7em center;\n  background-size: 1em;\n  padding-right: 2.4em;\n}`,
    `${scopedSelector('summary', scopes, directBody)} {\n  list-style: none;\n}`,
    `${scopedSelector('summary::-webkit-details-marker', scopes, directBody)} {\n  display: none;\n}`,
    `${scopedSelector('summary::before', scopes, directBody)} {\n  content: "";\n  display: inline-block;\n  width: 0.9em;\n  height: 0.9em;\n  margin-right: 0.45em;\n  vertical-align: baseline;\n  background-image: ${light.chevronRight};\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n  transition: transform 0.15s ease;\n}`,
    `${scopedSelector('details[open] > summary::before', scopes, directBody)} {\n  transform: rotate(90deg);\n}`,
  ]

  // Glyph colors are baked into the data-URI at compile time, so each used
  // token needs its dark counterpart when it differs.
  const darkBlocks: string[] = []
  const pushDark = (selector: string, body: string) => {
    darkBlocks.push(
      `${scopedModeSelector(':root[data-theme="dark"]', selector, scopes, directBody)} {\n${body}\n}`,
      `@media (prefers-color-scheme: dark) {\n  ${scopedModeSelector(':root:not([data-theme="light"])', selector, scopes, directBody)} {\n${body}\n  }\n}`,
    )
  }
  if (dark.primaryText !== colors.primaryText) {
    pushDark(
      'input[type="checkbox"]:checked',
      `  background-image: ${darkUris.check};`,
    )
  }
  if (dark.primary !== colors.primary) {
    pushDark(
      'input[type="radio"]:checked',
      `  background-image: ${darkUris.dot};`,
    )
  }
  if (dark.textMuted !== colors.textMuted) {
    pushDark('select', `  background-image: ${darkUris.chevronDown};`)
    pushDark('summary::before', `  background-image: ${darkUris.chevronRight};`)
  }
  return [...rules, ...darkBlocks]
}
