# Semantic CSS Studio

> **Design the HTML, not the classes.**

Semantic CSS Studio is a visual editor for building portable, classless CSS themes for semantic HTML. Design typography, colors, spacing, layout, forms, tables, articles, code, disclosure elements and interactive states visually, preview the result instantly, and export a standalone stylesheet.

**No runtime. No framework dependency in the exported theme. No required utility classes. Just HTML + CSS.**

## What the 0.1.1 release includes

- structured, versioned `theme.json` model;
- deterministic TypeScript CSS compiler independent from React;
- six presets: Minimal, Editorial, Documentation, Academic, Terminal and Simple.css;
- light and dark palettes plus automatic `prefers-color-scheme` output;
- token editors for colors, typography, spacing, layout, radii and shadows;
- Storybook-like selector catalog grouped by HTML domain, with isolated selector stories and per-element overrides;
- pseudo-state editing for `:hover`, `:focus`, `:focus-visible`, `:active`, `:disabled` and `:checked`;
- isolated live preview in a sandboxed `iframe`;
- Selector, Overview, Typography, Content, Forms, Tables, Code, All HTML and Kitchen Sink specimens;
- an **All HTML** catalog covering 100 visual/contextual content selectors, including text semantics, tables, forms, media, disclosure, ruby annotations and document landmarks;
- `− / +` steppers for numeric typography, spacing, radius, layout, viewport and size properties;
- select controls for finite CSS property choices such as `display`, `text-align`, `border-style`, `overflow`, `cursor` and `object-fit`;
- desktop, tablet, mobile and custom-width previews;
- basic WCAG contrast inspector and focus visibility check;
- undo/redo and browser-local autosave;
- schema-validated JSON import;
- exports for readable CSS, minified CSS, Theme JSON, demo HTML and a complete ZIP package;
- unit/snapshot tests plus an essential Playwright flow.

## Run locally

Requirements: Node.js 20+ (Node 22 recommended).

```bash
npm install
npm run dev
```

Then open the URL printed by Vite.

## Quality checks

```bash
npm run build
npm test
npm run lint
npm run format:check
```

For the browser flow, install the Chromium Playwright browser once and run:

```bash
npx playwright install chromium
npm run test:e2e
```

## Core architecture

The theme model is the source of truth. CSS is a compiled artifact:

```text
Visual editor
     ↓
Theme model (theme.json)
     ↓
Pure CSS compiler
     ↓
theme.css / theme.min.css / demo.html / ZIP
```

The compiler under `src/compiler/` has no React dependency. That boundary is intentional so the same core can later support a CLI, API, VS Code extension, theme gallery or importer.

## Exported usage

A generated theme is ordinary CSS:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="theme.css">
  </head>
  <body>
    <main>
      <article>
        <h1>Semantic CSS</h1>
        <p>This page needs no CSS utility classes.</p>
      </article>
    </main>
  </body>
</html>
```

The generated CSS supports OS dark mode through `prefers-color-scheme`. A host page can also force a mode with `data-theme="light"` or `data-theme="dark"` on `<html>`.

## Project layout

```text
src/
├── app/          application shell and export/import controls
├── compiler/     pure deterministic Theme → CSS compiler
├── editor/       visual token, element, state and accessibility editors
├── export/       CSS/JSON/HTML/ZIP exporters
├── preview/      iframe preview and semantic specimens
├── theme/        schema, defaults, presets, migration and state/history
└── validators/   contrast checks

tests/
├── compiler / migration / contrast / specimen tests
├── preset CSS snapshots
└── e2e/          Playwright essential flow
```

## Privacy and storage

The MVP has no backend. Current theme state is saved in `localStorage`. Import/export happens in the browser.

## Security model

Preview content is internal and rendered in a sandboxed iframe. The MVP does not execute user-provided JavaScript, use `eval`, or import arbitrary HTML/CSS.

## Scope

Semantic CSS Studio is **not** a page builder, Tailwind generator, Bootstrap replacement or React component library. Its niche is the intersection of semantic HTML, classless CSS, design tokens, visual editing and portable CSS generation.

See [`docs/SPEC.md`](docs/SPEC.md) for the full product specification and [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for implementation notes.


### Recent refinements

- click-to-select in the preview pane;
- portable font stack dropdowns and font pairings;
- consistent − / + controls for continuous numeric values;
- fixed clear-button layout next to steppers.


### Element-aware controls and shadows

The element inspector uses curated property profiles instead of showing the same generic CSS form for every tag. For example, `blockquote` exposes its inline-start accent border, while `progress` and `meter` expose track/value colors with cross-browser pseudo-element rules.

The Shadows panel includes structured X/Y/blur/spread/inset controls, a live sample for every shadow token, usage information, and a raw CSS fallback for advanced multi-layer shadows.
