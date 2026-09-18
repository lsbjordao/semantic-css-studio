import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const target = join(root, 'scripts', 'add-typesafe-preset.ts')

let source = readFileSync(target, 'utf8')

const replacements: Array<[string, string]> = [
  [
    'a warm, code-native visual system inspired by the public TypeSafe.ai brand.',
    'a pink-forward, code-native visual system inspired by the public TypeSafe.ai brand.',
  ],
  [
    "'Warm parchment, Space Mono headings and precise code-native surfaces inspired by TypeSafe.ai.'",
    "'Soft pink, powder-blue accents, Space Mono headings and precise code-native surfaces inspired by TypeSafe.ai.'",
  ],
  ["background: '#f1e7d5'", "background: '#f7e6ed'"],
  ["surface: '#fffaf1'", "surface: '#fff9f5'"],
  ["surfaceAlt: '#e6dac6'", "surfaceAlt: '#efbfd1'"],
  ["text: '#171713'", "text: '#181418'"],
  ["textMuted: '#625e55'", "textMuted: '#655a62'"],
  ["primary: '#171713'", "primary: '#181418'"],
  ["primaryHover: '#36362f'", "primaryHover: '#473640'"],
  ["primaryText: '#f7efe2'", "primaryText: '#fff8fb'"],
  ["secondary: '#7a725f'", "secondary: '#6e84b3'"],
  ["border: '#bdb3a2'", "border: '#c89bb0'"],
  ["success: '#31715f'", "success: '#5c7a34'"],
  ["warning: '#8a650f'", "warning: '#8d6411'"],
  ["danger: '#a33a2b'", "danger: '#a33655'"],
  ["codeBackground: '#171713'", "codeBackground: '#181418'"],
  ["codeText: '#f7efe2'", "codeText: '#fff8fb'"],
  ["shadowSm: '0 1px 0 rgb(23 23 19 / 0.12)'", "shadowSm: '0 1px 0 rgb(24 20 24 / 0.14)'"],
  ["shadowMd: '0 3px 0 rgb(23 23 19 / 0.10)'", "shadowMd: '0 3px 0 rgb(24 20 24 / 0.11)'"],
  ["shadowLg: '0 6px 0 rgb(23 23 19 / 0.08)'", "shadowLg: '0 6px 0 rgb(24 20 24 / 0.09)'"],
  ["background: '#0c0c0a'", "background: '#171014'"],
  ["surface: '#151512'", "surface: '#21171d'"],
  ["surfaceAlt: '#20201b'", "surfaceAlt: '#3a202e'"],
  ["text: '#f3eadc'", "text: '#f8eef3'"],
  ["textMuted: '#a9a392'", "textMuted: '#b8a6b0'"],
  ["primary: '#f3eadc'", "primary: '#f1a6c4'"],
  ["primaryHover: '#ffffff'", "primaryHover: '#ffc4dc'"],
  ["primaryText: '#0c0c0a'", "primaryText: '#171014'"],
  ["secondary: '#b8ad93'", "secondary: '#9db4dc'"],
  ["border: '#48463e'", "border: '#70455a'"],
  ["success: '#7fc4aa'", "success: '#9bc96a'"],
  ["warning: '#d5b55d'", "warning: '#e2bd62'"],
  ["danger: '#e08372'", "danger: '#ef8ca7'"],
  ["codeBackground: '#050504'", "codeBackground: '#0c080a'"],
  ["codeText: '#f3eadc'", "codeText: '#fff4f8'"],
]

for (const [from, to] of replacements) {
  if (!source.includes(from)) {
    throw new Error(`TypeSafe retune anchor not found: ${from}`)
  }
  source = source.replace(from, to)
}

writeFileSync(target, source)
console.log('Retuned TypeSafe generator to the pink / powder-blue brand palette.')
