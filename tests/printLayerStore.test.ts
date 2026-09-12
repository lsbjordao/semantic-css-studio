import { beforeEach, describe, expect, it } from 'vitest'
import { compileTheme } from '../src/compiler'
import { seedPrintRules } from '../src/theme/printRules'
import { isPrintRuleModified, useStudioStore } from '../src/theme/store'

const SUBJECT = 'a[href^="http"]::after'

describe('print layer in the store', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  it('starts with no print layer at all', () => {
    expect(useStudioStore.getState().theme.layers.print).toBeUndefined()
  })

  it('enables a seeded rule and compiles it', () => {
    useStudioStore.getState().togglePrintRule(SUBJECT, true)
    expect(useStudioStore.getState().theme.layers.print?.[SUBJECT]).toEqual(
      seedPrintRules()[SUBJECT],
    )
    const css = compileTheme(useStudioStore.getState().theme)
    expect(css).toContain('@media print {')
    expect(css).toContain('content: " (" attr(href) ")";')
  })

  it('edits a print declaration', () => {
    useStudioStore.getState().togglePrintRule(SUBJECT, true)
    useStudioStore
      .getState()
      .setPrintProperty(SUBJECT, 'content', '"(external)"')
    expect(
      useStudioStore.getState().theme.layers.print?.[SUBJECT].content,
    ).toBe('"(external)"')
  })

  it('recognises a modified rule', () => {
    useStudioStore.getState().togglePrintRule(SUBJECT, true)
    const theme = () => useStudioStore.getState().theme
    expect(isPrintRuleModified(theme(), SUBJECT)).toBe(false)
    useStudioStore.getState().setPrintProperty(SUBJECT, 'content', 'none')
    expect(isPrintRuleModified(theme(), SUBJECT)).toBe(true)
  })

  it('restores the seeded declaration', () => {
    useStudioStore.getState().togglePrintRule(SUBJECT, true)
    useStudioStore.getState().setPrintProperty(SUBJECT, 'content', 'none')
    useStudioStore.getState().resetPrintRule(SUBJECT)
    expect(useStudioStore.getState().theme.layers.print?.[SUBJECT]).toEqual(
      seedPrintRules()[SUBJECT],
    )
  })

  it('drops the empty rule and the empty layer when the last declaration goes', () => {
    useStudioStore.getState().togglePrintRule(SUBJECT, true)
    useStudioStore.getState().setPrintProperty(SUBJECT, 'content', '')
    expect(useStudioStore.getState().theme.layers.print).toBeUndefined()
    expect(compileTheme(useStudioStore.getState().theme)).not.toContain(
      '@media print',
    )
  })

  it('disables a rule without leaving an empty print layer', () => {
    useStudioStore.getState().togglePrintRule('body', true)
    useStudioStore.getState().togglePrintRule('body', false)
    expect(useStudioStore.getState().theme.layers.print).toBeUndefined()
  })

  it('keeps the seed order when rules are re-enabled out of order', () => {
    const store = useStudioStore.getState()
    store.togglePrintRule('body', true)
    store.togglePrintRule(SUBJECT, true)
    store.togglePrintRule('body', false)
    store.togglePrintRule('body', true)
    useStudioStore.getState().togglePrintRule(SUBJECT, false)
    useStudioStore.getState().togglePrintRule(SUBJECT, true)
    expect(
      Object.keys(useStudioStore.getState().theme.layers.print ?? {}),
    ).toEqual(['body', SUBJECT])
  })

  it('records the change in undo history', () => {
    useStudioStore.getState().togglePrintRule(SUBJECT, true)
    useStudioStore.getState().undo()
    expect(useStudioStore.getState().theme.layers.print).toBeUndefined()
  })
})
