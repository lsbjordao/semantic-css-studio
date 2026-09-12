export const fontStackOptions = [
  'Inter, ui-sans-serif, system-ui, sans-serif',
  '-apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, "Nimbus Sans L", Roboto, "Noto Sans", "Segoe UI", Arial, Helvetica, "Helvetica Neue", sans-serif',
  'Arial, Helvetica, sans-serif',
  'Verdana, Geneva, sans-serif',
  'Trebuchet MS, Trebuchet, Arial, sans-serif',
  'Georgia, Cambria, Times New Roman, serif',
  'Charter, Georgia, Times New Roman, serif',
  'Baskerville, "Times New Roman", serif',
  'Palatino, "Palatino Linotype", "Book Antiqua", serif',
  'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  'Consolas, Menlo, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  'Courier New, Courier, monospace',
] as const

export const fontPairings = {
  'System Sans': {
    body: 'Inter, ui-sans-serif, system-ui, sans-serif',
    heading: 'Inter, ui-sans-serif, system-ui, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  },
  'Simple.css style': {
    body: '-apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, "Nimbus Sans L", Roboto, "Noto Sans", "Segoe UI", Arial, Helvetica, "Helvetica Neue", sans-serif',
    heading:
      '-apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, "Nimbus Sans L", Roboto, "Noto Sans", "Segoe UI", Arial, Helvetica, "Helvetica Neue", sans-serif',
    mono: 'Consolas, Menlo, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  },
  'Editorial Serif': {
    body: 'Georgia, Cambria, Times New Roman, serif',
    heading: 'Georgia, Cambria, Times New Roman, serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  },
  'Academic Serif': {
    body: 'Charter, Georgia, Times New Roman, serif',
    heading: 'Charter, Georgia, Times New Roman, serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  },
  'Serif body / Sans headings': {
    body: 'Georgia, Cambria, Times New Roman, serif',
    heading: 'Inter, ui-sans-serif, system-ui, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  },
  'Sans body / Serif headings': {
    body: 'Inter, ui-sans-serif, system-ui, sans-serif',
    heading: 'Baskerville, "Times New Roman", serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  },
  'Mono UI': {
    body: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    heading: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  },
} as const

export type FontPairingName = keyof typeof fontPairings
