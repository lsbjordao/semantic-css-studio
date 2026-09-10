import { useEffect, useState } from 'react'
import {
  colorTokenKeys,
  type ColorTokenKey,
  type FontRole,
  type ThemeTokens,
} from '../theme/schema'
import { useStudioStore } from '../theme/store'
import { googleFontsHref } from '../compiler/webfonts'
import { Field, NativeSelectField, StepperField, TextField } from './Field'
import {
  fontPairings,
  fontStackOptions,
  type FontPairingName,
} from './fontOptions'
import {
  defaultsFor,
  configuredStacks,
  stackFor,
  suggestionsFor,
} from './googleFonts'
import { ShadowField } from './ShadowField'

const colorLabels: Record<ColorTokenKey, string> = {
  background: 'Background',
  surface: 'Surface',
  surfaceAlt: 'Surface alt',
  text: 'Text',
  textMuted: 'Muted text',
  primary: 'Primary',
  primaryHover: 'Primary hover',
  primaryText: 'Primary text',
  secondary: 'Secondary',
  border: 'Border',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
  codeBackground: 'Code background',
  codeText: 'Code text',
}

export function ColorsEditor() {
  const theme = useStudioStore((s) => s.theme)
  const mode = useStudioStore((s) => s.editMode)
  const setMode = useStudioStore((s) => s.setEditMode)
  const setColor = useStudioStore((s) => s.setColor)
  const getValue = (key: ColorTokenKey) =>
    mode === 'dark'
      ? (theme.modes.dark?.colors[key] ?? theme.tokens.colors[key])
      : theme.tokens.colors[key]

  return (
    <div className="editor-panel">
      <div className="panel-heading">
        <div>
          <h2>Colors</h2>
          <p>Edit the semantic palette.</p>
        </div>
        <div className="segmented">
          <button
            className={mode === 'light' ? 'active' : ''}
            onClick={() => setMode('light')}
          >
            Light
          </button>
          <button
            className={mode === 'dark' ? 'active' : ''}
            onClick={() => setMode('dark')}
          >
            Dark
          </button>
        </div>
      </div>
      <div className="color-grid">
        {colorTokenKeys.map((key) => {
          const value = getValue(key)
          return (
            <Field key={key} label={colorLabels[key]}>
              <div className="color-control">
                <input
                  aria-label={`${colorLabels[key]} picker`}
                  type="color"
                  value={/^#[0-9a-f]{6}$/i.test(value) ? value : '#000000'}
                  onChange={(e) => setColor(key, e.target.value)}
                />
                <input
                  aria-label={`${colorLabels[key]} value`}
                  type="text"
                  value={value}
                  onChange={(e) => setColor(key, e.target.value)}
                />
              </div>
            </Field>
          )
        })}
      </div>
    </div>
  )
}

const stepperCategories = new Set<keyof ThemeTokens>([
  'spacing',
  'layout',
  'radius',
])
const typographySteppers = new Set([
  'fontSizeBase',
  'fontSizeXs',
  'fontSizeSm',
  'fontSizeMd',
  'fontSizeLg',
  'fontSizeXl',
  'lineHeightBody',
  'lineHeightHeading',
])

function GroupEditorInner<K extends Exclude<keyof ThemeTokens, 'colors'>>({
  category,
  labels,
}: {
  category: K
  labels: Record<string, string>
}) {
  const theme = useStudioStore((s) => s.theme)
  const setToken = useStudioStore((s) => s.setToken)
  const group = theme.tokens[category] as unknown as Record<string, string>

  return (
    <div className="field-grid">
      {Object.entries(group).map(([key, value]) => {
        const label = labels[key] ?? key
        const onChange = (next: string) =>
          setToken(category, key as keyof ThemeTokens[K], next)
        const useStepper =
          stepperCategories.has(category) ||
          (category === 'typography' && typographySteppers.has(key))
        const unitless =
          category === 'typography' && key.startsWith('lineHeight')
        const fontToken =
          category === 'typography' &&
          ['fontBody', 'fontHeading', 'fontMono'].includes(key)

        if (fontToken) {
          const role =
            key === 'fontBody'
              ? 'body'
              : key === 'fontHeading'
                ? 'heading'
                : 'mono'
          return (
            <NativeSelectField
              key={key}
              label={label}
              value={value}
              options={[...configuredStacks(theme, role), ...fontStackOptions]}
              onChange={onChange}
              hint="Choose a portable CSS font stack or keep a custom value."
            />
          )
        }

        return useStepper ? (
          <StepperField
            key={key}
            label={label}
            value={value}
            onChange={onChange}
            defaultUnit={unitless ? '' : 'rem'}
            step={unitless ? 0.05 : undefined}
          />
        ) : (
          <TextField
            key={key}
            label={label}
            value={value}
            onChange={onChange}
          />
        )
      })}
    </div>
  )
}

const FONT_WEIGHT_CHOICES = [400, 500, 600, 700]

const fontRoleLabels: Record<FontRole, string> = {
  body: 'Body',
  heading: 'Heading',
  mono: 'Monospace',
}

const fontRoleTokens = {
  body: 'fontBody',
  heading: 'fontHeading',
  mono: 'fontMono',
} as const

type FontStatus = 'idle' | 'loading' | 'loaded' | 'failed'

function GoogleFontField({ role }: { role: FontRole }) {
  const theme = useStudioStore((s) => s.theme)
  const setFontFace = useStudioStore((s) => s.setFontFace)
  const face = theme.fonts?.[role]
  const [status, setStatus] = useState<FontStatus>('idle')
  const [customizing, setCustomizing] = useState(false)
  const label = fontRoleLabels[role]
  const options = suggestionsFor(role)
  const isCustomValue = Boolean(
    face?.family &&
    !options.some(
      (option) => option.family.toLowerCase() === face.family.toLowerCase(),
    ),
  )
  const showCustom = customizing || isCustomValue
  // A amostra reflete a pilha real do token — o mesmo valor que o preview usa.
  const stack = theme.tokens.typography[fontRoleTokens[role]]
  const statusHref = googleFontsHref(theme.fonts)

  const applyFamily = (value: string) => {
    const family = value.trim()
    if (!family) {
      setFontFace(role, null)
      return
    }
    const current = theme.fonts?.[role]
    setFontFace(
      role,
      {
        family,
        weights: current?.weights ?? defaultsFor(family),
        italic: current?.italic ?? false,
      },
      stackFor(role, family),
    )
  }

  const toggleWeight = (weight: number) => {
    if (!face) return
    const weights = (face.weights ?? []).includes(weight)
      ? (face.weights ?? []).filter((item) => item !== weight)
      : [...(face.weights ?? []), weight]
    setFontFace(role, { ...face, weights })
  }

  const toggleItalic = () => {
    if (!face) return
    setFontFace(role, { ...face, italic: !face.italic })
  }

  const choose = (value: string) => {
    if (value === '__custom__') {
      setCustomizing(true)
      return
    }
    setCustomizing(false)
    applyFamily(value)
  }

  const typeCustom = (value: string) => {
    applyFamily(value)
    if (!value.trim()) setCustomizing(false)
  }

  // Sem a API FontFaceSet (jsdom, navegador antigo), o status segue idle.
  // Espera a folha de preview (efeito do TypographyControls, que roda depois
  // deste): consultar document.fonts.load antes do <link> existir resolve
  // vazio e marcaria "failed" para uma fonte válida.
  useEffect(() => {
    if (!face?.family) {
      setStatus('idle')
      return
    }
    if (
      typeof document === 'undefined' ||
      typeof document.fonts?.load !== 'function'
    )
      return
    let cancelled = false
    let timer = 0
    setStatus('loading')
    const started = Date.now()
    const waitForSheet = () => {
      if (cancelled) return
      // O <link> nasce no efeito do TypographyControls, que roda depois
      // deste: ausência dele também é motivo para esperar, não para concluir.
      const link = document.getElementById(
        'studio-font-preview',
      ) as HTMLLinkElement | null
      if ((!link || link.sheet === null) && Date.now() - started < 4000) {
        timer = window.setTimeout(waitForSheet, 60)
        return
      }
      document.fonts.load(`16px "${face.family}"`).then(
        (loaded) => {
          if (!cancelled) setStatus(loaded.length ? 'loaded' : 'failed')
        },
        () => {
          if (!cancelled) setStatus('failed')
        },
      )
    }
    waitForSheet()
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [face?.family, statusHref])

  return (
    <div className="font-role" role="group" aria-label={`${label} webfont`}>
      {showCustom ? (
        <>
          <TextField
            label={`${label} webfont family`}
            value={face?.family ?? ''}
            placeholder="Fraunces…"
            onChange={typeCustom}
            hint="Empty clears the download; the stack text below stays editable."
          />
          <div className="font-role-row">
            {customizing && !isCustomValue && (
              <button
                type="button"
                className="link-button"
                onClick={() => setCustomizing(false)}
              >
                Usar a lista
              </button>
            )}
          </div>
        </>
      ) : (
        <Field
          label={`${label} webfont family`}
          hint="The full catalog is always listed; Custom… accepts any Google Fonts name."
        >
          <select
            aria-label={`${label} webfont family`}
            value={face?.family ?? ''}
            onChange={(event) => choose(event.target.value)}
          >
            <option value="">System stacks (no download)…</option>
            {options.map((option) => (
              <option key={option.family} value={option.family}>
                {option.family}
              </option>
            ))}
            <option value="__custom__">Custom…</option>
          </select>
        </Field>
      )}
      {face && (
        <div className="weight-chips">
          {FONT_WEIGHT_CHOICES.map((weight) => (
            <label key={weight}>
              <input
                type="checkbox"
                checked={(face.weights ?? []).includes(weight)}
                onChange={() => toggleWeight(weight)}
              />
              {weight}
            </label>
          ))}
        </div>
      )}
      <div className="font-role-row">
        {face && (
          <label>
            <input
              type="checkbox"
              checked={face.italic ?? false}
              onChange={toggleItalic}
            />
            Italic
          </label>
        )}
        {face && (
          <button
            type="button"
            className="link-button"
            aria-label={`Clear ${label.toLowerCase()} webfont`}
            onClick={() => setFontFace(role, null)}
          >
            Clear
          </button>
        )}
      </div>
      <p className="font-sample" style={{ fontFamily: stack }}>
        AaBbGg 123
      </p>
      {status === 'loading' && (
        <p className="font-status">Buscando no Google Fonts…</p>
      )}
      {status === 'loaded' && (
        <p className="font-status ok">Carregada e aplicada ao preview.</p>
      )}
      {status === 'failed' && (
        <p className="font-status bad">
          Não encontrada — confira o nome ou a conexão.
        </p>
      )}
    </div>
  )
}

function TypographyControls() {
  const setToken = useStudioStore((s) => s.setToken)
  const fonts = useStudioStore((s) => s.theme.fonts)

  // A amostra de cada cartão vive no documento do app, então o <link> de
  // preview mora aqui — o iframe do preview usa o @import do próprio CSS.
  // Dependência na URL (não no objeto): edição alheia não recria o <link>.
  const previewHref = googleFontsHref(fonts)
  useEffect(() => {
    const id = 'studio-font-preview'
    document.getElementById(id)?.remove()
    if (!previewHref) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href = previewHref
    document.head.appendChild(link)
    return () => {
      document.getElementById(id)?.remove()
    }
  }, [previewHref])

  const applyPairing = (name: FontPairingName) => {
    const pairing = fontPairings[name]
    setToken('typography', 'fontBody', pairing.body)
    setToken('typography', 'fontHeading', pairing.heading)
    setToken('typography', 'fontMono', pairing.mono)
  }

  return (
    <div className="editor-panel">
      <div className="panel-heading">
        <div>
          <h2>Typography</h2>
          <p>
            Families, scale, weights and line height. Numeric values include − /
            + controls.
          </p>
        </div>
      </div>
      <div className="field-grid">
        <Field
          label="Font pairing"
          hint="Apply a body + heading + monospace combination in one step."
        >
          <select
            aria-label="Font pairing"
            defaultValue=""
            onChange={(e) => {
              if (e.target.value)
                applyPairing(e.target.value as FontPairingName)
            }}
          >
            <option value="">Choose a font pairing…</option>
            {Object.keys(fontPairings).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </Field>
        <div className="field pairing-note">
          <span className="field-label">Preview behavior</span>
          <small>
            Font choices use resilient CSS stacks, so the generated theme stays
            portable even without loading webfonts.
          </small>
        </div>
      </div>
      <div className="font-roles">
        {(['body', 'heading', 'mono'] as const).map((role) => (
          <GoogleFontField key={role} role={role} />
        ))}
      </div>
      <GroupEditorInner
        category="typography"
        labels={{
          fontBody: 'Body font',
          fontHeading: 'Heading font',
          fontMono: 'Monospace font',
          fontSizeBase: 'Base size',
          fontSizeXs: 'XS size',
          fontSizeSm: 'Small size',
          fontSizeMd: 'Medium size',
          fontSizeLg: 'Large size',
          fontSizeXl: 'XL size',
          lineHeightBody: 'Body line height',
          lineHeightHeading: 'Heading line height',
          fontWeightNormal: 'Normal weight',
          fontWeightMedium: 'Medium weight',
          fontWeightBold: 'Bold weight',
        }}
      />
    </div>
  )
}

function GroupEditor<K extends Exclude<keyof ThemeTokens, 'colors'>>({
  title,
  description,
  category,
  labels,
}: {
  title: string
  description: string
  category: K
  labels: Record<string, string>
}) {
  return (
    <div className="editor-panel">
      <div className="panel-heading">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <GroupEditorInner category={category} labels={labels} />
    </div>
  )
}

export const TypographyEditor = () => <TypographyControls />
export const SpacingEditor = () => (
  <GroupEditor
    title="Spacing"
    description="A reusable spacing scale with direct − / + adjustment."
    category="spacing"
    labels={{
      spaceXs: 'XS',
      spaceSm: 'Small',
      spaceMd: 'Medium',
      spaceLg: 'Large',
      spaceXl: 'XL',
      space2xl: '2XL',
    }}
  />
)
export const LayoutEditor = () => (
  <GroupEditor
    title="Layout"
    description="Document width and page rhythm."
    category="layout"
    labels={{
      contentWidth: 'Content width',
      wideWidth: 'Wide width',
      bodyPadding: 'Body padding',
      sectionSpacing: 'Section spacing',
      headerWidth: 'Header width',
      footerWidth: 'Footer width',
    }}
  />
)
export const RadiusEditor = () => (
  <GroupEditor
    title="Radius"
    description="Corner radius tokens."
    category="radius"
    labels={{
      radiusSm: 'Small',
      radiusMd: 'Medium',
      radiusLg: 'Large',
      radiusFull: 'Full',
    }}
  />
)
export function ShadowsEditor() {
  const theme = useStudioStore((s) => s.theme)
  const setToken = useStudioStore((s) => s.setToken)
  const labels = {
    shadowSm: 'Small shadow',
    shadowMd: 'Medium shadow',
    shadowLg: 'Large shadow',
  } as const

  const usageFor = (token: keyof typeof labels) => {
    const cssVar = `var(--${token.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)})`
    return Object.entries(theme.layers.elements)
      .filter(([, styles]) =>
        Object.values(styles).some((value) => value.includes(cssVar)),
      )
      .map(([selector]) => selector)
  }

  return (
    <div className="editor-panel">
      <div className="panel-heading">
        <div>
          <h2>Shadows</h2>
          <p>
            Edit reusable elevation tokens visually. Combine outer and inner
            layers in the same box-shadow when needed. Every token has its own
            live sample.
          </p>
        </div>
      </div>
      <div className="shadow-token-list">
        {(Object.keys(labels) as Array<keyof typeof labels>).map((key) => (
          <ShadowField
            key={key}
            label={labels[key]}
            value={theme.tokens.shadow[key]}
            usage={usageFor(key)}
            onChange={(value) => setToken('shadow', key, value)}
          />
        ))}
      </div>
    </div>
  )
}
