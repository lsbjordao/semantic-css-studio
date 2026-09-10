import { Icon } from '../icons/Icon'
import { iconLibraryMeta } from '../icons/registry'
import { iconLibraryIds, type IconLibraryId } from '../icons/types'
import { useStudioStore } from '../theme/store'

const labels: Record<IconLibraryId, string> = {
  none: 'Nativo',
  lucide: 'Lucide',
  phosphor: 'Phosphor',
  heroicons: 'Heroicons',
  material: 'Material Symbols',
  fontawesome: 'Font Awesome',
  bootstrap: 'Bootstrap Icons',
  tabler: 'Tabler',
}

const hints: Record<IconLibraryId, string> = {
  none: 'Controles nativos com accent-color.',
  lucide: 'Stroke 2px, cantos redondos.',
  phosphor: 'Stroke 2px, traço regular.',
  heroicons: 'Outline 1.5px, leve.',
  material: 'Filled, geométrico.',
  fontawesome: 'Solid, traço cheio.',
  bootstrap: 'Filled, compacto.',
  tabler: 'Stroke 2px, reto.',
}

export function IconsEditor() {
  const library = useStudioStore((s) => s.theme.icons?.library ?? 'none')
  const setIconLibrary = useStudioStore((s) => s.setIconLibrary)
  const uiIconLibrary = useStudioStore((s) => s.uiIconLibrary)
  const setUiIconLibrary = useStudioStore((s) => s.setUiIconLibrary)

  return (
    <div className="editor-panel">
      <div className="panel-heading">
        <div>
          <h2>Icons</h2>
          <p>
            Biblioteca de ícones do tema: checkbox, radio, seta do select e
            marcador do details. Embutida no CSS como data-URI — sem runtime,
            fonte ou rede.
          </p>
        </div>
      </div>

      <div className="field">
        <span className="field-label">
          Biblioteca do tema (entra no export)
        </span>
        <div
          className="icons-grid"
          role="radiogroup"
          aria-label="Biblioteca de ícones do tema"
        >
          {iconLibraryIds.map((id) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={library === id}
              className={library === id ? 'icon-option active' : 'icon-option'}
              onClick={() => setIconLibrary(id)}
            >
              <span className="icon-option-glyph">
                {id === 'none' ? (
                  <span aria-hidden>∅</span>
                ) : (
                  <Icon library={id} name="check" size={18} />
                )}
              </span>
              <span className="icon-option-label">{labels[id]}</span>
              <small>{hints[id]}</small>
            </button>
          ))}
        </div>
      </div>

      {library !== 'none' && (
        <div className="field">
          <span className="field-label">
            Prévia dos glifos ({labels[library]})
          </span>
          <div className="icon-row-preview">
            <span title="check">
              <Icon library={library} name="check" size={18} />
            </span>
            <span title="radio">
              <Icon library={library} name="dot" size={18} />
            </span>
            <span title="select">
              <Icon library={library} name="chevron-down" size={18} />
            </span>
            <span title="details">
              <Icon library={library} name="chevron-right" size={18} />
            </span>
            <span title="search">
              <Icon library={library} name="search" size={18} />
            </span>
            <span title="clear">
              <Icon library={library} name="x" size={18} />
            </span>
          </div>
          <p className="field-hint">
            Glifos originais em estilo compatível — sem atribuição obrigatória.
            Os exemplos vivem na seção Icons do conteúdo (All HTML / Kitchen
            Sink no preview e demo.html no export), nos modos light e dark.
          </p>
        </div>
      )}

      <div className="field">
        <label className="field-label" htmlFor="ui-icon-library">
          Ícones do Studio (só o painel, não entra no export)
        </label>
        <select
          id="ui-icon-library"
          value={uiIconLibrary}
          onChange={(e) =>
            setUiIconLibrary(e.target.value as typeof uiIconLibrary)
          }
        >
          {iconLibraryMeta.map((meta) => (
            <option key={meta.id} value={meta.id}>
              {meta.label} — {meta.note}
            </option>
          ))}
        </select>
        <p className="field-hint">
          Troca undo/redo e amostras acima sem sujar o tema.
        </p>
      </div>
    </div>
  )
}
