import { execFileSync } from 'node:child_process'
import {
  cpSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const expectedVersion = '1.10.18'
const version = execFileSync('quarto', ['--version'], {
  encoding: 'utf8',
}).trim()
if (version !== expectedVersion) {
  throw new Error(
    `Expected Quarto ${expectedVersion}, received ${version}. Update the reference version labels and validate before regenerating with a different version.`,
  )
}
const staging = mkdtempSync(join(tmpdir(), 'studio-quarto-'))
try {
  cpSync(join(root, 'examples/quarto-reference'), staging, { recursive: true })
  execFileSync('quarto', ['render'], { cwd: staging, stdio: 'inherit' })
  const dom = new JSDOM(readFileSync(join(staging, '_site/index.html'), 'utf8'))
  const doc = dom.window.document
  // This is a visual reference. The editor's sandbox never runs Quarto JS.
  doc.querySelectorAll('script').forEach((node) => node.remove())
  for (const element of doc.querySelectorAll('*')) {
    for (const attribute of [...element.attributes]) {
      if (attribute.name.startsWith('on'))
        element.removeAttribute(attribute.name)
    }
  }
  const theme = doc.createElement('style')
  theme.id = 'studio-theme'
  doc.head.append(theme)
  const inspector = doc.createElement('style')
  inspector.id = 'studio-inspector'
  doc.head.append(inspector)
  const output = join(root, 'public/previews')
  mkdirSync(output, { recursive: true })
  writeFileSync(join(output, 'quarto.html'), dom.serialize())
} finally {
  rmSync(staging, { recursive: true, force: true })
}
