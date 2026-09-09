# Architecture

## Invariants

1. `Theme` is the canonical source format.
2. `Theme` does not depend on React.
3. The compiler does not depend on React or browser APIs.
4. Generated CSS is deterministic: same theme, same bytes.
5. Exported CSS works without Semantic CSS Studio or JavaScript.
6. Schema versions are explicit and imports are validated before entering editor state.

## Theme model

`src/theme/schema.ts` defines the versioned model. It separates:

- metadata;
- design tokens;
- light/dark modes;
- semantic element overrides;
- interactive pseudo-state overrides;
- responsive breakpoints;
- compiler options.

The state store adds editing history and UI state, but those are not serialized into the Theme artifact.

## Compiler pipeline

`compileTheme(theme)` emits blocks in stable order:

1. metadata comment;
2. `:root` variables;
3. minimal reset/base rules;
4. semantic element rules;
5. pseudo-state rules;
6. responsive rules;
7. manual and automatic dark-mode variables.

Properties are emitted alphabetically inside each rule. Semantic selectors follow a fixed domain order, and unknown future selectors are appended alphabetically.

## Preview isolation

The preview is an `iframe` using `srcDoc` and internal specimens. The generated stylesheet is injected into the frame, so editor chrome and user theme CSS cannot collide.

## Persistence and history

The current `Theme` is saved to `localStorage`. Undo/redo keeps bounded snapshots of the Theme only. Preview selection, sidebar selection and viewport are transient UI state.

## Export boundary

Exporters consume a `Theme` and compiler output. The package exporter creates:

```text
<theme-name>/
├── theme.css
├── theme.min.css
├── theme.json
├── demo.html
└── README.txt
```

## Future extensions

Because the compiler and theme model are UI-independent, future work can add a CLI, CSS importer, VS Code extension, gallery or API without replacing the core model.
