# Expansão do editor: propriedades exaustivas, seletores abertos, camadas e scroll

Data: 2026-09-08
Estado: aprovado para planejamento

## Objetivo

Tornar o Semantic CSS Studio capaz de produzir um CSS padronizado completo para
HTML semântico, de modo que o documento fique livre para tratar apenas de
conteúdo. Isso exige três mudanças de fundo sobre a versão 0.1.5:

1. toda propriedade CSS acessível para qualquer seletor, navegada por busca;
2. um modelo de seletor que vá além da tag nua — variantes catalogadas mais um
   campo livre;
3. estilo de scroll como recurso de primeira classe, hoje inexistente.

O CSS exportado passa a sair em camadas (`@layer`) com as regras-base em
`:where()`, de forma que o tema funcione como piso e nunca como teto para quem
o consome.

## Decisões

| Eixo | Decisão |
|---|---|
| Cobertura de propriedades | Exaustiva e plana: toda propriedade disponível para todo seletor, agrupada por família, navegada por busca |
| Modelo de seletor | Catálogo de variantes como caminho principal + campo de seletor livre como escape hatch |
| Scroll | Sistema completo: barra, comportamento, âncoras e snap |
| CSS exportado | `@layer` + `:where()`, com regras-base editáveis |
| Forma do `Theme` | Mapas por camada (`layers.base/elements/states/responsive`) |
| Origem do catálogo | Gerado em build-time a partir do `mdn-data`, artefato versionado |

## Estado atual e lacunas

O que já está correto e deve ser preservado: a separação `Theme` →
`compileTheme()` → CSS, com o compilador livre de React e de API de browser
(`docs/ARCHITECTURE.md`, invariantes 1–6); e a injeção de CSS no
`<style id="studio-theme">` em vez de recriar o `srcDoc`
(`src/preview/PreviewFrame.tsx`), que dá preview sem flicker e sem perda de
posição de rolagem.

As lacunas que motivam este trabalho:

- `src/editor/elementProfiles.ts` é uma whitelist de cerca de 50 propriedades
  escrita à mão. Faltam famílias inteiras: posicionamento, grid, item de flex,
  `background-*` além da cor, texto avançado, multi-coluna, listas, tabelas,
  transições, transformações, filtros, bordas e raios individuais, e scroll.
- `Theme.elements` só aceita tag nua. Não há pseudo-elementos, seletores de
  atributo nem combinadores. Zebra striping (`tbody tr:nth-child(even)`) — um
  dos pedidos mais comuns em tema classless — é inexprimível.
- `src/editor/StateEditor.tsx` fixa 7 elementos, 6 pseudo-classes e 9
  propriedades. Faltam `:visited`, `:target`, `:invalid`, `:required`,
  `:placeholder-shown`, `:read-only`, `:indeterminate`, `:open` e os
  `:nth-child`.
- Scroll é ausente por completo. Existe um `scrollBehavior: 'smooth'` solto em
  `src/theme/presets/index.ts:322`, sem `prefers-reduced-motion` para desligar.
- `baseRules()` em `src/compiler/compileTheme.ts` injeta cerca de 11 regras
  invisíveis e não editáveis. `responsiveRules()` sobrescreve
  `--body-padding` e `--section-spacing` com literais fixos, descartando em
  silêncio o valor configurado pelo usuário.
- `tokenName()` é uma cadeia de trinta `.replace()` majoritariamente no-op; um
  token de cor novo fora da lista sai como `--accent` em vez de
  `--color-accent`.
- `src/theme/store.ts` grava o tema inteiro em `localStorage` a cada `set()`,
  inclusive em mudanças puramente de UI, sem debounce e sem tratar
  `QuotaExceededError`.
- `readStoredTheme()` descarta silenciosamente qualquer `schemaVersion !== 1`
  sem usar o `migrateTheme()` que existe ao lado.
- `minifyCss()` é regex sobre string; corrompe assim que `content`, gradientes
  e `url(data:…)` ficarem acessíveis.

## Arquitetura

### `Theme` v2

