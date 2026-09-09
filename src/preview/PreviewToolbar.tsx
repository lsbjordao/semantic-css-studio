import { useStudioStore, type PreviewMode, type SpecimenName, type ViewportName } from '../theme/store'

const specimens: SpecimenName[] = ['Selector', 'Overview', 'Typography', 'Content', 'Forms', 'Tables', 'Code', 'All HTML', 'Kitchen Sink']
const viewports: Array<{ name: ViewportName; label: string }> = [
  { name: 'desktop', label: 'Desktop' },
  { name: 'tablet', label: 'Tablet' },
  { name: 'mobile', label: 'Mobile' },
  { name: 'custom', label: 'Custom' },
]
const modes: PreviewMode[] = ['light', 'dark', 'auto']

export function PreviewToolbar() {
  const specimen = useStudioStore((s) => s.specimen)
  const setSpecimen = useStudioStore((s) => s.setSpecimen)
  const viewport = useStudioStore((s) => s.viewport)
  const setViewport = useStudioStore((s) => s.setViewport)
  const customWidth = useStudioStore((s) => s.customWidth)
  const setCustomWidth = useStudioStore((s) => s.setCustomWidth)
  const mode = useStudioStore((s) => s.previewMode)
  const setMode = useStudioStore((s) => s.setPreviewMode)
  const selectedElement = useStudioStore((s) => s.selectedElement)

  return (
    <div className="preview-toolbar">
      <label className="compact-field">
        <span>Story</span>
        <select value={specimen} onChange={(e) => setSpecimen(e.target.value as SpecimenName)}>
          {specimens.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      {specimen === 'Selector' && <div className="preview-selector-badge">&lt;{selectedElement}&gt;</div>}
      <div className="preview-hint">Click an element in the preview to edit that selector.</div>
      <div className="segmented" aria-label="Preview viewport">
        {viewports.map((item) => (
          <button key={item.name} className={viewport === item.name ? 'active' : ''} onClick={() => setViewport(item.name)}>{item.label}</button>
        ))}
      </div>
      {viewport === 'custom' && (
        <div className="custom-width"><span>Width</span><div className="mini-stepper"><button type="button" aria-label="Decrease preview width" onClick={() => setCustomWidth(customWidth - 20)}>−</button><input type="number" min="280" max="1800" value={customWidth} onChange={(e) => setCustomWidth(Number(e.target.value))} /><button type="button" aria-label="Increase preview width" onClick={() => setCustomWidth(customWidth + 20)}>+</button></div></div>
      )}
      <div className="segmented" aria-label="Preview color mode">
        {modes.map((item) => (
          <button key={item} className={mode === item ? 'active' : ''} onClick={() => setMode(item)}>{item[0].toUpperCase() + item.slice(1)}</button>
        ))}
      </div>
    </div>
  )
}
