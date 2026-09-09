import type { Theme } from '../theme/schema'

/**
 * Regras de rolagem para um alvo. Envolvidas em `:where()` porque vivem na
 * camada base, junto das demais regras-base.
 *
 * A separacao entre o que vai no gate e o que nao vai e de compatibilidade,
 * nao de estilo: no Chrome 121+ definir `scrollbar-color` DESATIVA os
 * pseudo-elementos `::-webkit-scrollbar`. Entao as partes ricas vao para
 * Chromium/WebKit, e apenas `scrollbar-color`/`scrollbar-width` ficam atras de
 * `@supports not selector(::-webkit-scrollbar)`, para quem nao tem as partes.
 * As demais propriedades sao padrao em todos os motores e vao sem gate.
 */
function rulesForTarget(target: string): string[] {
  const w = `:where(${target})`
  return [
    `${w} {\n  overscroll-behavior: var(--overscroll-behavior);\n  scroll-behavior: var(--scroll-behavior);\n  scroll-padding-top: var(--scroll-padding-top);\n  scrollbar-gutter: var(--scrollbar-gutter);\n}`,
    `${w}::-webkit-scrollbar {\n  height: var(--scrollbar-size);\n  width: var(--scrollbar-size);\n}`,
    `${w}::-webkit-scrollbar-track {\n  background: var(--scrollbar-track);\n}`,
    `${w}::-webkit-scrollbar-thumb {\n  background: var(--scrollbar-thumb);\n  border-radius: var(--scrollbar-radius);\n}`,
    `${w}::-webkit-scrollbar-thumb:hover {\n  background: var(--scrollbar-thumb-hover);\n}`,
    `@supports not selector(::-webkit-scrollbar) {\n  ${w} {\n    scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);\n    scrollbar-width: var(--scrollbar-width);\n  }\n}`,
  ]
}

/**
 * Alvo fixo em 'html' nesta entrega. `theme` fica no parametro sem uso porque
 * as regras leem os tokens via `var(...)` no CSS, nao o valor computado — e
 * porque uma entrega futura troca este corpo para ler `theme.scrollTargets`
 * (varios alvos configuraveis) sem mudar a assinatura publica.
 */
export function scrollRules(theme: Theme): string[] {
  void theme
  return rulesForTarget('html')
}
