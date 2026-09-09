import { describe, expect, it } from 'vitest'
import { tokenName } from '../src/theme/tokenNames'

describe('tokenName', () => {
  it('prefixa cores com color-', () => {
    expect(tokenName('colors', 'background')).toBe('color-background')
    expect(tokenName('colors', 'surfaceAlt')).toBe('color-surface-alt')
    expect(tokenName('colors', 'codeBackground')).toBe('color-code-background')
  })

  it('mantem o kebab da chave nos demais grupos', () => {
    expect(tokenName('typography', 'fontSizeBase')).toBe('font-size-base')
    expect(tokenName('typography', 'lineHeightBody')).toBe('line-height-body')
    expect(tokenName('radius', 'radiusFull')).toBe('radius-full')
    expect(tokenName('shadow', 'shadowLg')).toBe('shadow-lg')
    expect(tokenName('layout', 'contentWidth')).toBe('content-width')
  })

  it('separa letra de digito, corrigindo --space2xl', () => {
    expect(tokenName('spacing', 'space2xl')).toBe('space-2xl')
  })

  it('nomeia qualquer chave nova sem tabela de excecoes', () => {
    expect(tokenName('colors', 'accentQuiet')).toBe('color-accent-quiet')
  })
})
