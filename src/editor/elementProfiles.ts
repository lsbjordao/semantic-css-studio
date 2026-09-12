import type { CssPropertyMap, Theme } from '../theme/schema'
import { fontStackOptions } from './fontOptions'
import { quartoPartFor } from '../theme/quartoParts'

export type PropertyTarget = {
  selector: string
  property: string
}

export type PropertyDef = {
  property: string
  label: string
  kind?: 'text' | 'size' | 'select' | 'color' | 'shadow'
  options?: string[]
  defaultUnit?: string
  step?: number
  hint?: string
  targets?: PropertyTarget[]
}

export type PropertyGroup = {
  title: string
  properties: PropertyDef[]
}

const typography: PropertyGroup = {
  title: 'Typography',
  properties: [
    { property: 'color', label: 'Text color', kind: 'color' },
    {
      property: 'fontFamily',
      label: 'Font family',
      kind: 'select',
      options: [...fontStackOptions],
    },
    { property: 'fontSize', label: 'Font size', kind: 'size' },
    {
      property: 'fontWeight',
      label: 'Font weight',
      kind: 'select',
      options: [
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        'normal',
        'bold',
      ],
    },
    {
      property: 'fontStyle',
      label: 'Font style',
      kind: 'select',
      options: ['normal', 'italic', 'oblique'],
    },
    {
      property: 'lineHeight',
      label: 'Line height',
      kind: 'size',
      defaultUnit: '',
      step: 0.05,
    },
    {
      property: 'letterSpacing',
      label: 'Letter spacing',
      kind: 'size',
      defaultUnit: 'em',
    },
    {
      property: 'textAlign',
      label: 'Text align',
      kind: 'select',
      options: ['left', 'center', 'right', 'justify', 'start', 'end'],
    },
    {
      property: 'textDecoration',
      label: 'Text decoration',
      kind: 'select',
      options: ['none', 'underline', 'overline', 'line-through'],
    },
    {
      property: 'textTransform',
      label: 'Text transform',
      kind: 'select',
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
    },
  ],
}

const longForm: PropertyGroup = {
  title: 'Long-form',
  properties: [
    {
      property: 'hyphens',
      label: 'Hyphens',
      kind: 'select',
      options: ['manual', 'auto', 'none'],
      hint: 'Automatic hyphenation needs the lang attribute on the document.',
    },
    {
      property: 'textWrap',
      label: 'Text wrap',
      kind: 'select',
      options: ['wrap', 'nowrap', 'balance', 'pretty'],
      hint: 'Use balance on headings and pretty on paragraphs.',
    },
    {
      property: 'textIndent',
      label: 'Text indent',
      kind: 'size',
      defaultUnit: 'em',
      step: 0.25,
    },
    {
      property: 'wordSpacing',
      label: 'Word spacing',
      kind: 'size',
      defaultUnit: 'em',
      step: 0.05,
    },
    {
      property: 'fontVariant',
      label: 'Font variant',
      kind: 'select',
      options: [
        'normal',
        'small-caps',
        'all-small-caps',
        'petite-caps',
        'unicase',
        'titling-caps',
      ],
    },
    {
      property: 'fontFeatureSettings',
      label: 'Font features',
      kind: 'text',
      hint: 'Advanced OpenType string, e.g. "liga" 1, "kern" 1.',
    },
    {
      property: 'orphans',
      label: 'Orphans',
      kind: 'size',
      defaultUnit: '',
      step: 1,
      hint: 'Minimum lines kept at the bottom of a page or column.',
    },
    {
      property: 'widows',
      label: 'Widows',
      kind: 'size',
      defaultUnit: '',
      step: 1,
      hint: 'Minimum lines kept at the top of a page or column.',
    },
  ],
}

const columns: PropertyGroup = {
  title: 'Columns',
  properties: [
    {
      property: 'columnCount',
      label: 'Column count',
      kind: 'size',
      defaultUnit: '',
      step: 1,
    },
    {
      property: 'columnWidth',
      label: 'Column width',
      kind: 'size',
      defaultUnit: 'em',
      step: 1,
    },
    {
      property: 'columnRule',
      label: 'Column rule',
      kind: 'text',
      hint: 'CSS shorthand, e.g. 1px solid var(--color-border).',
    },
  ],
}