```ts
export const SCHEMA_VERSION = 2

export type CssPropertyMap = Record<string, string>    // camelCase → valor CSS bruto
export type RuleMap = Record<string, CssPropertyMap>   // seletor → declarações

export interface ThemeLayers {
  base: RuleMap                          // emitido dentro de :where(), especificidade 0
  elements: RuleMap                      // tags, variantes do catálogo, seletores livres
  states: RuleMap                        // regras com pseudo-classe
  responsive: Record<string, RuleMap>    // chave do breakpoint → regras
}

export interface Theme {
  schemaVersion: 2
  metadata: { name: string; description?: string; author?: string; version: string }
  tokens: ThemeTokens                    // ganha o grupo `scroll`
  modes: { light: ThemeMode; dark?: ThemeMode }
  layers: ThemeLayers
  breakpoints: Record<string, number>    // substitui `responsive`
  options: {
    includeMinimalReset: boolean
    reducedMotion: boolean               // padrão: true
  }
}
```

As chaves de `layers.responsive` correspondem exatamente às chaves de
`breakpoints`. Um breakpoint sem regras associadas é válido; uma chave em
`layers.responsive` sem breakpoint correspondente é erro de validação e é
rejeitada na importação.

As chaves de `CssPropertyMap` são nomes de propriedade em camelCase, e a função
`kebab()` existente já converte corretamente propriedades com prefixo de
fornecedor, porque uma maiúscula inicial vira hífen inicial
(`WebkitLineClamp` → `-webkit-line-clamp`). Propriedades customizadas fogem
dessa regra: são armazenadas literalmente, começando por `--`, e emitidas sem
qualquer transformação.

`layers.base` nasce populado com exatamente as regras hoje hardcoded em
`compileTheme.ts`, de modo que a saída padrão continua visualmente idêntica,
só que visível e editável. `layers.responsive` nasce com as regras de
`responsiveRules()`, com os literais `1rem`, `2rem`, `0.8rem` e `2.5rem`
substituídos por tokens novos, o que corrige a sobrescrita silenciosa sem
alterar a aparência padrão. Os tokens novos entram nos grupos existentes:
`bodyPaddingSm` (1rem, no tablet), `bodyPaddingXs` (0.8rem, no mobile) e
`sectionSpacingSm` (2rem, no tablet) em `LayoutTokens`; `space2xlSm` (2.5rem,
no mobile) em `SpacingTokens`.

### Tokens de scroll

```ts
export interface ScrollTokens {
  scrollbarWidth: string        // auto | thin | none
  scrollbarSize: string         // largura/altura das partes WebKit
  scrollbarTrack: string
  scrollbarThumb: string
  scrollbarThumbHover: string
  scrollbarRadius: string
  scrollbarGutter: string       // auto | stable | stable both-edges
  scrollBehavior: string        // auto | smooth
  scrollPaddingTop: string      // âncoras sob header sticky
  overscrollBehavior: string
}
```

### Compilador

Ordem de emissão:

```
/* metadata */
@layer reset, base, elements, states, responsive;
@layer reset      { *, *::before, *::after { box-sizing: border-box } }   // se ligado
@layer base       { :root { --tokens }                                    // inclui scroll
                    :where(sel) { … }                                     // regras-base
                    ::-webkit-scrollbar…  +  @supports not selector(…)
                    :root[data-theme="dark"] { … }
                    @media (prefers-color-scheme: dark) { … } }
@layer elements   { sel { … } }
@layer states     { sel { … } }
@layer responsive { @media (max-width: Npx) { sel { … } } }
@media (prefers-reduced-motion: reduce) { … }   // fora de camada, deliberadamente
@media print      { … }
```

Os tokens ficam em `@layer base` no `:root` com especificidade normal, de modo
que um `:root { --color-primary: red }` sem camada, escrito por quem consome o
tema, sempre vence. O bloco de movimento reduzido fica fora de qualquer camada
porque é decisão de acessibilidade que não deve ser sobrescrível por acidente.

Determinismo preservado: seletores ordenados por ordem canônica de domínio para
tags conhecidas e `localeCompare` para o restante; declarações em ordem
alfabética dentro de cada regra.

### Compatibilidade da barra de rolagem

