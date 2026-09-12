import { useMemo, useState } from 'react'
import { selectorGroups } from '../theme/schema'
import { quartoParts, quartoPartFor } from '../theme/quartoParts'
import { useStudioStore } from '../theme/store'
import { swatchColor } from './colorPreview'
import { controlValueFor } from './controlValue'
import { ColorField, SelectField, StepperField, TextField } from './Field'
import {
  effectiveValueFor,
  propertyGroupsForElement,
  targetList,
  type PropertyDef,
} from './elementProfiles'
import { configuredStacks } from './googleFonts'
import { ShadowField } from './ShadowField'
import { resolveShadowTokenValue } from './shadowValue'

function PropertyControl({
  definition,
  value,
  resolvedValue,
  swatch,
  fontOptions,
  onChange,
}: {
  definition: PropertyDef
  value: string
  resolvedValue?: string
  swatch?: string
  fontOptions?: string[]
  onChange: (value: string) => void
}) {
  if (definition.kind === 'select') {
    // The element family accepts the theme webfonts in addition to portable stacks.
    const options =
      definition.property === 'fontFamily' && fontOptions?.length
        ? [...fontOptions, ...(definition.options ?? [])]
        : definition.options
    return (
      <SelectField
        label={definition.label}
        value={value}
        options={options ?? []}
        hint={definition.hint}
        onChange={onChange}
      />
    )
  }
  if (definition.kind === 'size') {
    return (
      <StepperField
        label={definition.label}
        value={value}
        placeholder="CSS value"
        hint={definition.hint}
        defaultUnit={definition.defaultUnit}
        step={definition.step}
        onChange={onChange}
      />
    )
  }
  if (definition.kind === 'color') {
    return (
      <ColorField
        label={definition.label}
        value={value}
        hint={definition.hint}
        swatch={swatch}
        onChange={onChange}
      />
    )
  }
  if (definition.kind === 'shadow') {
    return (
      <ShadowField
        label={definition.label}
        value={value}
        resolvedValue={resolvedValue}
        hint={definition.hint}
        onChange={onChange}
      />
    )
  }
  return (
    <TextField
      label={definition.label}
      value={value}
      placeholder="inherit / token / CSS value"
      hint={definition.hint}
      onChange={onChange}
    />
  )
}

