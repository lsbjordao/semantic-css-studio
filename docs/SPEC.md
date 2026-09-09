# Semantic CSS Studio

## 1. Visão geral

Construir uma aplicação web open source para criação visual de stylesheets CSS voltadas a **HTML semântico e classless CSS**.

A aplicação deve permitir que uma pessoa configure visualmente:

- tipografia;
- cores;
- espaçamento;
- largura e layout;
- bordas;
- raios;
- sombras;
- links;
- headings;
- parágrafos;
- listas;
- tabelas;
- formulários;
- botões;
- elementos de código;
- blockquotes;
- imagens e figuras;
- `article`;
- `aside`;
- `details`;
- navegação;
- estados interativos;
- dark mode;
- responsividade;

e visualizar imediatamente essas alterações em uma página de demonstração.

Ao final, a aplicação deve gerar um arquivo CSS independente e portátil que possa ser usado diretamente sobre HTML semântico:

```html
<link rel="stylesheet" href="theme.css">

```

O objetivo não é gerar componentes React, Vue ou Web Components.

O objetivo é gerar **CSS puro**.

---

# 2. Conceito central

A ideia principal do projeto é:

> Your HTML is your design system.

Em vez de construir interfaces baseadas em classes como:

```html
<div class="card">
  <div class="card-header">
    ...
  </div>
</div>

```

o stylesheet deve privilegiar:

```html
<article>
  <h2>Title</h2>
  <p>Content</p>
</article>

```

A aplicação deve produzir CSS prioritariamente para seletores semânticos como:

```css
body
header
nav
main
section
article
aside
footer

h1
h2
h3
h4
h5
h6

p
a
strong
em
small
mark

ul
ol
li
dl
dt
dd

blockquote

pre
code
kbd

table
thead
tbody
tr
th
td

form
fieldset
legend
label
input
select
textarea
button

figure
figcaption
img

details
summary

hr

```

Classes auxiliares poderão existir, mas devem ser opcionais.

---

# 3. Objetivos do projeto

## 3.1 Objetivo principal

Criar um editor visual para geração de frameworks ou temas CSS classless.

## 3.2 Objetivos secundários

A ferramenta deve permitir:

1. criar um tema do zero;
2. começar a partir de presets;
3. modificar um tema visualmente;
4. visualizar todas as alterações em tempo real;
5. salvar o projeto em formato estruturado;
6. gerar CSS;
7. gerar CSS minificado;
8. gerar uma página HTML de demonstração;
9. suportar light mode e dark mode;
10. testar responsividade;
11. avaliar contraste e acessibilidade;
12. futuramente importar stylesheets existentes.

---

# 4. Princípios de arquitetura

O projeto deve seguir estes princípios.

## 4.1 CSS como artefato compilado

A fonte primária do tema não deve ser o arquivo CSS.

A fonte primária deve ser um modelo estruturado:

```text
theme.json

```

Exemplo:

```json
{
  "metadata": {
    "name": "Minimal Paper",
    "version": "1.0.0"
  },
  "tokens": {
    "colors": {},
    "typography": {},
    "spacing": {},
    "radius": {},
    "shadow": {}
  },
  "elements": {
    "body": {},
    "h1": {},
    "article": {},
    "button": {}
  }
}

```

O CSS será produzido por um compilador:

```text
theme.json
     ↓
CSS compiler
     ↓
theme.css

```

Isso permitirá no futuro gerar diferentes formatos a partir do mesmo tema.

---

# 5. Arquitetura conceitual

```text
                   ┌───────────────────┐
                   │   Visual Editor   │
                   └─────────┬─────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Theme State     │
                    │ theme.json      │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
   Live Preview       CSS Compiler       Validators
          │                  │                  │
          │                  ▼                  │
          │             theme.css               │
          │                                     │
          └──────────────────┬──────────────────┘
                             ▼
                       User Interface

```

---

# 6. Escopo do MVP

O MVP deve funcionar completamente no browser.

Não utilizar backend no primeiro milestone.

Todos os dados devem ser mantidos localmente.

Persistência:

- `localStorage`;
- importação de JSON;
- exportação de JSON.

---

# 7. Stack recomendada

Preferir uma stack simples.

## Frontend

- TypeScript;
- React;
- Vite.

Alternativamente, Svelte também seria adequado, mas usar React caso não haja motivo concreto para outra escolha.

## Estado

Evitar Redux.

Usar:

- Zustand;

ou

