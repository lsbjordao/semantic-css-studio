import { colorTokenKeys, type ColorTokenKey, type ThemeTokens } from '../theme/schema'
import { useStudioStore } from '../theme/store'
import { Field, NativeSelectField, StepperField, TextField } from './Field'
import { fontPairings, fontStackOptions, type FontPairingName } from './fontOptions'
import { ShadowField } from './ShadowField'

const colorLabels: Record<ColorTokenKey, string> = {
  background: 'Background', surface: 'Surface', surfaceAlt: 'Surface alt', text: 'Text', textMuted: 'Muted text',
  primary: 'Primary', primaryHover: 'Primary hover', primaryText: 'Primary text', secondary: 'Secondary', border: 'Border',
  success: 'Success', warning: 'Warning', danger: 'Danger', codeBackground: 'Code background', codeText: 'Code text',
}

export function ColorsEditor() {
  const theme = useStudioStore((s) => s.theme)
  const mode = useStudioStore((s) => s.editMode)
  const setMode = useStudioStore((s) => s.setEditMode)
  const setColor = useStudioStore((s) => s.setColor)
  const getValue = (key: ColorTokenKey) => mode === 'dark' ? theme.modes.dark?.colors[key] ?? theme.tokens.colors[key] : theme.tokens.colors[key]

  return <div className="editor-panel">
    <div className="panel-heading"><div><h2>Colors</h2><p>Edit the semantic palette.</p></div><div className="segmented"><button className={mode === 'light' ? 'active' : ''} onClick={() => setMode('light')}>Light</button><button className={mode === 'dark' ? 'active' : ''} onClick={() => setMode('dark')}>Dark</button></div></div>
    <div className="color-grid">
      {colorTokenKeys.map((key) => {
        const value = getValue(key)
        return <Field key={key} label={colorLabels[key]}>
          <div className="color-control"><input aria-label={`${colorLabels[key]} picker`} type="color" value={/^#[0-9a-f]{6}$/i.test(value) ? value : '#000000'} onChange={(e) => setColor(key, e.target.value)} /><input aria-label={`${colorLabels[key]} value`} type="text" value={value} onChange={(e) => setColor(key, e.target.value)} /></div>
        </Field>
      })}
    </div>
  </div>
}

const stepperCategories = new Set<keyof ThemeTokens>(['spacing', 'layout', 'radius'])
const typographySteppers = new Set(['fontSizeBase', 'fontSizeXs', 'fontSizeSm', 'fontSizeMd', 'fontSizeLg', 'fontSizeXl', 'lineHeightBody', 'lineHeightHeading'])

function GroupEditorInner<K extends Exclude<keyof ThemeTokens, 'colors'>>({ category, labels }: { category: K; labels: Record<string, string> }) {
  const theme = useStudioStore((s) => s.theme)
  const setToken = useStudioStore((s) => s.setToken)
  const group = theme.tokens[category] as unknown as Record<string, string>

  return <div className="field-grid">
    {Object.entries(group).map(([key, value]) => {
      const label = labels[key] ?? key
      const onChange = (next: string) => setToken(category, key as keyof ThemeTokens[K], next)
      const useStepper = stepperCategories.has(category) || (category === 'typography' && typographySteppers.has(key))
      const unitless = category === 'typography' && key.startsWith('lineHeight')
      const fontToken = category === 'typography' && ['fontBody', 'fontHeading', 'fontMono'].includes(key)

      if (fontToken) {
        return <NativeSelectField key={key} label={label} value={value} options={fontStackOptions} onChange={onChange} hint="Choose a portable CSS font stack or keep a custom value." />
      }

      return useStepper
        ? <StepperField key={key} label={label} value={value} onChange={onChange} defaultUnit={unitless ? '' : 'rem'} step={unitless ? 0.05 : undefined} />
        : <TextField key={key} label={label} value={value} onChange={onChange} />
    })}
  </div>
}

function TypographyControls() {
  const setToken = useStudioStore((s) => s.setToken)

  const applyPairing = (name: FontPairingName) => {
    const pairing = fontPairings[name]
    setToken('typography', 'fontBody', pairing.body)
    setToken('typography', 'fontHeading', pairing.heading)
    setToken('typography', 'fontMono', pairing.mono)
  }

  return <div className="editor-panel">
    <div className="panel-heading"><div><h2>Typography</h2><p>Families, scale, weights and line height. Numeric values include − / + controls.</p></div></div>
    <div className="field-grid">
      <Field label="Font pairing" hint="Apply a body + heading + monospace combination in one step.">
        <select aria-label="Font pairing" defaultValue="" onChange={(e) => { if (e.target.value) applyPairing(e.target.value as FontPairingName) }}>
          <option value="">Choose a font pairing…</option>
          {Object.keys(fontPairings).map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
      </Field>
      <div className="field pairing-note">
        <span className="field-label">Preview behavior</span>
        <small>Font choices use resilient CSS stacks, so the generated theme stays portable even without loading webfonts.</small>
      </div>
    </div>
    <GroupEditorInner category="typography" labels={{ fontBody: 'Body font', fontHeading: 'Heading font', fontMono: 'Monospace font', fontSizeBase: 'Base size', fontSizeXs: 'XS size', fontSizeSm: 'Small size', fontSizeMd: 'Medium size', fontSizeLg: 'Large size', fontSizeXl: 'XL size', lineHeightBody: 'Body line height', lineHeightHeading: 'Heading line height', fontWeightNormal: 'Normal weight', fontWeightMedium: 'Medium weight', fontWeightBold: 'Bold weight' }} />
  </div>
}

function GroupEditor<K extends Exclude<keyof ThemeTokens, 'colors'>>({ title, description, category, labels }: { title: string; description: string; category: K; labels: Record<string, string> }) {
  return <div className="editor-panel"><div className="panel-heading"><div><h2>{title}</h2><p>{description}</p></div></div><GroupEditorInner category={category} labels={labels} /></div>
}

export const TypographyEditor = () => <TypographyControls />
export const SpacingEditor = () => <GroupEditor title="Spacing" description="A reusable spacing scale with direct − / + adjustment." category="spacing" labels={{ spaceXs: 'XS', spaceSm: 'Small', spaceMd: 'Medium', spaceLg: 'Large', spaceXl: 'XL', space2xl: '2XL' }} />
export const LayoutEditor = () => <GroupEditor title="Layout" description="Document width and page rhythm." category="layout" labels={{ contentWidth: 'Content width', wideWidth: 'Wide width', bodyPadding: 'Body padding', sectionSpacing: 'Section spacing', headerWidth: 'Header width', footerWidth: 'Footer width' }} />
export const RadiusEditor = () => <GroupEditor title="Radius" description="Corner radius tokens." category="radius" labels={{ radiusSm: 'Small', radiusMd: 'Medium', radiusLg: 'Large', radiusFull: 'Full' }} />
export function ShadowsEditor() {
  const theme = useStudioStore((s) => s.theme)
  const setToken = useStudioStore((s) => s.setToken)
  const labels = { shadowSm: 'Small shadow', shadowMd: 'Medium shadow', shadowLg: 'Large shadow' } as const

  const usageFor = (token: keyof typeof labels) => {
    const cssVar = `var(--${token.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)})`
    const selectors = new Set<string>()
    const collect = (rules: Record<string, Record<string, string>>, prefix = '') => {
      for (const [selector, styles] of Object.entries(rules)) {
        if (Object.values(styles).some((value) => value.includes(cssVar))) {
          selectors.add(prefix ? `${selector} (${prefix})` : selector)
        }
      }
    }

    collect(theme.layers.base)
    collect(theme.layers.elements)
    collect(theme.layers.states)
    for (const [breakpoint, rules] of Object.entries(theme.layers.responsive)) {
      collect(rules, breakpoint)
    }
    return [...selectors].sort()
  }

  return <div className="editor-panel">
    <div className="panel-heading"><div><h2>Shadows</h2><p>Edit reusable elevation tokens visually. Every token has its own live sample, even when the current document does not use it yet.</p></div></div>
    <div className="shadow-token-list">
      {(Object.keys(labels) as Array<keyof typeof labels>).map((key) => <ShadowField
        key={key}
        label={labels[key]}
        value={theme.tokens.shadow[key]}
        usage={usageFor(key)}
        onChange={(value) => setToken('shadow', key, value)}
      />)}
    </div>
  </div>
}