const spacing: PropertyGroup = {
  title: 'Spacing',
  properties: [
    { property: 'margin', label: 'Margin', kind: 'size' },
    { property: 'marginTop', label: 'Margin top', kind: 'size' },
    { property: 'marginRight', label: 'Margin right', kind: 'size' },
    { property: 'marginBottom', label: 'Margin bottom', kind: 'size' },
    { property: 'marginLeft', label: 'Margin left', kind: 'size' },
    { property: 'padding', label: 'Padding', kind: 'size' },
    { property: 'paddingTop', label: 'Padding top', kind: 'size' },
    { property: 'paddingRight', label: 'Padding right', kind: 'size' },
    { property: 'paddingBottom', label: 'Padding bottom', kind: 'size' },
    { property: 'paddingLeft', label: 'Padding left', kind: 'size' },
    { property: 'gap', label: 'Gap', kind: 'size' },
  ],
}

const size: PropertyGroup = {
  title: 'Size',
  properties: [
    { property: 'width', label: 'Width', kind: 'size' },
    { property: 'minWidth', label: 'Min width', kind: 'size' },
    { property: 'maxWidth', label: 'Max width', kind: 'size' },
    { property: 'height', label: 'Height', kind: 'size' },
    { property: 'minHeight', label: 'Min height', kind: 'size' },
    { property: 'maxHeight', label: 'Max height', kind: 'size' },
  ],
}