No Chrome 121 e superiores, definir `scrollbar-color` desativa os
pseudo-elementos `::-webkit-scrollbar`. Emitir os dois lado a lado, portanto,
perde as partes ricas. A saída correta dá as partes ao Chromium/WebKit e as
propriedades padrão a quem não as suporta — e apenas `scrollbar-color` e
`scrollbar-width` entram no bloco condicional, porque as demais propriedades de
scroll são padrão em todos os motores e vão sem gate na mesma regra:

```css
@layer base {
  :where(html) {
    scrollbar-gutter: var(--scrollbar-gutter);
    scroll-behavior: var(--scroll-behavior);
    scroll-padding-top: var(--scroll-padding-top);
    overscroll-behavior: var(--overscroll-behavior);
  }

  :where(html)::-webkit-scrollbar { width: var(--scrollbar-size); height: var(--scrollbar-size); }
  :where(html)::-webkit-scrollbar-track { background: var(--scrollbar-track); }
  :where(html)::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: var(--scrollbar-radius); }
  :where(html)::-webkit-scrollbar-thumb:hover { background: var(--scrollbar-thumb-hover); }

  @supports not selector(::-webkit-scrollbar) {
    :where(html) {
      scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
      scrollbar-width: var(--scrollbar-width);
    }
  }
}
```

As mesmas partes ficam disponíveis por seletor no catálogo, não apenas em
`html`: `pre`, `table`, `dialog`, `textarea`, `aside` e seletores livres.

### Movimento reduzido

Emitido por padrão, controlado por `options.reducedMotion`:

```css
@media (prefers-reduced-motion: reduce) {
  :where(html) { scroll-behavior: auto; }
  :where(*, *::before, *::after) {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Correções estruturais no compilador

- `tokenName()` deixa de ser cadeia de `.replace()` e passa a ser um mapa de
  prefixo por grupo de token, de modo que um token novo nunca saia com nome
  errado. Os prefixos por grupo são: `colors` recebe `color-`; `typography`,
  `spacing`, `radius`, `shadow` e `layout` mantêm o kebab da própria chave, que
  já carrega o prefixo (`fontSizeBase` → `--font-size-base`, `spaceMd` →
  `--space-md`); `scroll` também mantém o kebab da chave, porque as chaves já
  começam por `scrollbar`, `scroll` ou `overscroll` (`scrollbarThumbHover` →
  `--scrollbar-thumb-hover`, `overscrollBehavior` → `--overscroll-behavior`).
- `minifyCss()` deixa de ser regex e passa a ser um tokenizador pequeno (~60
  linhas, puro, sem dependência) que respeita strings, comentários e `url()`.
- Validação de seletor em duas camadas: no app, `document.querySelector` dentro
  de `try/catch`, em tempo de edição; no compilador, uma função pura com
  gramática restrita, usada na importação, para não violar a invariante de que
  o compilador não usa API de browser. Seletor contendo classe ou id é aceito
  com aviso, não bloqueado — contraria a premissa classless, mas a decisão é de
  quem usa.

## Interface

### Catálogo de propriedades gerado

`scripts/generate-css-properties.ts`, executado no build, com o artefato
versionado em `src/editor/cssProperties.generated.ts`:

- lê `mdn-data/css/properties.json` (devDependency) e descarta
  `status: "obsolete"`;
- guarda por propriedade: nome, sintaxe, valor inicial, se herda e grupo;
- deriva o controle a partir da sintaxe — apenas `<color>` gera seletor de cor;
  `<length>`, `<length-percentage>` e `<number>` geram stepper; conjunto fechado
  de palavras-chave sem `<…>` gera select; o restante gera campo de texto.

Ao lado, `src/editor/propertyOverrides.ts`, escrito à mão e pequeno: rótulos
melhores e controles ricos onde a derivação automática não basta —
`box-shadow` e `text-shadow` no editor de sombra existente, `font-family` na
pilha de fontes, `transition` num construtor dedicado.

Os grupos do MDN são remapeados para doze famílias: Layout, Caixa e
espaçamento, Tipografia, Cor e fundo, Borda, Efeitos e filtros, Transições e
animações, Scroll, Tabelas, Listas e contadores, Conteúdo gerado, e
Interatividade e formulários. A família Scroll não existe no MDN: ela colapsa
CSSOM View (`scroll-behavior`), CSS Scrollbars (`scrollbar-*`), CSS Scroll Snap
(`scroll-snap-*`) e CSS Overscroll Behavior (`overscroll-behavior`).

O dataset gerado é carregado por `import()` dinâmico na primeira abertura do
painel de elementos, de modo que o bundle inicial não cresça.

### Inversão do painel de elementos

Com centenas de propriedades, o catálogo não pode ocupar o topo. A hierarquia
passa a ser:

```
SELETOR: article > p:first-of-type          [× limpar]
DEFINIDAS (4)          ← primário: o que está sendo editado
    color            var(--color-text-muted)   ×
    font-size        1.125rem            − +   ×
    text-wrap        balance                   ×
    margin-block     0 var(--space-md)         ×
