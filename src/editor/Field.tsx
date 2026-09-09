import type { ReactNode } from 'react'
import { adjustCssNumericValue, isSteppableCssNumericValue } from './cssValue'

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return <div className="field"><span className="field-label">{label}</span>{children}{hint && <small>{hint}</small>}</div>
}

export function TextField({ label, value, onChange, placeholder, hint }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; hint?: string }) {
  return <Field label={label} hint={hint}><input aria-label={label} type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} /></Field>
}

export function ColorField({
  label,
  value,
  onChange,
  hint,
  swatch,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  hint?: string
  swatch?: string
}) {
  const swatchValue = swatch ?? (/^#[0-9a-f]{6}$/i.test(value) ? value : '#000000')
  return <Field label={label} hint={hint}>
    <div className="color-control">
      <input aria-label={`${label} picker`} type="color" value={swatchValue} onChange={(e) => onChange(e.target.value)} />
      <input aria-label={`${label} value`} type="text" value={value} placeholder="hex / rgb / var(--token)" onChange={(e) => onChange(e.target.value)} />
    </div>
  </Field>
}

export function NativeSelectField({
  label,
  value,
  options,
  onChange,
  hint,
}: {
  label: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
  hint?: string
}) {
  const values = value && !options.includes(value) ? [value, ...options] : [...options]
  return <Field label={label} hint={hint}>
    <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>
      {values.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </Field>
}

export function StepperField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  defaultUnit = 'rem',
  step,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  hint?: string
  defaultUnit?: string
  step?: number
}) {
  const canStep = isSteppableCssNumericValue(value)
  return <Field label={label} hint={hint}>
    <div className="stepper-control">
      <button type="button" aria-label={`Decrease ${label}`} disabled={!canStep} onClick={() => onChange(adjustCssNumericValue(value, -1, defaultUnit, step))}>−</button>
      <input aria-label={`${label} value`} type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      <button type="button" aria-label={`Increase ${label}`} disabled={!canStep} onClick={() => onChange(adjustCssNumericValue(value, 1, defaultUnit, step))}>+</button>
    </div>
  </Field>
}

export function SelectField({ label, value, options, onChange, hint }: { label: string; value: string; options: string[]; onChange: (value: string) => void; hint?: string }) {
  const values = value && !options.includes(value) ? [value, ...options] : options
  return <Field label={label} hint={hint}>
    <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">inherit / unset</option>
      {values.filter(Boolean).map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </Field>
}
