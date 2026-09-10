import { useStudioStore, type EditorSection } from '../theme/store'

const sections: Array<{ name: EditorSection; icon: string; group: 'TOKENS' | 'REGRAS' | 'CHECAGEM' }> = [
  { name: 'Colors', icon: '◐', group: 'TOKENS' },
  { name: 'Typography', icon: 'Aa', group: 'TOKENS' },
  { name: 'Spacing', icon: '↕', group: 'TOKENS' },
  { name: 'Layout', icon: '▦', group: 'TOKENS' },
  { name: 'Radius', icon: '⌒', group: 'TOKENS' },
  { name: 'Shadows', icon: '◫', group: 'TOKENS' },
  { name: 'Icons', icon: '◈', group: 'TOKENS' },
  { name: 'Base', icon: '▤', group: 'REGRAS' },
  { name: 'Elements', icon: '<>', group: 'REGRAS' },
  { name: 'States', icon: ':-', group: 'REGRAS' },
  { name: 'Accessibility', icon: '✓', group: 'CHECAGEM' },
]

const groups = ['TOKENS', 'REGRAS', 'CHECAGEM'] as const

export function EditorSidebar() {
  const section = useStudioStore((s) => s.section)
  const setSection = useStudioStore((s) => s.setSection)

  return <aside className="studio-sidebar">
    {groups.map((group) => <div key={group}>
      <div className="sidebar-label">{group}</div>
      {sections.filter((item) => item.group === group).map((item) => <button
        key={item.name}
        className={section === item.name ? 'active' : ''}
        aria-current={section === item.name ? 'page' : undefined}
        onClick={() => setSection(item.name)}
      ><span>{item.icon}</span>{item.name}</button>)}
    </div>)}
  </aside>
}
