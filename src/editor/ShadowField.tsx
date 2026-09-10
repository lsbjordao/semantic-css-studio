import { ColorField, Field, StepperField, TextField } from './Field'
import {
  defaultShadowLayer,
  defaultShadowValue,
  formatShadowLayers,
  parseShadowLayers,
  type ParsedShadow,
} from './shadowValue'

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
  const layers = parseShadowLayers(workingValue)
  const disabled = !workingValue || workingValue.trim() === 'none'
  const resolvedFromToken = Boolean(resolvedValue && resolvedValue !== value)

  const patch = (index: number, change: Partial<ParsedShadow>) => {
    if (!layers?.[index]) return
    const next = layers.map((layer, layerIndex) =>
      layerIndex === index ? { ...layer, ...change } : layer,
    )
    onChange(formatShadowLayers(next))
  }

  const addLayer = (inset: boolean) => {
    const next = [...(layers ?? []), defaultShadowLayer(inset)]
    onChange(formatShadowLayers(next))
  }

  const removeLayer = (index: number) => {
    if (!layers) return
    const next = layers.filter((_, layerIndex) => layerIndex !== index)
    onChange(next.length ? formatShadowLayers(next) : 'none')
  }

  return (
    <div className="shadow-field">
      <div className="shadow-field-head">
        <div>
          <span className="field-label">{label}</span>
          {hint && <small>{hint}</small>}
        </div>
        <label className="shadow-toggle">
          <input
            type="checkbox"
            checked={!disabled}
            onChange={(event) =>
              onChange(event.target.checked ? defaultShadowValue : 'none')
            }
          />
          enabled
        </label>
      </div>

      <div className="shadow-sample-wrap">
        <div
          className="shadow-sample"
          style={{ boxShadow: disabled ? 'none' : workingValue }}
        />
        <div className="shadow-sample-meta">
          <strong>{disabled ? 'No shadow' : 'Live preview'}</strong>
          {resolvedFromToken && (
            <small>
              Resolved from <code>{value}</code>. Visual changes create a
              concrete element override.
            </small>
          )}
          {usage && (
            <small>
              {usage.length
                ? `Used by: ${usage.join(', ')}`
                : 'Not currently referenced by any semantic selector.'}
            </small>
          )}
        </div>
      </div>

      {!disabled && layers ? (
        <>
          <div className="shadow-layers">
            {layers.map((layer, index) => (
              <div className="shadow-layer" key={`${index}-${layer.inset}`}>
                <div className="shadow-layer-head">
                  <strong>
                    {layer.inset ? 'Inner' : 'Outer'} shadow {index + 1}
                  </strong>
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => removeLayer(index)}
                  >
                    Remove
                  </button>
                </div>
                <div className="shadow-grid">
                  <StepperField
                    label="X"
                    value={layer.x}
                    defaultUnit="px"
                    step={1}
                    onChange={(next) => patch(index, { x: next })}
                  />
                  <StepperField
                    label="Y"
                    value={layer.y}
                    defaultUnit="px"
                    step={1}
                    onChange={(next) => patch(index, { y: next })}
                  />
                  <StepperField
                    label="Blur"
                    value={layer.blur}
                    defaultUnit="px"
                    step={1}
                    onChange={(next) => patch(index, { blur: next })}
                  />
                  <StepperField
                    label="Spread"
                    value={layer.spread}
                    defaultUnit="px"
                    step={1}
                    onChange={(next) => patch(index, { spread: next })}
                  />
                </div>
                <div className="shadow-bottom-grid">
                  <ColorField
                    label="Color"
                    value={layer.color}
                    onChange={(next) => patch(index, { color: next })}
                    hint="hex, rgb(), hsl() or a CSS variable"
                  />
                  <Field label="Type">
                    <label className="shadow-inset-control">
                      <input
                        type="checkbox"
                        checked={layer.inset}
                        onChange={(event) =>
                          patch(index, { inset: event.target.checked })
                        }
                      />{' '}
                      inner shadow
                    </label>
                  </Field>
                </div>
              </div>
            ))}
          </div>
          <div className="shadow-add-actions">
            <button
              type="button"
              className="secondary-action"
              onClick={() => addLayer(false)}
            >
              + outer shadow
            </button>
            <button
              type="button"
              className="secondary-action"
              onClick={() => addLayer(true)}
            >
              + inner shadow
            </button>
          </div>
          <TextField
            label="Raw box-shadow"
            value={value}
            onChange={onChange}
            hint="Advanced editing remains available; multiple shadows can be entered here."
          />
        </>
      ) : !disabled ? (
        <>
          <div className="shadow-complex-note">
            This is a complex or multi-layer shadow. It remains fully editable
            as raw CSS.
          </div>
          <TextField label="Raw box-shadow" value={value} onChange={onChange} />
          <button
            type="button"
            className="secondary-action"
            onClick={() => onChange(defaultShadowValue)}
          >
            Convert to editable single shadow
          </button>
        </>
      ) : null}
    </div>
  )
}
