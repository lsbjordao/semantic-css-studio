import { seedBaseRules } from '../theme/baseRules'
import { isBaseRuleModified, useStudioStore } from '../theme/store'
import { TextField } from './Field'

const seeded = seedBaseRules()

export function BaseRulesEditor() {
  const theme = useStudioStore((s) => s.theme)
  const setProperty = useStudioStore((s) => s.setLayerProperty)
  const resetRule = useStudioStore((s) => s.resetBaseRule)
  const toggleRule = useStudioStore((s) => s.toggleBaseRule)

  return <div className="editor-panel base-rules-editor">
    <div className="panel-heading">
      <div>
        <h2>Regras-base</h2>
        <p>O piso do tema, aplicado antes de qualquer override de elemento.</p>
      </div>
    </div>

    <p className="panel-note" role="note">
      Estas regras são emitidas dentro de <code>:where()</code>, com
      especificidade zero, e dentro de <code>@layer base</code>. Qualquer CSS
      escrito por quem consome o tema vence sobre elas sem precisar de
      <code>!important</code>.
    </p>

    {Object.keys(seeded).map((selector) => {
      const enabled = Boolean(theme.layers.base[selector])
      const declarations = theme.layers.base[selector] ?? {}
      const modified = enabled && isBaseRuleModified(theme, selector)

      return <section key={selector} className="base-rule" role="group" aria-label={`Regra ${selector}`}>
        <header>
          <label>
            <input
              type="checkbox"
              checked={enabled}
              aria-label={`Ativar regra ${selector}`}
              onChange={(event) => toggleRule(selector, event.target.checked)}
            />
            <code>{selector}</code>
          </label>
          {modified && <span className="badge">modificada</span>}
          {modified && <button type="button" className="tiny-button" onClick={() => resetRule(selector)}>Restaurar</button>}
        </header>

        {enabled && <div className="field-grid">
          {Object.keys(seeded[selector]).map((property) => <TextField
            key={property}
            label={`${property} em ${selector}`}
            value={declarations[property] ?? ''}
            onChange={(value) => setProperty('base', selector, property, value)}
          />)}
        </div>}
      </section>
    })}
  </div>
}
