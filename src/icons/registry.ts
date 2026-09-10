import type { IconLibraryId, IconName } from './types'
import { getIconSource } from './sources'

export type IconStyle = 'stroke' | 'fill'

export interface IconLibraryMeta {
  id: Exclude<IconLibraryId, 'none'>
  label: string
  style: IconStyle
  note: string
}

/**
 * Official sources imported from the libraries and embedded in CSS as SVG.
 * Export stays free of runtime, external fonts and network requests.
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
    style: 'fill',
    note: 'Regular · filled',
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

export function isFillLibrary(library: IconLibraryId): boolean {
  return (
    library === 'phosphor' ||
    library === 'material' ||
    library === 'fontawesome' ||
    library === 'bootstrap'
  )
}

export function strokeWidthFor(library: IconLibraryId): string {
  return library === 'heroicons' ? '1.5' : '2'
}

export function getIconSourceFor(
  library: Exclude<IconLibraryId, 'none'>,
  name: IconName,
) {
  return getIconSource(library, name)
}

export function getIconBody(
  library: Exclude<IconLibraryId, 'none'>,
  name: IconName,
): string {
  return getIconSource(library, name).body
}
