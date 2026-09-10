# Handoff — Semantic CSS Studio, Foundation and Layers phases

This document exists so that an agent or person can take over the work without
having followed the previous session. Read it in full before touching anything.

## The project

Semantic CSS Studio is a visual editor that compiles a `Theme` object into a
portable classless CSS stylesheet, so that HTML is left free to deal only with
content. No runtime, no framework dependency in the exported CSS.

## Documents that rule

In this order of authority:

1. `docs/superpowers/specs/2026-09-08-css-editor-expansion-design.md` — the spec.
   It is the binding authority. Conflicts are resolved against it.
2. `docs/superpowers/plans/2026-09-08-fundacao-e-camadas.md` — the
   implementation plan, 10 tasks, 74 steps, with the complete code for each one.
   It is the argument of the spec, not the authority.
3. `.superpowers/sdd/2026-09-08-fundacao-e-camadas/progress.md` — the progress
   ledger. It says what is already done and what was decided along the way.
   **This directory is git-ignored**, so it only exists on this machine.

The plan covers phases 1 and 2 of the spec. Phases 3 through 6 (Scroll, exhaustive
property catalog, selectors with escape hatch, polishing) do not have a written
plan yet.

## Exact state right now

Working **directly on the `main` branch**, by explicit decision of the repository
owner. Clean return point: `git reset --hard cfa016f`.

| Commit                | What it is                                                                                                |
| --------------------- | --------------------------------------------------------------------------------------------------------- |
| `cfa016f`             | initial 0.1.5 snapshot, before any change                                                                 |
| `94d10c5`             | the spec                                                                                                  |
| `5b16008`             | the plan                                                                                                  |
| `75af78c`             | baseline fix: snapshot under jsdom + regeneration script                                                  |
| `b4feb1f`             | baseline fix: lint error in App.tsx                                                                       |
| `d2f8efe`             | pre-flight scan amendments to the plan (F1, F2, F3)                                                       |
| `11df414`             | **Task 1 complete**, reviewed and approved clean                                                          |
| `c1a0b73`             | Task 2 implemented — the review failed it                                                                 |
| `c098c95`             | Task 2, fix round 1: the `pendingAtRule` bug                                                              |
| `22e9323`             | plan fix + known minifier limitations                                                                     |
| `99231c3` … `297026a` | Tasks 3 through 6 (selector validator, v2 types, v1→v2 migration, the atomic swap)                        |
| `a0ae5f3`             | **Task 7**: `readStoredTheme` coverage via `migrateThemeV2` (implementation had already landed in Task 6) |
| `20ac9dc`             | **Task 8**: compiler emits `@layer` based on `:where()`                                                   |
| `79eaa9d`             | **Task 9**: `resetBaseRule` / `toggleBaseRule` / `isBaseRuleModified`                                     |
| `3bce51d`             | **Task 10**: base-layer panel + sidebar by group + `aria-current`                                         |

**Tasks 1 through 10 complete and green** (100 passed, 5 skipped, clean lint, OK build, e2e 3/3).

## Pitfalls already paid for — don't fall into them again

1. **`npx vite-node -e` does not exist.** That flag is not supported; the command
   prints the help and exits silently. To regenerate snapshots use
   `npx vite-node scripts/regenerate-snapshots.ts`. The plan has already been amended,
   but if you write a new command, remember this.

2. **The jsdom environment replaces the global `URL`.** `new URL('./x', import.meta.url)`
   inside a test resolves to `http://localhost:3000/...`, not to a
   file path, and the following `readFileSync` reads the wrong thing without
   complaining. Resolve test paths via `node:path` + `fileURLToPath`.
   This already broke the 6 preset tests once.

3. **Auditing the snapshot diff is the verification, not the regeneration.** Regenerating and
   committing without reading `git diff tests/snapshots/` verifies nothing. Tasks 1,
   6 and 8 say exactly how many and which categories of differences are
   expected. Any line beyond those is a regression.

4. **Task 6 is atomic on purpose.** Switching `Theme` to v2 breaks the
   typing of everything at the same time. Don't try to slice it: defaults, presets,
   compiler, store and both editors change together, with the codemod
   `scripts/migrate-presets.ts` doing the mechanical work. The compiler
   **keeps emitting flat CSS** in that task; `@layer` only comes in Task 8.

5. **The minifier has 5 known limitations, recorded as `it.skip`**
   at the end of `tests/minify.test.ts`, each with a comment explaining the
   mechanism. None is reachable by the current `compileTheme()` output, but
   three are on the roadmap path: `@font-face` (which the spec names as a
   gap to fill), CSS nesting (which may arrive via the free-selector
   field) and comments between tokens (reachable as soon as the exhaustive catalog
   allows typed values). The most serious is the last one — deleting a comment
   between two tokens fuses the two, turning a descendant selector into a
   type selector. **Resolve before delivering the property catalog.**

6. **Task 7 is not polishing, it is a blocker.** `readStoredTheme()` silently discards
   any `schemaVersion` other than 1. Without Task 7, Task 6
   makes every existing user lose their theme when opening the app.

## Working method

Each task: real TDD (test that fails first, with the failure output
recorded), minimal implementation, full green suite, clean `npm run lint`,
own commit. A task does not close without a review covering two separate
verdicts — compliance with the spec, and code quality.

Gates that hold for every task:

- `npm test` — entire suite green
- `npm run lint` — no errors
- `npm run build` — compiles
- the compiler (`src/compiler/**`) does not import React nor use browser APIs
- Generated CSS is deterministic: same theme, same bytes

## Architecture decisions already agreed with the repository owner

Do not reopen these without asking:

- Property coverage: exhaustive and flat, navigated by search.
- Selectors: variant catalog as the main path, plus a free
  selector field as escape hatch.
- Scroll: complete system — bar, behavior, anchors and snap.
- Exported CSS: `@layer` plus `:where()`, with editable base rules.
- `Theme` shape: maps per layer.
- Property catalog: generated at build time from `mdn-data`.
