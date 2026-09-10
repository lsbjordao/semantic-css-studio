import {
  faArrowRotateLeft,
  faArrowRotateRight,
  faCheck,
  faChevronDown,
  faChevronRight,
  faCircle,
  faMagnifyingGlass,
  faMinus,
  faTableCells,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-common-types'
import bootstrapCheck from 'bootstrap-icons/icons/check.svg?raw'
import bootstrapChevronDown from 'bootstrap-icons/icons/chevron-down.svg?raw'
import bootstrapChevronRight from 'bootstrap-icons/icons/chevron-right.svg?raw'
import bootstrapDash from 'bootstrap-icons/icons/dash.svg?raw'
import bootstrapDot from 'bootstrap-icons/icons/dot.svg?raw'
import bootstrapGrid from 'bootstrap-icons/icons/grid.svg?raw'
import bootstrapRedo from 'bootstrap-icons/icons/arrow-clockwise.svg?raw'
import bootstrapSearch from 'bootstrap-icons/icons/search.svg?raw'
import bootstrapUndo from 'bootstrap-icons/icons/arrow-counterclockwise.svg?raw'
import bootstrapX from 'bootstrap-icons/icons/x.svg?raw'
import heroCheck from 'heroicons/24/outline/check.svg?raw'
import heroChevronDown from 'heroicons/24/outline/chevron-down.svg?raw'
import heroChevronRight from 'heroicons/24/outline/chevron-right.svg?raw'
import heroDot from 'heroicons/24/outline/stop-circle.svg?raw'
import heroGrid from 'heroicons/24/outline/squares-2x2.svg?raw'
import heroMinus from 'heroicons/24/outline/minus.svg?raw'
import heroRedo from 'heroicons/24/outline/arrow-uturn-right.svg?raw'
import heroSearch from 'heroicons/24/outline/magnifying-glass.svg?raw'
import heroUndo from 'heroicons/24/outline/arrow-uturn-left.svg?raw'
import heroX from 'heroicons/24/outline/x-mark.svg?raw'
import materialCheck from '@material-design-icons/svg/filled/check.svg?raw'
import materialChevronDown from '@material-design-icons/svg/filled/expand_more.svg?raw'
import materialChevronRight from '@material-design-icons/svg/filled/chevron_right.svg?raw'
import materialDot from '@material-design-icons/svg/filled/fiber_manual_record.svg?raw'
import materialGrid from '@material-design-icons/svg/filled/grid_view.svg?raw'
import materialMinus from '@material-design-icons/svg/filled/remove.svg?raw'
import materialRedo from '@material-design-icons/svg/filled/redo.svg?raw'
import materialSearch from '@material-design-icons/svg/filled/search.svg?raw'
import materialUndo from '@material-design-icons/svg/filled/undo.svg?raw'
import materialX from '@material-design-icons/svg/filled/close.svg?raw'
import lucideCheck from 'lucide-static/icons/check.svg?raw'
import lucideChevronDown from 'lucide-static/icons/chevron-down.svg?raw'
import lucideChevronRight from 'lucide-static/icons/chevron-right.svg?raw'
import lucideDot from 'lucide-static/icons/circle-dot.svg?raw'
import lucideGrid from 'lucide-static/icons/grid-2x2.svg?raw'
import lucideMinus from 'lucide-static/icons/minus.svg?raw'
import lucideRedo from 'lucide-static/icons/redo.svg?raw'
import lucideSearch from 'lucide-static/icons/search.svg?raw'
import lucideUndo from 'lucide-static/icons/undo.svg?raw'
import lucideX from 'lucide-static/icons/x.svg?raw'
import phosphorCheck from '@phosphor-icons/core/regular/check.svg?raw'
import phosphorChevronDown from '@phosphor-icons/core/regular/caret-down.svg?raw'
import phosphorChevronRight from '@phosphor-icons/core/regular/caret-right.svg?raw'
import phosphorDot from '@phosphor-icons/core/regular/dot.svg?raw'
import phosphorGrid from '@phosphor-icons/core/regular/squares-four.svg?raw'
import phosphorMinus from '@phosphor-icons/core/regular/minus.svg?raw'
import phosphorRedo from '@phosphor-icons/core/regular/arrow-u-up-right.svg?raw'
import phosphorSearch from '@phosphor-icons/core/regular/magnifying-glass.svg?raw'
import phosphorUndo from '@phosphor-icons/core/regular/arrow-u-up-left.svg?raw'
import phosphorX from '@phosphor-icons/core/regular/x.svg?raw'
import tablerCheck from '@tabler/icons/outline/check.svg?raw'
import tablerChevronDown from '@tabler/icons/outline/chevron-down.svg?raw'
import tablerChevronRight from '@tabler/icons/outline/chevron-right.svg?raw'
import tablerDot from '@tabler/icons/outline/point.svg?raw'
import tablerGrid from '@tabler/icons/outline/layout-grid.svg?raw'
import tablerMinus from '@tabler/icons/outline/minus.svg?raw'
import tablerRedo from '@tabler/icons/outline/arrow-forward-up.svg?raw'
import tablerSearch from '@tabler/icons/outline/search.svg?raw'
import tablerUndo from '@tabler/icons/outline/arrow-back-up.svg?raw'
import tablerX from '@tabler/icons/outline/x.svg?raw'
import type { IconLibraryId, IconName } from './types'

export interface IconSource {
  viewBox: string
  body: string
}

function parseSvg(source: string): IconSource {
  const viewBox = source.match(/\bviewBox="([^"]+)"/i)?.[1] ?? '0 0 24 24'
  const body = source
    .replace(/<\?xml[\s\S]*?\?>/i, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<svg\b[^>]*>/i, '')
    .replace(/<\/svg>\s*$/i, '')
    .trim()
  return { viewBox, body }
}

