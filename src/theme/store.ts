import { create } from 'zustand'
import { isIconLibraryId, type IconLibraryId } from '../icons/types'
import { seedBaseRules } from './baseRules'
import { defaultTheme } from './defaults'
import { presets, type PresetName } from './presets'
import { migrateThemeV2 } from './migration'
import type {
  ColorTokenKey,
  CssPropertyMap,
  FontRole,
  InteractionState,
  QuartoSidebarTone,
  RuleMap,
  Theme,
  ThemeFontFace,
  ThemeTokens,
} from './schema'

const STORAGE_KEY = 'semantic-css-studio/theme-v1'
const HISTORY_LIMIT = 60

export type LayerName = 'base' | 'elements' | 'states'
export type ThemeModeName = 'light' | 'dark'
export type PreviewMode = 'light' | 'dark' | 'auto'
export type ViewportName = 'desktop' | 'tablet' | 'mobile' | 'custom'
export type SpecimenName =
  | 'Selector'
  | 'Overview'
  | 'Typography'
  | 'Content'
  | 'Forms'
  | 'Tables'
  | 'Code'
  | 'All HTML'
  | 'Kitchen Sink'
export type EditorSection =
  | 'Colors'
  | 'Typography'
  | 'Spacing'
  | 'Layout'
  | 'Radius'
  | 'Shadows'
  | 'Icons'
  | 'Quarto'
  | 'Base'
  | 'Elements'
  | 'States'
  | 'Accessibility'

export type UiIconLibrary = Exclude<IconLibraryId, 'none'>

const UI_ICON_STORAGE_KEY = 'semantic-css-studio/ui-icon-library'

function readUiIconLibrary(): UiIconLibrary {
  try {
    const raw = localStorage.getItem(UI_ICON_STORAGE_KEY)
    if (raw && isIconLibraryId(raw) && raw !== 'none') return raw
  } catch {
    // localStorage unavailable (SSR/tests): fall back to the default.
  }
  return 'lucide'
}

interface StudioState {
  theme: Theme
  past: Theme[]
  future: Theme[]
  presetName: string
  editMode: ThemeModeName
  previewMode: PreviewMode
  viewport: ViewportName
  customWidth: number
  specimen: SpecimenName
  section: EditorSection
  selectedElement: string
  selectedState: InteractionState
  notice: string | null
  uiIconLibrary: UiIconLibrary
  updateMetadata: (
    key: 'name' | 'version' | 'description',
    value: string,
  ) => void
  setColor: (key: ColorTokenKey, value: string) => void
  setToken: <K extends Exclude<keyof ThemeTokens, 'colors'>>(
    category: K,
    key: keyof ThemeTokens[K],
    value: string,
  ) => void
  setLayerProperty: (
    layer: LayerName,
    selector: string,
    property: string,
    value: string,
  ) => void
  removeLayerProperty: (
    layer: LayerName,
    selector: string,
    property: string,
  ) => void
  setFontFace: (
    role: FontRole,
    face: ThemeFontFace | null,
    stack?: string,
  ) => void
  setIconLibrary: (library: IconLibraryId) => void
  setQuartoSidebarTone: (tone: QuartoSidebarTone) => void
  setUiIconLibrary: (library: UiIconLibrary) => void
  resetBaseRule: (selector: string) => void
  toggleBaseRule: (selector: string, enabled: boolean) => void
  setElementTargets: (
    targets: Array<{ selector: string; property: string }>,
    value: string,
  ) => void
  setReset: (enabled: boolean) => void
  setEditMode: (mode: ThemeModeName) => void
  setPreviewMode: (mode: PreviewMode) => void
  setViewport: (viewport: ViewportName) => void
  setCustomWidth: (width: number) => void
  setSpecimen: (specimen: SpecimenName) => void
  setSection: (section: EditorSection) => void
  setSelectedElement: (element: string) => void
  setSelectedState: (state: InteractionState) => void
  applyPreset: (name: PresetName) => void
  importTheme: (theme: Theme) => void
  newTheme: () => void
  resetTheme: () => void
  undo: () => void
  redo: () => void
  clearNotice: () => void
}

