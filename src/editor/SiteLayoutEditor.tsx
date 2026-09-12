import { useStudioStore } from '../theme/store'
import { StepperField } from './Field'

export function SiteLayoutEditor() {
  const layout = useStudioStore((s) => s.theme.tokens.layout)
  const setToken = useStudioStore((s) => s.setToken)
  const setSpecimen = useStudioStore((s) => s.setSpecimen)
  const setSection = useStudioStore((s) => s.setSection)
  const setElement = useStudioStore((s) => s.setSelectedElement)
  return (
    <div className="editor-panel">
      <div className="panel-heading">
        <div>
          <h2>Site layout</h2>
          <p>
            Give navigation and page furniture their own space around the
            reading column.
          </p>
        </div>
      </div>
      <button className="primary-button" onClick={() => setSpecimen('Website')}>
        Preview website
      </button>
      <section className="reading-control-group">
        <h3>Page structure</h3>
        <div className="field-grid">
          {(
            [
              ['headerWidth', 'Header width'],
              ['footerWidth', 'Footer width'],
              ['bodyPadding', 'Page gutters'],
              ['sectionSpacing', 'Section spacing'],
            ] as const
          ).map(([key, label]) => (
            <StepperField
              key={key}
              label={label}
              value={layout[key]}
              onChange={(value) => setToken('layout', key, value)}
            />
          ))}
        </div>
      </section>
      <p className="field-hint">
        Header and footer widths apply to semantic websites. Quarto navigation
        uses its own layout; use the Quarto preview to check that integration.
      </p>
      <div className="reading-links">
        {(['header', 'nav', 'footer', 'aside'] as const).map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setElement(tag)
              setSection('Elements')
            }}
          >
            Style {tag}
          </button>
        ))}
        <button onClick={() => setSection('Reading')}>
          Text &amp; reading
        </button>
      </div>
    </div>
  )
}
