# Semantic CSS Studio

## 1. Overview

Build an open source web application for visual creation of CSS stylesheets aimed at **semantic HTML and classless CSS**.

The application should allow a person to visually configure:

- typography;
- colors;
- spacing;
- width and layout;
- borders;
- radii;
- shadows;
- links;
- headings;
- paragraphs;
- lists;
- tables;
- forms;
- buttons;
- code elements;
- blockquotes;
- images and figures;
- `article`;
- `aside`;
- `details`;
- navigation;
- interactive states;
- dark mode;
- responsiveness;

and immediately visualize these changes on a demo page.

Finally, the application should generate a standalone, portable CSS file that can be used directly on semantic HTML:

```html
<link rel="stylesheet" href="theme.css" />
```

The goal is not to generate React, Vue, or Web Components.

The goal is to generate **pure CSS**.

---

# 2. Core concept

The main idea of the project is:

> Your HTML is your design system.

Instead of building class-based interfaces like:

```html
<div class="card">
  <div class="card-header">...</div>
</div>
```

the stylesheet should favor:

```html
<article>
  <h2>Title</h2>
  <p>Content</p>
</article>
```

The application should produce CSS primarily for semantic selectors such as:

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

Helper classes may exist, but they should be optional.

---

# 3. Project goals

## 3.1 Primary objective

Create a visual editor for generating classless CSS frameworks or themes.

## 3.2 Secondary objectives

The tool should allow users to:

1. create a theme from scratch;
2. start from presets;
3. modify a theme visually;
4. visualize all changes in real time;
5. save the project in a structured format;
6. generate CSS;
7. generate minified CSS;
8. generate an HTML demo page;
9. support light mode and dark mode;
10. test responsiveness;
11. evaluate contrast and accessibility;
12. in the future import existing stylesheets.

---

# 4. Architecture principles

The project should follow these principles.

## 4.1 CSS as a compiled artifact

The primary source of the theme should not be the CSS file.

The primary source should be a structured model:

```text
theme.json

```

Example:

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

The CSS will be produced by a compiler:

```text
theme.json
     ↓
CSS compiler
     ↓
theme.css

```

This will allow generating different formats from the same theme in the future.

---

# 5. Conceptual architecture

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

# 6. MVP scope

The MVP should run entirely in the browser.

Do not use a backend in the first milestone.

All data should be kept locally.

Persistence:

- `localStorage`;
- JSON import;
- JSON export.

---

# 7. Recommended stack

Prefer a simple stack.

## Frontend

- TypeScript;
- React;
- Vite.

Alternatively, Svelte would also be suitable, but use React unless there is a concrete reason for another choice.

## State

Avoid Redux.

Use:

- Zustand;

or

- React Context + reducers;

if the structure remains simple.

## CSS of the editor itself

You may use CSS Modules, vanilla CSS, or a lightweight solution.

Do not confuse the application's internal CSS with the CSS being generated.

## Tests

- Vitest;
- React Testing Library;
- Playwright.

## Formatting/lint

- ESLint;
- Prettier.

---

# 8. Recommended structure

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

# 9. Data model

Create a formal TypeScript schema.

Initial example:

```ts
interface Theme {
  schemaVersion: number

  metadata: {
    name: string
    description?: string
    author?: string
    version: string
  }

  tokens: ThemeTokens

  modes: {
    light: ThemeMode
    dark?: ThemeMode
  }

  elements: Record<string, ElementStyle>

  responsive: ResponsiveConfig
}
```

---

# 10. Design tokens

## 10.1 Colors

Initially support:

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

Do not limit the model to these values forever.

Allow additional tokens later.

---

# 11. Typography

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

# 12. Spacing

Use a configurable scale:

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

Global settings:

```text
contentWidth
wideWidth

bodyPadding
sectionSpacing

headerWidth
footerWidth

```

Example:

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

# 15. Shadows

```text
shadowSm
shadowMd
shadowLg

```

---

# 16. Element Style Model

