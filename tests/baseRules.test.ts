import { describe, expect, it } from 'vitest'
import { preCodeNeutraliser, seedBaseRules, seedResponsiveRules } from '../src/theme/baseRules'
import { scrollDefaults } from '../src/theme/scrollDefaults'

describe('seedBaseRules', () => {
  it('semeia as regras que hoje estao hardcoded no compilador', () => {
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

  it('mantem as declaracoes das regras semeadas', () => {
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

  it('devolve um objeto novo a cada chamada', () => {
    const first = seedBaseRules()
    first.button.background = 'mutado'
    expect(seedBaseRules().button.background).toBe('var(--color-primary)')
  })
})

describe('seedResponsiveRules', () => {
  it('usa token no lugar dos literais fixos de hoje', () => {
    const responsive = seedResponsiveRules()
    // O compilador atual grava --body-padding: 1rem, descartando em silencio
    // o valor configurado pelo usuario. Agora aponta para um token editavel.
    expect(responsive.tablet[':root']).toEqual({
      '--body-padding': 'var(--body-padding-sm)',
      '--section-spacing': 'var(--section-spacing-sm)',
    })
    expect(responsive.mobile[':root']).toEqual({
      '--body-padding': 'var(--body-padding-xs)',
      '--space-2xl': 'var(--space-2xl-xs)',
    })
  })

  it('preserva as regras de elemento de cada breakpoint', () => {
    const responsive = seedResponsiveRules()
    expect(responsive.tablet.table).toEqual({ fontSize: 'var(--font-size-sm)' })
    expect(responsive.mobile.h1).toEqual({ overflowWrap: 'anywhere' })
  })
})

describe('scrollDefaults', () => {
  it('nasce com barra visivel e sem rolagem suave', () => {
    // scroll-behavior fica em auto por padrao: rolagem suave e uma escolha
    // deliberada, e so faz sentido junto com o bloco de movimento reduzido.
    expect(scrollDefaults.scrollBehavior).toBe('auto')
    expect(scrollDefaults.scrollbarWidth).toBe('auto')
    expect(Object.keys(scrollDefaults)).toHaveLength(10)
  })
})

describe('a camada base nao abriga sobreposicoes contextuais', () => {
  // A camada base sai inteira embrulhada em :where(): especificidade 0. Como a
  // ordem de camadas vence a especificidade, uma regra cuja unica funcao e
  // desfazer outra regra de elemento perde sempre para a camada `elements`.
  // `pre code` e o caso concreto: mora em layers.elements, nao aqui.
  it('nao semeia pre code', () => {
    expect(seedBaseRules()['pre code']).toBeUndefined()
  })

  it('expoe a neutralizacao de pre code para a camada elements', () => {
    expect(preCodeNeutraliser).toEqual({
      background: 'transparent',
      color: 'inherit',
      padding: '0',
    })
  })
})
