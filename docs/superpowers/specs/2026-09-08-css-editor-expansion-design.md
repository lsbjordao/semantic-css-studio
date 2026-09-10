# Editor expansion: exhaustive properties, open selectors, layers and scroll

Date: 2026-09-08
Status: approved for planning

## Goal

Make Semantic CSS Studio capable of producing a complete standardized CSS for
semantic HTML, so that the document is left free to deal only with
content. This requires three fundamental changes on top of version 0.1.5:

1. every CSS property accessible for any selector, navigated by search;
2. a selector model that goes beyond the bare tag — cataloged variants plus a
   free field;
3. scroll styling as a first-class feature, nonexistent today.

The exported CSS now comes out in layers (`@layer`) with the base rules in
`:where()`, so that the theme works as a floor and never as a ceiling for whoever
consumes it.

## Decisions

| Axis              | Decision                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| Property coverage | Exhaustive and flat: every property available for every selector, grouped by family, navigated by search |
| Selector model    | Variant catalog as the main path + free selector field as escape hatch                                   |
| Scroll            | Complete system: bar, behavior, anchors and snap                                                         |
| Exported CSS      | `@layer` + `:where()`, with editable base rules                                                          |
| `Theme` shape     | Maps per layer (`layers.base/elements/states/responsive`)                                                |
| Catalog source    | Generated at build time from `mdn-data`, versioned artifact                                              |

## Current state and gaps

What is already correct and must be preserved: the `Theme` →
`compileTheme()` → CSS separation, with the compiler free of React and browser
APIs (`docs/ARCHITECTURE.md`, invariants 1–6); and the CSS injection into
`<style id="studio-theme">` instead of recreating the `srcDoc`
(`src/preview/PreviewFrame.tsx`), which gives flicker-free preview with no loss of
scroll position.

The gaps motivating this work:

- `src/editor/elementProfiles.ts` is a hand-written whitelist of about 50 properties.
  Entire families are missing: positioning, grid, flex item,
  `background-*` beyond color, advanced text, multi-column, lists, tables,
  transitions, transforms, filters, individual borders and radii, and scroll.
- `Theme.elements` only accepts a bare tag. There are no pseudo-elements, attribute
  selectors or combinators. Zebra striping (`tbody tr:nth-child(even)`) — one
  of the most common requests in a classless theme — is inexpressible.
- `src/editor/StateEditor.tsx` pins 7 elements, 6 pseudo-classes and 9
  properties. Missing: `:visited`, `:target`, `:invalid`, `:required`,
  `:placeholder-shown`, `:read-only`, `:indeterminate`, `:open` and the
  `:nth-child` variants.
- Scroll is entirely absent. There is a loose `scrollBehavior: 'smooth'` in
  `src/theme/presets/index.ts:322`, with no `prefers-reduced-motion` to switch it off.
- `baseRules()` in `src/compiler/compileTheme.ts` injects about 11
  invisible and non-editable rules. `responsiveRules()` overwrites
  `--body-padding` and `--section-spacing` with fixed literals, silently discarding
  the value configured by the user.
- `tokenName()` is a chain of thirty mostly no-op `.replace()` calls; a
  new color token outside the list comes out as `--accent` instead of
  `--color-accent`.
- `src/theme/store.ts` writes the entire theme to `localStorage` on every `set()`,
  including on purely UI changes, with no debounce and no handling of
  `QuotaExceededError`.
- `readStoredTheme()` silently discards any `schemaVersion !== 1`
  without using the `migrateTheme()` that exists next to it.
- `minifyCss()` is regex over string; it corrupts as soon as `content`, gradients
  and `url(data:…)` become accessible.

## Architecture

### `Theme` v2

```ts
export const SCHEMA_VERSION = 2

export type CssPropertyMap = Record<string, string> // camelCase → valor CSS bruto
export type RuleMap = Record<string, CssPropertyMap> // seletor → declarações

export interface ThemeLayers {
  base: RuleMap // emitido dentro de :where(), especificidade 0
  elements: RuleMap // tags, variantes do catálogo, seletores livres
  states: RuleMap // regras com pseudo-classe
  responsive: Record<string, RuleMap> // chave do breakpoint → regras
}

export interface Theme {
  schemaVersion: 2
  metadata: {
    name: string
    description?: string
    author?: string
    version: string
  }
  tokens: ThemeTokens // ganha o grupo `scroll`
  modes: { light: ThemeMode; dark?: ThemeMode }
  layers: ThemeLayers
  breakpoints: Record<string, number> // substitui `responsive`
  options: {
    includeMinimalReset: boolean
    reducedMotion: boolean // padrão: true
  }
}
```

