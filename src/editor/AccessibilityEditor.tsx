import { contrastGrade, contrastRatio } from '../validators/contrast'
import { useStudioStore } from '../theme/store'

function Metric({ label, foreground, background }: { label: string; foreground: string; background: string }) {
  const ratio = contrastRatio(foreground, background)
  const grade = contrastGrade(ratio)
  return <div className="contrast-card"><div className="swatches"><span style={{background}}/><span style={{background:foreground}}/></div><div><strong>{label}</strong><p>{ratio ? `${ratio.toFixed(2)}:1` : 'Non-hex value'}</p></div><span className={`badge ${grade.aa ? 'pass' : 'fail'}`}>{grade.label}</span></div>
}

export function AccessibilityEditor() {
  const theme = useStudioStore((s) => s.theme)
  const mode = useStudioStore((s) => s.editMode)
  const base = theme.tokens.colors
  const dark = theme.modes.dark?.colors ?? {}
  const c = (key: keyof typeof base) => mode === 'dark' ? dark[key] ?? base[key] : base[key]
  const hasFocus = Object.entries(theme.layers.states).some(([selector, styles]) => selector.endsWith(':focus-visible') && Object.keys(styles).length > 0)

  return <div className="editor-panel">
    <div className="panel-heading"><div><h2>Accessibility</h2><p>Basic contrast and focus checks for the current palette.</p></div></div>
    <div className="contrast-list"><Metric label="Text / background" foreground={c('text')} background={c('background')} /><Metric label="Primary / background" foreground={c('primary')} background={c('background')} /><Metric label="Button text / primary" foreground={c('primaryText')} background={c('primary')} /></div>
    <div className="audit-row"><span className={`status-dot ${hasFocus ? 'ok' : 'bad'}`}/><div><strong>Focus visibility</strong><p>{hasFocus ? 'At least one :focus-visible rule is configured.' : 'No :focus-visible rules found.'}</p></div></div>
    <div className="audit-note">WCAG AA normal text target: 4.5:1. AAA target: 7:1.</div>
  </div>
}
