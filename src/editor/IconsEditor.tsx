import { Icon } from '../icons/Icon'
import { iconLibraryMeta } from '../icons/registry'
import { iconLibraryIds, type IconLibraryId } from '../icons/types'
import { useStudioStore } from '../theme/store'

const labels: Record<IconLibraryId, string> = {
  none: 'Native',
  lucide: 'Lucide',
  phosphor: 'Phosphor',
  heroicons: 'Heroicons',
  material: 'Material Symbols',
  fontawesome: 'Font Awesome',
  bootstrap: 'Bootstrap Icons',
  tabler: 'Tabler',
}

const hints: Record<IconLibraryId, string> = {
  none: 'Native controls with accent-color.',
  lucide: 'Stroke 2px, rounded corners.',
  phosphor: 'Stroke 2px, regular stroke.',
  heroicons: 'Outline 1.5px, light.',
  material: 'Filled, geometric.',
  fontawesome: 'Solid, full stroke.',
  bootstrap: 'Filled, compact.',
  tabler: 'Stroke 2px, straight.',
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
            Theme icon library: checkbox, radio, select arrow and details
            marker. Embedded in CSS as data-URIs — no runtime, font or network.
          </p>
        </div>
      </div>

      <div className="field">
        <span className="field-label">Theme library (included in export)</span>
        <div
          className="icons-grid"
          role="radiogroup"
          aria-label="Theme icon library"
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
          <span className="field-label">Glyph preview ({labels[library]})</span>
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
            Official icons imported at build time and embedded in CSS. Respect
            the library licenses when redistributing the theme. The samples live
            in the content Icons section (All HTML / Kitchen Sink in the preview
            and demo.html in the export), in light and dark modes.
          </p>
        </div>
      )}

      <div className="field">
        <label className="field-label" htmlFor="ui-icon-library">
          Studio icons (panel only, excluded from export)
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
          Switches undo/redo and the samples above without touching the theme.
        </p>
      </div>
    </div>
  )
}