- React Context + reducers;

caso a estrutura continue simples.

## CSS do próprio editor

Pode usar CSS Modules, vanilla CSS ou uma solução leve.

Não confundir o CSS interno da aplicação com o CSS que está sendo gerado.

## Testes

- Vitest;
- React Testing Library;
- Playwright.

## Formatação/lint

- ESLint;
- Prettier.

---

# 8. Estrutura recomendada

```text
semantic-css-studio/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── routes/
│   │
│   ├── editor/
│   │   ├── EditorSidebar.tsx
│   │   ├── PropertyEditor.tsx
│   │   ├── TokenEditor.tsx
│   │   ├── ElementEditor.tsx
│   │   └── StateEditor.tsx
│   │
│   ├── preview/
│   │   ├── Preview.tsx
│   │   ├── PreviewFrame.tsx
│   │   ├── specimens/
│   │   │   ├── Overview.tsx
│   │   │   ├── Typography.tsx
│   │   │   ├── Forms.tsx
│   │   │   ├── Tables.tsx
│   │   │   ├── Content.tsx
│   │   │   ├── Code.tsx
│   │   │   └── KitchenSink.tsx
│   │
│   ├── theme/
│   │   ├── schema.ts
│   │   ├── defaults.ts
│   │   ├── store.ts
│   │   ├── presets/
│   │   └── migration.ts
│   │
│   ├── compiler/
│   │   ├── compileTheme.ts
│   │   ├── compileTokens.ts
│   │   ├── compileElements.ts
│   │   ├── compileResponsive.ts
│   │   └── minify.ts
│   │
│   ├── validators/
│   │   ├── contrast.ts
│   │   ├── accessibility.ts
│   │   └── css.ts
│   │
│   ├── export/
│   │   ├── exportCss.ts
│   │   ├── exportJson.ts
│   │   └── exportDemo.ts
│   │
│   └── shared/
│
├── tests/
├── public/
├── docs/
└── README.md

```

---

# 9. Modelo de dados

Criar um schema TypeScript formal.

Exemplo inicial:

```ts
interface Theme {
  schemaVersion: number;

  metadata: {
    name: string;
    description?: string;
    author?: string;
    version: string;
  };

  tokens: ThemeTokens;

  modes: {
    light: ThemeMode;
    dark?: ThemeMode;
  };

  elements: Record<string, ElementStyle>;

  responsive: ResponsiveConfig;
}

```

---

# 10. Design tokens

## 10.1 Cores

Suportar inicialmente:

```text
background
surface
surfaceAlt

text
textMuted

primary
primaryHover
primaryText

secondary

border

success
warning
danger

codeBackground
codeText

```

Não limitar o modelo para sempre a estes valores.

Permitir tokens adicionais posteriormente.

---

# 11. Tipografia

Tokens:

```text
fontBody
fontHeading
fontMono

fontSizeBase

fontSizeXs
fontSizeSm
fontSizeMd
fontSizeLg
fontSizeXl

lineHeightBody
lineHeightHeading

fontWeightNormal
fontWeightMedium
fontWeightBold

```

---

# 12. Espaçamento

Usar escala configurável:

```text
spaceXs
spaceSm
spaceMd
spaceLg
spaceXl
space2xl

```

---

# 13. Layout

Configurações globais:

```text
contentWidth
wideWidth

bodyPadding
sectionSpacing

headerWidth
footerWidth

```

Exemplo:

```css
main {
  max-width: var(--content-width);
  margin-inline: auto;
}

```

---

# 14. Border radius

Tokens:

```text
radiusSm
radiusMd
radiusLg
radiusFull

```

---

# 15. Sombras

```text
shadowSm
shadowMd
shadowLg

```

---

# 16. Element Style Model

Cada elemento HTML deve poder sobrescrever os tokens globais.

Exemplo:

```json
{
  "elements": {
    "article": {
      "background": "var(--surface)",
      "padding": "var(--space-lg)",
      "border": "1px solid var(--border)",
      "borderRadius": "var(--radius-md)"
    }
  }
}

```

O editor deve oferecer propriedades organizadas por grupos:

```text
Typography
Layout
Spacing
Background
Border
Radius
Shadow
Interaction

```

---

# 17. Elementos suportados no MVP

## Estrutura

```text
body
header
nav
main
section
article
aside
footer

```

## Tipografia

```text
h1
h2
h3
h4
h5
h6

p
a
strong
em
small
mark
del
ins

```