Each HTML element should be able to override the global tokens.

Example:

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

The editor should offer properties organized by groups:

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

# 17. Elements supported in the MVP

## Structure

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

## Typography

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

## Lists

```text
ul
ol
li
dl
dt
dd

```

## Content

```text
blockquote
hr

```

## Code

```text
code
pre
kbd

```

## Tables

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

## Forms

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

## Media

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

# 18. CSS states

Initially support:

```text
:hover
:focus
:focus-visible
:active
:disabled
:checked

```

Mainly for:

```text
a
button
input
textarea
select
summary

```

The UI may present:

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

The preview is a central part of the product.

Every change made in the editor should appear immediately.

Preferably render the content inside an isolated `iframe`.

Reasons:

- prevent the editor CSS from affecting the preview;
- prevent the stylesheet being built from affecting the interface;
- better simulate a real page.

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

Create different demo pages.

## Overview

Summary view of the main elements.

## Typography

Show:

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

Show:

```text
article
section
aside
lists
figure
details

```

## Forms

Show all main types:

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

Show states:

```text
normal
disabled
invalid
required

```

## Tables

Table with:

- caption;
- header;
- body;
- footer;
- numbers;
- long texts.

## Code

Show:

```html
<code>
  <pre></pre>
</code>
```

## Kitchen Sink

A single page containing practically all supported elements.

This should be considered the main visual integration test for the theme.

---

# 21. Responsive preview

Add a selector:

```text
Desktop
Tablet
Mobile
Custom

```

Suggestions:

```text
Desktop: 1440 px
Tablet: 768 px
Mobile: 390 px

```

The preview viewport should be resizable.

---

# 22. Dark mode

The application should support:

```text
Light
Dark
Auto

```

The theme may contain:

```json
{
  "modes": {
    "light": {},
    "dark": {}
  }
}
```

The generated CSS should be able to use:

```css
@media (prefers-color-scheme: dark) {
  :root {
    ...
  }
}

```

Optionally also allow future classes such as:

```css
[data-theme="dark"]

```

But this is not a priority for the MVP.

---

# 23. Main editor

Suggested layout:

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

# 24. Property editor

Avoid showing all possible CSS properties in the first MVP.

Create a curated set.

For example:

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

# 25. Visual controls

Use appropriate controls.

Colors:

```text
color picker
+
hex field

```

Sizes:

```text
numeric field
+
unit

```

Units:

```text
px
rem
em
%
ch
vw
vh

```

Selections:

```text
dropdown

```

Complex properties:

```text
advanced text input

```

---

# 26. Simple and Advanced modes

Prepare the architecture for two levels.

## Simple

Shows only the main controls.

## Advanced

Allows controlling more specific properties.

It may not be necessary to fully implement Advanced in the first milestone.

---

# 27. CSS Compiler

This is a central module and should be independent of the UI.

Interface:

```ts
compileTheme(theme: Theme): string

```

Input:

```text
Theme

```

Output:

```text
valid CSS

```

Example:

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

# 28. Deterministic order

The CSS should always be produced in the same order.

Suggestion:

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

This makes it easier to handle:

- comparison;
- Git diff;
- tests;
- maintenance.

---

# 29. CSS Reset

Do not implement an aggressive reset.

Add only a minimal, optional base.

For example:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

The user should be able to turn off the option:

```text
Include minimal reset

```

---

# 30. Export

Button:

```text
Export

```

Options:

```text
CSS
Minified CSS
Theme JSON
Demo HTML
Complete package

```

The complete package may produce:

```text
my-theme/
├── theme.css
├── theme.min.css
├── theme.json
└── demo.html

```

---

# 31. Theme JSON

The JSON should contain a schema version:

```json
{
  "schemaVersion": 1
}
```

This will be important for future migrations.

Never silently change old schemas.

Create a mechanism:

```ts
migrateTheme(theme)
```

---

# 32. Initial presets

Create at least:

```text
Minimal
Editorial
Documentation
Academic
Terminal

```

Do not try to create dozens initially.

