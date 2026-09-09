import { useEffect } from 'react'
import { AccessibilityEditor } from '../editor/AccessibilityEditor'
import { BaseRulesEditor } from '../editor/BaseRulesEditor'
import { EditorSidebar } from '../editor/EditorSidebar'
import { ElementEditor } from '../editor/ElementEditor'
import { StateEditor } from '../editor/StateEditor'
import { ColorsEditor, LayoutEditor, RadiusEditor, ShadowsEditor, SpacingEditor, TypographyEditor } from '../editor/TokenEditors'
import { PreviewFrame } from '../preview/PreviewFrame'
import { PreviewToolbar } from '../preview/PreviewToolbar'
import { useStudioStore } from '../theme/store'
import { Topbar } from './Topbar'

function ActiveEditor() {
  const section = useStudioStore((s) => s.section)
  switch (section) {
    case 'Colors': return <ColorsEditor />
    case 'Typography': return <TypographyEditor />
    case 'Spacing': return <SpacingEditor />
    case 'Layout': return <LayoutEditor />
    case 'Radius': return <RadiusEditor />
    case 'Shadows': return <ShadowsEditor />
    case 'Base': return <BaseRulesEditor />
    case 'Elements': return <ElementEditor />
    case 'States': return <StateEditor />
    case 'Accessibility': return <AccessibilityEditor />
  }
}

export default function App() {
  const undo = useStudioStore((s) => s.undo)
  const redo = useStudioStore((s) => s.redo)
  const notice = useStudioStore((s) => s.notice)
  const clearNotice = useStudioStore((s) => s.clearNotice)

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isTyping = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.tagName === 'SELECT'
      if (isTyping) return
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault()
        if (event.shiftKey) redo()
        else undo()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [redo, undo])

  useEffect(() => {
    if (!notice) return
    const id = window.setTimeout(clearNotice, 1800)
    return () => window.clearTimeout(id)
  }, [notice, clearNotice])

  return <div className="studio-app">
    <Topbar />
    <div className="studio-body">
      <EditorSidebar />
      <section className="editor-pane"><ActiveEditor /></section>
      <main className="preview-pane"><PreviewToolbar /><PreviewFrame /></main>
    </div>
    {notice && <div className="toast" role="status">{notice}</div>}
  </div>
}
