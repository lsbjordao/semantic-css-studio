import type { ScrollTokens } from './schema'

/**
 * Estes tokens entram no schema v2 já nesta entrega, mesmo só sendo emitidos e
 * editados na entrega de Scroll, para que exista exatamente uma migração.
 */
export const scrollDefaults: ScrollTokens = {
  scrollbarWidth: 'auto',
  scrollbarSize: '12px',
  scrollbarTrack: 'var(--color-surface)',
  scrollbarThumb: 'var(--color-border)',
  scrollbarThumbHover: 'var(--color-text-muted)',
  scrollbarRadius: 'var(--radius-full)',
  scrollbarGutter: 'auto',
  scrollBehavior: 'auto',
  scrollPaddingTop: '0',
  overscrollBehavior: 'auto',
}
