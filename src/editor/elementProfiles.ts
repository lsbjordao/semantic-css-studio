import { fontStackOptions } from './fontOptions'

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
    { property: 'fontFamily', label: 'Font family', kind: 'select', options: [...fontStackOptions] },
    { property: 'fontSize', label: 'Font size', kind: 'size' },
    { property: 'fontWeight', label: 'Font weight', kind: 'select', options: ['100','200','300','400','500','600','700','800','900','normal','bold'] },
    { property: 'fontStyle', label: 'Font style', kind: 'select', options: ['normal','italic','oblique'] },
    { property: 'lineHeight', label: 'Line height', kind: 'size', defaultUnit: '', step: 0.05 },
    { property: 'letterSpacing', label: 'Letter spacing', kind: 'size', defaultUnit: 'em' },
    { property: 'textAlign', label: 'Text align', kind: 'select', options: ['left','center','right','justify','start','end'] },
    { property: 'textDecoration', label: 'Text decoration', kind: 'select', options: ['none','underline','overline','line-through'] },
    { property: 'textTransform', label: 'Text transform', kind: 'select', options: ['none','uppercase','lowercase','capitalize'] },
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
    { property: 'display', label: 'Display', kind: 'select', options: ['block','inline','inline-block','flex','inline-flex','grid','inline-grid','none','contents'] },
    { property: 'alignItems', label: 'Align items', kind: 'select', options: ['stretch','start','center','end','baseline'] },
    { property: 'justifyContent', label: 'Justify content', kind: 'select', options: ['start','center','end','space-between','space-around','space-evenly'] },
    { property: 'flexDirection', label: 'Flex direction', kind: 'select', options: ['row','row-reverse','column','column-reverse'] },
    { property: 'flexWrap', label: 'Flex wrap', kind: 'select', options: ['nowrap','wrap','wrap-reverse'] },
    { property: 'overflow', label: 'Overflow', kind: 'select', options: ['visible','hidden','clip','scroll','auto'] },
    { property: 'boxSizing', label: 'Box sizing', kind: 'select', options: ['content-box','border-box'] },
  ],
}

const surface: PropertyGroup = {
  title: 'Surface',
  properties: [
    { property: 'backgroundColor', label: 'Background color', kind: 'color' },
    { property: 'opacity', label: 'Opacity', kind: 'size', defaultUnit: '', step: 0.05 },
    { property: 'boxShadow', label: 'Box shadow', kind: 'shadow', hint: 'Edit a visual shadow or enter advanced multi-layer CSS.' },
  ],
}

const border: PropertyGroup = {
  title: 'Border',
  properties: [
    { property: 'borderWidth', label: 'Border width', kind: 'size', defaultUnit: 'px', step: 1 },
    { property: 'borderStyle', label: 'Border style', kind: 'select', options: ['none','solid','dashed','dotted','double','groove','ridge','inset','outset'] },
    { property: 'borderColor', label: 'Border color', kind: 'color' },
    { property: 'borderRadius', label: 'Border radius', kind: 'size' },
  ],
}

const logicalStartBorder: PropertyGroup = {
  title: 'Start border',
  properties: [
    { property: 'borderInlineStartWidth', label: 'Start border width', kind: 'size', defaultUnit: 'px', step: 1, hint: 'The vertical rule on the inline-start side in left-to-right text.' },
    { property: 'borderInlineStartStyle', label: 'Start border style', kind: 'select', options: ['none','solid','dashed','dotted','double'] },
    { property: 'borderInlineStartColor', label: 'Start border color', kind: 'color', hint: 'For blockquote this controls the vertical accent bar.' },
  ],
}

const media: PropertyGroup = {
  title: 'Media',
  properties: [
    { property: 'objectFit', label: 'Object fit', kind: 'select', options: ['fill','contain','cover','none','scale-down'] },
    { property: 'objectPosition', label: 'Object position' },
    { property: 'aspectRatio', label: 'Aspect ratio' },
  ],
}

const interaction: PropertyGroup = {
  title: 'Interaction',
  properties: [
    { property: 'cursor', label: 'Cursor', kind: 'select', options: ['auto','default','pointer','text','grab','not-allowed','help','progress','wait'] },
    { property: 'accentColor', label: 'Accent color', kind: 'color' },
  ],
}

const formControl: PropertyGroup = {
  title: 'Control',
  properties: [
    { property: 'backgroundColor', label: 'Control background', kind: 'color' },
    { property: 'color', label: 'Control text', kind: 'color' },
    { property: 'caretColor', label: 'Caret color', kind: 'color' },
    { property: 'borderWidth', label: 'Border width', kind: 'size', defaultUnit: 'px', step: 1 },
    { property: 'borderStyle', label: 'Border style', kind: 'select', options: ['none','solid','dashed','dotted','double'] },
    { property: 'borderColor', label: 'Border color', kind: 'color' },
    { property: 'borderRadius', label: 'Border radius', kind: 'size' },
  ],
}

