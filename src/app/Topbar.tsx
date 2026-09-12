import { useEffect, useRef, useState } from 'react'
import {
  exportCss,
  exportDemo,
  exportJson,
  exportMinCss,
  exportPackage,
  exportQuarto,
} from '../export/exporters'
import { Icon } from '../icons/Icon'
import { migrateThemeV2 } from '../theme/migration'
import { presets, type PresetName } from '../theme/presets'
import { useStudioStore } from '../theme/store'
import { Logo } from './Logo'

export function Topbar() {
  const theme = useStudioStore((s) => s.theme)
  const presetName = useStudioStore((s) => s.presetName)
  const applyPreset = useStudioStore((s) => s.applyPreset)
  const importTheme = useStudioStore((s) => s.importTheme)
  const newTheme = useStudioStore((s) => s.newTheme)
  const resetTheme = useStudioStore((s) => s.resetTheme)
  const updateMetadata = useStudioStore((s) => s.updateMetadata)
  const undo = useStudioStore((s) => s.undo)
  const redo = useStudioStore((s) => s.redo)
  const pastCount = useStudioStore((s) => s.past.length)
  const futureCount = useStudioStore((s) => s.future.length)
  const includeReset = useStudioStore(
    (s) => s.theme.options.includeMinimalReset,
  )
  const setReset = useStudioStore((s) => s.setReset)
  const uiIconLibrary = useStudioStore((s) => s.uiIconLibrary)
  const previewMode = useStudioStore((s) => s.previewMode)
  const inputRef = useRef<HTMLInputElement>(null)
  const [exportOpen, setExportOpen] = useState(false)
  const [actionsOpen, setActionsOpen] = useState(false)
  const actionsRef = useRef<HTMLDivElement>(null)
  const actionsButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!actionsOpen) return
    const dismiss = (event: PointerEvent) => {
      if (!actionsRef.current?.contains(event.target as Node))
        setActionsOpen(false)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActionsOpen(false)
        actionsButtonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', escape)
    }
  }, [actionsOpen])

  async function handleImport(file: File | undefined) {
    if (!file) return
    try {
      const raw = await file.text()
      importTheme(migrateThemeV2(JSON.parse(raw)))
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Could not import theme.')
    } finally {
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">
          <Logo />
        </span>
        <div>
          <strong>Semantic CSS Studio</strong>
          <small>Design the HTML, not the classes.</small>
        </div>
      </div>
      <div className="theme-identity">
        <input
          aria-label="Theme name"
          value={theme.metadata.name}
          onChange={(e) => updateMetadata('name', e.target.value)}
        />
        <select
          aria-label="Preset"
          value={presetName in presets ? presetName : ''}
          onChange={(e) => applyPreset(e.target.value as PresetName)}
        >
          <option value="" disabled>
            {presetName}
          </option>
          {Object.keys(presets).map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>
      <div className="topbar-actions">
        <div className="theme-actions" ref={actionsRef}>
          <button
            ref={actionsButtonRef}
            className="actions-toggle"
            aria-expanded={actionsOpen}
            aria-controls="theme-actions"
            onClick={() => {
              setActionsOpen((open) => !open)
              setExportOpen(false)
            }}
          >
            Actions
          </button>
          <div
            id="theme-actions"
            className={`theme-actions-controls${actionsOpen ? ' is-open' : ''}`}
          >
            <button
              className="icon-button"
              title="Undo (Ctrl+Z)"
              aria-label="Undo"
              disabled={!pastCount}
              onClick={undo}
            >
              <Icon library={uiIconLibrary} name="undo" size={16} />
            </button>
            <button
              className="icon-button"
              title="Redo (Ctrl+Shift+Z)"
              aria-label="Redo"
              disabled={!futureCount}
              onClick={redo}
            >
              <Icon library={uiIconLibrary} name="redo" size={16} />
            </button>
            <label
              className="reset-toggle"
              title="Include a minimal box-sizing reset"
            >
              <input
                type="checkbox"
                checked={includeReset}
                onChange={(e) => setReset(e.target.checked)}
              />{' '}
              reset
            </label>
            <button onClick={() => inputRef.current?.click()}>Import</button>
            <input
              ref={inputRef}
              hidden
              type="file"
              accept="application/json,.json"
              onChange={(e) => void handleImport(e.target.files?.[0])}
            />
            <button
              onClick={() => {
                if (
                  confirm(
                    'Create a new theme? Current changes remain available through Undo.',
                  )
                )
                  newTheme()
              }}
            >
              New
            </button>
            <button
              onClick={() => {
                if (confirm('Reset to the Minimal preset?')) resetTheme()
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="export-menu">
          <button
            className="primary-button"
            onClick={() => {
              setExportOpen((v) => !v)
              setActionsOpen(false)
            }}
          >
            Export ▾
          </button>
          {exportOpen && (
            <div className="export-popover">
              <button
                onClick={() => {
                  exportCss(theme)
                  setExportOpen(false)
                }}
              >
                CSS <small>Readable stylesheet</small>
              </button>
              <button
                onClick={() => {
                  exportMinCss(theme)
                  setExportOpen(false)
                }}
              >
                Minified CSS <small>Production size</small>
              </button>
              <button
                onClick={() => {
                  exportJson(theme)
                  setExportOpen(false)
                }}
              >
                Theme JSON <small>Editable source</small>
              </button>
              <button
                onClick={() => {
                  exportQuarto(theme, previewMode)
                  setExportOpen(false)
                }}
              >
                Quarto <small>theme.css after Bootstrap</small>
              </button>
              <button
                onClick={() => {
                  exportQuarto(theme, 'light', 'theme-light.css')
                  setExportOpen(false)
                }}
              >
                Quarto light <small>locked light css</small>
              </button>
              <button
                onClick={() => {
                  exportQuarto(theme, 'dark', 'theme-dark.css')
                  setExportOpen(false)
                }}
              >
                Quarto dark <small>locked dark css</small>
              </button>
              <button
                onClick={() => {
                  exportDemo(theme, previewMode)
                  setExportOpen(false)
                }}
              >
                Demo HTML <small>Kitchen Sink page</small>
              </button>
              <button
                onClick={() => {
                  void exportPackage(theme, previewMode)
                  setExportOpen(false)
                }}
              >
                Complete package <small>CSS + JSON + demo ZIP</small>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
