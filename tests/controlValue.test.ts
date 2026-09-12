import { describe, expect, it } from 'vitest'
import { controlValueFor } from '../src/editor/controlValue'
import { presets } from '../src/theme/presets'

describe('element control values', () => {
  it('decomposes border shorthand for focused controls', () => {
    expect(
      controlValueFor(
        presets.Minimal,
        'button',
        'borderWidth',
        '1px solid var(--color-border)',
      ),
    ).toBe('1px')
    expect(
      controlValueFor(
        presets.Minimal,
        'button',
        'borderStyle',
        '1px solid var(--color-border)',
      ),
    ).toBe('solid')
    expect(
      controlValueFor(
        presets.Minimal,
        'button',
        'borderColor',
        '1px solid var(--color-border)',
      ),
    ).toBe('var(--color-border)')
  })

  it('finds and decomposes the blockquote inline-start shorthand', () => {
    expect(
      controlValueFor(
        presets.Minimal,
        'blockquote',
        'borderInlineStartWidth',
        '',
      ),
    ).toBe('4px')
    expect(
      controlValueFor(
        presets.Minimal,
        'blockquote',
        'borderInlineStartStyle',
        '',
      ),
    ).toBe('solid')
    expect(
      controlValueFor(
        presets.Minimal,
        'blockquote',
        'borderInlineStartColor',
        '',
      ),
    ).toBe('var(--color-primary)')
  })

  it('expands four-sided padding values', () => {
    const theme = structuredClone(presets.Minimal)
    theme.layers.elements.article = {
      ...theme.layers.elements.article,
      padding: '1rem 2rem 3rem 4rem',
    }

    expect(
      controlValueFor(
        theme,
        'article',
        'paddingTop',
        theme.layers.elements.article.padding,
      ),
    ).toBe('1rem')
    expect(
      controlValueFor(
        theme,
        'article',
        'paddingRight',
        theme.layers.elements.article.padding,
      ),
    ).toBe('2rem')
    expect(
      controlValueFor(
        theme,
        'article',
        'paddingBottom',
        theme.layers.elements.article.padding,
      ),
    ).toBe('3rem')
    expect(
      controlValueFor(
        theme,
        'article',
        'paddingLeft',
        theme.layers.elements.article.padding,
      ),
    ).toBe('4rem')
  })

  it('preserves unrelated values such as font stacks', () => {
    const stack = 'Inter, ui-sans-serif, system-ui, sans-serif'
    expect(controlValueFor(presets.Minimal, 'p', 'fontFamily', stack)).toBe(
      stack,
    )
  })
})
