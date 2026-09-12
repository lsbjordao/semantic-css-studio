import { useCallback, useEffect, useMemo, useRef } from 'react'
import { compileTheme } from '../compiler'
import { quartoCss } from '../export/quarto'
import { quartoPartAt } from '../theme/quartoParts'
import { specimenHtml } from './specimens'
import { supportedElements } from '../theme/schema'
import { useStudioStore } from '../theme/store'

const viewportWidths = {
  desktop: 1440,
  tablet: 768,
  mobile: 390,
} as const

const inspectorCss = `
[data-studio-selected="true"] {
  outline: 2px dashed #7c3aed !important;
  outline-offset: 3px;
}
a, button, summary, input, select, textarea, label, option {
  cursor: pointer;
}
`

function setDocumentThemeMode(doc: Document, mode: 'light' | 'dark' | 'auto') {
  if (mode === 'auto') doc.documentElement.removeAttribute('data-theme')
  else doc.documentElement.setAttribute('data-theme', mode)
}

function markSelectedElement(doc: Document, selector: string) {
  doc
    .querySelectorAll('[data-studio-selected]')
    .forEach((node) => node.removeAttribute('data-studio-selected'))
  try {
    if (!selector) return
    doc
      .querySelectorAll(selector)
      .forEach((node) => node.setAttribute('data-studio-selected', 'true'))
  } catch {
    // The current catalog uses tag selectors, but keeping this defensive makes
    // future custom selectors harmless to the inspector.
  }
}

export function PreviewFrame() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const documentCleanupRef = useRef<(() => void) | null>(null)
  const selectedElementRef = useRef('article')

  const theme = useStudioStore((state) => state.theme)
  const previewMode = useStudioStore((state) => state.previewMode)
  const viewport = useStudioStore((state) => state.viewport)
  const customWidth = useStudioStore((state) => state.customWidth)
  const specimen = useStudioStore((state) => state.specimen)
  const selectedElement = useStudioStore((state) => state.selectedElement)
  const section = useStudioStore((state) => state.section)
  const outlinedElement = section === 'Elements' ? selectedElement : ''
  const setSelectedElement = useStudioStore((state) => state.setSelectedElement)
  const setSection = useStudioStore((state) => state.setSection)

  selectedElementRef.current = outlinedElement

  const width = viewport === 'custom' ? customWidth : viewportWidths[viewport]
  const isQuarto = specimen === 'Quarto'
  const css = useMemo(
    () => (isQuarto ? quartoCss(theme, previewMode) : compileTheme(theme)),
    [theme, isQuarto, previewMode],
  )

  // The document structure deliberately does NOT contain the compiled theme.
  // Theme edits are injected into #studio-theme below, so numeric/color changes
  // do not reload the iframe and therefore do not reset scroll position.
  const documentHtml = useMemo(() => {
    const storyElement = specimen === 'Selector' ? selectedElement : 'article'
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style id="studio-theme"></style><style id="studio-inspector">${inspectorCss}</style></head><body>${specimenHtml(specimen, storyElement)}</body></html>`
  }, [specimen, selectedElement])

  const installInspector = useCallback(() => {
    const doc = iframeRef.current?.contentDocument
    if (!doc) return

    documentCleanupRef.current?.()

    const onClick = (event: MouseEvent) => {
      // Elements inside the iframe belong to a different Window realm, so
      // `event.target instanceof Element` is false in the parent application.
      // Duck-typing `tagName` keeps inspector clicks reliable across realms.
      const target = event.target as Element | null
      if (!target || typeof target.tagName !== 'string') return

      const part = isQuarto ? quartoPartAt(target) : undefined
      if (part) {
        event.preventDefault()
        event.stopPropagation()
        setSelectedElement(part.selector)
        setSection('Elements')
        return
      }

      let current: Element | null = target
      while (current) {
        const tag = current.tagName.toLowerCase()
        if (
          supportedElements.includes(tag as (typeof supportedElements)[number])
        ) {
          // Inspector clicks select the element; they do not navigate, submit,
          // toggle a disclosure, or change the current story/scroll position.
          event.preventDefault()
          event.stopPropagation()
          setSelectedElement(tag)
          setSection('Elements')
          return
        }
        current = current.parentElement
      }
    }

    doc.addEventListener('click', onClick, true)
    documentCleanupRef.current = () =>
      doc.removeEventListener('click', onClick, true)
  }, [isQuarto, setSection, setSelectedElement])

  const syncFrame = useCallback(() => {
    const doc = iframeRef.current?.contentDocument
    if (!doc) return

    const themeStyle = doc.getElementById('studio-theme')
    if (themeStyle) themeStyle.textContent = css
    const inspectorStyle = doc.getElementById('studio-inspector')
    if (inspectorStyle) inspectorStyle.textContent = inspectorCss
    setDocumentThemeMode(doc, previewMode)
    markSelectedElement(doc, selectedElementRef.current)
    installInspector()
  }, [css, installInspector, previewMode])

  // Live CSS injection. No iframe reload, no flicker, no scroll reset.
  useEffect(() => {
    const doc = iframeRef.current?.contentDocument
    const themeStyle = doc?.getElementById('studio-theme')
    if (themeStyle) themeStyle.textContent = css
  }, [css])

  // Dark/light/auto is also changed in-place instead of rebuilding srcDoc.
  useEffect(() => {
    const doc = iframeRef.current?.contentDocument
    if (doc) setDocumentThemeMode(doc, previewMode)
  }, [previewMode])

  // Selection outlines update in-place. On All HTML/Kitchen Sink this does not
  // alter the document structure, so the user's current scroll position stays put.
  useEffect(() => {
    const doc = iframeRef.current?.contentDocument
    if (doc) markSelectedElement(doc, outlinedElement)
  }, [outlinedElement])

  useEffect(() => () => documentCleanupRef.current?.(), [])

  return (
    <div className="preview-stage" aria-label="Theme preview">
      <div className="preview-width-label">{Math.round(width)} px</div>
      <div className="preview-shell" style={{ width: `${width}px` }}>
        <iframe
          ref={iframeRef}
          title={`${theme.metadata.name} ${specimen} preview`}
          sandbox="allow-same-origin"
          src={
            isQuarto
              ? `${import.meta.env.BASE_URL}previews/quarto.html`
              : undefined
          }
          srcDoc={isQuarto ? undefined : documentHtml}
          onLoad={syncFrame}
        />
      </div>
    </div>
  )
}
