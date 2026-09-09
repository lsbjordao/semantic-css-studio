import { describe, expect, it } from 'vitest'
import { minifyCss } from '../src/compiler/minify'

describe('minifyCss', () => {
  it('remove espaco e o ponto-e-virgula final', () => {
    expect(minifyCss('a {\n  color: red;\n}\n')).toBe('a{color:red}')
  })

  it('descarta comentarios', () => {
    expect(minifyCss('/* nota */\na { color: red }')).toBe('a{color:red}')
  })

  it('preserva o conteudo de strings', () => {
    expect(minifyCss('a::after { content: "a;  b" }')).toBe('a::after{content:"a;  b"}')
  })

  it('nao quebra comentario dentro de string', () => {
    expect(minifyCss('a::after { content: "/* nao e comentario */" }'))
      .toBe('a::after{content:"/* nao e comentario */"}')
  })

  it('preserva url() sem aspas', () => {
    const css = 'a { background: url(data:image/svg+xml;base64,AA==) }'
    expect(minifyCss(css)).toBe('a{background:url(data:image/svg+xml;base64,AA==)}')
  })

  it('preserva o combinador descendente antes de pseudo-classe', () => {
    // `a :hover` e `a:hover` sao seletores diferentes; colapsar o espaco
    // aqui mudaria o significado da regra.
    expect(minifyCss('a :hover { color: red }')).toBe('a :hover{color:red}')
  })

  it('preserva virgula em lista de fontes', () => {
    expect(minifyCss('a { font-family: "Iowan Old Style", Georgia, serif }'))
      .toBe('a{font-family:"Iowan Old Style",Georgia,serif}')
  })

  it('mantem o media query valido', () => {
    expect(minifyCss('@media (max-width: 768px) {\n  a { color: red }\n}'))
      .toBe('@media (max-width: 768px){a{color:red}}')
  })

  it('preserva o combinador descendente dentro de at-rule', () => {
    // Um contador de profundidade simples trataria o interior de @media como
    // bloco de declaracao e apagaria o espaco, virando o seletor 'a:hover'.
    expect(minifyCss('@media print {\n  a :hover { color: red }\n}'))
      .toBe('@media print{a :hover{color:red}}')
  })

  it('reseta pendingAtRule apos at-rule sem bloco no nivel superior', () => {
    const css = '@layer reset, base, elements;\na { color: red }'
    expect(minifyCss(css)).toBe('@layer reset,base,elements;a{color:red}')
  })

  it('reseta pendingAtRule apos at-rule sem bloco aninhada dentro de outra at-rule', () => {
    // pendingAtRule e setado por qualquer '@', em qualquer profundidade. Se o
    // reset por ';' so dispara em blocks.length === 0, uma at-rule sem bloco
    // aninhada dentro de outra at-rule termina com ';' enquanto
    // blocks.length > 0, o reset nao dispara, e a flag vaza para o proximo
    // '{' irmao — classificando incorretamente um bloco de declaracoes como
    // corpo de at-rule (o espaco em torno de ':' deixaria de ser removido).
    const css = '@layer components { @layer buttons, cards; a { color: red } }'
    expect(minifyCss(css)).toBe('@layer components{@layer buttons,cards;a{color:red}}')
  })
})

/**
 * Limitacoes conhecidas do minificador, descobertas por sondagem durante a
 * revisao da Task 2 e deliberadamente NAO corrigidas nela: estao fora do
 * escopo do brief daquela tarefa.
 *
 * Nenhuma e alcancavel pela saida atual de compileTheme(). Os seis presets nao
 * emitem url(), nem CSS nesting, nem at-rule de declaracao, e o unico
 * comentario e o cabecalho. Mas tres ficam no caminho do roadmap:
 *
 *  - @font-face e nomeada na spec como lacuna a preencher;
 *  - nesting pode chegar pelo campo de seletor livre;
 *  - comentario entre tokens fica alcancavel quando o catalogo exaustivo de
 *    propriedades permitir valores digitados livremente.
 *
 * A mais grave e a ultima: apagar um comentario entre dois tokens funde os
 * dois, trocando um seletor descendente por um seletor de tipo. Corrigir antes
 * da entrega do catalogo de propriedades.
 */
describe('minifyCss — limitacoes conhecidas (nao corrigidas)', () => {
  it.skip('preserva parenteses escapados dentro de url() sem aspas', () => {
    const css = String.raw`a { background: url(foo\)/**/bar) }`
    expect(minifyCss(css)).toBe(String.raw`a{background:url(foo\)/**/bar)}`)
  })

  it.skip('preserva espaco escapado dentro de url() sem aspas', () => {
    // O caminho rapido de url() faz replace(/\s+/g, ''), que apaga tambem o
    // espaco escapado, significativo em nome de arquivo.
    const css = String.raw`a { background: url(foo\ bar) }`
    expect(minifyCss(css)).toBe(String.raw`a{background:url(foo\ bar)}`)
  })

  it.skip('preserva o combinador descendente em seletor aninhado', () => {
    // Mesma classe do bug de at-rule, agora para CSS nesting nativo:
    // '& :hover' (descendente) e '&:hover' (composto) sao seletores diferentes.
    expect(minifyCss('a { & :hover { color: red } }')).toBe('a{& :hover{color:red}}')
  })

  it.skip('minifica declaracoes dentro de at-rules de declaracao', () => {
    // @font-face, @property, @page e @counter-style tem corpo de DECLARACOES,
    // nao de regras, mas o classificador os trata como at-rule e desliga a
    // remocao de espaco em torno de ':'. Sub-minificacao, nao corrupcao.
    expect(minifyCss('@font-face { font-family: x; src: url(font.woff2); }'))
      .toBe('@font-face{font-family:x;src:url(font.woff2)}')
  })

  it.skip('mantem separacao entre tokens adjacentes a comentario removido', () => {
    // O mais grave dos cinco: em CSS o comentario separa tokens. Apaga-lo sem
    // repor um espaco funde 'a' e 'b' num unico identificador, trocando um
    // seletor descendente por um seletor de tipo.
    expect(minifyCss('a/**/b { color: red }')).toBe('a b{color:red}')
  })
})
