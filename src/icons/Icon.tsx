import { getIconBody, isFillLibrary, strokeWidthFor } from './registry'
import type { IconLibraryId, IconName } from './types'

interface IconProps {
  library: IconLibraryId
  name: IconName
  size?: number
  title?: string
}

/** Ícone inline do Studio (chrome). O CSS exportado usa data-URI; ver `css.ts`. */
export function Icon({ library, name, size = 16, title }: IconProps) {
  const fallback = library === 'none' ? 'lucide' : library
  const body = getIconBody(fallback, name)
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    'aria-hidden': title ? undefined : true,
    role: title ? 'img' : undefined,
    dangerouslySetInnerHTML: { __html: body },
  } as const
  if (isFillLibrary(fallback)) {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        {title ? <title>{title}</title> : null}
      </svg>
    )
  }
  return (
    <svg
      {...common}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidthFor(fallback)}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {title ? <title>{title}</title> : null}
    </svg>
  )
}