## Listas

```text
ul
ol
li
dl
dt
dd

```

## Conteúdo

```text
blockquote
hr

```

## Código

```text
code
pre
kbd

```

## Tabelas

```text
table
thead
tbody
tfoot
tr
th
td
caption

```

## Formulários

```text
form
fieldset
legend
label
input
textarea
select
option
button

```

## Mídia

```text
img
figure
figcaption

```

## Disclosure

```text
details
summary

```

---

# 18. Estados CSS

Suportar inicialmente:

```text
:hover
:focus
:focus-visible
:active
:disabled
:checked

```

Principalmente para:

```text
a
button
input
textarea
select
summary

```

A UI pode apresentar:

```text
Button
 ├─ Default
 ├─ Hover
 ├─ Focus
 ├─ Active
 └─ Disabled

```

---

# 19. Live Preview

A pré-visualização é parte central do produto.

Cada alteração feita no editor deve aparecer imediatamente.

Preferencialmente renderizar o conteúdo dentro de um `iframe` isolado.

Motivos:

- impedir que o CSS do editor afete o preview;
- impedir que o stylesheet sendo construído afete a interface;
- simular melhor uma página real.

Pipeline:

```text
theme state
    ↓
compile CSS
    ↓
inject into iframe <style>
    ↓
instant preview

```

---

# 20. Specimens

Criar diferentes páginas de demonstração.

## Overview

Visão resumida dos principais elementos.

## Typography

Mostrar:

```text
h1-h6
p
links
strong
em
mark
small
blockquote

```

## Content

Mostrar:

```text
article
section
aside
lists
figure
details

```

## Forms

Mostrar todos os tipos principais:

```text
text
email
password
number
search
date
checkbox
radio
select
textarea
button

```

Mostrar estados:

```text
normal
disabled
invalid
required

```

## Tables

Tabela com:

- caption;
- header;
- body;
- footer;
- números;
- textos longos.

## Code

Mostrar:

```html
<code>
<pre>
<kbd>

```

## Kitchen Sink

Uma única página contendo praticamente todos os elementos suportados.

Esta deve ser considerada o principal teste visual de integração do tema.

---

# 21. Responsive preview

Adicionar seletor:

```text
Desktop
Tablet
Mobile
Custom

```

Sugestões:

```text
Desktop: 1440 px
Tablet: 768 px
Mobile: 390 px

```

A viewport do preview deve poder ser redimensionada.

---

# 22. Dark mode

A aplicação deve suportar:

```text
Light
Dark
Auto

```

O tema pode conter:

```json
{
  "modes": {
    "light": {},
    "dark": {}
  }
}

```

O CSS gerado deve poder usar:

```css
@media (prefers-color-scheme: dark) {
  :root {
    ...
  }
}

```

Opcionalmente permitir também classes futuras como:

```css
[data-theme="dark"]

```

Mas isso não é prioridade no MVP.

---

# 23. Editor principal

Layout sugerido:

```text
┌─────────────────────────────────────────────────┐
│ Semantic CSS Studio       Preview  Export       │
├───────────────┬─────────────────────────────────┤
│               │                                 │
│ Global        │                                 │
│               │                                 │
│ Colors        │                                 │
│ Typography    │           LIVE PREVIEW          │
│ Spacing       │                                 │
│ Layout        │                                 │
│ Radius        │                                 │
│ Shadows       │                                 │
│               │                                 │
│ Elements      │                                 │
│               │                                 │
│ Body          │                                 │
│ Headings      │                                 │
│ Links         │                                 │
│ Article       │                                 │
│ Forms         │                                 │
│ Tables        │                                 │
│ ...           │                                 │
└───────────────┴─────────────────────────────────┘

```

---

# 24. Editor de propriedades

Evitar mostrar todas as propriedades CSS possíveis no primeiro MVP.

Criar um conjunto selecionado.

Por exemplo:

## Typography

```text
font-family
font-size
font-weight
line-height
letter-spacing
text-align
text-decoration
text-transform
color

```

## Spacing

```text
margin
margin-top
margin-right
margin-bottom
margin-left

padding
padding-top
padding-right
padding-bottom
padding-left

```

## Background

```text
background-color

```

## Border

```text
border-width
border-style
border-color
border-radius

```

## Layout

```text
display
width
max-width
min-height

```

## Shadow

```text
box-shadow

```

---

# 25. Controles visuais

Usar controles apropriados.

Cores:

