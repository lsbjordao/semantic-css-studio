import { create } from 'zustand'
import { defaultTheme } from './defaults'
import { presets, type PresetName } from './presets'
import type {
  ColorTokenKey,
  CssPropertyMap,
  InteractionState,
  Theme,
  ThemeTokens,
} from './schema'

const STORAGE_KEY = 'semantic-css-studio/theme-v1'
const HISTORY_LIMIT = 60

export type ThemeModeName = 'light' | 'dark'
export type PreviewMode = 'light' | 'dark' | 'auto'
export type ViewportName = 'desktop' | 'tablet' | 'mobile' | 'custom'
export type SpecimenName = 'Selector' | 'Overview' | 'Typography' | 'Content' | 'Forms' | 'Tables' | 'Code' | 'All HTML' | 'Kitchen Sink'
export type EditorSection = 'Colors' | 'Typography' | 'Spacing' | 'Layout' | 'Radius' | 'Shadows' | 'Elements' | 'States' | 'Accessibility'

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
  setElementProperty: (element: string, property: string, value: string) => void
  removeElementProperty: (element: string, property: string) => void
  setElementTargets: (targets: Array<{ selector: string; property: string }>, value: string) => void
  setStateProperty: (element: string, state: InteractionState, property: string, value: string) => void
  removeStateProperty: (element: string, state: InteractionState, property: string) => void
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

function readStoredTheme(): Theme {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(defaultTheme)
    const parsed = JSON.parse(raw) as Theme
    if (parsed.schemaVersion !== 1 || !parsed.tokens || !parsed.elements) return structuredClone(defaultTheme)
    return parsed
  } catch {
    return structuredClone(defaultTheme)
  }
}

function clone(theme: Theme): Theme {
  return structuredClone(theme)
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

  setElementProperty: (element, property, value) => set((state) => {
    const next = clone(state.theme)
    next.elements[element] ??= {}
    next.elements[element][property] = value
    return commit(state, next)
  }),

  removeElementProperty: (element, property) => set((state) => {
    const next = clone(state.theme)
    delete next.elements[element]?.[property]
    return commit(state, next)
  }),

  setElementTargets: (targets, value) => set((state) => {
    const next = clone(state.theme)
    for (const target of targets) {
      if (value) {
        next.elements[target.selector] ??= {}
        next.elements[target.selector][target.property] = value
      } else {
        delete next.elements[target.selector]?.[target.property]
        if (next.elements[target.selector] && Object.keys(next.elements[target.selector]).length === 0) {
          delete next.elements[target.selector]
        }
      }
    }
    return commit(state, next)
  }),

  setStateProperty: (element, interactionState, property, value) => set((state) => {
    const next = clone(state.theme)
    next.states[element] ??= {}
    next.states[element][interactionState] ??= {}
    ;(next.states[element][interactionState] as CssPropertyMap)[property] = value
    return commit(state, next)
  }),

  removeStateProperty: (element, interactionState, property) => set((state) => {
    const next = clone(state.theme)
    delete next.states[element]?.[interactionState]?.[property]
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