function fontAwesomeSource(definition: IconDefinition): IconSource {
  const [width, height, , , pathData] = definition.icon
  const paths = Array.isArray(pathData) ? pathData : [pathData]
  return {
    viewBox: `0 0 ${width} ${height}`,
    body: paths.map((path) => `<path d="${path}"/>`).join(''),
  }
}

const source = parseSvg

const fontAwesome: Record<IconName, IconSource> = {
  check: fontAwesomeSource(faCheck),
  minus: fontAwesomeSource(faMinus),
  dot: fontAwesomeSource(faCircle),
  'chevron-down': fontAwesomeSource(faChevronDown),
  'chevron-right': fontAwesomeSource(faChevronRight),
  search: fontAwesomeSource(faMagnifyingGlass),
  x: fontAwesomeSource(faXmark),
  undo: fontAwesomeSource(faArrowRotateLeft),
  redo: fontAwesomeSource(faArrowRotateRight),
  grid: fontAwesomeSource(faTableCells),
}

const iconSources: Record<
  Exclude<IconLibraryId, 'none'>,
  Record<IconName, IconSource>
> = {
  lucide: {
    check: source(lucideCheck),
    minus: source(lucideMinus),
    dot: source(lucideDot),
    'chevron-down': source(lucideChevronDown),
    'chevron-right': source(lucideChevronRight),
    search: source(lucideSearch),
    x: source(lucideX),
    undo: source(lucideUndo),
    redo: source(lucideRedo),
    grid: source(lucideGrid),
  },
  phosphor: {
    check: source(phosphorCheck),
    minus: source(phosphorMinus),
    dot: source(phosphorDot),
    'chevron-down': source(phosphorChevronDown),
    'chevron-right': source(phosphorChevronRight),
    search: source(phosphorSearch),
    x: source(phosphorX),
    undo: source(phosphorUndo),
    redo: source(phosphorRedo),
    grid: source(phosphorGrid),
  },
  heroicons: {
    check: source(heroCheck),
    minus: source(heroMinus),
    dot: source(heroDot),
    'chevron-down': source(heroChevronDown),
    'chevron-right': source(heroChevronRight),
    search: source(heroSearch),
    x: source(heroX),
    undo: source(heroUndo),
    redo: source(heroRedo),
    grid: source(heroGrid),
  },
  material: {
    check: source(materialCheck),
    minus: source(materialMinus),
    dot: source(materialDot),
    'chevron-down': source(materialChevronDown),
    'chevron-right': source(materialChevronRight),
    search: source(materialSearch),
    x: source(materialX),
    undo: source(materialUndo),
    redo: source(materialRedo),
    grid: source(materialGrid),
  },
  fontawesome: fontAwesome,
  bootstrap: {
    check: source(bootstrapCheck),
    minus: source(bootstrapDash),
    dot: source(bootstrapDot),
    'chevron-down': source(bootstrapChevronDown),
    'chevron-right': source(bootstrapChevronRight),
    search: source(bootstrapSearch),
    x: source(bootstrapX),
    undo: source(bootstrapUndo),
    redo: source(bootstrapRedo),
    grid: source(bootstrapGrid),
  },
  tabler: {
    check: source(tablerCheck),
    minus: source(tablerMinus),
    dot: source(tablerDot),
    'chevron-down': source(tablerChevronDown),
    'chevron-right': source(tablerChevronRight),
    search: source(tablerSearch),
    x: source(tablerX),
    undo: source(tablerUndo),
    redo: source(tablerRedo),
    grid: source(tablerGrid),
  },
}

export function getIconSource(
  library: Exclude<IconLibraryId, 'none'>,
  name: IconName,
): IconSource {
  return iconSources[library][name]
}