```text
color picker
+
campo hexadecimal

```

Tamanhos:

```text
campo numérico
+
unidade

```

Unidades:

```text
px
rem
em
%
ch
vw
vh

```

Seleções:

```text
dropdown

```

Propriedades complexas:

```text
input textual avançado

```

---

# 26. Modo Simple e Advanced

Preparar arquitetura para dois níveis.

## Simple

Mostra apenas os controles principais.

## Advanced

Permite controlar propriedades mais específicas.

Pode não ser necessário implementar Advanced completamente no primeiro milestone.

---

# 27. CSS Compiler

Este é um módulo central e deve ser independente da UI.

Interface:

```ts
compileTheme(theme: Theme): string

```

Entrada:

```text
Theme

```

Saída:

```text
CSS válido

```

Exemplo:

```css
:root {
  --color-background: #ffffff;
  --color-text: #222222;
  --space-md: 1rem;
}

body {
  background: var(--color-background);
  color: var(--color-text);
}

article {
  padding: var(--space-lg);
}

```

---

# 28. Ordem determinística

O CSS deve sempre ser produzido na mesma ordem.

Sugestão:

```text
1. metadata comment
2. :root tokens
3. reset/base
4. document
5. typography
6. content
7. navigation
8. tables
9. forms
10. media
11. disclosure
12. states
13. responsive
14. dark mode

```

Isso facilita:

- comparação;
- Git diff;
- testes;
- manutenção.

---

# 29. CSS Reset

Não implementar um reset agressivo.

Adicionar somente uma base mínima, opcional.

Por exemplo:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

```

O usuário deve poder desligar a opção:

```text
Include minimal reset

```

---

# 30. Exportação

Botão:

```text
Export

```

Opções:

```text
CSS
Minified CSS
Theme JSON
Demo HTML
Complete package

```

O pacote completo pode produzir:

```text
my-theme/
├── theme.css
├── theme.min.css
├── theme.json
└── demo.html

```

---

# 31. Theme JSON

O JSON deve conter versão de schema:

```json
{
  "schemaVersion": 1
}

```

Isso será importante para futuras migrações.

Nunca alterar silenciosamente schemas antigos.

Criar mecanismo:

```ts
migrateTheme(theme)

```

---

# 32. Presets iniciais

Criar pelo menos:

```text
Minimal
Editorial
Documentation
Academic
Terminal

```

Não tentar criar dezenas inicialmente.

O importante é demonstrar que um mesmo HTML pode assumir aparências significativamente diferentes.

---

# 33. Undo / Redo

Implementar histórico de mudanças:

```text
Ctrl+Z
Ctrl+Shift+Z

```

O estado do tema deve suportar:

```text
past
present
future

```

Evitar salvar cada alteração de slider como dezenas de estados se isso prejudicar desempenho.

---

# 34. Autosave

Salvar automaticamente o tema atual em:

```text
localStorage

```

Deve existir:

```text
New Theme

```

e:

```text
Reset Theme

```

com confirmação antes de apagar alterações.

---

# 35. Importação

No MVP:

```text
Import theme.json

```

Validar schema.

Mostrar erros adequados.

Não aceitar JSON arbitrário sem validação.

---

# 36. Importação de CSS

Não implementar no MVP.

Preparar apenas documentação e arquitetura para um milestone futuro.

Problema futuro:

```text
CSS
 ↓
Parser
 ↓
CSS AST
 ↓
semantic selector mapping
 ↓
Theme model

```

Bibliotecas futuras possíveis:

```text
PostCSS
CSSTree

```

---

# 37. Accessibility Inspector

Começar simples.

## Contraste

Mostrar contraste entre:

```text
text / background
primary / background
button text / button background

```

Apresentar:

```text
Contrast ratio: 7.2:1
WCAG AA: PASS
WCAG AAA: PASS

```

## Focus

Detectar se elementos interativos possuem estilo para:

```text
:focus-visible

```

## Motion

Se futuramente forem adicionadas animações:

```css
@media (prefers-reduced-motion: reduce)

