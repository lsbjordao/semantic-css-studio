import type { InteractionState } from '../theme/schema'
import { useStudioStore } from '../theme/store'
import { Field, SelectField, StepperField, TextField } from './Field'

const elements = ['a','button','input','textarea','select','summary','details']
const states: InteractionState[] = ['hover','focus','focus-visible','active','disabled','checked']

export function StateEditor() {
  const theme = useStudioStore((s) => s.theme)
  const element = useStudioStore((s) => s.selectedElement)
  const setElement = useStudioStore((s) => s.setSelectedElement)
  const setSpecimen = useStudioStore((s) => s.setSpecimen)
  const state = useStudioStore((s) => s.selectedState)
  const setState = useStudioStore((s) => s.setSelectedState)
  const setProperty = useStudioStore((s) => s.setStateProperty)
  const removeProperty = useStudioStore((s) => s.removeStateProperty)
  const selectedElement = elements.includes(element) ? element : 'button'
  const styles = theme.states[selectedElement]?.[state] ?? {}
  const change = (property: string, value: string) => value ? setProperty(selectedElement,state,property,value) : removeProperty(selectedElement,state,property)

  return <div className="editor-panel">
    <div className="panel-heading"><div><h2>Interaction states</h2><p>Style native pseudo-classes for interactive elements.</p></div></div>
    <div className="two-cols">
      <Field label="Element"><select aria-label="Element" value={selectedElement} onChange={(e) => { setElement(e.target.value); setSpecimen('Selector') }}>{elements.map((tag) => <option key={tag}>{tag}</option>)}</select></Field>
      <Field label="State"><select aria-label="State" value={state} onChange={(e) => setState(e.target.value as InteractionState)}>{states.map((item) => <option key={item}>{item}</option>)}</select></Field>
    </div>
    <div className="field-grid">
      <TextField label="Color" value={styles.color ?? ''} onChange={(value) => change('color', value)} />
      <TextField label="Background color" value={styles.backgroundColor ?? ''} onChange={(value) => change('backgroundColor', value)} />
      <TextField label="Border color" value={styles.borderColor ?? ''} onChange={(value) => change('borderColor', value)} />
      <TextField label="Outline" value={styles.outline ?? ''} onChange={(value) => change('outline', value)} />
      <StepperField label="Outline offset" value={styles.outlineOffset ?? ''} defaultUnit="px" step={1} onChange={(value) => change('outlineOffset', value)} />
      <TextField label="Transform" value={styles.transform ?? ''} onChange={(value) => change('transform', value)} />
      <StepperField label="Opacity" value={styles.opacity ?? ''} defaultUnit="" step={0.05} onChange={(value) => change('opacity', value)} />
      <SelectField label="Cursor" value={styles.cursor ?? ''} options={['auto','default','pointer','text','grab','not-allowed','help','progress','wait']} onChange={(value) => change('cursor', value)} />
      <TextField label="Accent color" value={styles.accentColor ?? ''} onChange={(value) => change('accentColor', value)} />
    </div>
  </div>
}
