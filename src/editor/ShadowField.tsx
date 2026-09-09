import { ColorField, Field, StepperField, TextField } from './Field'
import { defaultShadowValue, formatShadowValue, parseShadowValue, type ParsedShadow } from './shadowValue'

export function ShadowField({
  label,
  value,
  resolvedValue,
  onChange,
  hint,
  usage,
}: {
  label: string
  value: string
  resolvedValue?: string
  onChange: (value: string) => void
  hint?: string
  usage?: string[]
}) {
  const workingValue = resolvedValue ?? value
  const parsed = parseShadowValue(workingValue)
  const disabled = !workingValue || workingValue.trim() === 'none'
  const resolvedFromToken = Boolean(resolvedValue && resolvedValue !== value)

  const patch = (change: Partial<ParsedShadow>) => {
    const base = parsed ?? parseShadowValue(defaultShadowValue)
    if (!base) return
    onChange(formatShadowValue({ ...base, ...change }))
  }

  return <div className="shadow-field">
    <div className="shadow-field-head">
      <div>
        <span className="field-label">{label}</span>
        {hint && <small>{hint}</small>}
      </div>
      <label className="shadow-toggle">
        <input
          type="checkbox"
          checked={!disabled}
          onChange={(event) => onChange(event.target.checked ? defaultShadowValue : 'none')}
        />
        enabled
      </label>
    </div>

    <div className="shadow-sample-wrap">
      <div className="shadow-sample" style={{ boxShadow: disabled ? 'none' : workingValue }} />
      <div className="shadow-sample-meta">
        <strong>{disabled ? 'No shadow' : 'Live preview'}</strong>
        {resolvedFromToken && <small>Resolved from <code>{value}</code>. Visual changes create a concrete element override.</small>}
        {usage && <small>{usage.length ? `Used by: ${usage.join(', ')}` : 'Not currently referenced by any semantic selector.'}</small>}
      </div>
    </div>

    {!disabled && parsed ? <>
      <div className="shadow-grid">
        <StepperField label="X" value={parsed.x} defaultUnit="px" step={1} onChange={(next) => patch({ x: next })} />
        <StepperField label="Y" value={parsed.y} defaultUnit="px" step={1} onChange={(next) => patch({ y: next })} />
        <StepperField label="Blur" value={parsed.blur} defaultUnit="px" step={1} onChange={(next) => patch({ blur: next })} />
        <StepperField label="Spread" value={parsed.spread} defaultUnit="px" step={1} onChange={(next) => patch({ spread: next })} />
      </div>
      <div className="shadow-bottom-grid">
        <ColorField label="Color" value={parsed.color} onChange={(next) => patch({ color: next })} hint="hex, rgb(), hsl() or a CSS variable" />
        <Field label="Inset">
          <label className="shadow-inset-control"><input type="checkbox" checked={parsed.inset} onChange={(event) => patch({ inset: event.target.checked })} /> inner shadow</label>
        </Field>
      </div>
      <TextField label="Raw box-shadow" value={value} onChange={onChange} hint="Advanced editing remains available; multiple shadows can be entered here." />
    </> : !disabled ? <>
      <div className="shadow-complex-note">This is a complex or multi-layer shadow. It remains fully editable as raw CSS.</div>
      <TextField label="Raw box-shadow" value={value} onChange={onChange} />
      <button type="button" className="secondary-action" onClick={() => onChange(defaultShadowValue)}>Convert to editable single shadow</button>
    </> : null}
  </div>
}
