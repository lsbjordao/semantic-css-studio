import { exportQuarto } from '../export/exporters'
import { useStudioStore } from '../theme/store'
import type { QuartoSidebarTone } from '../theme/schema'

const tones: Array<{ id: QuartoSidebarTone; label: string; hint: string }> = [
  { id: 'surface', label: 'Highlighted surface', hint: '--color-surface' },
  { id: 'background', label: 'Same as page', hint: '--color-background' },
]

const quartoYml = `format:
  html:
    theme:
      light: [cosmo, theme-light.css]
      dark: [slate, theme-dark.css]`

function SidebarMock() {
  const theme = useStudioStore((s) => s.theme)
  const mode = useStudioStore((s) => s.editMode)
  const tone = theme.quarto?.sidebarTone ?? 'surface'
  const base = theme.tokens.colors
  const dark = theme.modes.dark?.colors ?? {}
  const c = (key: keyof typeof base) =>
    mode === 'dark' ? (dark[key] ?? base[key]) : base[key]
  const sidebarBg = tone === 'background' ? c('background') : c('surface')

  return (
    <div
      aria-hidden
      style={{
        display: 'flex',
        border: `1px solid ${c('border')}`,
        borderRadius: '8px',
        overflow: 'hidden',
        fontSize: '12px',
        lineHeight: 1.5,
      }}
    >
      <div
        style={{ background: sidebarBg, padding: '10px 12px', width: '42%' }}
      >
        <div
          style={{
            color: c('text'),
            fontFamily: theme.tokens.typography.fontHeading,
            fontWeight: 600,
            marginBottom: '8px',
          }}
        >
          {theme.metadata.name || 'Book'}
        </div>
        {['Preface', 'Introduction', 'Summary'].map((item, index) => (
          <div
            key={item}
            style={{
              color: index === 1 ? c('primary') : c('textMuted'),
              fontWeight: index === 1 ? 600 : 400,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div
        style={{ background: c('background'), padding: '10px 12px', flex: 1 }}
      >
        <div
          style={{
            color: c('text'),
            fontFamily: theme.tokens.typography.fontHeading,
            fontWeight: 700,
            fontSize: '15px',
            marginBottom: '6px',
          }}
        >
          Chapter title
        </div>
        <div style={{ color: c('textMuted') }}>Body copy follows the page.</div>
      </div>
    </div>
  )
}

export function QuartoEditor() {
  const setSpecimen = useStudioStore((s) => s.setSpecimen)
  const theme = useStudioStore((s) => s.theme)
  const editMode = useStudioStore((s) => s.editMode)
  const tone = theme.quarto?.sidebarTone ?? 'surface'
  const setQuartoSidebarTone = useStudioStore((s) => s.setQuartoSidebarTone)

  return (
    <div className="editor-panel">
      <div className="panel-heading">
        <div>
          <h2>Quarto</h2>
          <p>
            Settings that only apply to CSS exported for Quarto (book and
            website). Nothing here changes the generic CSS.
          </p>
        </div>
      </div>

      <div className="field">
        <span className="field-label" id="quarto-sidebar-tone-label">
          Book sidebar background
        </span>
        <div
          className="segmented"
          role="radiogroup"
          aria-labelledby="quarto-sidebar-tone-label"
        >
          {tones.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={tone === option.id}
              className={tone === option.id ? 'active' : ''}
              onClick={() => setQuartoSidebarTone(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="field-hint">
          {tones.find((option) => option.id === tone)?.hint} — “Highlighted
          surface” renders the chrome as a raised panel; “Same as page” blends
          the chrome into the background. Applies to the book sidebar, the
          breadcrumb bar, the collapse button, and the website top navbar and
          footer.
        </p>
      </div>

      <div className="field">
        <button
          className="primary-button"
          onClick={() => setSpecimen('Quarto')}
        >
          Open Quarto reference
        </button>
        <p className="field-hint">
          A visual fixture rendered with Quarto 1.10.18 and Cosmo, with your
          exported CSS applied live. The pinned version keeps the preview
          reproducible; it is not a compatibility target. Includes a website
          navbar, table of contents, callout, citation and footnote. Interactive
          Quarto scripts are disabled.
        </p>
        <span className="field-label">Tone preview ({editMode} mode)</span>
        <SidebarMock />
        <p className="field-hint">
          Static mock using the current tokens; light/dark mode follows the
          Light/Dark selector at the top of the preview.
        </p>
      </div>

      <div className="field">
        <span className="field-label">One CSS file per mode</span>
        <p className="field-hint">
          Export <strong>Quarto light</strong> and <strong>Quarto dark</strong>{' '}
          from the Export menu (or below) and reference both files in{' '}
          <code>_quarto.yml</code>. The files already include the{' '}
          <code>scss:rules</code> marker that Quarto requires under the{' '}
          <code>theme:</code> key:
        </p>
        <pre className="field-hint" style={{ whiteSpace: 'pre-wrap' }}>
          {quartoYml}
        </pre>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => exportQuarto(theme, 'light', 'theme-light.css')}
          >
            Export theme-light.css
          </button>
          <button
            type="button"
            onClick={() => exportQuarto(theme, 'dark', 'theme-dark.css')}
          >
            Export theme-dark.css
          </button>
        </div>
      </div>
    </div>
  )
}
