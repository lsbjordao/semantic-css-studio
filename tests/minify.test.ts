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
