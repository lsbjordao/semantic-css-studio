import { getIconSourceFor, isFillLibrary, strokeWidthFor } from './registry'
import type { IconLibraryId, IconName } from './types'

interface IconProps {
  library: IconLibraryId
  name: IconName
  size?: number
  title?: string
}

/** Studio inline icon (chrome). Exported CSS uses data-URIs; see `css.ts`. */
export function Icon({ library, name, size = 16, title }: IconProps) {
  const fallback = library === 'none' ? 'lucide' : library
  const { body, viewBox } = getIconSourceFor(fallback, name)
  const common = {
    width: size,
    height: size,
    viewBox,
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