The keys of `layers.responsive` correspond exactly to the keys of
`breakpoints`. A breakpoint with no associated rules is valid; a key in
`layers.responsive` with no matching breakpoint is a validation error and is
rejected on import.

The keys of `CssPropertyMap` are camelCase property names, and the existing
`kebab()` function already converts vendor-prefixed properties correctly,
because a leading uppercase letter becomes a leading hyphen
(`WebkitLineClamp` → `-webkit-line-clamp`). Custom properties are the
exception to this rule: they are stored literally, starting with `--`, and emitted without
any transformation.

`layers.base` is born populated with exactly the rules currently hardcoded in
`compileTheme.ts`, so that the default output stays visually identical,
only now visible and editable. `layers.responsive` is born with the
`responsiveRules()` rules, with the literals `1rem`, `2rem`, `0.8rem` and `2.5rem`
replaced by new tokens, which fixes the silent overwrite without
changing the default appearance. The new tokens go into the existing groups:
`bodyPaddingSm` (1rem, on tablet), `bodyPaddingXs` (0.8rem, on mobile) and
`sectionSpacingSm` (2rem, on tablet) in `LayoutTokens`; `space2xlXs` (2.5rem,
on mobile) in `SpacingTokens`. The suffix is strict: `Sm` marks a tablet
override, `Xs` marks a mobile override.

### Scroll tokens

```ts
export interface ScrollTokens {
  scrollbarWidth: string // auto | thin | none
  scrollbarSize: string // largura/altura das partes WebKit
  scrollbarTrack: string
  scrollbarThumb: string
  scrollbarThumbHover: string
  scrollbarRadius: string
  scrollbarGutter: string // auto | stable | stable both-edges
  scrollBehavior: string // auto | smooth
  scrollPaddingTop: string // âncoras sob header sticky
  overscrollBehavior: string
}
```

### Compiler

Emission order:

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

Tokens live in `@layer base` on `:root` with normal specificity, so that
a `:root { --color-primary: red }` without a layer, written by whoever consumes the
theme, always wins. The reduced-motion block stays outside any layer
because it is an accessibility decision that must not be accidentally overridable.

Determinism preserved: selectors ordered by canonical domain order for
known tags and `localeCompare` for the rest; declarations in alphabetical
order within each rule.

### Scrollbar compatibility

On Chrome 121 and above, setting `scrollbar-color` disables the
`::-webkit-scrollbar` pseudo-elements. Emitting both side by side therefore
loses the rich parts. The correct output gives the parts to Chromium/WebKit and the
standard properties to those without them — and only `scrollbar-color` and
`scrollbar-width` go into the conditional block, because the remaining scroll
properties are standard in every engine and go ungated in the same rule:

```css
@layer base {
  :where(html) {
    scrollbar-gutter: var(--scrollbar-gutter);
    scroll-behavior: var(--scroll-behavior);
    scroll-padding-top: var(--scroll-padding-top);
    overscroll-behavior: var(--overscroll-behavior);
  }

  :where(html)::-webkit-scrollbar {
    width: var(--scrollbar-size);
    height: var(--scrollbar-size);
  }
  :where(html)::-webkit-scrollbar-track {
    background: var(--scrollbar-track);
  }
  :where(html)::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: var(--scrollbar-radius);
  }
  :where(html)::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-thumb-hover);
  }

  @supports not selector(::-webkit-scrollbar) {
    :where(html) {
      scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
      scrollbar-width: var(--scrollbar-width);
    }
  }
}
```

The same parts are available per selector in the catalog, not only on
`html`: `pre`, `table`, `dialog`, `textarea`, `aside` and free selectors.

### Reduced motion

Emitted by default, controlled by `options.reducedMotion`:

```css
@media (prefers-reduced-motion: reduce) {
  :where(html) {
    scroll-behavior: auto;
  }
  :where(*, *::before, *::after) {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Structural fixes in the compiler

- `tokenName()` stops being a chain of `.replace()` calls and becomes a
  per-token-group prefix map, so that a new token never comes out with the wrong
  name. The per-group prefixes are: `colors` gets `color-`; `typography`,
  `spacing`, `radius`, `shadow` and `layout` keep the kebab of the key itself, which
  already carries the prefix (`fontSizeBase` → `--font-size-base`, `spaceMd` →
  `--space-md`); `scroll` also keeps the kebab of the key, because the keys already
  start with `scrollbar`, `scroll` or `overscroll` (`scrollbarThumbHover` →
  `--scrollbar-thumb-hover`, `overscrollBehavior` → `--overscroll-behavior`).
- `minifyCss()` stops being regex and becomes a small tokenizer (~60
  lines, pure, dependency-free) that respects strings, comments and `url()`.
- Two-layer selector validation: in the app, `document.querySelector` inside
  `try/catch`, at edit time; in the compiler, a pure function with a
  restricted grammar, used on import, so as not to violate the invariant that
  the compiler does not use browser APIs. A selector containing a class or id is accepted
  with a warning, not blocked — it goes against the classless premise, but the decision belongs to
  whoever uses it.

## Interface

### Generated property catalog

`scripts/generate-css-properties.ts`, run at build time, with the artifact
versioned at `src/editor/cssProperties.generated.ts`:

- reads `mdn-data/css/properties.json` (devDependency) and discards
  `status: "obsolete"`;
- stores per property: name, syntax, initial value, whether it inherits, and group;
- derives the control from the syntax — only `<color>` produces a color picker;
  `<length>`, `<length-percentage>` and `<number>` produce a stepper; a closed
  set of keywords without `<…>` produces a select; the rest produces a text field.

Alongside it, `src/editor/propertyOverrides.ts`, hand-written and small: better
labels and rich controls where automatic derivation is not enough —
`box-shadow` and `text-shadow` in the existing shadow editor, `font-family` in the
font stack, `transition` in a dedicated builder.

The MDN groups are remapped into twelve families: Layout, Box and
spacing, Typography, Color and background, Border, Effects and filters, Transitions and
animations, Scroll, Tables, Lists and counters, Generated content, and
Interactivity and forms. The Scroll family does not exist in MDN: it collapses
CSSOM View (`scroll-behavior`), CSS Scrollbars (`scrollbar-*`), CSS Scroll Snap
(`scroll-snap-*`) and CSS Overscroll Behavior (`overscroll-behavior`).

The generated dataset is loaded via dynamic `import()` on first opening of the
elements panel, so that the initial bundle does not grow.

### Elements panel inversion

With hundreds of properties, the catalog cannot occupy the top. The hierarchy
becomes:

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

`src/editor/ElementEditor.tsx` today is 100 lines doing three things. It becomes
`src/editor/elements/` with `SelectorPicker`, `SelectorVariants`,
`CustomSelectorField`, `DefinedProperties`, `PropertySearch`,
`PropertyFamilies` and `PropertyControl`; the orchestrator stays at about 60
lines.

### Selector variants as data

`src/editor/selectorVariants.ts`. The `layer` field on each variant is what
determines, with no conditional scattered through the code, which layer that editor
writes to:

```ts
{ tag: 'input', variants: [
  { suffix: '[type="checkbox"]',      label: 'Checkbox',             layer: 'elements' },
  { suffix: '::placeholder',          label: 'Texto do placeholder', layer: 'elements' },
  { suffix: '::file-selector-button', label: 'Botão de arquivo',     layer: 'elements' },
  { suffix: ':invalid',               label: 'Inválido',             layer: 'states' },
  { suffix: ':placeholder-shown',     label: 'Vazio',                layer: 'states' },
]}
```

Three variant sources add up for each tag:

- **universal** — `::before`, `::after`, `::selection`, `::first-line`,
  `::first-letter`, `:hover`, `:focus-visible`, `:target`, `:first-child`,
  `:last-child`, `:nth-child(even)`, `:nth-child(odd)`, and the scrollbar
  parts on scrollable elements;
- **tag-specific** — the `input` block above, `::marker` on `li`,
  `::backdrop` on `dialog`, `:open` on `details`;
- **contextual** — about twenty combinators that a classless theme
  effectively needs, grouped under "Context": `tbody tr:nth-child(even)`,
  `pre > code`, `li > ul`, `h2 + p`, `thead th`, `article > :first-child`.

Below the catalog sits the free selector field, validated in real time.

### Sidebar

The `slice(0,6)` / `slice(6)` in `src/editor/EditorSidebar.tsx` is replaced by
explicit grouping declared in the data:

```
TOKENS     Cores · Tipografia · Espaçamento · Layout · Raios · Sombras · Scroll
REGRAS     Base · Elementos · Estados · Responsivo
CHECAGEM   Acessibilidade
```

The **Scroll** section has two halves: the global tokens, with a scrollable sample
inside the panel itself — needed to see the thumb while dragging the
color, without depending on the preview; and the per-selector part, listing which elements
receive bar treatment, plus `scroll-margin-top` and `scroll-padding-top`
with a hint explicitly linking to the sticky-header-with-anchors case.

The **Base** section lists the seeded `:where()` rules, each editable, with
"restore default" and an option to switch off, under a warning that they are zero
specificity.

### Preview

New **Scroll** specimen: long content, sticky header, summary with anchors
to verify `:target`, `pre` and `table` overflowing horizontally, `dialog`
and `textarea`. The toolbar gains a _force visible scrollbars_ button — without it,
macOS hides the bars via overlay and the user cannot see what they are
styling.

## Migration v1 → v2

`src/theme/migration.ts` stops merely validating and rejecting, and starts migrating.
The state flattening is lossless:

```
tokens.scroll     = defaults
layers.base       = seedBaseRules()
layers.elements   = v1.elements
layers.states     = flatten(v1.states)     // {a:{hover:{…}}} → {"a:hover":{…}}
layers.responsive = seedResponsiveRules(v1.responsive)
breakpoints       = v1.responsive
options.reducedMotion = true
```

`readStoredTheme()` in `src/theme/store.ts` now routes the
`localStorage` content through `migrateTheme()` instead of silently discarding it.

The six presets are v1 literals in `src/theme/presets/index.ts`. The migration is
run a single time via codemod and the v2 literals are committed, instead of
migrating at runtime: the presets stay readable, with no load cost, and the
snapshots are regenerated.

## Error handling

| Where                 | Today                                           | Becomes                                                                                                                |
| --------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `store.ts` autosave   | `setItem` unguarded, on every `set()`           | `try/catch` with `QuotaExceededError` and "autosave paused" toast; 400 ms debounce; subscribes only to `theme`         |
| `Topbar.tsx`          | `alert()` and `confirm()`                       | existing toast system and `<dialog>` confirmation                                                                      |
| Import                | one string in `alert`                           | per-field error, in the interface                                                                                      |
| Invalid free selector | does not exist                                  | inline error; the rule is not written                                                                                  |
| Unknown property      | does not exist                                  | accepted, since CSS is forgiving, and marked "unrecognized" — necessary because the catalog always lags behind new CSS |
| Export popover        | no Escape, no click-outside, no `aria-expanded` | all three                                                                                                              |

## Tests

The highest-value test is the new minifier's: it is exactly where the current regex
breaks as soon as `content`, gradients and `url(data:…)` become accessible.
Beyond it:

- compiler — layer order, `:where()` on the base, the
  `@supports not selector(::-webkit-scrollbar)` gate, presence and absence of the
  reduced-motion block, and determinism verified by compiling twice;
- migration — v1-to-v2 fixture, focused on state flattening, and the
  `localStorage` recovery path;
- selector validator — table of valid, invalid and class-warning
  cases;
- generated catalog — test that regenerates and compares, so that the
  versioned artifact cannot diverge from the generator;
- control derivation — sample of properties against the expected type;
- snapshots of the six presets, regenerated in v2;
- E2E — set a bar color and see it in the exported CSS; use the free selector;
  anchor with `scroll-margin`.

## Phasing

Six phases, each independently deliverable:

1. **Foundation** — v2 schema, migration, `tokenName` as map, new minifier,
   `readStoredTheme` via migration, regenerated presets. Nothing changes for the user.
2. **Layers** — `@layer` and `:where()` in the compiler, editable Base section.
3. **Scroll** — tokens, compiler, Scroll section, specimen, reduced motion,
   `@media print`.
4. **Property catalog** — generator, dataset, panel inversion, search.
5. **Selectors** — cataloged variants, context, escape hatch, splitting
   `ElementEditor`.
6. **Polishing** — autosave, toasts, data-driven sidebar, popover
   accessibility.

Phase 3 does not depend on Phases 4 and 5. Within Phase 3, `scroll-snap-*` is the
lowest-value piece for a document theme; it is included for being part of the complete
system, but it is the last to be implemented and the first to go if scope
tightens.

## Out of scope

Backend, authentication, cloud sync, page-builder behavior and
importing existing CSS stay out of scope, per the
architectural promise of version 0.1.0. Invariants 1 through 6 of `docs/ARCHITECTURE.md`
remain valid unchanged.