The important thing is to demonstrate that the same HTML can take on significantly different appearances.

---

# 33. Undo / Redo

Implement a change history:

```text
Ctrl+Z
Ctrl+Shift+Z

```

The theme state should support:

```text
past
present
future

```

Avoid saving every slider change as dozens of states if that harms performance.

---

# 34. Autosave

Automatically save the current theme to:

```text
localStorage

```

There should be:

```text
New Theme

```

and:

```text
Reset Theme

```

with confirmation before discarding changes.

---

# 35. Import

In the MVP:

```text
Import theme.json

```

Validate the schema.

Show appropriate errors.

Do not accept arbitrary JSON without validation.

---

# 36. CSS import

Do not implement in the MVP.

Only prepare documentation and architecture for a future milestone.

Future problem:

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

Possible future libraries:

```text
PostCSS
CSSTree

```

---

# 37. Accessibility Inspector

Start simple.

## Contrast

Show contrast between:

```text
text / background
primary / background
button text / button background

```

Present:

```text
Contrast ratio: 7.2:1
WCAG AA: PASS
WCAG AAA: PASS

```

## Focus

Detect whether interactive elements have a style for:

```text
:focus-visible

```

## Motion

If animations are added in the future:

```css
@media (prefers-reduced-motion: reduce);
```

---

# 38. CSS validation

The compiler should never generate invalid CSS.

Create parsing tests for all presets.

Whenever possible, process the generated CSS with a parser during tests.

---

# 39. MVP non-goals

Do not initially implement:

- editor drag-and-drop;
- page builder;
- React component library;
- Bootstrap-like grid;
- Tailwind generator;
- backend;
- authentication;
- cloud sync;
- multiplayer;
- marketplace;
- AI;
- automatic import of any CSS;
- Sass export;
- Less export;
- plugins.

These features may dilute the core concept.

---

# 40. Milestones

## Milestone 0 — Foundation

Goal:

create a minimal architecture.

Deliverables:

- Vite;
- React;
- TypeScript;
- ESLint;
- Prettier;
- Vitest;
- Playwright;
- initial structure;
- `Theme` schema;
- default preset;
- minimal compiler;
- isolated preview.

Criterion:

change a color in the state and observe the change in the preview.

---

# Milestone 1 — Theme engine

Implement:

- tokens;
- schema;
- store;
- persistence;
- compiler;
- CSS variables;
- light mode.

Support:

```text
colors
typography
spacing
radius
layout

```

Criterion:

a `theme.json` should compile deterministically to CSS.

---

# Milestone 2 — Semantic specimens

Create:

```text
Overview
Typography
Content
Forms
Tables
Code
Kitchen Sink

```

Criterion:

all MVP elements should appear at least once in the Kitchen Sink.

---

# Milestone 3 — Visual editor

Implement sidebar.

Editor for:

```text
Global
Colors
Typography
Spacing
Layout
Radius
Shadows

```

Changes reflected instantly.

---

# Milestone 4 — Element editor

Allow customizing:

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

Support individual overrides.

---

# Milestone 5 — States

Add editing for:

```text
hover
focus-visible
active
disabled
checked

```

---

# Milestone 6 — Dark mode

Add:

```text
Light
Dark
Auto

```

Correctly generate media queries.

---

# Milestone 7 — Responsive preview

Add:

```text
Desktop
Tablet
Mobile

```

and customizable viewport.

---

# Milestone 8 — Export

Add:

```text
theme.css
theme.min.css
theme.json
demo.html

```

and ZIP package.

---

# Milestone 9 — Accessibility

Implement:

- contrast;
- focus visibility;
- basic alerts.

---

# Milestone 10 — Presets and refinement

Create:

```text
Minimal
Editorial
Documentation
Academic
Terminal

```

Refine UX.

Add documentation.

---

# 41. Future milestones

## Milestone 11 — CSS Importer

Import existing classless CSS.

Example:

```text
simple.css
water.css
custom.css

```

