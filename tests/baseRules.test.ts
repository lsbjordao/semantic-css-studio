import { describe, expect, it } from 'vitest'
import {
  preCodeNeutraliser,
  seedBaseRules,
  seedResponsiveRules,
} from '../src/theme/baseRules'
import { scrollDefaults } from '../src/theme/scrollDefaults'

describe('seedBaseRules', () => {
  it('seeds the rules that are currently hardcoded in the compiler', () => {
    const base = seedBaseRules()
    expect(Object.keys(base)).toEqual([
      'html',
      'h1, h2, h3, h4, h5, h6',
      'p, ul, ol, dl, blockquote, pre, figure, table, form, details',
      'th, td',
      'label',
      'input:not([type="checkbox"]):not([type="radio"]), textarea, select',
      'input, textarea, select, button',
      'button',
    ])
  })

  it('keeps the seeded rule declarations', () => {
    const base = seedBaseRules()
    expect(base['input, textarea, select, button']).toEqual({
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--color-text)',
      font: 'inherit',
      padding: '0.65rem 0.8rem',
    })
    expect(base.button).toEqual({
      background: 'var(--color-primary)',
      color: 'var(--color-primary-text)',
    })
  })

  it('returns a fresh object on every call', () => {
    const first = seedBaseRules()
    first.button.background = 'mutated'
    expect(seedBaseRules().button.background).toBe('var(--color-primary)')
  })
})

describe('seedResponsiveRules', () => {
  it('uses tokens instead of the current fixed literals', () => {
    const responsive = seedResponsiveRules()
    // The current compiler writes --body-padding: 1rem, silently discarding
    // the user-configured value. Now it points at an editable token.
    expect(responsive.tablet[':root']).toEqual({
      '--body-padding': 'var(--body-padding-sm)',
      '--section-spacing': 'var(--section-spacing-sm)',
    })
    expect(responsive.mobile[':root']).toEqual({
      '--body-padding': 'var(--body-padding-xs)',
      '--space-2xl': 'var(--space-2xl-xs)',
    })
  })

  it('preserves each breakpoint element rules', () => {
    const responsive = seedResponsiveRules()
    expect(responsive.tablet.table).toEqual({ fontSize: 'var(--font-size-sm)' })
    expect(responsive.mobile.h1).toEqual({ overflowWrap: 'anywhere' })
  })
})

describe('scrollDefaults', () => {
  it('starts with a visible scrollbar and no smooth scrolling', () => {
    // scroll-behavior stays auto by default: smooth scrolling is a deliberate
    // choice, and only makes sense together with the reduced-motion block.
    expect(scrollDefaults.scrollBehavior).toBe('auto')
    expect(scrollDefaults.scrollbarWidth).toBe('auto')
    expect(Object.keys(scrollDefaults)).toHaveLength(10)
  })
})

describe('the base layer holds no contextual overrides', () => {
  // The base layer is emitted fully wrapped in :where(): 0 specificity. Since
  // layer order beats specificity, a rule whose only job is undoing another
  // element rule always loses to the `elements` layer. `pre code` is the
  // concrete case: it lives in layers.elements, not here.
  it('does not seed pre code', () => {
    expect(seedBaseRules()['pre code']).toBeUndefined()
  })

  it('exposes the pre code neutralisation for the elements layer', () => {
    expect(preCodeNeutraliser).toEqual({
      background: 'transparent',
      color: 'inherit',
      padding: '0',
    })
  })
})