// The key keeps the `-v1` suffix on purpose: renaming it would orphan the
// theme the user already has saved. Content goes through `migrateThemeV2`, so
// a v1 theme written before this version is upgraded instead of discarded.
function readStoredTheme(): Theme {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(defaultTheme)
    return migrateThemeV2(JSON.parse(raw))
  } catch {
    return structuredClone(defaultTheme)
  }
}

function clone(theme: Theme): Theme {
  return structuredClone(theme)
}

export function isBaseRuleModified(theme: Theme, selector: string): boolean {
  const seeded = seedBaseRules()[selector]
  const current = theme.layers.base[selector]
  if (!seeded) return true
  if (!current) return true
  return JSON.stringify(current) !== JSON.stringify(seeded)
}

/**
 * Reinserts `selector` into `base` at the position it occupies in the seed.
 *
 * The compiler emits the base layer in object insertion order, and inside it
 * every rule is wrapped in `:where()` with 0 specificity — source order is
 * the only tiebreaker. A plain reassignment puts the key at the end of the
 * object: re-enabling `input, textarea, select, button` would emit it after
 * `button`, and the fields' `background: var(--color-surface)` would start
 * beating the button's `var(--color-primary)`.
 *
 * Keys missing from the seed (from an imported theme) keep their relative
 * position: the re-enabled rule goes right before the first successor the
 * seed knows.
 */
function withSeedPosition(
  base: RuleMap,
  selector: string,
  rules: CssPropertyMap,
): RuleMap {
  const seedKeys = Object.keys(seedBaseRules())
  const target = seedKeys.indexOf(selector)
  const remaining = { ...base }
  delete remaining[selector]

  const ordered: RuleMap = {}
  let inserted = false
  for (const [key, value] of Object.entries(remaining)) {
    if (!inserted && seedKeys.indexOf(key) > target) {
      ordered[selector] = rules
      inserted = true
    }
    ordered[key] = value
  }
  if (!inserted) ordered[selector] = rules
  return ordered
}

function commit(
  state: StudioState,
  nextTheme: Theme,
  notice?: string,
): Partial<StudioState> {
  return {
    theme: nextTheme,
    past: [...state.past.slice(-(HISTORY_LIMIT - 1)), clone(state.theme)],
    future: [],
    presetName: 'Custom',
    notice: notice ?? null,
  }
}