function progressColors(element: string): PropertyGroup {
  return {
    title: 'Progress appearance',
    properties: [
      { property: 'appearance', label: 'Native appearance', kind: 'select', options: ['auto','none'] },
      {
        property: 'backgroundColor',
        label: 'Track color',
        kind: 'color',
        targets: [
          { selector: element, property: 'backgroundColor' },
          { selector: `${element}::-webkit-progress-bar`, property: 'backgroundColor' },
        ],
        hint: 'Track/background. The editor writes the WebKit part as well as the base element.',
      },
      {
        property: 'accentColor',
        label: 'Value color',
        kind: 'color',
        targets: [
          { selector: element, property: 'accentColor' },
          { selector: `${element}::-webkit-progress-value`, property: 'backgroundColor' },
          { selector: `${element}::-moz-progress-bar`, property: 'backgroundColor' },
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
      { property: 'appearance', label: 'Native appearance', kind: 'select', options: ['auto','none'] },
      {
        property: 'backgroundColor',
        label: 'Track color',
        kind: 'color',
        targets: [
          { selector: element, property: 'backgroundColor' },
          { selector: `${element}::-webkit-meter-bar`, property: 'backgroundColor' },
        ],
      },
      {
        property: 'accentColor',
        label: 'Optimum value color',
        kind: 'color',
        targets: [
          { selector: element, property: 'accentColor' },
          { selector: `${element}::-webkit-meter-optimum-value`, property: 'backgroundColor' },
          { selector: `${element}::-moz-meter-bar`, property: 'backgroundColor' },
        ],
      },
    ],
  }
}

const textElements = new Set([
  'body','p','a','strong','em','small','mark','del','ins','abbr','b','bdi','bdo','cite','data','dfn','i','q','s','span','sub','sup','time','u',
  'h1','h2','h3','h4','h5','h6','hgroup','blockquote','li','dt','dd','caption','th','td','label','legend','summary','figcaption','address','code','pre','kbd','samp','var','output',
])
const blockElements = new Set(['body','header','nav','main','section','article','aside','footer','address','search','hgroup','p','blockquote','ul','ol','dl','menu','pre','table','form','fieldset','figure','details','dialog'])
const sizedElements = new Set(['body','header','nav','main','section','article','aside','footer','blockquote','table','form','fieldset','input','textarea','select','button','progress','meter','img','picture','audio','video','iframe','embed','object','canvas','dialog','details'])
const surfacedElements = new Set(['body','header','nav','main','section','article','aside','footer','blockquote','pre','code','table','th','td','form','fieldset','input','textarea','select','button','details','dialog','mark','kbd'])
const borderedElements = new Set(['article','aside','blockquote','pre','table','th','td','fieldset','input','textarea','select','button','details','dialog','img','video','iframe','progress','meter','kbd'])
const mediaElements = new Set(['img','video','iframe','embed','object','canvas'])
const formElements = new Set(['input','textarea','select','button'])
const interactiveElements = new Set(['a','button','input','textarea','select','summary','details','progress','meter'])

export function propertyGroupsForElement(element: string): PropertyGroup[] {
  const groups: PropertyGroup[] = []

  if (textElements.has(element)) groups.push(typography)
  if (blockElements.has(element) || formElements.has(element)) groups.push(spacing)
  if (sizedElements.has(element)) groups.push(size)
  if (blockElements.has(element)) groups.push(layout)

  if (formElements.has(element)) groups.push(formControl)
  else {
    if (surfacedElements.has(element)) groups.push(surface)
    if (borderedElements.has(element)) groups.push(border)
  }

  if (element === 'blockquote' || element === 'aside') groups.push(logicalStartBorder)
  if (mediaElements.has(element)) groups.push(media)
  if (element === 'progress') groups.push(progressColors(element))
  if (element === 'meter') groups.push(meterColors(element))
  if (interactiveElements.has(element) && element !== 'progress' && element !== 'meter') groups.push(interaction)

  if (element === 'hr') {
    groups.push({
      title: 'Rule',
      properties: [
        { property: 'height', label: 'Thickness', kind: 'size', defaultUnit: 'px', step: 1 },
        { property: 'backgroundColor', label: 'Rule color', kind: 'color' },
        { property: 'borderWidth', label: 'Border width', kind: 'size', defaultUnit: 'px', step: 1 },
        { property: 'borderColor', label: 'Border color', kind: 'color' },
      ],
    })
  }

  if (groups.length === 0) groups.push(typography)
  return groups
}

export function targetList(element: string, definition: PropertyDef): PropertyTarget[] {
  return definition.targets ?? [{ selector: element, property: definition.property }]
}
