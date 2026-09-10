import type { IconLibraryId, IconName } from './types'

export type IconStyle = 'stroke' | 'fill'

export interface IconLibraryMeta {
  id: Exclude<IconLibraryId, 'none'>
  label: string
  style: IconStyle
  note: string
}

/**
 * Sete estilos de ícones para o Studio e para o CSS exportado.
 *
 * São interpretações originais em estilo compatível (não cópias dos paths
 * upstream): o suficiente para checkbox/radio/select/disclosure com cara de
 * cada biblioteca, sem arrastar dependências de runtime, fontes externas ou
 * obrigações de atribuição para o tema exportado.
 */
export const iconLibraryMeta: IconLibraryMeta[] = [
  {
    id: 'lucide',
    label: 'Lucide',
    style: 'stroke',
    note: 'Stroke 2px · round',
  },
  {
    id: 'phosphor',
    label: 'Phosphor',
    style: 'stroke',
    note: 'Stroke 2px · round',
  },
  {
    id: 'heroicons',
    label: 'Heroicons',
    style: 'stroke',
    note: 'Outline 1.5px',
  },
  { id: 'material', label: 'Material Symbols', style: 'fill', note: 'Filled' },
  { id: 'fontawesome', label: 'Font Awesome', style: 'fill', note: 'Solid' },
  { id: 'bootstrap', label: 'Bootstrap Icons', style: 'fill', note: 'Filled' },
  { id: 'tabler', label: 'Tabler', style: 'stroke', note: 'Stroke 2px' },
]

type IconBodyMap = Record<IconName, string>

const strokeBase: IconBodyMap = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  minus: '<path d="M5 12h14"/>',
  dot: '<circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  undo: '<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/>',
  redo: '<path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 15-6.7L21 13"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
}

const fillBase: IconBodyMap = {
  check: '<path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>',
  minus: '<path d="M5 11h14v2H5z"/>',
  dot: '<circle cx="12" cy="12" r="5"/>',
  'chevron-down': '<path d="M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6z"/>',
  'chevron-right': '<path d="M8.6 16.6 13.2 12l-4.6-4.6L10 6l6 6-6 6z"/>',
  search:
    '<path d="M15.5 14h-.8l-.3-.3a6.5 6.5 0 1 0-.7.7l.3.3v.8l5 5 1.5-1.5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/>',
  x: '<path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"/>',
  undo: '<path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>',
  redo: '<path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8 8 0 0 1 7.6-5.5c1.96 0 3.73.72 5.12 1.88L13 16h9V7z"/>',
  grid: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
}

const bodies: Record<Exclude<IconLibraryId, 'none'>, IconBodyMap> = {
  lucide: { ...strokeBase },
  phosphor: {
    ...strokeBase,
    check: '<path d="M19 7 10 16l-5-5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/>',
  },
  heroicons: { ...strokeBase },
  tabler: {
    ...strokeBase,
    check: '<path d="M5 12l5 5L20 7"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  },
  material: { ...fillBase },
  fontawesome: {
    ...fillBase,
    check: '<path d="M10.7 15.9 5.4 10.6l1.4-1.4 3.9 3.9 7.5-7.5 1.4 1.4z"/>',
    dot: '<circle cx="12" cy="12" r="6"/>',
  },
  bootstrap: {
    ...fillBase,
    check: '<path d="M10.97 14.53 5.7 9.26l.7-.7 4.57 4.57 7.63-7.63.7.7z"/>',
  },
}

const strokeWidths: Record<string, string> = {
  lucide: '2',
  phosphor: '2',
  heroicons: '1.5',
  tabler: '2',
}

export function isFillLibrary(library: IconLibraryId): boolean {
  return (
    library === 'material' ||
    library === 'fontawesome' ||
    library === 'bootstrap'
  )
}

export function strokeWidthFor(library: IconLibraryId): string {
  return strokeWidths[library] ?? '2'
}

export function getIconBody(
  library: Exclude<IconLibraryId, 'none'>,
  name: IconName,
): string {
  return bodies[library][name]
}
