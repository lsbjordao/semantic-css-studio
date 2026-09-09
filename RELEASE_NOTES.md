## 0.1.5

- replaced raw-only shadow token editing with a structured visual shadow editor;
- added −/+ controls for X, Y, blur and spread;
- added inset and color controls plus raw CSS fallback for complex/multi-layer shadows;
- added live shadow samples and token usage information;
- added explicit `--shadow-sm`, `--shadow-md` and `--shadow-lg` samples to the All HTML specimen;
- element `box-shadow` overrides now use the same structured editor;
- selector-specific property profiles now expose relevant controls such as blockquote start-border color and progress/meter track/value colors.

## 0.1.4

### Test infrastructure fixes

- Vitest now collects only `tests/**/*.test.{ts,tsx}`, keeping Playwright E2E specs out of the unit-test runner.
- Preset snapshots are now stored as raw `.css` reference files instead of relying on Vitest's string snapshot serialization format.
- All six preset reference CSS files were verified byte-for-byte against `compileTheme()`.
- E2E expectations were updated for the non-disruptive selector workflow introduced in 0.1.3.
- Preview click-to-select no longer relies on cross-realm `instanceof Element`, fixing iframe element selection in real browsers.

## 0.1.3

- removed iframe reloads during live theme editing; compiled CSS is now injected into the existing preview document;
- numeric, color and other theme edits preserve the preview scroll position and no longer flash the content;
- clicking an element in the preview now selects its editor without forcing the Selector story;
- choosing a selector in the Elements catalog also keeps All HTML/Kitchen Sink in place; `Open story` is now the explicit way to switch to the isolated selector story;
- light/dark/auto changes are applied in place;
- selector highlighting is updated in place without rebuilding the preview.


## 0.1.2

- fixed the clear (×) button overlap on numeric steppers;
- added portable font stack selectors and one-click font pairings;
- added preview click-to-select so clicking an element opens its selector editor;
- preserved − / + controls for continuous numeric values, including font and spacing tokens.

# Release notes

## 0.1.1

Visual catalog and control-surface refinement.

### Highlights

- Added an editable **Simple.css** preset based on the current upstream classless stylesheet, with MIT attribution.

- expanded the preview into an **All HTML** catalog with 100 visual/contextual body selectors;
- added a Storybook-like **Selector stories** browser grouped by Document, Headings, Text, Lists, Code, Tables, Forms, Media, Interactive and Semantics;
- selecting a tag such as `<h1>`, `<table>`, `<input>`, `<dialog>` or `<ruby>` opens an isolated story for that selector;
- contextual/non-box elements such as `<source>`, `<track>` and `<area>` are shown inside the parent element where their behavior can be understood;
- added `− / +` steppers for numeric CSS values across typography, spacing, radius, layout, element sizing, interaction-state offsets and custom viewport width;
- added finite-value dropdowns for CSS properties with well-known choices (`display`, `text-align`, `text-transform`, `border-style`, `overflow`, `cursor`, `object-fit`, etc.);
- exported `demo.html` now uses the expanded full HTML catalog;
- expanded Kitchen Sink coverage from the MVP subset to the 100-selector visual catalog.

### Scope note

Metadata and non-rendering document elements such as `meta`, `title`, `link`, `script` and `template` are not presented as visual stories because they do not produce a meaningful box that can be inspected in a content preview.

## 0.1.0

First complete MVP release of Semantic CSS Studio.

### Highlights


- visual editing of global design tokens;
- semantic element and pseudo-state overrides;
- five substantially different presets;
- isolated live preview with seven specimen pages;
- responsive viewport simulation;
- light/dark/automatic color modes;
- deterministic plain-CSS compiler;
- local autosave plus undo/redo;
- Theme JSON import/export with schema validation;
- CSS, minified CSS, demo HTML and ZIP package exports;
- WCAG contrast and focus checks;
- compiler, migration, contrast, Kitchen Sink and preset snapshot tests;
- Playwright essential editing flow.

### Architecture promise

`Theme` remains independent from React and generated CSS remains independent from Semantic CSS Studio. This release intentionally avoids backend, authentication, cloud sync, page-builder behavior and CSS importing.
