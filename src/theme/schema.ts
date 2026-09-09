export const SCHEMA_VERSION = 2 as const

export const colorTokenKeys = [
  'background',
  'surface',
  'surfaceAlt',
  'text',
  'textMuted',
  'primary',
  'primaryHover',
  'primaryText',
  'secondary',
  'border',
  'success',
  'warning',
  'danger',
  'codeBackground',
  'codeText',
] as const

export type ColorTokenKey = (typeof colorTokenKeys)[number]
export type ColorTokens = Record<ColorTokenKey, string>

export interface TypographyTokens {
  fontBody: string
  fontHeading: string
  fontMono: string
  fontSizeBase: string
  fontSizeXs: string
  fontSizeSm: string
  fontSizeMd: string
  fontSizeLg: string
  fontSizeXl: string
  lineHeightBody: string
  lineHeightHeading: string
  fontWeightNormal: string
  fontWeightMedium: string
  fontWeightBold: string
}

export interface SpacingTokens {
  spaceXs: string
  spaceSm: string
  spaceMd: string
  spaceLg: string
  spaceXl: string
  space2xl: string
}

export interface RadiusTokens {
  radiusSm: string
  radiusMd: string
  radiusLg: string
  radiusFull: string
}

export interface ShadowTokens {
  shadowSm: string
  shadowMd: string
  shadowLg: string
}

export interface LayoutTokens {
  contentWidth: string
  wideWidth: string
  bodyPadding: string
  sectionSpacing: string
  headerWidth: string
  footerWidth: string
}

export interface ThemeTokens {
  colors: ColorTokens
  typography: TypographyTokens
  spacing: SpacingTokens
  radius: RadiusTokens
  shadow: ShadowTokens
  layout: LayoutTokens
}

export type CssPropertyMap = Record<string, string>

export type InteractionState =
  | 'hover'
  | 'focus'
  | 'focus-visible'
  | 'active'
  | 'disabled'
  | 'checked'

export interface ThemeMode {
  colors: Partial<ColorTokens>
}

export interface ResponsiveConfig {
  mobile: number
  tablet: number
  desktop: number
}

export interface ThemeV1 {
  schemaVersion: number
  metadata: {
    name: string
    description?: string
    author?: string
    version: string
  }
  tokens: ThemeTokens
  modes: {
    light: ThemeMode
    dark?: ThemeMode
  }
  elements: Record<string, CssPropertyMap>
  states: Record<string, Partial<Record<InteractionState, CssPropertyMap>>>
  responsive: ResponsiveConfig
  options: {
    includeMinimalReset: boolean
  }
}

export const selectorGroups = {
  Document: ['body', 'header', 'nav', 'main', 'section', 'article', 'aside', 'footer', 'address', 'search'],
  Headings: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hgroup'],
  Text: ['p', 'blockquote', 'a', 'strong', 'em', 'small', 'mark', 'del', 'ins', 'abbr', 'b', 'bdi', 'bdo', 'cite', 'data', 'dfn', 'i', 'q', 's', 'span', 'sub', 'sup', 'time', 'u', 'br', 'wbr'],
  Lists: ['ul', 'ol', 'li', 'dl', 'dt', 'dd', 'menu'],
  Code: ['code', 'pre', 'kbd', 'samp', 'var'],
  Tables: ['table', 'caption', 'colgroup', 'col', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td'],
  Forms: ['form', 'fieldset', 'legend', 'label', 'input', 'textarea', 'select', 'optgroup', 'option', 'datalist', 'button', 'output', 'progress', 'meter'],
  Media: ['img', 'picture', 'source', 'audio', 'video', 'track', 'figure', 'figcaption', 'iframe', 'embed', 'object', 'canvas', 'map', 'area'],
  Interactive: ['details', 'summary', 'dialog'],
  Semantics: ['hr', 'ruby', 'rt', 'rp'],
} as const

export const supportedElements = Object.values(selectorGroups).flat() as Array<
  (typeof selectorGroups)[keyof typeof selectorGroups][number]
>

export type SupportedElement = (typeof supportedElements)[number]

export interface ScrollTokens {
  scrollbarWidth: string
  scrollbarSize: string
  scrollbarTrack: string
  scrollbarThumb: string
  scrollbarThumbHover: string
  scrollbarRadius: string
  scrollbarGutter: string
  scrollBehavior: string
  scrollPaddingTop: string
  overscrollBehavior: string
}

export interface SpacingTokensV2 extends SpacingTokens {
  space2xlXs: string
}

export interface LayoutTokensV2 extends LayoutTokens {
  bodyPaddingSm: string
  bodyPaddingXs: string
  sectionSpacingSm: string
}

export interface ThemeTokensV2 extends Omit<ThemeTokens, 'spacing' | 'layout'> {
  spacing: SpacingTokensV2
  layout: LayoutTokensV2
  scroll: ScrollTokens
}

export type RuleMap = Record<string, CssPropertyMap>

export interface ThemeLayers {
  base: RuleMap
  elements: RuleMap
  states: RuleMap
  responsive: Record<string, RuleMap>
}

export interface ThemeV2 {
  schemaVersion: 2
  metadata: ThemeV1['metadata']
  tokens: ThemeTokensV2
  modes: ThemeV1['modes']
  layers: ThemeLayers
  breakpoints: Record<string, number>
  options: {
    includeMinimalReset: boolean
    reducedMotion: boolean
  }
}

export type Theme = ThemeV2
