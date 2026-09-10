import type { ScrollTokens } from './schema'

/**
 * These tokens enter schema v2 in this delivery already, even though they are
 * only emitted and edited in the Scroll delivery, so there is exactly one
 * migration.
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