const layout: PropertyGroup = {
  title: 'Layout',
  properties: [
    {
      property: 'display',
      label: 'Display',
      kind: 'select',
      options: [
        'block',
        'inline',
        'inline-block',
        'flex',
        'inline-flex',
        'grid',
        'inline-grid',
        'none',
        'contents',
      ],
    },
    {
      property: 'alignItems',
      label: 'Align items',
      kind: 'select',
      options: ['stretch', 'start', 'center', 'end', 'baseline'],
    },
    {
      property: 'justifyContent',
      label: 'Justify content',
      kind: 'select',
      options: [
        'start',
        'center',
        'end',
        'space-between',
        'space-around',
        'space-evenly',
      ],
    },
    {
      property: 'flexDirection',
      label: 'Flex direction',
      kind: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    {
      property: 'flexWrap',
      label: 'Flex wrap',
      kind: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    {
      property: 'overflow',
      label: 'Overflow',
      kind: 'select',
      options: ['visible', 'hidden', 'clip', 'scroll', 'auto'],
    },
    {
      property: 'boxSizing',
      label: 'Box sizing',
      kind: 'select',
      options: ['content-box', 'border-box'],
    },
  ],
}

const surface: PropertyGroup = {
  title: 'Surface',
  properties: [
    { property: 'backgroundColor', label: 'Background color', kind: 'color' },
    {
      property: 'opacity',
      label: 'Opacity',
      kind: 'size',
      defaultUnit: '',
      step: 0.05,
    },
    {
      property: 'boxShadow',
      label: 'Box shadow',
      kind: 'shadow',
      hint: 'Edit a visual shadow or enter advanced multi-layer CSS.',
    },
  ],
}

const border: PropertyGroup = {
  title: 'Border',
  properties: [
    {
      property: 'borderWidth',
      label: 'Border width',
      kind: 'size',
      defaultUnit: 'px',
      step: 1,
    },
    {
      property: 'borderStyle',
      label: 'Border style',
      kind: 'select',
      options: [
        'none',
        'solid',
        'dashed',
        'dotted',
        'double',
        'groove',
        'ridge',
        'inset',
        'outset',
      ],
    },
    { property: 'borderColor', label: 'Border color', kind: 'color' },
    { property: 'borderRadius', label: 'Border radius', kind: 'size' },
  ],
}

const logicalStartBorder: PropertyGroup = {
  title: 'Start border',
  properties: [
    {
      property: 'borderInlineStartWidth',
      label: 'Start border width',
      kind: 'size',
      defaultUnit: 'px',
      step: 1,
      hint: 'The vertical rule on the inline-start side in left-to-right text.',
    },
    {
      property: 'borderInlineStartStyle',
      label: 'Start border style',
      kind: 'select',
      options: ['none', 'solid', 'dashed', 'dotted', 'double'],
    },
    {
      property: 'borderInlineStartColor',
      label: 'Start border color',
      kind: 'color',
      hint: 'For blockquote this controls the vertical accent bar.',
    },
  ],
}

const media: PropertyGroup = {
  title: 'Media',
  properties: [
    {
      property: 'objectFit',
      label: 'Object fit',
      kind: 'select',
      options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    },
    { property: 'objectPosition', label: 'Object position' },
    { property: 'aspectRatio', label: 'Aspect ratio' },
  ],
}

const interaction: PropertyGroup = {
  title: 'Interaction',
  properties: [
    {
      property: 'cursor',
      label: 'Cursor',
      kind: 'select',
      options: [
        'auto',
        'default',
        'pointer',
        'text',
        'grab',
        'not-allowed',
        'help',
        'progress',
        'wait',
      ],
    },
    { property: 'accentColor', label: 'Accent color', kind: 'color' },
  ],
}

const formControl: PropertyGroup = {
  title: 'Control',
  properties: [
    { property: 'backgroundColor', label: 'Control background', kind: 'color' },
    { property: 'color', label: 'Control text', kind: 'color' },
    { property: 'caretColor', label: 'Caret color', kind: 'color' },
    {
      property: 'borderWidth',
      label: 'Border width',
      kind: 'size',
      defaultUnit: 'px',
      step: 1,
    },
    {
      property: 'borderStyle',
      label: 'Border style',
      kind: 'select',
      options: ['none', 'solid', 'dashed', 'dotted', 'double'],
    },
    { property: 'borderColor', label: 'Border color', kind: 'color' },
    { property: 'borderRadius', label: 'Border radius', kind: 'size' },
  ],
}

function progressColors(element: string): PropertyGroup {
  return {
    title: 'Progress appearance',
    properties: [
      {
        property: 'appearance',
        label: 'Native appearance',
        kind: 'select',
        options: ['auto', 'none'],
      },
      {
        property: 'backgroundColor',
        label: 'Track color',
        kind: 'color',
        targets: [
          { selector: element, property: 'backgroundColor' },
          {
            selector: `${element}::-webkit-progress-bar`,
            property: 'backgroundColor',
          },
        ],
        hint: 'Track/background. The editor writes the WebKit part as well as the base element.',
      },
      {
        property: 'accentColor',
        label: 'Value color',
        kind: 'color',
        targets: [
          { selector: element, property: 'accentColor' },
          {
            selector: `${element}::-webkit-progress-value`,
            property: 'backgroundColor',
          },
          {
            selector: `${element}::-moz-progress-bar`,
            property: 'backgroundColor',
          },
        ],
        hint: 'Filled portion. Emits compatible rules for modern browsers, Chromium/WebKit and Firefox.',
      },
    ],
  }
}

function meterColors(element: string): PropertyGroup {
  return {
    title: 'Meter appearance',
    properties: [
      {
        property: 'appearance',
        label: 'Native appearance',
        kind: 'select',
        options: ['auto', 'none'],
      },
      {
        property: 'backgroundColor',
        label: 'Track color',
        kind: 'color',
        targets: [
          { selector: element, property: 'backgroundColor' },
          {
            selector: `${element}::-webkit-meter-bar`,
            property: 'backgroundColor',
          },
        ],
      },
      {
        property: 'accentColor',
        label: 'Optimum value color',
        kind: 'color',
        targets: [
          { selector: element, property: 'accentColor' },
          {
            selector: `${element}::-webkit-meter-optimum-value`,
            property: 'backgroundColor',
          },
          {
            selector: `${element}::-moz-meter-bar`,
            property: 'backgroundColor',
          },
        ],
      },
    ],
  }
}

/**
 * Pseudo-element controls write to the same `layers.elements` map as regular
 * elements, under the full selector (`p::first-letter`). The compiler already
 * emits arbitrary keys from that map, so no new layer or schema field is
 * needed — and the editor reuses override/clear/history semantics unchanged.
 */
function pseudoGroup(
  element: string,
  title: string,
  suffix: string,
  properties: PropertyDef[],
): PropertyGroup {
  return {
    title,
    properties: properties.map((definition) => ({
      ...definition,
      targets: [
        { selector: `${element}${suffix}`, property: definition.property },
      ],
    })),
  }
}

const firstLetterProperties: PropertyDef[] = [
  { property: 'color', label: 'Letter color', kind: 'color' },
  {
    property: 'fontFamily',
    label: 'Letter font',
    kind: 'select',
    options: [...fontStackOptions],
  },
  { property: 'fontSize', label: 'Letter size', kind: 'size' },
  {
    property: 'fontWeight',
    label: 'Letter weight',
    kind: 'select',
    options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    property: 'lineHeight',
    label: 'Letter line height',
    kind: 'size',
    defaultUnit: '',
    step: 0.05,
  },
  {
    property: 'float',
    label: 'Letter float',
    kind: 'select',
    options: ['none', 'left', 'right'],
    hint: 'Use left for a drop cap and add a margin for spacing.',
  },
  { property: 'margin', label: 'Letter margin', kind: 'size' },
]

const firstLineProperties: PropertyDef[] = [
  { property: 'color', label: 'First-line color', kind: 'color' },
  {
    property: 'fontVariant',
    label: 'First-line variant',
    kind: 'select',
    options: ['normal', 'small-caps', 'all-small-caps', 'petite-caps'],
  },
  {
    property: 'letterSpacing',
    label: 'First-line letter spacing',
    kind: 'size',
    defaultUnit: 'em',
    step: 0.05,
  },
  {
    property: 'textTransform',
    label: 'First-line transform',
    kind: 'select',
    options: ['none', 'uppercase', 'lowercase', 'capitalize'],
  },
  {
    property: 'wordSpacing',
    label: 'First-line word spacing',
    kind: 'size',
    defaultUnit: 'em',
    step: 0.05,
  },
]

const selectionProperties: PropertyDef[] = [
  { property: 'backgroundColor', label: 'Selection background', kind: 'color' },
  { property: 'color', label: 'Selection text', kind: 'color' },
]

const markerProperties: PropertyDef[] = [
  { property: 'color', label: 'Marker color', kind: 'color' },
  { property: 'fontSize', label: 'Marker size', kind: 'size' },
  {
    property: 'fontWeight',
    label: 'Marker weight',
    kind: 'select',
    options: [
      'normal',
      'bold',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
    ],
  },
  {
    property: 'content',
    label: 'Marker content',
    kind: 'text',
    hint: 'Custom bullet, e.g. "→ " or counter(list-item) ". ".',
  },
]

const textElements = new Set([
  'body',
  'p',
  'a',
  'strong',
  'em',
  'small',
  'mark',
  'del',
  'ins',
  'abbr',
  'b',
  'bdi',
  'bdo',
  'cite',
  'data',
  'dfn',
  'i',
  'q',
  's',
  'span',
  'sub',
  'sup',
  'time',
  'u',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hgroup',
  'blockquote',
  'li',
  'dt',
  'dd',
  'caption',
  'th',
  'td',
  'label',
  'legend',
  'summary',
  'figcaption',
  'address',
  'code',
  'pre',
  'kbd',
  'samp',
  'var',
  'output',
])
const blockElements = new Set([
  'body',
  'header',
  'nav',
  'main',
  'section',
  'article',
  'aside',
  'footer',
  'address',
  'search',
  'hgroup',
  'p',
  'blockquote',
  'ul',
  'ol',
  'dl',
  'menu',
  'pre',
  'table',
  'form',
  'fieldset',
  'figure',
  'details',
  'dialog',
])
const sizedElements = new Set([
  'body',
  'header',
  'nav',
  'main',
  'section',
  'article',
  'aside',
  'footer',
  'blockquote',
  'table',
  'form',
  'fieldset',
  'input',
  'textarea',
  'select',
  'button',
  'progress',
  'meter',
  'img',
  'picture',
  'audio',
  'video',
  'iframe',
  'embed',
  'object',
  'canvas',
  'dialog',
  'details',
])
const surfacedElements = new Set([
  'body',
  'header',
  'nav',
  'main',
  'section',
  'article',
  'aside',
  'footer',
  'blockquote',
  'pre',
  'code',
  'table',
  'th',
  'td',
  'form',
  'fieldset',
  'input',
  'textarea',
  'select',
  'button',
  'details',
  'dialog',
  'mark',
  'kbd',
])
const borderedElements = new Set([
  'article',
  'aside',
  'blockquote',
  'pre',
  'table',
  'th',
  'td',
  'fieldset',
  'input',
  'textarea',
  'select',
  'button',
  'details',
  'dialog',
  'img',
  'video',
  'iframe',
  'progress',
  'meter',
  'kbd',
])
const mediaElements = new Set([
  'img',
  'video',
  'iframe',
  'embed',
  'object',
  'canvas',
])
const formElements = new Set(['input', 'textarea', 'select', 'button'])
const columnElements = new Set(['body', 'main', 'article', 'section', 'aside'])
const interactiveElements = new Set([
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'summary',
  'details',
  'progress',
  'meter',
])

export function propertyGroupsForElement(element: string): PropertyGroup[] {
  if (quartoPartFor(element)) return [surface, typography, spacing, border]
  const groups: PropertyGroup[] = []

  if (textElements.has(element)) groups.push(typography)
  if (textElements.has(element)) groups.push(longForm)
  if (blockElements.has(element) || formElements.has(element))
    groups.push(spacing)
  if (sizedElements.has(element)) groups.push(size)
  if (blockElements.has(element)) groups.push(layout)
  if (columnElements.has(element)) groups.push(columns)

  if (formElements.has(element)) groups.push(formControl)
  else {
    if (surfacedElements.has(element)) groups.push(surface)
    if (borderedElements.has(element)) groups.push(border)
  }

  if (element === 'blockquote' || element === 'aside')
    groups.push(logicalStartBorder)
  if (mediaElements.has(element)) groups.push(media)
  if (element === 'progress') groups.push(progressColors(element))
  if (element === 'meter') groups.push(meterColors(element))
  if (
    interactiveElements.has(element) &&
    element !== 'progress' &&
    element !== 'meter'
  )
    groups.push(interaction)

  if (element === 'hr') {
    groups.push({
      title: 'Rule',
      properties: [
        {
          property: 'height',
          label: 'Thickness',
          kind: 'size',
          defaultUnit: 'px',
          step: 1,
        },
        { property: 'backgroundColor', label: 'Rule color', kind: 'color' },
        {
          property: 'borderWidth',
          label: 'Border width',
          kind: 'size',
          defaultUnit: 'px',
          step: 1,
        },
        { property: 'borderColor', label: 'Border color', kind: 'color' },
      ],
    })
  }

  if (groups.length === 0) groups.push(typography)

  if (textElements.has(element)) {
    groups.push(
      pseudoGroup(
        element,
        'First letter',
        '::first-letter',
        firstLetterProperties,
      ),
      pseudoGroup(element, 'First line', '::first-line', firstLineProperties),
      pseudoGroup(element, 'Selection', '::selection', selectionProperties),
    )
  }
  if (element === 'li' || element === 'summary') {
    groups.push(pseudoGroup(element, 'Marker', '::marker', markerProperties))
  }

  return groups
}

export function targetList(
  element: string,
  definition: PropertyDef,
): PropertyTarget[] {
  return (
    definition.targets ?? [{ selector: element, property: definition.property }]
  )
}

/**
 * Longhands the panel looks for, but presets usually store as shorthand
 * (`background`, `border`, `margin`, `padding`). Without this bridge, a
 * `background: var(--color-primary)` would never show in the
 * "Control background" control, which looks for `backgroundColor`.
 */
const shorthandFallback: Record<string, string[]> = {
  backgroundColor: ['background'],
  borderWidth: ['border'],
  borderStyle: ['border'],
  borderColor: ['border'],
  marginTop: ['margin'],
  marginRight: ['margin'],
  marginBottom: ['margin'],
  marginLeft: ['margin'],
  paddingTop: ['padding'],
  paddingRight: ['padding'],
  paddingBottom: ['padding'],
  paddingLeft: ['padding'],
}

function readRule(
  declarations: CssPropertyMap | undefined,
  property: string,
): string {
  if (!declarations) return ''
  if (declarations[property]) return declarations[property]
  for (const shorthand of shorthandFallback[property] ?? []) {
    if (declarations[shorthand]) return declarations[shorthand]
  }
  return ''
}

/**
 * A base-layer rule applies to the element when the selector is the element
 * itself or a list containing it as a member (`input, textarea, select,
 * button` counts for `button`). Compound selectors (`pre code`,
 * `input:not(...)`) deliberately do not match: they would require a selector
 * engine, and the panel edits by tag.
 */
function baseRuleApplies(ruleSelector: string, element: string): boolean {
  return ruleSelector.split(',').some((part) => part.trim() === element)
}

/**
 * The value the control should display: the `elements`-layer override when
 * present, otherwise what the `base` layer already applies to the element,
 * otherwise the token feeding it. Without the last step, `fontFamily` showed
 * empty for almost every element, even though each inherits a token (`body`
 * defines `var(--font-body)`, `h1` gets `var(--font-heading)` from base).
 */
export function effectiveValueFor(
  theme: Theme,
  element: string,
  definition: PropertyDef,
): string {
  const targets = targetList(element, definition)
  for (const target of targets) {
    const value = readRule(
      theme.layers.elements[target.selector],
      target.property,
    )
    if (value) return maybeResolveFontToken(theme, target.property, value)
  }
  for (const target of targets) {
    let found = ''
    for (const [ruleSelector, declarations] of Object.entries(
      theme.layers.base,
    )) {
      if (
        ruleSelector === target.selector ||
        baseRuleApplies(ruleSelector, element)
      ) {
        const value = readRule(declarations, target.property)
        if (value) found = value
      }
    }
    if (found) return maybeResolveFontToken(theme, target.property, found)
  }
  const quartoPart = quartoPartFor(element)
  if (quartoPart && definition.property === 'backgroundColor')
    return quartoPart.background
  if (quartoPart && definition.property === 'color') return 'var(--color-text)'
  if (definition.property === 'fontFamily') {
    if (MONO_ELEMENTS.has(element)) return theme.tokens.typography.fontMono
    if (HEADING_ELEMENTS.has(element))
      return theme.tokens.typography.fontHeading
    return theme.tokens.typography.fontBody
  }
  return ''
}

const MONO_ELEMENTS = new Set(['code', 'pre', 'kbd', 'samp'])
const HEADING_ELEMENTS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

/**
 * `var(--font-*)` in the family control becomes the token's real stack. The
 * raw var is truthful but useless in a stack select — and it is exactly what
 * base and elements store (`h1` inherits `var(--font-heading)`).
 */
function maybeResolveFontToken(
  theme: Theme,
  property: string,
  value: string,
): string {
  if (property !== 'fontFamily') return value
  const tokens = {
    'var(--font-body)': theme.tokens.typography.fontBody,
    'var(--font-heading)': theme.tokens.typography.fontHeading,
    'var(--font-mono)': theme.tokens.typography.fontMono,
  } as Record<string, string | undefined>
  return tokens[value.trim()] ?? value
}

/** Whether the displayed value is an own override (`elements`) or inherited from base. */
export function hasElementOverride(
  theme: Theme,
  element: string,
  definition: PropertyDef,
): boolean {
  return targetList(element, definition).some((target) =>
    Boolean(readRule(theme.layers.elements[target.selector], target.property)),
  )
}
