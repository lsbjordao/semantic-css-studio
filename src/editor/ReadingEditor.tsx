import { presets, type PresetName } from '../theme/presets'
import { useStudioStore, type SpecimenName } from '../theme/store'
import { NativeSelectField, StepperField } from './Field'
import { fontStackOptions } from './fontOptions'
import { configuredStacks } from './googleFonts'
import { effectiveValueFor } from './elementProfiles'
import { controlValueFor } from './controlValue'

const startingPoints: Array<{
  preset: PresetName
  use: string
  description: string
  specimen: SpecimenName
}> = [
  {
    preset: 'Editorial',
    use: 'Essay',
    description: 'Expressive type for sustained reading.',
    specimen: 'Essay',
  },
  {
    preset: 'Academic',
    use: 'Research article',
    description: 'Compare citations, notes and a table of contents.',
    specimen: 'Quarto',
  },
  {
    preset: 'Documentation',
    use: 'Technical guide',
    description: 'Prose alongside code, tables and instructions.',
    specimen: 'Documentation',
  },
  {
    preset: 'Minimal',
    use: 'Website',
    description: 'A quiet baseline for a journal and its navigation.',
    specimen: 'Website',
  },
]

export function ReadingEditor() {
  const theme = useStudioStore((s) => s.theme)
  const setToken = useStudioStore((s) => s.setToken)
  const setTargets = useStudioStore((s) => s.setElementTargets)
  const setSection = useStudioStore((s) => s.setSection)
  const setSpecimen = useStudioStore((s) => s.setSpecimen)
  const applyPreset = useStudioStore((s) => s.applyPreset)
  const presetName = useStudioStore((s) => s.presetName)
  const typography = theme.tokens.typography
  const valueFor = (selector: string, property: string) =>
    controlValueFor(
      theme,
      selector,
      property,
      effectiveValueFor(theme, selector, { property, label: property }),
    )
  const setProperty = (selector: string, property: string, value: string) =>
    setTargets([{ selector, property }], value)

  return (
    <div className="editor-panel reading-editor">
      <div className="panel-heading">
        <div>
          <h2>Text &amp; reading</h2>
          <p>
            Choose a starting point, refine the rhythm, then read a full page.
          </p>
        </div>
      </div>
      <details className="reading-presets" open>
        <summary>Starting points</summary>
        <p className="field-hint">
          Applies a complete theme. Undo returns to your previous design.
        </p>
        <div className="reading-preset-grid">
          {startingPoints.map((item) => {
            const sample = presets[item.preset]
            return (
              <button
                key={item.preset}
                className="reading-preset"
                aria-label={`Apply ${item.preset} preset`}
                aria-pressed={presetName === item.preset}
                onClick={() => {
                  applyPreset(item.preset)
                  setSpecimen(item.specimen)
                }}
              >
                <span
                  className="reading-preset-sample"
                  style={{
                    background: sample.tokens.colors.background,
                    color: sample.tokens.colors.text,
                    fontFamily: sample.tokens.typography.fontBody,
                  }}
                >
                  <strong
                    style={{ fontFamily: sample.tokens.typography.fontHeading }}
                  >
                    A readable page
                  </strong>
                  <span>Every paragraph has a rhythm.</span>
                </span>
                <strong>{item.use}</strong>
                <small>{item.description}</small>
              </button>
            )
          })}
        </div>
      </details>
      <section className="reading-control-group">
        <h3>Body text</h3>
        <div className="field-grid">
          <NativeSelectField
            label="Reading font"
            value={typography.fontBody}
            options={[...configuredStacks(theme, 'body'), ...fontStackOptions]}
            onChange={(value) => setToken('typography', 'fontBody', value)}
          />
          <StepperField
            label="Reading size"
            value={typography.fontSizeBase}
            defaultUnit="px"
            onChange={(value) => setToken('typography', 'fontSizeBase', value)}
          />
          <StepperField
            label="Reading line height"
            value={typography.lineHeightBody}
            defaultUnit=""
            step={0.05}
            onChange={(value) =>
              setToken('typography', 'lineHeightBody', value)
            }
          />
          <StepperField
            label="Reading column"
            value={theme.tokens.layout.contentWidth}
            defaultUnit="ch"
            onChange={(value) => setToken('layout', 'contentWidth', value)}
            hint="Compare the measure with a full paragraph in the preview."
          />
          <StepperField
            label="Paragraph spacing"
            placeholder="Inherited"
            value={valueFor('p', 'marginBlockEnd')}
            defaultUnit="em"
            onChange={(value) => setProperty('p', 'marginBlockEnd', value)}
          />
          <StepperField
            label="First-line indent"
            placeholder="Inherited"
            value={valueFor('p', 'textIndent')}
            defaultUnit="em"
            onChange={(value) => setProperty('p', 'textIndent', value)}
          />
        </div>
      </section>
      <section className="reading-control-group">
        <h3>Heading hierarchy</h3>
        <div className="field-grid">
          <NativeSelectField
            label="Heading font"
            value={typography.fontHeading}
            options={[
              ...configuredStacks(theme, 'heading'),
              ...fontStackOptions,
            ]}
            onChange={(value) => setToken('typography', 'fontHeading', value)}
          />
          <StepperField
            label="Heading line height"
            value={typography.lineHeightHeading}
            defaultUnit=""
            step={0.05}
            onChange={(value) =>
              setToken('typography', 'lineHeightHeading', value)
            }
          />
          {(['h1', 'h2', 'h3'] as const).map((tag, index) => (
            <StepperField
              key={tag}
              label={
                ['Title size', 'Section heading size', 'Subheading size'][index]
              }
              value={valueFor(tag, 'fontSize')}
              defaultUnit="rem"
              onChange={(value) => setProperty(tag, 'fontSize', value)}
            />
          ))}
        </div>
      </section>
      <p className="field-hint">
        Changes share the same theme as the advanced editors. Existing element
        overrides can take precedence over body settings.
      </p>
      <div className="reading-links">
        <button onClick={() => setSection('Typography')}>
          Webfonts &amp; full type scale
        </button>
        <button onClick={() => setSection('Site layout')}>Site layout</button>
        <button
          onClick={() => {
            setSpecimen('Quarto')
            setSection('Quarto')
          }}
        >
          Preview Quarto document
        </button>
      </div>
    </div>
  )
}
