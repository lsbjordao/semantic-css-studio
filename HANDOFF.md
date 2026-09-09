# Handoff — Semantic CSS Studio, fases Fundação e Camadas

Este documento existe para um agente ou pessoa assumir o trabalho sem ter
acompanhado a sessão anterior. Leia-o inteiro antes de tocar em qualquer coisa.

## O projeto

Semantic CSS Studio é um editor visual que compila um objeto `Theme` em uma
folha de estilo CSS classless e portátil, para que o HTML fique livre para
tratar apenas de conteúdo. Sem runtime, sem dependência de framework no CSS
exportado.

## Documentos que mandam

Nesta ordem de autoridade:

1. `docs/superpowers/specs/2026-09-08-css-editor-expansion-design.md` — a spec.
   É a autoridade vinculante. Conflitos se resolvem contra ela.
2. `docs/superpowers/plans/2026-09-08-fundacao-e-camadas.md` — o plano de
   implementação, 10 tarefas, 74 passos, com o código completo de cada uma.
   É o argumento da spec, não a autoridade.
3. `.superpowers/sdd/2026-09-08-fundacao-e-camadas/progress.md` — a ledger de
   progresso. Diz o que já está feito e o que foi decidido pelo caminho.
   **Este diretório é git-ignored**, então só existe nesta máquina.

O plano cobre as fases 1 e 2 da spec. As fases 3 a 6 (Scroll, catálogo
exaustivo de propriedades, seletores com escape hatch, polimento) ainda não têm
plano escrito.

## Estado exato neste momento

Trabalhando **direto na branch `main`**, por decisão explícita do dono do
repositório. Ponto de retorno limpo: `git reset --hard cfa016f`.

| Commit | O que é |
|--------|---------|
| `cfa016f` | snapshot inicial do 0.1.5, antes de qualquer mudança |
| `94d10c5` | a spec |
| `5b16008` | o plano |
| `75af78c` | correção de baseline: snapshot sob jsdom + script de regeneração |
| `b4feb1f` | correção de baseline: erro de lint em App.tsx |
| `d2f8efe` | emendas do scan pré-voo ao plano (F1, F2, F3) |
| `11df414` | **Task 1 completa**, revisada e aprovada limpa |
| `c1a0b73` | Task 2 implementada — a revisão reprovou |
| `c098c95` | Task 2, rodada de correção 1: bug do `pendingAtRule` |
| `22e9323` | correção do plano + limitações conhecidas do minificador |
| `99231c3` … `297026a` | Tasks 3 a 6 (validador de seletor, tipos v2, migração v1→v2, a troca atômica) |
| `a0ae5f3` | **Task 7**: cobertura de `readStoredTheme` via `migrateThemeV2` (implementação já havia entrado na Task 6) |
| `20ac9dc` | **Task 8**: compilador emite `@layer` com base em `:where()` |
| `79eaa9d` | **Task 9**: `resetBaseRule` / `toggleBaseRule` / `isBaseRuleModified` |
| `3bce51d` | **Task 10**: painel da camada base + sidebar por grupo + `aria-current` |

**Tasks 1 a 10 completas e verdes** (100 passed, 5 skipped, lint limpo, build OK, e2e 3/3).

## Armadilhas já pagas — não caia nelas de novo

1. **`npx vite-node -e` não existe.** Essa flag não é suportada; o comando
   imprime o help e sai em silêncio. Para regerar snapshots use
   `npx vite-node scripts/regenerate-snapshots.ts`. O plano já foi emendado,
   mas se você escrever um comando novo, lembre disso.

2. **O ambiente jsdom substitui o `URL` global.** `new URL('./x', import.meta.url)`
   dentro de um teste resolve para `http://localhost:3000/...`, não para um
   caminho de arquivo, e o `readFileSync` seguinte lê a coisa errada sem
   reclamar. Resolva caminhos de teste por `node:path` + `fileURLToPath`.
   Isso já quebrou os 6 testes de preset uma vez.

3. **Auditar o diff de snapshot é a verificação, não a regeneração.** Regerar e
   commitar sem ler `git diff tests/snapshots/` não verifica nada. As Tasks 1,
   6 e 8 dizem exatamente quantas e quais categorias de diferença são
   esperadas. Qualquer linha além dessas é regressão.

4. **A Task 6 é atômica de propósito.** Trocar `Theme` para v2 quebra a
   tipagem de tudo ao mesmo tempo. Não tente fatiá-la: defaults, presets,
   compilador, store e os dois editores mudam juntos, com o codemod
   `scripts/migrate-presets.ts` fazendo o trabalho mecânico. O compilador
   **continua emitindo CSS plano** nessa tarefa; `@layer` só entra na Task 8.

5. **O minificador tem 5 limitações conhecidas, registradas como `it.skip`**
   no fim de `tests/minify.test.ts`, cada uma com comentário explicando o
   mecanismo. Nenhuma é alcançável pela saída atual de `compileTheme()`, mas
   três ficam no caminho do roadmap: `@font-face` (que a spec nomeia como
   lacuna a preencher), CSS nesting (que pode chegar pelo campo de seletor
   livre) e comentário entre tokens (alcançável assim que o catálogo exaustivo
   permitir valores digitados). A mais grave é a última — apagar um comentário
   entre dois tokens funde os dois, trocando um seletor descendente por um
   seletor de tipo. **Resolver antes da entrega do catálogo de propriedades.**

6. **A Task 7 não é polimento, é bloqueio.** `readStoredTheme()` descarta em
   silêncio qualquer `schemaVersion` diferente de 1. Sem a Task 7, a Task 6
   faz todo usuário existente perder o tema ao abrir o app.

## Método de trabalho

Cada tarefa: TDD de verdade (teste que falha primeiro, com a saída da falha
registrada), implementação mínima, suíte completa verde, `npm run lint` limpo,
commit próprio. Uma tarefa não fecha sem revisão que cubra dois vereditos
separados — conformidade com a spec, e qualidade do código.

Portões que valem para toda tarefa:

- `npm test` — suíte inteira verde
- `npm run lint` — sem erro
- `npm run build` — compila
- o compilador (`src/compiler/**`) não importa React nem usa API de browser
- CSS gerado é determinístico: mesmo tema, mesmos bytes

## Decisões de arquitetura já fechadas com o dono do repositório

Não reabra estas sem perguntar:

- Cobertura de propriedades: exaustiva e plana, navegada por busca.
- Seletores: catálogo de variantes como caminho principal, mais campo de
  seletor livre como escape hatch.
- Scroll: sistema completo — barra, comportamento, âncoras e snap.
- CSS exportado: `@layer` mais `:where()`, com regras-base editáveis.
- Forma do `Theme`: mapas por camada.
- Catálogo de propriedades: gerado em build-time do `mdn-data`.
