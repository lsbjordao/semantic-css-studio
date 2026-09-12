/** Named Quarto components that cannot be selected accurately by tag alone. */
export const quartoParts = [
  {
    selector: 'section.footnotes',
    label: 'Footnotes',
    background: 'var(--color-surface)',
  },
  {
    selector: '.callout .callout-header',
    label: 'Callout heading',
    background: 'var(--color-surface-alt)',
  },
] as const

export function quartoPartFor(selector: string) {
  return quartoParts.find((part) => part.selector === selector)
}

export function quartoPartAt(target: Element) {
  const element = target.closest(
    quartoParts.map((part) => part.selector).join(', '),
  )
  return element
    ? quartoParts.find((part) => element.matches(part.selector))
    : undefined
}
