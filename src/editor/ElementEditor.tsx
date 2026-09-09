import { useMemo, useState } from 'react'
import { selectorGroups } from '../theme/schema'
import { useStudioStore } from '../theme/store'
import { swatchColor } from './colorPreview'
import { ColorField, SelectField, StepperField, TextField } from './Field'
import { effectiveValueFor, hasElementOverride, propertyGroupsForElement, targetList, type PropertyDef } from './elementProfiles'
import { ShadowField } from './ShadowField'
import { resolveShadowTokenValue } from './shadowValue'

function PropertyControl({ definition, value, resolvedValue, swatch, onChange }: { definition: PropertyDef; value: string; resolvedValue?: string; swatch?: string; onChange: (value: string) => void }) {
  if (definition.kind === 'select') {
    return <SelectField label={definition.label} value={value} options={definition.options ?? []} hint={definition.hint} onChange={onChange} />
  }
  if (definition.kind === 'size') {
    return <StepperField label={definition.label} value={value} placeholder="CSS value" hint={definition.hint} defaultUnit={definition.defaultUnit} step={definition.step} onChange={onChange} />
  }
  if (definition.kind === 'color') {
    return <ColorField label={definition.label} value={value} hint={definition.hint} swatch={swatch} onChange={onChange} />
  }
  if (definition.kind === 'shadow') {
    return <ShadowField label={definition.label} value={value} resolvedValue={resolvedValue} hint={definition.hint} onChange={onChange} />
  }
  return <TextField label={definition.label} value={value} placeholder="inherit / token / CSS value" hint={definition.hint} onChange={onChange} />
}

export function ElementEditor() {
  const [query, setQuery] = useState('')
  const theme = useStudioStore((s) => s.theme)
  const element = useStudioStore((s) => s.selectedElement)
  const setElement = useStudioStore((s) => s.setSelectedElement)
  const setSpecimen = useStudioStore((s) => s.setSpecimen)
  const setTargets = useStudioStore((s) => s.setElementTargets)
  const propertyGroups = useMemo(() => propertyGroupsForElement(element), [element])

  const filteredGroups = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return Object.entries(selectorGroups)
      .map(([group, tags]) => ({ group, tags: tags.filter((tag) => !normalized || tag.includes(normalized)) }))
      .filter(({ tags }) => tags.length)
  }, [query])

  const chooseSelector = (tag: string) => {
    setElement(tag)
  }

  const valueFor = (definition: PropertyDef) => effectiveValueFor(theme, element, definition)

  const hasOverride = (definition: PropertyDef) => hasElementOverride(theme, element, definition)

  const changeProperty = (definition: PropertyDef, next: string) => {
    setTargets(targetList(element, definition), next)
  }

  const relevantSelectors = new Set<string>([element])
  for (const group of propertyGroups) {
    for (const definition of group.properties) {
      for (const target of targetList(element, definition)) relevantSelectors.add(target.selector)
    }
  }
  const overrideCount = [...relevantSelectors].reduce((count, selector) => count + Object.keys(theme.layers.elements[selector] ?? {}).length, 0)

  return <div className="editor-panel element-editor">
    <div className="panel-heading"><div><h2>Selector stories</h2><p>Each HTML element now exposes a curated set of relevant CSS properties instead of one generic property sheet.</p></div></div>

    <div className="selected-selector-card">
      <div><small>SELECTED SELECTOR</small><code>&lt;{element}&gt;</code></div>
      <button type="button" onClick={() => setSpecimen('Selector')}>Open story</button>
    </div>

    <label className="selector-search"><span>Find selector</span><input type="search" placeholder="h1, table, input…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
    <div className="selector-catalog" aria-label="HTML selector catalog">
      {filteredGroups.map(({ group, tags }) => <section key={group} className="selector-group">
        <h3>{group}</h3>
        <div className="selector-buttons">
          {tags.map((tag) => <button type="button" key={tag} className={element === tag ? 'active' : ''} onClick={() => chooseSelector(tag)}>&lt;{tag}&gt;</button>)}
        </div>
      </section>)}
    </div>

    <div className="property-summary"><strong>{overrideCount}</strong> active overrides associated with <code>{element}</code>. Only properties relevant to this element are shown; browser-part rules are generated automatically where needed.</div>

    <div className="property-groups">
      {propertyGroups.map((group, groupIndex) => <details key={group.title} open={groupIndex < 2 || group.title.includes('appearance') || group.title === 'Start border'}>
        <summary>{group.title}</summary>
        <div className="field-grid">
          {group.properties.map((definition) => {
            const value = valueFor(definition)
            const swatch = definition.kind === 'color' ? swatchColor(value, theme) : undefined
            const resolvedValue = definition.kind === 'shadow'
              ? resolveShadowTokenValue(value, theme.tokens.shadow)
              : undefined
            return <div key={`${definition.property}-${definition.label}`} className={`property-row ${definition.kind === 'shadow' ? 'property-row-wide' : ''}`}>
              <PropertyControl definition={definition} value={value} resolvedValue={resolvedValue === value ? undefined : resolvedValue} swatch={swatch} onChange={(next) => changeProperty(definition, next)} />
              {hasOverride(definition) && <button className="tiny-button" aria-label={`Clear ${definition.label}`} onClick={() => changeProperty(definition, '')}>×</button>}
            </div>
          })}
        </div>
      </details>)}
    </div>
  </div>
}