```

---

# 38. CSS validation

O compilador nunca deve gerar CSS inválido.

Criar testes de parsing para todos os presets.

Sempre que possível, processar o CSS gerado em um parser durante testes.

---

# 39. Não objetivos do MVP

Não implementar inicialmente:

- editor drag-and-drop;
- page builder;
- React component library;
- Bootstrap-like grid;
- Tailwind generator;
- backend;
- autenticação;
- cloud sync;
- multiplayer;
- marketplace;
- AI;
- importação automática de qualquer CSS;
- exportação Sass;
- exportação Less;
- plugins.

Essas funcionalidades podem diluir o conceito central.

---

# 40. Milestones

## Milestone 0 — Foundation

Objetivo:

criar arquitetura mínima.

Entregas:

- Vite;
- React;
- TypeScript;
- ESLint;
- Prettier;
- Vitest;
- Playwright;
- estrutura inicial;
- schema `Theme`;
- preset default;
- compilador mínimo;
- preview isolado.

Critério:

alterar uma cor no estado e observar a mudança no preview.

---

# Milestone 1 — Theme engine

Implementar:

- tokens;
- schema;
- store;
- persistência;
- compiler;
- CSS variables;
- light mode.

Suportar:

```text
colors
typography
spacing
radius
layout

```

Critério:

um `theme.json` deve compilar deterministicamente para CSS.

---

# Milestone 2 — Semantic specimens

Criar:

```text
Overview
Typography
Content
Forms
Tables
Code
Kitchen Sink

```

Critério:

todos os elementos do MVP devem aparecer pelo menos uma vez no Kitchen Sink.

---

# Milestone 3 — Visual editor

Implementar sidebar.

Editor para:

```text
Global
Colors
Typography
Spacing
Layout
Radius
Shadows

```

Alterações refletidas instantaneamente.

---

# Milestone 4 — Element editor

Permitir customizar:

```text
body
headings
links
article
aside
blockquote
code
table
button
input
details

```

Suportar overrides individuais.

---

# Milestone 5 — States

Adicionar edição de:

```text
hover
focus-visible
active
disabled
checked

```

---

# Milestone 6 — Dark mode

Adicionar:

```text
Light
Dark
Auto

```

Gerar corretamente media queries.

---

# Milestone 7 — Responsive preview

Adicionar:

```text
Desktop
Tablet
Mobile

```

e viewport customizável.

---

# Milestone 8 — Export

Adicionar:

```text
theme.css
theme.min.css
theme.json
demo.html

```

e pacote ZIP.

---

# Milestone 9 — Accessibility

Implementar:

- contraste;
- focus visibility;
- alertas básicos.

---

# Milestone 10 — Presets e refinamento

Criar:

```text
Minimal
Editorial
Documentation
Academic
Terminal

```

Refinar UX.

Adicionar documentação.

---

# 41. Milestones futuros

## Milestone 11 — CSS Importer

Importar CSS classless existente.

Exemplo:

```text
simple.css
water.css
custom.css

```

O parser deve tentar reconhecer seletores semânticos.

---

## Milestone 12 — Theme Gallery

Galeria local ou pública:

```text
theme
preview
author
license
tags

```

---

## Milestone 13 — Shareable themes

Um tema pode ser serializado em URL ou gist.

Não criar infraestrutura própria inicialmente.

---

## Milestone 14 — Plugin architecture

Permitir que extensões adicionem:

- tokens;
- elementos;
- validators;
- exporters.

---

# 42. Testes

## Unit tests

Cobrir:

```text
theme schema
theme migration
CSS compiler
token compiler
dark mode compiler
responsive compiler
contrast calculator

```

---

## Snapshot tests

Cada preset deve possuir snapshot do CSS gerado.

Exemplo:

```text
minimal.css.snapshot
editorial.css.snapshot

```

Alterações nesses snapshots devem ser revisadas conscientemente.

---

## UI tests

Testar:

```text
alterar cor
alterar font-size
trocar preset
trocar viewport
ativar dark mode
exportar CSS
importar JSON
undo
redo

```

---

## E2E

Fluxo essencial:

```text
open application
↓
choose preset
↓
change primary color
↓
change h1 font size
↓
switch dark mode
↓
export CSS
↓
verify exported CSS

```

---

# 43. Critérios de qualidade

## Código

- TypeScript strict;
- funções pequenas;
- módulos desacoplados;
- compiler independente da interface;
- sem dependências desnecessárias.

## CSS gerado

- legível;
- determinístico;
- sem propriedades redundantes;
- sem seletores específicos demais;
- preferir HTML semântico;
- CSS válido.

## UX

Toda edição deve ter feedback visual imediato.

---

# 44. Performance

Não fazer otimização prematura.

Entretanto:

- recompilar CSS deve ser rápido;
- evitar rerender completo da aplicação;
- debounce apenas quando necessário;
- preview deve permanecer responsivo.

O sistema deve lidar facilmente com themes de algumas centenas de regras.

---

# 45. Segurança

Como o preview pode futuramente receber HTML customizado:

- não executar JavaScript fornecido pelo usuário;
- usar iframe sandbox;
- sanitizar HTML externo;
- nunca usar `eval`.

No MVP, usar specimens internos, reduzindo significativamente a superfície de risco.

---

# 46. README inicial

O README deve começar com algo semelhante a:

```text
# Semantic CSS Studio

