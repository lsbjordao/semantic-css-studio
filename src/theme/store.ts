import { create } from 'zustand'
import { seedBaseRules } from './baseRules'
import { defaultTheme } from './defaults'
import { presets, type PresetName } from './presets'
import { migrateThemeV2 } from './migration'
import type { ColorTokenKey, InteractionState, Theme, ThemeTokens } from './schema'

const STORAGE_KEY = 'semantic-css-studio/theme-v1'
const HISTORY_LIMIT = 60

export type LayerName = 'base' | 'elements' | 'states'
export type ThemeModeName = 'light' | 'dark'
export type PreviewMode = 'light' | 'dark' | 'auto'
export type ViewportName = 'desktop' | 'tablet' | 'mobile' | 'custom'
export type SpecimenName = 'Selector' | 'Overview' | 'Typography' | 'Content' | 'Forms' | 'Tables' | 'Code' | 'All HTML' | 'Kitchen Sink'
export type EditorSection = 'Colors' | 'Typography' | 'Spacing' | 'Layout' | 'Radius' | 'Shadows' | 'Base' | 'Elements' | 'States' | 'Accessibility'

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
  updateMetadata: (key: 'name' | 'version' | 'description', value: string) => void
  setColor: (key: ColorTokenKey, value: string) => void
  setToken: <K extends Exclude<keyof ThemeTokens, 'colors'>>(category: K, key: keyof ThemeTokens[K], value: string) => void
  setLayerProperty: (layer: LayerName, selector: string, property: string, value: string) => void
  removeLayerProperty: (layer: LayerName, selector: string, property: string) => void
  resetBaseRule: (selector: string) => void
  toggleBaseRule: (selector: string, enabled: boolean) => void
  setElementTargets: (targets: Array<{ selector: string; property: string }>, value: string) => void
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

// A chave mantem o sufixo `-v1` de proposito: renomea-la orfanaria o tema que
// o usuario ja tem salvo. O conteudo passa por `migrateThemeV2`, entao um tema
// v1 gravado antes desta versao e elevado em vez de descartado.
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

function commit(state: StudioState, nextTheme: Theme, notice?: string): Partial<StudioState> {
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

  updateMetadata: (key, value) => set((state) => {
    const next = clone(state.theme)
    next.metadata[key] = value
    return commit(state, next)
  }),

  setColor: (key, value) => set((state) => {
    const next = clone(state.theme)
    if (state.editMode === 'light') {
      next.tokens.colors[key] = value
    } else {
      next.modes.dark ??= { colors: {} }
      next.modes.dark.colors[key] = value
    }
    return commit(state, next)
  }),

  setToken: (category, key, value) => set((state) => {
    const next = clone(state.theme)
    const group = next.tokens[category] as unknown as Record<string, string>
    group[String(key)] = value
    return commit(state, next)
  }),

  setLayerProperty: (layer, selector, property, value) => set((state) => {
    const next = clone(state.theme)
    next.layers[layer][selector] ??= {}
    next.layers[layer][selector][property] = value
    return commit(state, next)
  }),

  removeLayerProperty: (layer, selector, property) => set((state) => {
    const next = clone(state.theme)
    delete next.layers[layer][selector]?.[property]
    if (next.layers[layer][selector] && Object.keys(next.layers[layer][selector]).length === 0) {
      delete next.layers[layer][selector]
    }
    return commit(state, next)
  }),

  resetBaseRule: (selector) => set((state) => {
    const seeded = seedBaseRules()[selector]
    if (!seeded) return state
    const next = clone(state.theme)
    next.layers.base[selector] = { ...seeded }
    return commit(state, next, 'Regra-base restaurada.')
  }),

  toggleBaseRule: (selector, enabled) => set((state) => {
    const next = clone(state.theme)
    if (enabled) {
      const seeded = seedBaseRules()[selector]
      if (!seeded) return state
      next.layers.base[selector] = { ...seeded }
    } else {
      delete next.layers.base[selector]
    }
    return commit(state, next)
  }),

  setElementTargets: (targets, value) => set((state) => {
    const next = clone(state.theme)
    const elements = next.layers.elements
    for (const target of targets) {
      if (value) {
        elements[target.selector] ??= {}
        elements[target.selector][target.property] = value
      } else {
        delete elements[target.selector]?.[target.property]
        if (elements[target.selector] && Object.keys(elements[target.selector]).length === 0) {
          delete elements[target.selector]
        }
      }
    }
    return commit(state, next)
  }),

  setReset: (enabled) => set((state) => {
    const next = clone(state.theme)
    next.options.includeMinimalReset = enabled
    return commit(state, next)
  }),

  setEditMode: (editMode) => set({ editMode }),
  setPreviewMode: (previewMode) => set({ previewMode }),
  setViewport: (viewport) => set({ viewport }),
  setCustomWidth: (customWidth) => set({ customWidth: Math.max(280, Math.min(1800, customWidth)) }),
  setSpecimen: (specimen) => set({ specimen }),
  setSection: (section) => set({ section }),
  setSelectedElement: (selectedElement) => set({ selectedElement }),
  setSelectedState: (selectedState) => set({ selectedState }),

  applyPreset: (name) => set((state) => ({
    ...commit(state, clone(presets[name]), `${name} preset applied.`),
    presetName: name,
  })),

  importTheme: (theme) => set((state) => ({
    ...commit(state, clone(theme), 'Theme imported.'),
    presetName: 'Imported',
  })),

  newTheme: () => set((state) => ({
    ...commit(state, clone(defaultTheme), 'New theme created.'),
    presetName: 'Minimal',
  })),

  resetTheme: () => set((state) => ({
    ...commit(state, clone(defaultTheme), 'Theme reset.'),
    presetName: 'Minimal',
  })),

  undo: () => set((state) => {
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

  redo: () => set((state) => {
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