export function ElementEditor() {
  const [query, setQuery] = useState('')
  const theme = useStudioStore((s) => s.theme)
  const element = useStudioStore((s) => s.selectedElement)
  const quartoPart = quartoPartFor(element)
  const setElement = useStudioStore((s) => s.setSelectedElement)
  const setSpecimen = useStudioStore((s) => s.setSpecimen)
  const setTargets = useStudioStore((s) => s.setElementTargets)
  const propertyGroups = useMemo(
    () => propertyGroupsForElement(element),
    [element],
  )

  const filteredGroups = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return Object.entries(selectorGroups)
      .map(([group, tags]) => ({
        group,
        tags: tags.filter((tag) => !normalized || tag.includes(normalized)),
      }))
      .filter(({ tags }) => tags.length)
  }, [query])

  const chooseSelector = (tag: string) => {
    setElement(tag)
  }

  // Pseudo-element rules have no shorthand of their own to decompose, and
  // bridging them (`::selection` background falling back to the element's
  // `background`) would display a value the control cannot clear.
  const valueFor = (definition: PropertyDef) => {
    const effective = effectiveValueFor(theme, element, definition)
    const isPseudo = targetList(element, definition).some((target) =>
      target.selector.includes('::'),
    )
    return isPseudo
      ? effective
      : controlValueFor(theme, element, definition.property, effective)
  }

  // Only an explicitly written longhand is a clearable override. A value
  // merely inherited from shorthand keeps being shown, but gets no × button
  // that would be unable to erase the declaration actually producing it.
  const hasOverride = (definition: PropertyDef) =>
    targetList(element, definition).some((target) =>
      Boolean(theme.layers.elements[target.selector]?.[target.property]),
    )

  const changeProperty = (definition: PropertyDef, next: string) => {
    setTargets(targetList(element, definition), next)
  }

  const relevantSelectors = new Set<string>([element])
  for (const group of propertyGroups) {
    for (const definition of group.properties) {
      for (const target of targetList(element, definition))
        relevantSelectors.add(target.selector)
    }
  }
  const overrideCount = [...relevantSelectors].reduce(
    (count, selector) =>
      count + Object.keys(theme.layers.elements[selector] ?? {}).length,
    0,
  )

  return (
    <div className="editor-panel element-editor">
      <div className="panel-heading">
        <div>
          <h2>Selector stories</h2>
          <p>
            Each HTML element now exposes a curated set of relevant CSS
            properties instead of one generic property sheet.
          </p>
        </div>
      </div>

      <div className="selected-selector-card">
        <div>
          <small>SELECTED SELECTOR</small>
          <code>{quartoPart ? quartoPart.label : `<${element}>`}</code>
          {quartoPart && <small>{element}</small>}
        </div>
        <button
          type="button"
          onClick={() => setSpecimen(quartoPart ? 'Quarto' : 'Selector')}
        >
          Open story
        </button>
      </div>

      <label className="selector-search">
        <span>Find selector</span>
        <input
          type="search"
          placeholder="h1, table, input…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div className="selector-catalog" aria-label="HTML selector catalog">
        {quartoParts.some((part) =>
          `${part.label} ${part.selector}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        ) && (
          <section className="selector-group">
            <h3>Quarto components</h3>
            <div className="selector-buttons">
              {quartoParts
                .filter((part) =>
                  `${part.label} ${part.selector}`
                    .toLowerCase()
                    .includes(query.toLowerCase()),
                )
                .map((part) => (
                  <button
                    key={part.selector}
                    className={element === part.selector ? 'active' : ''}
                    onClick={() => {
                      chooseSelector(part.selector)
                      setSpecimen('Quarto')
                    }}
                  >
                    {part.label}
                  </button>
                ))}
            </div>
          </section>
        )}
        {filteredGroups.map(({ group, tags }) => (
          <section key={group} className="selector-group">
            <h3>{group}</h3>
            <div className="selector-buttons">
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={element === tag ? 'active' : ''}
                  onClick={() => chooseSelector(tag)}
                >
                  &lt;{tag}&gt;
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="property-summary">
        <strong>{overrideCount}</strong> active overrides associated with{' '}
        <code>{element}</code>. Only properties relevant to this element are
        shown; browser-part rules are generated automatically where needed.
      </div>

      <div className="property-groups">
        {propertyGroups.map((group, groupIndex) => (
          <details
            key={group.title}
            open={
              groupIndex < 2 ||
              group.title.includes('appearance') ||
              group.title === 'Start border'
            }
          >
            <summary>{group.title}</summary>
            <div className="field-grid">
              {group.properties.map((definition) => {
                const value = valueFor(definition)
                const swatch =
                  definition.kind === 'color'
                    ? swatchColor(value, theme)
                    : undefined
                const fontOptions =
                  definition.property === 'fontFamily'
                    ? configuredStacks(theme)
                    : undefined
                const resolvedShadow =
                  definition.kind === 'shadow'
                    ? resolveShadowTokenValue(value, theme.tokens.shadow)
                    : undefined
                return (
                  <div
                    key={`${definition.property}-${definition.label}`}
                    className={`property-row ${definition.kind === 'shadow' ? 'property-row-wide' : ''}`}
                  >
                    <PropertyControl
                      definition={definition}
                      value={value}
                      resolvedValue={
                        resolvedShadow === value ? undefined : resolvedShadow
                      }
                      swatch={swatch}
                      fontOptions={fontOptions}
                      onChange={(next) => changeProperty(definition, next)}
                    />
                    {hasOverride(definition) && (
                      <button
                        className="tiny-button"
                        aria-label={`Clear ${definition.label}`}
                        onClick={() => changeProperty(definition, '')}
                      >
                        ×
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
