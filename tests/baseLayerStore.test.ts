import { beforeEach, describe, expect, it } from 'vitest'
import { compileTheme } from '../src/compiler'
import { seedBaseRules } from '../src/theme/baseRules'
import { isBaseRuleModified, useStudioStore } from '../src/theme/store'

// The subject is `input, textarea, select, button` on purpose: it is a rule
// from the MIDDLE of the seed, so deleting and reinserting the key changes
// emission order. The old suite used `pre code`, which was the last key — the
// only selector for which delete-and-reinsert was neutral, which is why it
// missed the defect.
const SUBJECT = 'input, textarea, select, button'

describe('base layer in the store', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  it('edits a base-rule declaration', () => {
    useStudioStore
      .getState()
      .setLayerProperty('base', SUBJECT, 'padding', '4px')
    expect(useStudioStore.getState().theme.layers.base[SUBJECT].padding).toBe(
      '4px',
    )
  })

  it('recognises a modified rule', () => {
    const theme = () => useStudioStore.getState().theme
    expect(isBaseRuleModified(theme(), SUBJECT)).toBe(false)
    useStudioStore
      .getState()
      .setLayerProperty('base', SUBJECT, 'padding', '4px')
    expect(isBaseRuleModified(theme(), SUBJECT)).toBe(true)
  })

  it('restores the rule to the seeded default', () => {
    useStudioStore
      .getState()
      .setLayerProperty('base', SUBJECT, 'padding', '4px')
    useStudioStore.getState().resetBaseRule(SUBJECT)
    expect(useStudioStore.getState().theme.layers.base[SUBJECT]).toEqual(
      seedBaseRules()[SUBJECT],
    )
  })

  it('disables and re-enables a rule without losing declarations', () => {
    const store = useStudioStore.getState()
    store.setLayerProperty('base', SUBJECT, 'padding', '4px')
    store.toggleBaseRule(SUBJECT, false)
    expect(useStudioStore.getState().theme.layers.base[SUBJECT]).toBeUndefined()
    useStudioStore.getState().toggleBaseRule(SUBJECT, true)
    // re-enabling brings back the seeded default, not the discarded edit
    expect(useStudioStore.getState().theme.layers.base[SUBJECT]).toEqual(
      seedBaseRules()[SUBJECT],
    )
  })

  it('records the change in undo history', () => {
    useStudioStore
      .getState()
      .setLayerProperty('base', SUBJECT, 'padding', '4px')
    useStudioStore.getState().undo()
    expect(useStudioStore.getState().theme.layers.base[SUBJECT].padding).toBe(
      '0.65rem 0.8rem',
    )
  })
})

describe('base-layer order when re-enabling a rule', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  // Inside @layer base every rule is wrapped in :where() with 0 specificity:
  // source order is the ONLY tiebreaker between them. Re-enabling a rule by
  // reinserting the key at the end of the object changes that order and flips
  // the result — `input, textarea, select, button` would come after `button`
  // and steal the primary color from every button.
  it('returns the re-enabled rule to its original seed position', () => {
    const selector = SUBJECT
    useStudioStore.getState().toggleBaseRule(selector, false)
    useStudioStore.getState().toggleBaseRule(selector, true)

    expect(Object.keys(useStudioStore.getState().theme.layers.base)).toEqual(
      Object.keys(seedBaseRules()),
    )

    const css = compileTheme(useStudioStore.getState().theme)
    const fields = css.indexOf(`:where(${selector}) {`)
    const button = css.indexOf(':where(button) {')
    expect(fields).toBeGreaterThan(-1)
    expect(button).toBeGreaterThan(-1)
    expect(fields).toBeLessThan(button)
  })

  it('keeps the button in the primary color after the disable/re-enable cycle', () => {
    const selector = SUBJECT
    useStudioStore.getState().toggleBaseRule(selector, false)
    useStudioStore.getState().toggleBaseRule(selector, true)
    const css = compileTheme(useStudioStore.getState().theme)
    expect(lastBaseDeclarationFor(css, 'button', 'background')).toBe(
      'var(--color-primary)',
    )
    expect(lastBaseDeclarationFor(css, 'button', 'color')).toBe(
      'var(--color-primary-text)',
    )
  })

  it('preserves the position of the other rules', () => {
    useStudioStore.getState().toggleBaseRule('label', false)
    useStudioStore.getState().toggleBaseRule('label', true)
    expect(Object.keys(useStudioStore.getState().theme.layers.base)).toEqual(
      Object.keys(seedBaseRules()),
    )
  })
})

/**
 * Last `property` declaration inside @layer base that hits `element`. Every
 * rule in the layer has 0 specificity, so the last one to appear wins.
 */
function lastBaseDeclarationFor(
  css: string,
  element: string,
  property: string,
): string | undefined {
  const start = css.indexOf('@layer base {')
  const end = css.indexOf('@layer elements {')
  const base = css.slice(start, end === -1 ? undefined : end)
  let winner: string | undefined
  for (const block of base.split('\n\n')) {
    const head = block.match(/:where\((.+)\) \{/)
    if (!head) continue
    const selectors = head[1].split(',').map((part) => part.trim())
    if (!selectors.includes(element)) continue
    const declaration = block.match(new RegExp(`\\n\\s*${property}: ([^;]+);`))
    if (declaration) winner = declaration[1]
  }
  return winner
}
