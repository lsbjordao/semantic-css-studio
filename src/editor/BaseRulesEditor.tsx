import { seedBaseRules } from '../theme/baseRules'
import { isBaseRuleModified, useStudioStore } from '../theme/store'
import { TextField } from './Field'

const seeded = seedBaseRules()

export function BaseRulesEditor() {
  const theme = useStudioStore((s) => s.theme)
  const setProperty = useStudioStore((s) => s.setLayerProperty)
  const resetRule = useStudioStore((s) => s.resetBaseRule)
  const toggleRule = useStudioStore((s) => s.toggleBaseRule)

  return (
    <div className="editor-panel base-rules-editor">
      <div className="panel-heading">
        <div>
          <h2>Base rules</h2>
          <p>The theme foundation, applied before any element override.</p>
        </div>
      </div>

      <p className="panel-note" role="note">
        These rules are emitted inside <code>:where()</code>, with zero
        specificity, and inside <code>@layer base</code>. Any CSS written by the
        theme consumer wins over them without needing
        <code>!important</code>.
      </p>

      {Object.keys(seeded).map((selector) => {
        const enabled = Boolean(theme.layers.base[selector])
        const declarations = theme.layers.base[selector] ?? {}
        const modified = enabled && isBaseRuleModified(theme, selector)

        return (
          <section
            key={selector}
            className="base-rule"
            role="group"
            aria-label={`Rule ${selector}`}
          >
            <header>
              <label>
                <input
                  type="checkbox"
                  checked={enabled}
                  aria-label={`Enable rule ${selector}`}
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
                    label={`${property} in ${selector}`}
                    value={declarations[property] ?? ''}
                    onChange={(value) =>
                      setProperty('base', selector, property, value)
                    }
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
