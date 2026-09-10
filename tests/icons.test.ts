import { describe, expect, it } from 'vitest'
import { compileTheme } from '../src/compiler'
import { controlIconUris, iconControlRules } from '../src/icons/css'
import { getIconBody } from '../src/icons/registry'
import { iconLibraryIds, iconNames, isIconLibraryId } from '../src/icons/types'
import { defaultTheme } from '../src/theme/defaults'
import { presets } from '../src/theme/presets'
import type { Theme } from '../src/theme/schema'

function themed(library: string): Theme {
  const next = structuredClone(defaultTheme) as Theme
  next.icons = { library: library as never }
  return next
}

describe('icon registry', () => {
  it('covers every library × glyph', () => {
    for (const library of iconLibraryIds) {
      if (library === 'none') continue
      for (const name of iconNames) {
        const body = getIconBody(library, name)
        expect(body, `${library}/${name}`).toContain('<')
        expect(body).toMatch(/<(path|circle|rect)/)
      }
    }
  })

  it('validates library ids', () => {
    expect(isIconLibraryId('lucide')).toBe(true)
    expect(isIconLibraryId('tabler')).toBe(true)
    expect(isIconLibraryId('none')).toBe(true)
    expect(isIconLibraryId('bogus')).toBe(false)
    expect(isIconLibraryId(undefined)).toBe(false)
  })
})

describe('iconControlRules', () => {
  it('emits nothing for none or legacy themes without icons', () => {
    expect(iconControlRules(themed('none'))).toEqual([])
    const legacy = structuredClone(presets.Minimal)
    delete (legacy as Partial<Theme>).icons
    expect(iconControlRules(legacy)).toEqual([])
  })

  it('emits portable checkbox/radio/select/summary rules with embedded data-URIs', () => {
    const rules = iconControlRules(themed('lucide'))
    const css = rules.join('\n')
    expect(css).toContain('input[type="checkbox"]')
    expect(css).toContain('appearance: none')
    expect(css).toContain('input[type="radio"]:checked')
    expect(css).toContain('summary::before')
    expect(css).toContain('data:image/svg+xml')
    expect(css).not.toMatch(/https?:\/\//)
  })

  it('is deterministic across libraries', () => {
    for (const library of iconLibraryIds) {
      if (library === 'none') continue
      const a = iconControlRules(themed(library)).join('\n')
      const b = iconControlRules(themed(library)).join('\n')
      expect(a).toBe(b)
    }
  })

  it('emits dark overrides only when dark tokens differ', () => {
    const css = iconControlRules(themed('material')).join('\n')
    // O Minimal tem primaryText/textMuted/primary diferentes no dark.
    expect(css).toContain(
      ':root[data-theme="dark"] input[type="checkbox"]:checked',
    )
    expect(css).toContain('@media (prefers-color-scheme: dark)')
  })
})

describe('controlIconUris', () => {
  it('exposes the URIs embedded by the compiled rules', () => {
    const theme = themed('tabler')
    const uris = controlIconUris('tabler', theme.tokens.colors)
    const compiled = iconControlRules(theme).join('\n')
    for (const uri of Object.values(uris)) {
      expect(uri).toContain('data:image/svg+xml')
      expect(compiled).toContain(uri)
    }
  })
})

describe('compiler + icons', () => {
  it('keeps presets free of icon rules (back-compat)', () => {
    expect(compileTheme(presets.Minimal)).not.toContain('data:image/svg+xml')
  })

  it('includes icon rules when a library is selected', () => {
    const css = compileTheme(themed('phosphor'))
    expect(css).toContain('data:image/svg+xml')
    expect(css).toContain('input[type="checkbox"]:checked')
  })
})
