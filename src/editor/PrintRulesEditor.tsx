import { seedPrintRules } from '../theme/printRules'
import { isPrintRuleModified, useStudioStore } from '../theme/store'
import { TextField } from './Field'

const seeded = seedPrintRules()

export function PrintRulesEditor() {
  const theme = useStudioStore((s) => s.theme)
  const setProperty = useStudioStore((s) => s.setPrintProperty)
  const resetRule = useStudioStore((s) => s.resetPrintRule)
  const toggleRule = useStudioStore((s) => s.togglePrintRule)

  return (
    <div className="editor-panel base-rules-editor">
      <div className="panel-heading">
        <div>
          <h2>Print rules</h2>
          <p>Long-form output for paper, PDF export and browser printing.</p>
        </div>
      </div>

      <p className="panel-note" role="note">
        Enabled rules are emitted inside <code>@media print</code>, in an{' '}
        <code>@layer print</code> placed after every other layer. A theme with
        no enabled rule compiles exactly as before.
      </p>

      {Object.keys(seeded).map((selector) => {
        const enabled = Boolean(theme.layers.print?.[selector])
        const declarations = theme.layers.print?.[selector] ?? {}
        const modified = enabled && isPrintRuleModified(theme, selector)

        return (
          <section
            key={selector}
            className="base-rule"
            role="group"
            aria-label={`Print rule ${selector}`}
          >
            <header>
              <label>
                <input
                  type="checkbox"
                  checked={enabled}
                  aria-label={`Enable print rule ${selector}`}
                  onChange={(event) =>
                    toggleRule(selector, event.target.checked)
                  }
                />
                <code>{selector}</code>
              </label>
              {modified && <span className="badge">modified</span>}
              {modified && (
                <button
                  type="button"
                  className="tiny-button"
                  onClick={() => resetRule(selector)}
                >
                  Restore
                </button>
              )}
            </header>

            {enabled && (
              <div className="field-grid">
                {Object.keys(seeded[selector]).map((property) => (
                  <TextField
                    key={property}
                    label={`${property} in print ${selector}`}
                    value={declarations[property] ?? ''}
                    onChange={(value) => setProperty(selector, property, value)}
                  />
                ))}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
