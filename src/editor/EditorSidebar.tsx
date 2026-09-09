import { useStudioStore, type EditorSection } from '../theme/store'

const sections: Array<{name:EditorSection; icon:string}> = [
  {name:'Colors',icon:'◐'},{name:'Typography',icon:'Aa'},{name:'Spacing',icon:'↕'},{name:'Layout',icon:'▦'},{name:'Radius',icon:'⌒'},{name:'Shadows',icon:'◫'},{name:'Elements',icon:'<>'},{name:'States',icon:':-'},{name:'Accessibility',icon:'✓'},
]

export function EditorSidebar() {
  const section = useStudioStore((s) => s.section)
  const setSection = useStudioStore((s) => s.setSection)
  return <aside className="studio-sidebar"><div className="sidebar-label">THEME</div>{sections.slice(0,6).map((item) => <button key={item.name} className={section===item.name?'active':''} onClick={() => setSection(item.name)}><span>{item.icon}</span>{item.name}</button>)}<div className="sidebar-label">SEMANTIC</div>{sections.slice(6).map((item) => <button key={item.name} className={section===item.name?'active':''} onClick={() => setSection(item.name)}><span>{item.icon}</span>{item.name}</button>)}</aside>
}