[ buscar propriedade… ]        ← filtro por substring sobre o catálogo inteiro
FAMÍLIAS (recolhidas)
```

`src/editor/ElementEditor.tsx` hoje tem 100 linhas fazendo três coisas. Passa a
ser `src/editor/elements/` com `SelectorPicker`, `SelectorVariants`,
`CustomSelectorField`, `DefinedProperties`, `PropertySearch`,
`PropertyFamilies` e `PropertyControl`; o orquestrador fica em cerca de 60
linhas.

### Variantes de seletor como dado

`src/editor/selectorVariants.ts`. O campo `layer` em cada variante é o que
determina, sem condicional espalhada pelo código, qual camada aquele editor
escreve:

```ts
{ tag: 'input', variants: [
  { suffix: '[type="checkbox"]',      label: 'Checkbox',             layer: 'elements' },
  { suffix: '::placeholder',          label: 'Texto do placeholder', layer: 'elements' },
  { suffix: '::file-selector-button', label: 'Botão de arquivo',     layer: 'elements' },
  { suffix: ':invalid',               label: 'Inválido',             layer: 'states' },
  { suffix: ':placeholder-shown',     label: 'Vazio',                layer: 'states' },
]}
```

Três origens de variante se somam para cada tag:

- **universais** — `::before`, `::after`, `::selection`, `::first-line`,
  `::first-letter`, `:hover`, `:focus-visible`, `:target`, `:first-child`,
  `:last-child`, `:nth-child(even)`, `:nth-child(odd)`, e as partes de
  scrollbar em elementos roláveis;
- **específicas da tag** — o bloco de `input` acima, `::marker` em `li`,
  `::backdrop` em `dialog`, `:open` em `details`;
- **contextuais** — cerca de vinte combinadores que um tema classless
  efetivamente precisa, agrupados sob "Contexto": `tbody tr:nth-child(even)`,
  `pre > code`, `li > ul`, `h2 + p`, `thead th`, `article > :first-child`.

Abaixo do catálogo fica o campo de seletor livre, validado em tempo real.

### Barra lateral

O `slice(0,6)` / `slice(6)` de `src/editor/EditorSidebar.tsx` é substituído por
agrupamento explícito declarado no dado:

```
TOKENS     Cores · Tipografia · Espaçamento · Layout · Raios · Sombras · Scroll
REGRAS     Base · Elementos · Estados · Responsivo
CHECAGEM   Acessibilidade
```

A seção **Scroll** tem duas metades: os tokens globais, com uma amostra rolável
dentro do próprio painel — necessária para ver o thumb enquanto se arrasta a
cor, sem depender do preview; e a parte por seletor, listando quais elementos
recebem tratamento de barra, mais `scroll-margin-top` e `scroll-padding-top`
com dica ligando explicitamente ao caso de header sticky com âncoras.

A seção **Base** lista as regras `:where()` semeadas, cada uma editável, com
"restaurar padrão" e opção de desligar, sob um aviso de que são especificidade
zero.

### Preview

Specimen novo, **Scroll**: conteúdo longo, header sticky, sumário com âncoras
para verificar `:target`, `pre` e `table` que estouram na horizontal, `dialog`
e `textarea`. O toolbar ganha um botão *forçar barras visíveis* — sem ele, o
macOS esconde as barras por overlay e o usuário não consegue ver o que está
estilizando.

## Migração v1 → v2

`src/theme/migration.ts` deixa de apenas validar e rejeitar, e passa a migrar.
O achatamento de estados é sem perda:

```
tokens.scroll     = defaults
layers.base       = seedBaseRules()
layers.elements   = v1.elements
layers.states     = flatten(v1.states)     // {a:{hover:{…}}} → {"a:hover":{…}}
layers.responsive = seedResponsiveRules(v1.responsive)
breakpoints       = v1.responsive
options.reducedMotion = true
```

`readStoredTheme()` em `src/theme/store.ts` passa a rotear o conteúdo do
`localStorage` por `migrateTheme()` em vez de descartá-lo em silêncio.

Os seis presets são literais v1 em `src/theme/presets/index.ts`. A migração é
executada uma única vez por codemod e os literais v2 são comitados, em lugar de
migrar em runtime: os presets seguem legíveis, sem custo de carga, e os
snapshots são regerados.

## Tratamento de erro

| Onde | Hoje | Passa a ser |
|---|---|---|
| `store.ts` autosave | `setItem` sem guarda, a cada `set()` | `try/catch` com `QuotaExceededError` e toast "autosave pausado"; debounce de 400 ms; assina apenas `theme` |
| `Topbar.tsx` | `alert()` e `confirm()` | sistema de toast existente e confirmação em `<dialog>` |
| Importação | uma string em `alert` | erro por campo, na interface |
| Seletor livre inválido | não existe | erro inline; a regra não é escrita |
| Propriedade desconhecida | não existe | aceita, pois CSS é tolerante, e marcada "não reconhecida" — necessário porque o catálogo sempre atrasa em relação ao CSS novo |
| Popover de export | sem Escape, sem clique-fora, sem `aria-expanded` | os três |

## Testes

O teste de maior valor é o do minificador novo: é exatamente onde o regex atual
quebra assim que `content`, gradientes e `url(data:…)` ficarem acessíveis.
Além dele:

- compilador — ordem das camadas, `:where()` na base, o gate
  `@supports not selector(::-webkit-scrollbar)`, presença e ausência do bloco de
  movimento reduzido, e determinismo verificado compilando duas vezes;
- migração — fixture v1 para v2, com foco no achatamento de estados, e o
  caminho de recuperação do `localStorage`;
- validador de seletor — tabela de casos válidos, inválidos e com aviso de
  classe;
- catálogo gerado — teste que regenera e compara, para que o artefato
  versionado não possa divergir do gerador;
- derivação de controle — amostra de propriedades contra o tipo esperado;
- snapshots dos seis presets, regerados em v2;
- E2E — definir cor de barra e vê-la no CSS exportado; usar o seletor livre;
  âncora com `scroll-margin`.

## Faseamento

Seis fases, cada uma entregável isoladamente:

1. **Fundação** — schema v2, migração, `tokenName` como mapa, minificador novo,
   `readStoredTheme` via migração, presets regerados. Nada muda para quem usa.
2. **Camadas** — `@layer` e `:where()` no compilador, seção Base editável.
3. **Scroll** — tokens, compilador, seção Scroll, specimen, movimento reduzido,
   `@media print`.
4. **Catálogo de propriedades** — gerador, dataset, inversão do painel, busca.
5. **Seletores** — variantes catalogadas, contexto, escape hatch, quebra do
   `ElementEditor`.
6. **Polimento** — autosave, toasts, barra lateral por dado, acessibilidade do
   popover.

A Fase 3 não depende das Fases 4 e 5. Dentro da Fase 3, `scroll-snap-*` é a
peça de menor valor para um tema de documento; entra por fazer parte do sistema
completo, mas é a última a ser implementada e a primeira a sair se o escopo
apertar.

## Fora de escopo

Backend, autenticação, sincronização em nuvem, comportamento de page builder e
importação de CSS existente seguem fora de escopo, conforme a promessa
arquitetural da versão 0.1.0. As invariantes 1 a 6 de `docs/ARCHITECTURE.md`
permanecem válidas sem alteração.