export const useStudioStore = create<StudioState>((set) => ({
  theme: readStoredTheme(),
  past: [],
  future: [],
  presetName: 'Custom',
  editMode: 'light',
  previewMode: 'light',
  viewport: 'desktop',
  customWidth: 980,
  specimen: 'All HTML',
  section: 'Colors',
  selectedElement: 'article',
  selectedState: 'hover',
  notice: null,
  uiIconLibrary: typeof window !== 'undefined' ? readUiIconLibrary() : 'lucide',

  updateMetadata: (key, value) =>
    set((state) => {
      const next = clone(state.theme)
      next.metadata[key] = value
      return commit(state, next)
    }),

  setColor: (key, value) =>
    set((state) => {
      const next = clone(state.theme)
      if (state.editMode === 'light') {
        next.tokens.colors[key] = value
      } else {
        next.modes.dark ??= { colors: {} }
        next.modes.dark.colors[key] = value
      }
      return commit(state, next)
    }),

  setToken: (category, key, value) =>
    set((state) => {
      const next = clone(state.theme)
      const group = next.tokens[category] as unknown as Record<string, string>
      group[String(key)] = value
      return commit(state, next)
    }),

  setLayerProperty: (layer, selector, property, value) =>
    set((state) => {
      const next = clone(state.theme)
      next.layers[layer][selector] ??= {}
      next.layers[layer][selector][property] = value
      return commit(state, next)
    }),

  removeLayerProperty: (layer, selector, property) =>
    set((state) => {
      const next = clone(state.theme)
      delete next.layers[layer][selector]?.[property]
      if (
        next.layers[layer][selector] &&
        Object.keys(next.layers[layer][selector]).length === 0
      ) {
        delete next.layers[layer][selector]
      }
      return commit(state, next)
    }),

  // Family and stack in the same commit, so undo reverts both together.
  // Missing stack = only touches the @import (clearing preserves stack text).
  setFontFace: (role, face, stack) =>
    set((state) => {
      const next = clone(state.theme)
      const fonts = { ...(next.fonts ?? {}) }
      if (face) fonts[role] = face
      else delete fonts[role]
      next.fonts = Object.keys(fonts).length ? fonts : undefined
      if (stack !== undefined) {
        const tokenKey =
          role === 'body'
            ? 'fontBody'
            : role === 'heading'
              ? 'fontHeading'
              : 'fontMono'
        next.tokens.typography[tokenKey] = stack
      }
      return commit(state, next)
    }),

  setIconLibrary: (library) =>
    set((state) => {
      const next = clone(state.theme)
      next.icons = { library }
      return commit(state, next)
    }),

  setQuartoSidebarTone: (tone) =>
    set((state) => {
      const next = clone(state.theme)
      next.quarto = { ...(next.quarto ?? {}), sidebarTone: tone }
      return commit(state, next)
    }),

  setUiIconLibrary: (library) => {
    try {
      localStorage.setItem(UI_ICON_STORAGE_KEY, library)
    } catch {
      // No persistence: the switch only lasts for the session.
    }
    return set({ uiIconLibrary: library })
  },

  resetBaseRule: (selector) =>
    set((state) => {
      const seeded = seedBaseRules()[selector]
      if (!seeded) return state
      const next = clone(state.theme)
      next.layers.base[selector] = { ...seeded }
      return commit(state, next, 'Base rule restored.')
    }),

  toggleBaseRule: (selector, enabled) =>
    set((state) => {
      const next = clone(state.theme)
      if (enabled) {
        const seeded = seedBaseRules()[selector]
        if (!seeded) return state
        next.layers.base = withSeedPosition(next.layers.base, selector, {
          ...seeded,
        })
      } else {
        delete next.layers.base[selector]
      }
      return commit(state, next)
    }),

  setElementTargets: (targets, value) =>
    set((state) => {
      const next = clone(state.theme)
      const elements = next.layers.elements
      for (const target of targets) {
        if (value) {
          elements[target.selector] ??= {}
          elements[target.selector][target.property] = value
        } else {
          delete elements[target.selector]?.[target.property]
          if (
            elements[target.selector] &&
            Object.keys(elements[target.selector]).length === 0
          ) {
            delete elements[target.selector]
          }
        }
      }
      return commit(state, next)
    }),

  setReset: (enabled) =>
    set((state) => {
      const next = clone(state.theme)
      next.options.includeMinimalReset = enabled
      return commit(state, next)
    }),

  setEditMode: (editMode) => set({ editMode }),
  setPreviewMode: (previewMode) => set({ previewMode }),
  setViewport: (viewport) => set({ viewport }),
  setCustomWidth: (customWidth) =>
    set({ customWidth: Math.max(280, Math.min(1800, customWidth)) }),
  setSpecimen: (specimen) => set({ specimen }),
  setSection: (section) => set({ section }),
  setSelectedElement: (selectedElement) => set({ selectedElement }),
  setSelectedState: (selectedState) => set({ selectedState }),

  applyPreset: (name) =>
    set((state) => ({
      ...commit(state, clone(presets[name]), `${name} preset applied.`),
      presetName: name,
    })),

  importTheme: (theme) =>
    set((state) => ({
      ...commit(state, clone(theme), 'Theme imported.'),
      presetName: 'Imported',
    })),

  newTheme: () =>
    set((state) => ({
      ...commit(state, clone(defaultTheme), 'New theme created.'),
      presetName: 'Minimal',
    })),

  resetTheme: () =>
    set((state) => ({
      ...commit(state, clone(defaultTheme), 'Theme reset.'),
      presetName: 'Minimal',
    })),

  undo: () =>
    set((state) => {
      const previous = state.past.at(-1)
      if (!previous) return state
      return {
        theme: clone(previous),
        past: state.past.slice(0, -1),
        future: [clone(state.theme), ...state.future].slice(0, HISTORY_LIMIT),
        presetName: 'Custom',
        notice: 'Undo',
      }
    }),

  redo: () =>
    set((state) => {
      const next = state.future[0]
      if (!next) return state
      return {
        theme: clone(next),
        past: [...state.past, clone(state.theme)].slice(-HISTORY_LIMIT),
        future: state.future.slice(1),
        presetName: 'Custom',
        notice: 'Redo',
      }
    }),

  clearNotice: () => set({ notice: null }),
}))

if (typeof window !== 'undefined') {
  useStudioStore.subscribe((state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.theme))
  })
}
