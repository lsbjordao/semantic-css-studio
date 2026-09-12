import { useStudioStore, type EditorSection } from '../theme/store'

const sections: Array<{
  name: EditorSection
  label?: string
  icon: string
  group: 'WRITE' | 'TOKENS' | 'RULES' | 'CHECKS' | 'QUARTO'
}> = [
  { name: 'Reading', label: 'Reading', icon: '¶', group: 'WRITE' },
  { name: 'Site layout', icon: '▦', group: 'WRITE' },
  { name: 'Colors', icon: '◐', group: 'TOKENS' },
  { name: 'Typography', icon: 'Aa', group: 'TOKENS' },
  { name: 'Spacing', icon: '↕', group: 'TOKENS' },
  { name: 'Layout', icon: '▦', group: 'TOKENS' },
  { name: 'Radius', icon: '⌒', group: 'TOKENS' },
  { name: 'Shadows', icon: '◫', group: 'TOKENS' },
  { name: 'Icons', icon: '◈', group: 'TOKENS' },
  { name: 'Base', icon: '▤', group: 'RULES' },
  { name: 'Elements', icon: '<>', group: 'RULES' },
  { name: 'States', icon: ':-', group: 'RULES' },
  { name: 'Print', icon: '⎙', group: 'RULES' },
  { name: 'Accessibility', icon: '✓', group: 'CHECKS' },
  { name: 'Quarto', icon: 'Q', group: 'QUARTO' },
]

const groups = ['WRITE', 'TOKENS', 'RULES', 'CHECKS', 'QUARTO'] as const

export function EditorSidebar() {
  const section = useStudioStore((s) => s.section)
  const setSection = useStudioStore((s) => s.setSection)

  return (
    <aside className="studio-sidebar">
      {groups.map((group) => (
        <div key={group}>
          <div className="sidebar-label">{group}</div>
          {sections
            .filter((item) => item.group === group)
            .map((item) => (
              <button
                key={item.label ?? item.name}
                aria-label={item.label ?? item.name}
                className={section === item.name ? 'active' : ''}
                aria-current={section === item.name ? 'page' : undefined}
                onClick={() => setSection(item.name)}
              >
                <span>{item.icon}</span>
                {item.label ?? item.name}
              </button>
            ))}
        </div>
      ))}
    </aside>
  )
}