The parser should try to recognize semantic selectors.

---

## Milestone 12 — Theme Gallery

Local or public gallery:

```text
theme
preview
author
license
tags

```

---

## Milestone 13 — Shareable themes

A theme can be serialized into a URL or gist.

Do not create your own infrastructure initially.

---

## Milestone 14 — Plugin architecture

Allow extensions to add:

- tokens;
- elements;
- validators;
- exporters.

---

# 42. Tests

## Unit tests

Cover:

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

Each preset should have a snapshot of the generated CSS.

Example:

```text
minimal.css.snapshot
editorial.css.snapshot

```

Changes to these snapshots should be reviewed consciously.

---

## UI tests

Test:

```text
change color
change font-size
switch preset
switch viewport
enable dark mode
export CSS
import JSON
undo
redo

```

---

## E2E

Essential flow:

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

# 43. Quality criteria

## Code

- TypeScript strict;
- small functions;
- decoupled modules;
- compiler independent of the interface;
- no unnecessary dependencies.

## Generated CSS

- readable;
- deterministic;
- no redundant properties;
- no overly specific selectors;
- prefer semantic HTML;
- valid CSS.

## UX

Every edit should have immediate visual feedback.

---

# 44. Performance

Do not optimize prematurely.

However:

- recompiling CSS should be fast;
- avoid full application rerender;
- debounce only when necessary;
- preview should remain responsive.

The system should easily handle themes with a few hundred rules.

---

# 45. Security

Since the preview may receive custom HTML in the future:

- do not execute user-provided JavaScript;
- use sandboxed iframe;
- sanitize external HTML;
- never use `eval`.

In the MVP, use internal specimens, significantly reducing the risk surface.

---

# 46. Initial README

The README should start with something similar to:

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

# 47. Philosophy

The project should not try to compete with Tailwind, Bootstrap, or Storybook.

They solve different problems.

This project should occupy the intersection:

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

The idea is to make possible:

```text
Semantic HTML
      ↓
Visual styling
      ↓
Portable CSS

```

---

# 48. Final usage example

The user creates a theme and exports:

```text
academic.css

```

Then uses:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="academic.css" />
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

        <p>This page requires no CSS classes.</p>

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

It should not be necessary to write:

```html
class="container ..."
```

to get a presentable page.

---

# 49. Definition of Done for the first release

The `0.1.0` release will be ready when:

1. the project can be run locally;
2. there are at least five presets;
3. global tokens can be edited visually;
4. at least 30 HTML elements are demonstrated;
5. per-element styles can be modified;
6. preview works in real time;
7. light and dark mode work;
8. desktop/tablet/mobile preview works;
9. CSS can be exported;
10. JSON can be imported/exported;
11. there is a complete Kitchen Sink;
12. basic contrast is calculated;
13. compiler has tests;
14. presets have snapshots;
15. the README clearly explains the concept;
16. the exported CSS works without JavaScript and without any Semantic CSS Studio runtime.

---

# 50. Instructions for LLM implementation

Do not implement all milestones at once.

Start with Milestone 0 and advance sequentially.

Before each milestone:

1. inspect the current state of the repository;
2. review existing types and architecture;
3. avoid duplication;
4. implement;
5. run tests;
6. fix regressions;
7. update documentation;
8. make a logical commit if working with Git.

Do not add libraries just for convenience.

Avoid premature abstractions.

The `Theme` and the `CSS Compiler` should remain independent of the React layer.

A fundamental architectural principle should be preserved throughout the project:

```text
Theme model != UI
Theme model != CSS

Theme model
   ↓
compiler
   ↓
CSS

```

This will allow in the future:

```text
CLI
API
VS Code extension
theme gallery
CSS importer
AI generator

```

without rewriting the core.

---

# 51. Possible strategic evolution

After stabilizing the core, the project can evolve from a simple editor to a small ecosystem:

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

At that point the project is no longer just a CSS editor and starts working as an infrastructure for creating, storing, sharing, and compiling **semantic CSS themes**.