Design the HTML, not the classes.

Semantic CSS Studio is a visual editor for building portable,
classless CSS themes for semantic HTML.

Design typography, colors, spacing, forms, tables, articles and
other native HTML elements visually, preview the result instantly,
and export a standalone stylesheet.

No runtime.
No framework dependency.
No required utility classes.
Just HTML + CSS.

```

---

# 47. Filosofia

O projeto não deve tentar competir com Tailwind, Bootstrap ou Storybook.

Eles resolvem problemas diferentes.

Este projeto deve ocupar a interseção:

```text
Semantic HTML
      +
Classless CSS
      +
Visual Design Editor
      +
Design Tokens
      +
CSS Generator

```

A proposta é tornar possível:

```text
HTML semântico
      ↓
Visual styling
      ↓
Portable CSS

```

---

# 48. Exemplo de uso final

O usuário cria um tema e exporta:

```text
academic.css

```

Então utiliza:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="academic.css">
</head>

<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/docs">Documentation</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>Semantic CSS</h1>

      <p>
        This page requires no CSS classes.
      </p>

      <blockquote>
        HTML provides the structure. The theme provides the design.
      </blockquote>

      <details>
        <summary>Learn more</summary>
        <p>Everything is styled through semantic selectors.</p>
      </details>
    </article>
  </main>
</body>
</html>

```

Não deveria ser necessário escrever:

```html
class="container ..."

```

para obter uma página apresentável.

---

# 49. Definition of Done do primeiro release

O release `0.1.0` estará pronto quando:

1. o projeto puder ser executado localmente;
2. existirem pelo menos cinco presets;
3. tokens globais puderem ser editados visualmente;
4. pelo menos 30 elementos HTML forem demonstrados;
5. estilos específicos por elemento puderem ser modificados;
6. preview funcionar em tempo real;
7. light e dark mode funcionarem;
8. preview desktop/tablet/mobile funcionar;
9. CSS puder ser exportado;
10. JSON puder ser importado/exportado;
11. existir Kitchen Sink completo;
12. contraste básico for calculado;
13. compiler possuir testes;
14. presets possuírem snapshots;
15. o README explicar claramente o conceito;
16. o CSS exportado funcionar sem JavaScript e sem qualquer runtime do Semantic CSS Studio.

---

# 50. Instruções para implementação pelo LLM

Não implementar todos os milestones de uma vez.

Começar pelo Milestone 0 e avançar sequencialmente.

Antes de cada milestone:

1. inspecionar o estado atual do repositório;
2. revisar tipos e arquitetura existentes;
3. evitar duplicação;
4. implementar;
5. executar testes;
6. corrigir regressões;
7. atualizar documentação;
8. realizar commit lógico se estiver trabalhando com Git.

Não adicionar bibliotecas apenas por conveniência.

Evitar abstrações prematuras.

O `Theme` e o `CSS Compiler` devem permanecer independentes da camada React.

Um princípio arquitetural fundamental deve ser preservado durante todo o projeto:

```text
Theme model != UI
Theme model != CSS

Theme model
   ↓
compiler
   ↓
CSS

```

Isso permitirá no futuro:

```text
CLI
API
VS Code extension
theme gallery
CSS importer
AI generator

```

sem reescrever o núcleo.

---

# 51. Possível evolução estratégica

Depois de estabilizar o core, o projeto pode evoluir de simples editor para um pequeno ecossistema:

```text
                     Theme JSON
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
     Web Studio          CLI         VS Code
          │
          ▼
      CSS Compiler
          │
    ┌─────┼───────────────┐
    ▼     ▼               ▼
  CSS   Minified       Demo HTML
                         │
                         ▼
                    Theme Gallery

```

Nesse ponto o projeto deixa de ser apenas um editor CSS e passa a funcionar como uma infraestrutura para criação, armazenamento, compartilhamento e compilação de **semantic CSS themes**.