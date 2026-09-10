export const iconLibraryIds = [
  'none',
  'lucide',
  'phosphor',
  'heroicons',
  'material',
  'fontawesome',
  'bootstrap',
  'tabler',
] as const

export type IconLibraryId = (typeof iconLibraryIds)[number]

export const iconNames = [
  'check',
  'minus',
  'dot',
  'chevron-down',
  'chevron-right',
  'search',
  'x',
  'undo',
  'redo',
  'grid',
] as const

export type IconName = (typeof iconNames)[number]

export function isIconLibraryId(value: unknown): value is IconLibraryId {
  return (
    typeof value === 'string' &&
    (iconLibraryIds as readonly string[]).includes(value)
  )
}
