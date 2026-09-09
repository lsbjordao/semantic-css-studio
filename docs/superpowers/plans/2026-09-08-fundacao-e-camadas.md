# Fundação e Camadas — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar o `Theme` para o schema v2 com mapas por camada e fazer o compilador emitir CSS em `@layer` com regras-base em `:where()` e editáveis pelo usuário.

**Architecture:** O `Theme` deixa de ter `elements`/`states`/`responsive` soltos e passa a ter `layers: { base, elements, states, responsive }`, cada um um `Record<seletor, declarações>`. As regras hoje hardcoded em `baseRules()` e `responsiveRules()` do compilador viram dados semeados na camada `base` e `responsive`, o que as torna visíveis e editáveis. O compilador emite `@layer reset, base, elements, states, responsive`, envolvendo a camada base em `:where()` para especificidade zero, de modo que o CSS de quem consome o tema sempre vença sem `!important`.

**Tech Stack:** TypeScript 5.8, React 19, Zustand 5, Vite 7, Vitest 3, Playwright 1.55.

**Spec:** `docs/superpowers/specs/2026-09-08-css-editor-expansion-design.md`

## Global Constraints

- As invariantes 1 a 6 de `docs/ARCHITECTURE.md` permanecem válidas. Em particular: o compilador **não** pode importar React nem usar API de browser (`document`, `window`, `localStorage`).
- O CSS gerado é determinístico: mesmo tema, mesmos bytes. Todo teste de compilador deve poder compilar duas vezes e comparar.
- Seletores são ordenados por ordem canônica de domínio para tags conhecidas e `localeCompare` para o restante. Declarações são ordenadas alfabeticamente pelo nome kebab dentro de cada regra.
- `SCHEMA_VERSION` passa de `1` para `2`. Existe exatamente **uma** migração nesta entrega; os tokens de scroll entram no schema agora, mesmo só sendo usados na entrega seguinte, para não exigir uma v3.
- Alvo de browser do CSS gerado: Chrome/Edge 99+, Firefox 97+, Safari 15.4+ (piso do `@layer`).
- Chaves de `CssPropertyMap` são camelCase. Propriedades customizadas são a exceção: armazenadas literalmente começando por `--` e emitidas sem transformação.
- As chaves de `layers.responsive` correspondem exatamente às chaves de `breakpoints`. Chave órfã é erro de validação.
- Rodar `npm run lint` antes de cada commit. Rodar `npm test` em todo passo de verificação.

---

## Estrutura de arquivos

**Criar:**
- `src/theme/tokenNames.ts` — mapa de prefixo por grupo de token; substitui a cadeia de `.replace()`
- `src/compiler/minify.ts` — minificador por tokenização, respeitando strings, comentários e `url()`
- `src/compiler/selectorValidation.ts` — validador puro de seletor e gerador de avisos
- `src/theme/baseRules.ts` — `seedBaseRules()` e `seedResponsiveRules()`
- `src/theme/scrollDefaults.ts` — valores padrão dos tokens de scroll
- `src/editor/BaseRulesEditor.tsx` — painel da camada base
- `scripts/migrate-presets.ts` — codemod de uso único que reescreve presets e defaults em v2
- `tests/tokenNames.test.ts`, `tests/minify.test.ts`, `tests/selectorValidation.test.ts`, `tests/baseRules.test.ts`, `tests/layers.test.ts`
- `tests/fixtures/theme-v1.json` — snapshot do `defaultTheme` v1, congelado antes da troca

**Modificar:**
- `src/theme/schema.ts` — tipos v2
- `src/theme/migration.ts` — migração v1 → v2 de verdade
- `src/theme/defaults.ts` — forma v2
- `src/theme/presets/index.ts` — seis presets em v2 (gerado pelo codemod)
- `src/compiler/compileTheme.ts` — lê `layers`, emite `@layer`
- `src/theme/store.ts` — API por camada, `readStoredTheme` via migração
- `src/editor/ElementEditor.tsx`, `src/editor/StateEditor.tsx` — leem e escrevem `layers`
- `src/editor/EditorSidebar.tsx` — seção Base
- `src/app/App.tsx` — rota da seção Base
- `tests/compiler.test.ts`, `tests/migration.test.ts`
- `tests/snapshots/presets/*.css` — regerados

---

## Fase 1 — Fundação

### Task 1: Corrigir a nomeação de tokens

Bug em produção: `tokenName()` em `src/compiler/compileTheme.ts:26-53` é uma cadeia de trinta `.replace()`. A chave `space2xl` não tem letra maiúscula, então `kebab()` a deixa intacta e nenhum `.replace()` casa. O resultado é que `:root` declara `--space2xl` enquanto `main` consome `var(--space-2xl)` — que só é definida dentro do media query de 390px. Acima do mobile o shorthand `padding` fica inválido em tempo de computação e o `main` fica sem padding algum. Afeta os seis presets.

**Files:**
- Create: `src/theme/tokenNames.ts`
- Create: `tests/tokenNames.test.ts`
- Modify: `src/compiler/compileTheme.ts:26-53` (remove `tokenName`), `:69-79` (`tokenEntries`), `:148-158` (`darkModeRule`)
- Modify: `tests/snapshots/presets/*.css` (regerados)

**Interfaces:**
- Consumes: `ThemeTokens` de `src/theme/schema.ts`
- Produces: `tokenName(group: keyof ThemeTokens, key: string): string`

- [ ] **Step 1: Escrever o teste que falha**

`tests/tokenNames.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { tokenName } from '../src/theme/tokenNames'

describe('tokenName', () => {
  it('prefixa cores com color-', () => {
    expect(tokenName('colors', 'background')).toBe('color-background')
    expect(tokenName('colors', 'surfaceAlt')).toBe('color-surface-alt')
    expect(tokenName('colors', 'codeBackground')).toBe('color-code-background')
  })

  it('mantem o kebab da chave nos demais grupos', () => {
    expect(tokenName('typography', 'fontSizeBase')).toBe('font-size-base')
    expect(tokenName('typography', 'lineHeightBody')).toBe('line-height-body')
    expect(tokenName('radius', 'radiusFull')).toBe('radius-full')
    expect(tokenName('shadow', 'shadowLg')).toBe('shadow-lg')
    expect(tokenName('layout', 'contentWidth')).toBe('content-width')
  })

  it('separa letra de digito, corrigindo --space2xl', () => {
    expect(tokenName('spacing', 'space2xl')).toBe('space-2xl')
  })

  it('nomeia qualquer chave nova sem tabela de excecoes', () => {
    expect(tokenName('colors', 'accentQuiet')).toBe('color-accent-quiet')
  })
})
```

- [ ] **Step 2: Rodar para verificar que falha**

Run: `npx vitest run tests/tokenNames.test.ts`
Expected: FAIL — `Cannot find module '../src/theme/tokenNames'`

- [ ] **Step 3: Implementar**

`src/theme/tokenNames.ts`:

```ts
import type { ThemeTokens } from './schema'

/**
 * Prefixo aplicado ao nome kebab de cada grupo. Apenas cores recebem prefixo;
 * os demais grupos já carregam o prefixo na própria chave (`fontSizeBase`,
 * `spaceMd`, `radiusSm`). Uma chave nova em qualquer grupo é nomeada
 * corretamente sem precisar entrar em tabela de exceções.
 */
const groupPrefix: Record<keyof ThemeTokens, string> = {
  colors: 'color-',
  typography: '',
  spacing: '',
  radius: '',
  shadow: '',
  layout: '',
}

/**
 * Kebab específico de chave de token. Diferente do kebab de propriedade CSS,
 * este também separa letra de dígito, sem o que `space2xl` produziria
 * `--space2xl` enquanto o resto do tema consome `var(--space-2xl)`.
 */
function kebabToken(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([a-z])(\d)/g, '$1-$2')
    .toLowerCase()
}

export function tokenName(group: keyof ThemeTokens, key: string): string {
  return `${groupPrefix[group]}${kebabToken(key)}`
}
```

- [ ] **Step 4: Rodar para verificar que passa**

Run: `npx vitest run tests/tokenNames.test.ts`
Expected: PASS, 4 testes

- [ ] **Step 5: Ligar o compilador ao novo nomeador**

Em `src/compiler/compileTheme.ts`, apagar a função `tokenName` inteira (linhas 26-53) e adicionar o import. A função `kebab` local **permanece**: ela serve nomes de propriedade CSS e precisa manter o comportamento atual, em que maiúscula inicial vira hífen inicial (`WebkitLineClamp` → `-webkit-line-clamp`).

```ts
import { tokenName } from '../theme/tokenNames'
import type { ThemeTokens } from '../theme/schema'
```

Substituir `tokenEntries` (linhas 69-79) por:

```ts
const tokenGroups: Array<keyof ThemeTokens> = [
  'colors', 'typography', 'spacing', 'radius', 'shadow', 'layout',
]

function tokenEntries(theme: Theme): Array<[string, string]> {
  return tokenGroups.flatMap((group) =>
    Object.entries(theme.tokens[group]).map(
      ([key, value]) => [tokenName(group, key), String(value)] as [string, string],
    ),
  )
}
```

Em `darkModeRule` (linhas 148-158), a chamada `tokenName(key)` passa a ser `tokenName('colors', key)`, porque `modes.dark.colors` só contém chaves de cor.

- [ ] **Step 6: Regerar os snapshots e conferir o diff**

Run: `npx vitest run tests/presets.test.ts`
Expected: FAIL nos seis presets — o `:root` agora emite `--space-2xl` no lugar de `--space2xl`.

Regerar cada snapshot:

```bash
npx vite-node -e "
import { writeFileSync } from 'node:fs'
import { compileTheme } from './src/compiler/index.ts'
import { presets } from './src/theme/presets/index.ts'
for (const [name, theme] of Object.entries(presets)) {
  const file = 'tests/snapshots/presets/' + name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-') + '.css'
  writeFileSync(file, compileTheme(theme))
}
"
git diff --stat tests/snapshots/
git diff tests/snapshots/presets/minimal.css
```

Expected: o diff de cada arquivo tem **exatamente uma linha alterada**, `--space2xl: 4rem;` → `--space-2xl: 4rem;`. Qualquer outra linha alterada é regressão e deve ser investigada antes de commitar.

- [ ] **Step 7: Rodar a suíte inteira**

Run: `npm test && npm run lint`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/theme/tokenNames.ts tests/tokenNames.test.ts src/compiler/compileTheme.ts tests/snapshots/
git commit -m "fix: corrigir --space-2xl e substituir tokenName por mapa de grupo

A cadeia de .replace() em tokenName nao casava com space2xl, que nao tem
letra maiuscula. O :root declarava --space2xl enquanto main consumia
var(--space-2xl), definida apenas dentro do media query de 390px: acima
do mobile o shorthand padding ficava invalido em tempo de computacao e o
main perdia o padding. Afetava os seis presets.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 2: Minificador por tokenização

O `minifyCss()` atual (`src/compiler/compileTheme.ts:166-172`) é regex sobre string. Ele sobrevive hoje porque os valores emitidos são simples, mas corrompe strings, comentários dentro de valor e `url(data:…)` — todos alcançáveis assim que o catálogo exaustivo de propriedades liberar `content`, gradientes e imagens embutidas.

**Files:**
- Create: `src/compiler/minify.ts`
- Create: `tests/minify.test.ts`
- Modify: `src/compiler/compileTheme.ts:166-172` (remove `minifyCss`), `src/compiler/index.ts`

**Interfaces:**
- Consumes: nada
- Produces: `minifyCss(css: string): string`

- [ ] **Step 1: Escrever o teste que falha**

`tests/minify.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { minifyCss } from '../src/compiler/minify'

describe('minifyCss', () => {
  it('remove espaco e o ponto-e-virgula final', () => {
    expect(minifyCss('a {\n  color: red;\n}\n')).toBe('a{color:red}')
  })

  it('descarta comentarios', () => {
    expect(minifyCss('/* nota */\na { color: red }')).toBe('a{color:red}')
  })

  it('preserva o conteudo de strings', () => {
    expect(minifyCss('a::after { content: "a;  b" }')).toBe('a::after{content:"a;  b"}')
  })

  it('nao quebra comentario dentro de string', () => {
    expect(minifyCss('a::after { content: "/* nao e comentario */" }'))
      .toBe('a::after{content:"/* nao e comentario */"}')
  })

  it('preserva url() sem aspas', () => {
    const css = 'a { background: url(data:image/svg+xml;base64,AA==) }'
    expect(minifyCss(css)).toBe('a{background:url(data:image/svg+xml;base64,AA==)}')
  })

  it('preserva o combinador descendente antes de pseudo-classe', () => {
    // `a :hover` e `a:hover` sao seletores diferentes; colapsar o espaco
    // aqui mudaria o significado da regra.
    expect(minifyCss('a :hover { color: red }')).toBe('a :hover{color:red}')
  })

  it('preserva virgula em lista de fontes', () => {
    expect(minifyCss('a { font-family: "Iowan Old Style", Georgia, serif }'))
      .toBe('a{font-family:"Iowan Old Style",Georgia,serif}')
  })

  it('mantem o media query valido', () => {
    expect(minifyCss('@media (max-width: 768px) {\n  a { color: red }\n}'))
      .toBe('@media (max-width: 768px){a{color:red}}')
  })
})
```

- [ ] **Step 2: Rodar para verificar que falha**

Run: `npx vitest run tests/minify.test.ts`
Expected: FAIL — `Cannot find module '../src/compiler/minify'`

- [ ] **Step 3: Implementar**

`src/compiler/minify.ts`:

```ts
const DROP_AROUND = '{};,'

/**
 * Minificador por varredura de caracteres. Ao contrário de uma abordagem por
 * regex, este respeita strings, comentários e `url()` sem aspas, e só remove
 * espaço em torno de `:` dentro de bloco de declaração — em contexto de
 * seletor, `a :hover` e `a:hover` são regras diferentes.
 */
export function minifyCss(css: string): string {
  const out: string[] = []
  let depth = 0
  let i = 0

  const last = (): string => (out.length ? out[out.length - 1] : '')

  while (i < css.length) {
    const char = css[i]

    if (char === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2)
      i = end === -1 ? css.length : end + 2
      continue
    }

    if (char === '"' || char === "'") {
      const quote = char
      let literal = char
      i += 1
      while (i < css.length) {
        if (css[i] === '\\') {
          literal += css.slice(i, i + 2)
          i += 2
          continue
        }
        literal += css[i]
        const closed = css[i] === quote
        i += 1
        if (closed) break
      }
      out.push(literal)
      continue
    }

    if ((char === 'u' || char === 'U') && /^url\(/i.test(css.slice(i, i + 4))) {
      const end = css.indexOf(')', i)
      if (end !== -1 && !/["']/.test(css.slice(i + 4, end))) {
        out.push(css.slice(i, end + 1).replace(/\s+/g, ''))
        i = end + 1
        continue
      }
    }

    if (/\s/.test(char)) {
      while (i < css.length && /\s/.test(css[i])) i += 1
      const next: string | undefined = css[i]
      const prev = last().slice(-1)
      const dropped =
        next === undefined ||
        DROP_AROUND.includes(next) ||
        DROP_AROUND.includes(prev) ||
        (depth > 0 && (next === ':' || prev === ':'))
      if (!dropped) out.push(' ')
      continue
    }

    if (char === '{') {
      depth += 1
      out.push('{')
      i += 1
      continue
    }

    if (char === '}') {
      depth = Math.max(0, depth - 1)
      while (last() === ';') out.pop()
      out.push('}')
      i += 1
      continue
    }

    out.push(char)
    i += 1
  }

  return out.join('').trim()
}
```

- [ ] **Step 4: Rodar para verificar que passa**

Run: `npx vitest run tests/minify.test.ts`
Expected: PASS, 8 testes

- [ ] **Step 5: Trocar a implementação antiga**

Em `src/compiler/compileTheme.ts`, apagar a função `minifyCss` (linhas 166-172). Em `src/compiler/index.ts`, reexportar a nova:

```ts
export { compileTheme } from './compileTheme'
export { minifyCss } from './minify'
```

- [ ] **Step 6: Rodar a suíte inteira**

Run: `npm test && npm run lint`
Expected: PASS. `tests/compiler.test.ts` já assertava que o minificado é menor e não tem `\n`; ambas continuam valendo.

- [ ] **Step 7: Commit**

```bash
git add src/compiler/minify.ts src/compiler/index.ts src/compiler/compileTheme.ts tests/minify.test.ts
git commit -m "refactor: minificar CSS por tokenizacao em vez de regex

O minificador por regex corrompia strings, comentarios dentro de valor e
url(data:...) — todos alcancaveis assim que content, gradientes e imagens
embutidas ficarem disponiveis no catalogo de propriedades. A varredura
tambem preserva o espaco em 'a :hover', que a regex colapsava para
'a:hover', mudando a regra.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3: Validador puro de seletor

O escape hatch de seletor livre precisa validar sem `document.querySelector`, porque o compilador não pode usar API de browser (invariante 3). Este validador roda na importação de tema; a interface usa `querySelector` em paralelo, em tempo de edição.

**Files:**
- Create: `src/compiler/selectorValidation.ts`
- Create: `tests/selectorValidation.test.ts`

**Interfaces:**
- Consumes: nada
- Produces: `isValidSelector(selector: string): boolean`, `selectorWarnings(selector: string): string[]`

- [ ] **Step 1: Escrever o teste que falha**

`tests/selectorValidation.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { isValidSelector, selectorWarnings } from '../src/compiler/selectorValidation'

describe('isValidSelector', () => {
  it('aceita os seletores que o catalogo produz', () => {
    for (const selector of [
      'article',
      'tbody tr:nth-child(even)',
      'a[href^="http"]::after',
      'article > p:first-of-type',
      'input:not([type="checkbox"]):not([type="radio"])',
      'h1, h2, h3',
      '::-webkit-scrollbar-thumb:hover',
      ':where(pre code)',
    ]) {
      expect(isValidSelector(selector), selector).toBe(true)
    }
  })

  it('rejeita parenteses e colchetes desbalanceados', () => {
    expect(isValidSelector('a:not(')).toBe(false)
    expect(isValidSelector('a[href')).toBe(false)
    expect(isValidSelector('a)')).toBe(false)
  })

  it('rejeita combinador solto', () => {
    expect(isValidSelector('article >')).toBe(false)
    expect(isValidSelector('+ p')).toBe(false)
    expect(isValidSelector('h1,')).toBe(false)
  })

  it('rejeita vazio e aspas abertas', () => {
    expect(isValidSelector('')).toBe(false)
    expect(isValidSelector('   ')).toBe(false)
    expect(isValidSelector('a[href="x]')).toBe(false)
  })

  it('rejeita chave, que indicaria bloco e nao seletor', () => {
    expect(isValidSelector('a { color: red }')).toBe(false)
  })
})

describe('selectorWarnings', () => {
  it('nao avisa sobre seletor semantico', () => {
    expect(selectorWarnings('article > p')).toEqual([])
  })

  it('avisa sobre classe', () => {
    expect(selectorWarnings('.card')).toHaveLength(1)
    expect(selectorWarnings('article .card')[0]).toMatch(/classe/i)
  })

  it('avisa sobre id', () => {
    expect(selectorWarnings('#main')[0]).toMatch(/id/i)
  })

  it('nao confunde pseudo-elemento com classe', () => {
    expect(selectorWarnings('a::after')).toEqual([])
    expect(selectorWarnings('li::marker')).toEqual([])
  })
})
```

- [ ] **Step 2: Rodar para verificar que falha**

Run: `npx vitest run tests/selectorValidation.test.ts`
Expected: FAIL — `Cannot find module '../src/compiler/selectorValidation'`

- [ ] **Step 3: Implementar**

`src/compiler/selectorValidation.ts`:

```ts
/**
 * Gramática deliberadamente restritiva: cobre o que o catálogo produz e o que
 * um tema classless razoavelmente precisa, e recusa qualquer coisa que
 * indique que o texto não é um seletor (chave, ponto-e-vírgula, arroba).
 */
const ALLOWED = /^[A-Za-z0-9_\-#.[\]="':(),>+~*|\s^$]+$/

function balanced(selector: string): boolean {
  let round = 0
  let square = 0
  let quote: string | null = null

  for (let i = 0; i < selector.length; i += 1) {
    const char = selector[i]
    if (quote) {
      if (char === quote && selector[i - 1] !== '\\') quote = null
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      continue
    }
    if (char === '(') round += 1
    else if (char === ')') {
      round -= 1
      if (round < 0) return false
    } else if (char === '[') square += 1
    else if (char === ']') {
      square -= 1
      if (square < 0) return false
    }
  }

  return round === 0 && square === 0 && quote === null
}

export function isValidSelector(selector: string): boolean {
  const trimmed = selector.trim()
  if (!trimmed) return false
  if (!ALLOWED.test(trimmed)) return false
  if (!balanced(trimmed)) return false
  if (/[>+~,]\s*$/.test(trimmed)) return false
  if (/^[>+~,]/.test(trimmed)) return false
  return true
}

/**
 * Classe e id não são bloqueados: contrariam a premissa classless do projeto,
 * mas a decisão é de quem usa. O ponto de uma classe é distinguido de um
 * pseudo-elemento (`::after`) e de uma pseudo-classe (`:hover`) pela exigência
 * de que venha no início do seletor ou logo após espaço, combinador ou vírgula.
 */
export function selectorWarnings(selector: string): string[] {
  const warnings: string[] = []
  if (/(^|[\s>+~(,])\.[A-Za-z_-]/.test(selector)) {
    warnings.push('Este seletor usa classe, o que contraria a premissa classless do tema.')
  }
  if (/(^|[\s>+~(,])#[A-Za-z_-]/.test(selector)) {
    warnings.push('Este seletor usa id, o que contraria a premissa classless do tema.')
  }
  return warnings
}
```

- [ ] **Step 4: Rodar para verificar que passa**

Run: `npx vitest run tests/selectorValidation.test.ts`
Expected: PASS, 9 testes

- [ ] **Step 5: Rodar a suíte inteira e commitar**

Run: `npm test && npm run lint`
Expected: PASS

```bash
git add src/compiler/selectorValidation.ts tests/selectorValidation.test.ts
git commit -m "feat: validador puro de seletor para o escape hatch

Valida sem document.querySelector, para nao violar a invariante de que o
compilador nao usa API de browser. Classe e id passam com aviso, nao
bloqueados: contrariam a premissa classless, mas a decisao e de quem usa.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4: Tipos v2 e regras semeadas

Aditivo por completo: o tipo `Theme` continua sendo v1 e nada passa a consumir os tipos novos ainda. Isso mantém o projeto compilando e a suíte verde até a troca da Task 6.

**Files:**
- Modify: `src/theme/schema.ts` (adiciona tipos, não altera os existentes)
- Create: `src/theme/scrollDefaults.ts`
- Create: `src/theme/baseRules.ts`
- Create: `tests/baseRules.test.ts`

**Interfaces:**
- Consumes: `CssPropertyMap`, `ThemeTokens`, `Theme` de `src/theme/schema.ts`
- Produces: os tipos `ScrollTokens`, `RuleMap`, `ThemeLayers`, `SpacingTokensV2`, `LayoutTokensV2`, `ThemeTokensV2`, `ThemeV2`; as funções `seedBaseRules(): RuleMap`, `seedResponsiveRules(): Record<string, RuleMap>`, e a constante `scrollDefaults: ScrollTokens`

- [ ] **Step 1: Escrever o teste que falha**

`tests/baseRules.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { seedBaseRules, seedResponsiveRules } from '../src/theme/baseRules'
import { scrollDefaults } from '../src/theme/scrollDefaults'

describe('seedBaseRules', () => {
  it('semeia as regras que hoje estao hardcoded no compilador', () => {
    const base = seedBaseRules()
    expect(Object.keys(base)).toEqual([
      'html',
      'h1, h2, h3, h4, h5, h6',
      'p, ul, ol, dl, blockquote, pre, figure, table, form, details',
      'th, td',
      'label',
      'input:not([type="checkbox"]):not([type="radio"]), textarea, select',
      'input, textarea, select, button',
      'button',
      'pre code',
    ])
  })

  it('mantem as declaracoes das regras semeadas', () => {
    const base = seedBaseRules()
    expect(base['pre code']).toEqual({ background: 'transparent', color: 'inherit', padding: '0' })
    expect(base.button).toEqual({
      background: 'var(--color-primary)',
      color: 'var(--color-primary-text)',
    })
  })

  it('devolve um objeto novo a cada chamada', () => {
    const first = seedBaseRules()
    first.button.background = 'mutado'
    expect(seedBaseRules().button.background).toBe('var(--color-primary)')
  })
})

describe('seedResponsiveRules', () => {
  it('usa token no lugar dos literais fixos de hoje', () => {
    const responsive = seedResponsiveRules()
    // O compilador atual grava --body-padding: 1rem, descartando em silencio
    // o valor configurado pelo usuario. Agora aponta para um token editavel.
    expect(responsive.tablet[':root']).toEqual({
      '--body-padding': 'var(--body-padding-sm)',
      '--section-spacing': 'var(--section-spacing-sm)',
    })
    expect(responsive.mobile[':root']).toEqual({
      '--body-padding': 'var(--body-padding-xs)',
      '--space-2xl': 'var(--space-2xl-sm)',
    })
  })

  it('preserva as regras de elemento de cada breakpoint', () => {
    const responsive = seedResponsiveRules()
    expect(responsive.tablet.table).toEqual({ fontSize: 'var(--font-size-sm)' })
    expect(responsive.mobile.h1).toEqual({ overflowWrap: 'anywhere' })
  })
})

describe('scrollDefaults', () => {
  it('nasce com barra visivel e sem rolagem suave', () => {
    // scroll-behavior fica em auto por padrao: rolagem suave e uma escolha
    // deliberada, e so faz sentido junto com o bloco de movimento reduzido.
    expect(scrollDefaults.scrollBehavior).toBe('auto')
    expect(scrollDefaults.scrollbarWidth).toBe('auto')
    expect(Object.keys(scrollDefaults)).toHaveLength(10)
  })
})
```

- [ ] **Step 2: Rodar para verificar que falha**

Run: `npx vitest run tests/baseRules.test.ts`
Expected: FAIL — `Cannot find module '../src/theme/baseRules'`

- [ ] **Step 3: Adicionar os tipos v2 em `src/theme/schema.ts`**

Primeiro, renomear a interface `Theme` existente para `ThemeV1` e reintroduzir o
nome antigo como alias. Isso é retrocompatível — todo consumidor atual continua
importando `Theme` e enxergando exatamente o mesmo tipo — e é o que permite que
`ThemeV2` referencie `ThemeV1['metadata']` sem virar referência circular quando
a Task 6 apontar `Theme` para `ThemeV2`.

```ts
export interface ThemeV1 {
  // ...corpo inalterado da interface Theme atual...
}

export type Theme = ThemeV1
```

Depois, acrescentar ao final do arquivo:

```ts
export interface ScrollTokens {
  scrollbarWidth: string
  scrollbarSize: string
  scrollbarTrack: string
  scrollbarThumb: string
  scrollbarThumbHover: string
  scrollbarRadius: string
  scrollbarGutter: string
  scrollBehavior: string
  scrollPaddingTop: string
  overscrollBehavior: string
}

export interface SpacingTokensV2 extends SpacingTokens {
  space2xlSm: string
}

export interface LayoutTokensV2 extends LayoutTokens {
  bodyPaddingSm: string
  bodyPaddingXs: string
  sectionSpacingSm: string
}

export interface ThemeTokensV2 extends Omit<ThemeTokens, 'spacing' | 'layout'> {
  spacing: SpacingTokensV2
  layout: LayoutTokensV2
  scroll: ScrollTokens
}

export type RuleMap = Record<string, CssPropertyMap>

export interface ThemeLayers {
  base: RuleMap
  elements: RuleMap
  states: RuleMap
  responsive: Record<string, RuleMap>
}

export interface ThemeV2 {
  schemaVersion: 2
  metadata: ThemeV1['metadata']
  tokens: ThemeTokensV2
  modes: ThemeV1['modes']
  layers: ThemeLayers
  breakpoints: Record<string, number>
  options: {
    includeMinimalReset: boolean
    reducedMotion: boolean
  }
}
```

- [ ] **Step 4: Implementar os padrões de scroll**

`src/theme/scrollDefaults.ts`:

```ts
import type { ScrollTokens } from './schema'

/**
 * Estes tokens entram no schema v2 já nesta entrega, mesmo só sendo emitidos e
 * editados na entrega de Scroll, para que exista exatamente uma migração.
 */
export const scrollDefaults: ScrollTokens = {
  scrollbarWidth: 'auto',
  scrollbarSize: '12px',
  scrollbarTrack: 'var(--color-surface)',
  scrollbarThumb: 'var(--color-border)',
  scrollbarThumbHover: 'var(--color-text-muted)',
  scrollbarRadius: 'var(--radius-full)',
  scrollbarGutter: 'auto',
  scrollBehavior: 'auto',
  scrollPaddingTop: '0',
  overscrollBehavior: 'auto',
}
```

- [ ] **Step 5: Implementar as regras semeadas**

`src/theme/baseRules.ts`:

```ts
import type { RuleMap } from './schema'

/**
 * As regras que hoje estão hardcoded em `baseRules()` do compilador. Trazê-las
 * para o modelo é o que as torna visíveis e editáveis. A ordem das chaves é a
 * mesma da lista original, porque o compilador emite na ordem de inserção.
 *
 * `:root[data-theme="light"]` e `:root[data-theme="dark"]` continuam gerados
 * pelo compilador: são estruturais, não escolhas de estilo.
 */
export function seedBaseRules(): RuleMap {
  return {
    html: {
      colorScheme: 'light dark',
      background: 'var(--color-background)',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'var(--font-heading)',
      fontWeight: 'var(--font-weight-bold)',
      lineHeight: 'var(--line-height-heading)',
      marginBlock: '1.25em 0.5em',
    },
    'p, ul, ol, dl, blockquote, pre, figure, table, form, details': {
      marginBlock: '0 var(--space-lg)',
    },
    'th, td': {
      padding: 'var(--space-sm) var(--space-md)',
      verticalAlign: 'top',
    },
    label: {
      display: 'block',
      marginBlock: 'var(--space-sm)',
    },
    'input:not([type="checkbox"]):not([type="radio"]), textarea, select': {
      width: '100%',
    },
    'input, textarea, select, button': {
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--color-text)',
      font: 'inherit',
      padding: '0.65rem 0.8rem',
    },
    button: {
      background: 'var(--color-primary)',
      color: 'var(--color-primary-text)',
    },
    'pre code': {
      background: 'transparent',
      color: 'inherit',
      padding: '0',
    },
  }
}

/**
 * As regras de `responsiveRules()` do compilador, com os literais `1rem`,
 * `2rem`, `0.8rem` e `2.5rem` trocados por tokens. O compilador atual grava
 * valores fixos e descarta em silêncio o que o usuário configurou.
 */
export function seedResponsiveRules(): Record<string, RuleMap> {
  return {
    tablet: {
      ':root': {
        '--body-padding': 'var(--body-padding-sm)',
        '--section-spacing': 'var(--section-spacing-sm)',
      },
      table: { fontSize: 'var(--font-size-sm)' },
    },
    mobile: {
      ':root': {
        '--body-padding': 'var(--body-padding-xs)',
        '--space-2xl': 'var(--space-2xl-sm)',
      },
      h1: { overflowWrap: 'anywhere' },
    },
  }
}
```

- [ ] **Step 6: Rodar para verificar que passa**

Run: `npx vitest run tests/baseRules.test.ts`
Expected: PASS, 6 testes

- [ ] **Step 7: Rodar a suíte inteira e commitar**

Run: `npm test && npm run lint`
Expected: PASS — nada consome os tipos novos ainda, então os snapshots não mudam.

```bash
git add src/theme/schema.ts src/theme/scrollDefaults.ts src/theme/baseRules.ts tests/baseRules.test.ts
git commit -m "feat: tipos do schema v2 e regras-base semeadas

Aditivo: Theme continua v1 e nada consome os tipos novos ainda. As regras
hoje hardcoded no compilador viram dados, o que as torna editaveis, e os
literais fixos do responsivo viram token.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 5: Migração v1 para v2

`migrateTheme` hoje só valida e rejeita. A peça central é o achatamento de estados, que é sem perda: `states[el][state]` vira a chave `"el:state"`.

A nova função é adicionada **ao lado** da existente, para que `src/app/Topbar.tsx` continue funcionando até a troca da Task 6.

**Files:**
- Modify: `src/theme/migration.ts`
- Create: `tests/fixtures/theme-v1.json`
- Modify: `tests/migration.test.ts`

**Interfaces:**
- Consumes: `seedBaseRules`, `seedResponsiveRules` de `src/theme/baseRules.ts`; `scrollDefaults` de `src/theme/scrollDefaults.ts`; `isValidSelector` de `src/compiler/selectorValidation.ts`; tipos v2 de `src/theme/schema.ts`
- Produces: `migrateThemeV2(input: unknown): ThemeV2`

- [ ] **Step 1: Congelar o tema v1 como fixture**

Precisa acontecer **antes** da Task 6, que converte `defaults.ts` para v2.

```bash
mkdir -p tests/fixtures
npx vite-node -e "
import { writeFileSync } from 'node:fs'
import { defaultTheme } from './src/theme/defaults.ts'
writeFileSync('tests/fixtures/theme-v1.json', JSON.stringify(defaultTheme, null, 2) + '\n')
"
head -5 tests/fixtures/theme-v1.json
```

Expected: o arquivo começa com `"schemaVersion": 1`.

- [ ] **Step 2: Escrever o teste que falha**

Acrescentar a `tests/migration.test.ts`:

```ts
import { readFileSync } from 'node:fs'
import { migrateThemeV2 } from '../src/theme/migration'

const themeV1 = JSON.parse(
  readFileSync(new URL('./fixtures/theme-v1.json', import.meta.url), 'utf8'),
)

describe('migrateThemeV2', () => {
  it('eleva a versao do schema', () => {
    expect(migrateThemeV2(themeV1).schemaVersion).toBe(2)
  })

  it('achata estados sem perda', () => {
    const { layers } = migrateThemeV2(themeV1)
    expect(layers.states['a:hover']).toEqual({ color: 'var(--color-primary-hover)' })
    expect(layers.states['button:disabled']).toEqual({ opacity: '0.55', cursor: 'not-allowed' })
    expect(layers.states['input:focus-visible']).toBeDefined()
    // nenhuma chave aninhada sobrou
    expect(Object.keys(layers.states).every((key) => key.includes(':'))).toBe(true)
  })

  it('copia elements sem alteracao', () => {
    const { layers } = migrateThemeV2(themeV1)
    expect(layers.elements.article).toEqual(themeV1.elements.article)
  })

  it('semeia base e responsive', () => {
    const { layers } = migrateThemeV2(themeV1)
    expect(layers.base['pre code']).toBeDefined()
    expect(layers.responsive.tablet).toBeDefined()
    expect(layers.responsive.mobile).toBeDefined()
  })

  it('converte responsive em breakpoints', () => {
    expect(migrateThemeV2(themeV1).breakpoints).toEqual({ mobile: 390, tablet: 768, desktop: 1440 })
  })

  it('adiciona tokens de scroll e os tokens novos de espacamento e layout', () => {
    const { tokens } = migrateThemeV2(themeV1)
    expect(tokens.scroll.scrollbarSize).toBe('12px')
    expect(tokens.spacing.space2xlSm).toBe('2.5rem')
    expect(tokens.layout.bodyPaddingSm).toBe('1rem')
    expect(tokens.layout.bodyPaddingXs).toBe('0.8rem')
    expect(tokens.layout.sectionSpacingSm).toBe('2rem')
  })

  it('liga movimento reduzido por padrao', () => {
    expect(migrateThemeV2(themeV1).options.reducedMotion).toBe(true)
  })

  it('passa um tema v2 adiante sem alteracao', () => {
    const migrated = migrateThemeV2(themeV1)
    expect(migrateThemeV2(migrated)).toEqual(migrated)
  })

  it('rejeita seletor invalido vindo de arquivo', () => {
    const corrupted = structuredClone(themeV1)
    corrupted.elements['a:not('] = { color: 'red' }
    expect(() => migrateThemeV2(corrupted)).toThrow(/seletor/i)
  })

  it('rejeita breakpoint orfao em layers.responsive', () => {
    const migrated = migrateThemeV2(themeV1)
    migrated.layers.responsive.watch = { h1: { fontSize: '1rem' } }
    expect(() => migrateThemeV2(migrated)).toThrow(/breakpoint/i)
  })
})
```

- [ ] **Step 3: Rodar para verificar que falha**

Run: `npx vitest run tests/migration.test.ts`
Expected: FAIL — `migrateThemeV2 is not a function`

- [ ] **Step 4: Implementar**

Acrescentar a `src/theme/migration.ts`, mantendo `migrateTheme` e `validateTheme` intactos:

```ts
import { isValidSelector } from '../compiler/selectorValidation'
import { seedBaseRules, seedResponsiveRules } from './baseRules'
import { scrollDefaults } from './scrollDefaults'
import type { RuleMap, ThemeV1, ThemeV2 } from './schema'

const SCHEMA_VERSION_V2 = 2

/** `states[el][state]` vira a chave `"el:state"`. Conversão sem perda. */
function flattenStates(states: ThemeV1['states']): RuleMap {
  const flat: RuleMap = {}
  for (const [element, byState] of Object.entries(states ?? {})) {
    for (const [state, declarations] of Object.entries(byState ?? {})) {
      if (declarations && Object.keys(declarations).length > 0) {
        flat[`${element}:${state}`] = { ...declarations }
      }
    }
  }
  return flat
}

function assertSelectors(rules: RuleMap, layer: string): void {
  for (const selector of Object.keys(rules)) {
    if (!isValidSelector(selector)) {
      throw new Error(`Seletor invalido na camada ${layer}: ${selector}`)
    }
  }
}

function assertBreakpointsMatch(theme: ThemeV2): void {
  for (const key of Object.keys(theme.layers.responsive)) {
    if (!(key in theme.breakpoints)) {
      throw new Error(`Breakpoint ausente para a chave de layers.responsive: ${key}`)
    }
  }
}

export function migrateThemeV2(input: unknown): ThemeV2 {
  if (!input || typeof input !== 'object') throw new Error('Theme must be a JSON object.')
  const candidate = input as Partial<ThemeV2> & Partial<ThemeV1>

  if (typeof candidate.schemaVersion !== 'number') throw new Error('Missing schemaVersion.')
  if (candidate.schemaVersion > SCHEMA_VERSION_V2) {
    throw new Error(
      `Theme schema ${candidate.schemaVersion} is newer than supported schema ${SCHEMA_VERSION_V2}.`,
    )
  }
  if (candidate.schemaVersion < 1) throw new Error('Unsupported theme schema.')

  const upgraded =
    candidate.schemaVersion === SCHEMA_VERSION_V2
      ? structuredClone(candidate as ThemeV2)
      : upgradeFromV1(candidate as ThemeV1)

  assertSelectors(upgraded.layers.base, 'base')
  assertSelectors(upgraded.layers.elements, 'elements')
  assertSelectors(upgraded.layers.states, 'states')
  for (const [breakpoint, rules] of Object.entries(upgraded.layers.responsive)) {
    assertSelectors(rules, `responsive.${breakpoint}`)
  }
  assertBreakpointsMatch(upgraded)

  return upgraded
}

function upgradeFromV1(theme: ThemeV1): ThemeV2 {
  validateTheme(theme)

  const elements: RuleMap = {}
  for (const [selector, declarations] of Object.entries(theme.elements)) {
    if (!isValidSelector(selector)) {
      throw new Error(`Seletor invalido na camada elements: ${selector}`)
    }
    elements[selector] = { ...declarations }
  }

  return {
    schemaVersion: SCHEMA_VERSION_V2,
    metadata: structuredClone(theme.metadata),
    tokens: {
      colors: structuredClone(theme.tokens.colors),
      typography: structuredClone(theme.tokens.typography),
      radius: structuredClone(theme.tokens.radius),
      shadow: structuredClone(theme.tokens.shadow),
      spacing: { ...structuredClone(theme.tokens.spacing), space2xlSm: '2.5rem' },
      layout: {
        ...structuredClone(theme.tokens.layout),
        bodyPaddingSm: '1rem',
        bodyPaddingXs: '0.8rem',
        sectionSpacingSm: '2rem',
      },
      scroll: { ...scrollDefaults },
    },
    modes: structuredClone(theme.modes),
    layers: {
      base: seedBaseRules(),
      elements,
      states: flattenStates(theme.states),
      responsive: seedResponsiveRules(),
    },
    breakpoints: { ...theme.responsive },
    options: {
      includeMinimalReset: theme.options.includeMinimalReset,
      reducedMotion: true,
    },
  }
}
```

Os valores `'2.5rem'`, `'1rem'`, `'0.8rem'` e `'2rem'` são exatamente os literais que `responsiveRules()` grava hoje, preservados para que a aparência padrão não mude.

- [ ] **Step 5: Rodar para verificar que passa**

Run: `npx vitest run tests/migration.test.ts`
Expected: PASS, 13 testes (3 antigos, 10 novos)

- [ ] **Step 6: Rodar a suíte inteira e commitar**

Run: `npm test && npm run lint`
Expected: PASS

```bash
git add src/theme/migration.ts tests/migration.test.ts tests/fixtures/theme-v1.json
git commit -m "feat: migracao de tema v1 para v2

Achata states[el][state] na chave 'el:state', semeia as camadas base e
responsive e adiciona os tokens de scroll. Adicionada ao lado de
migrateTheme para nao quebrar a importacao ate a troca de tipos.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 6: A troca

Task grande e deliberadamente atômica: o momento em que `Theme` passa a ser v2 quebra a tipagem de tudo que o consome, então defaults, presets, compilador, store e os dois editores mudam juntos. O codemod faz o trabalho mecânico.

O compilador **continua emitindo CSS plano** aqui. `@layer` é a Task 8. Isso separa "mudou o modelo" de "mudou a saída", e torna o diff de snapshot desta task pequeno e auditável.

**Files:**
- Create: `scripts/migrate-presets.ts`
- Modify: `src/theme/schema.ts`, `src/theme/defaults.ts`, `src/theme/presets/index.ts`, `src/theme/migration.ts`, `src/compiler/compileTheme.ts`, `src/theme/store.ts`, `src/editor/ElementEditor.tsx`, `src/editor/StateEditor.tsx`, `src/app/Topbar.tsx`
- Modify: `tests/snapshots/presets/*.css`, `tests/compiler.test.ts`, `tests/elementProfiles.test.ts`

**Interfaces:**
- Consumes: `migrateThemeV2` da Task 5
- Produces: `Theme` passa a ser o alias de `ThemeV2`; `SCHEMA_VERSION` passa a ser `2`; store expõe `setLayerProperty(layer, selector, property, value)` e `removeLayerProperty(layer, selector, property)`

- [ ] **Step 1: Escrever o codemod**

`scripts/migrate-presets.ts`:

```ts
/**
 * Codemod de uso único. Importa os presets e o tema padrão ainda em v1,
 * roda a migração e reescreve os arquivos como literais v2, para que os
 * presets sigam legíveis e não precisem ser migrados em runtime.
 *
 * Rodar uma vez: npx vite-node scripts/migrate-presets.ts
 */
import { writeFileSync } from 'node:fs'
import { defaultTheme } from '../src/theme/defaults'
import { migrateThemeV2 } from '../src/theme/migration'
import { presets } from '../src/theme/presets'

function literal(value: unknown): string {
  return JSON.stringify(value, null, 2)
}

writeFileSync(
  'src/theme/defaults.ts',
  `import type { Theme } from './schema'\n\n` +
    `export const defaultTheme: Theme = ${literal(migrateThemeV2(defaultTheme))} as Theme\n`,
)

const migrated = Object.fromEntries(
  Object.entries(presets).map(([name, theme]) => [name, migrateThemeV2(theme)]),
)

writeFileSync(
  'src/theme/presets/index.ts',
  `import type { Theme } from '../schema'\n\n` +
    `export const presets = ${literal(migrated)} as unknown as Record<string, Theme>\n\n` +
    `export type PresetName = keyof typeof presets\n`,
)

console.log('defaults e presets reescritos em v2')
```

- [ ] **Step 2: Rodar o codemod**

```bash
npx vite-node scripts/migrate-presets.ts
grep -c '"schemaVersion": 2' src/theme/defaults.ts src/theme/presets/index.ts
npx prettier --write src/theme/defaults.ts src/theme/presets/index.ts
```

Expected: `defaults.ts` tem 1 ocorrência, `presets/index.ts` tem 6.

- [ ] **Step 3: Trocar os tipos em `src/theme/schema.ts`**

```ts
export const SCHEMA_VERSION = 2 as const
```

A interface já foi renomeada para `ThemeV1` na Task 4, então aqui basta virar o alias, que é a linha que faz todo o resto do projeto passar a enxergar v2:

```ts
export type Theme = ThemeV2
```

`src/theme/migration.ts` não precisa de ajuste de tipo — a Task 5 já escreveu `migrateThemeV2` contra `ThemeV1` explicitamente. Apagar a função `migrateTheme` antiga e trocar seu uso em `src/app/Topbar.tsx` por `migrateThemeV2`. A assinatura de `validateTheme` passa a ser `asserts candidate is ThemeV1`.

- [ ] **Step 4: Adaptar o compilador**

Em `src/compiler/compileTheme.ts`:

- `tokenGroups` ganha `'scroll'` ao final, para que os tokens de scroll sejam emitidos no `:root`.
- `baseRules(theme)` passa a ler `theme.layers.base` em vez das strings literais, mantendo apenas as duas regras estruturais que continuam geradas:

```ts
function baseRules(theme: Theme): string[] {
  const rules: string[] = []
  if (theme.options.includeMinimalReset) {
    rules.push(`*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}`)
  }
  for (const [selector, declarations] of Object.entries(theme.layers.base)) {
    const emitted = rule(selector, declarations)
    if (emitted) rules.push(emitted)
  }
  rules.push(`:root[data-theme="light"] { color-scheme: light; }\n:root[data-theme="dark"] { color-scheme: dark; }`)
  return rules
}
```

- `elementRules` lê `theme.layers.elements` em vez de `theme.elements`.
- `stateRules` passa a iterar `theme.layers.states` diretamente, já que as chaves são seletores completos. A ordenação usa a tag antes dos dois-pontos para consultar `elementOrder`:

```ts
function stateRules(theme: Theme): string[] {
  const selectors = Object.keys(theme.layers.states).sort((a, b) => {
    const ai = elementOrder.indexOf(a.split(':')[0])
    const bi = elementOrder.indexOf(b.split(':')[0])
    if (ai === bi) return a.localeCompare(b)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
  return selectors.map((selector) => rule(selector, theme.layers.states[selector])).filter(Boolean)
}
```

- `responsiveRules` lê `theme.layers.responsive` e `theme.breakpoints`:

```ts
function responsiveRules(theme: Theme): string[] {
  const order = ['tablet', 'mobile']
  const keys = [
    ...order.filter((key) => key in theme.layers.responsive),
    ...Object.keys(theme.layers.responsive).filter((key) => !order.includes(key)).sort(),
  ]
  return keys
    .map((key) => {
      const body = Object.entries(theme.layers.responsive[key])
        .map(([selector, styles]) => {
          const inner = declarations(styles, '    ')
          return inner ? `  ${selector} {\n${inner}\n  }` : ''
        })
        .filter(Boolean)
        .join('\n')
      return body ? `@media (max-width: ${theme.breakpoints[key]}px) {\n${body}\n}` : ''
    })
    .filter(Boolean)
}
```

Isso reaproveita a função `declarations` que já existe no arquivo e já aceita o parâmetro `indent`. Ela precisa de um ajuste: uma propriedade cuja chave já começa por `--` é emitida sem passar por `kebab`, porque as regras `:root` do responsivo escrevem custom properties.

```ts
function declarations(styles: CssPropertyMap, indent = '  '): string {
  return Object.entries(styles)
    .filter(([, value]) => value !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([property, value]) => {
      const name = property.startsWith('--') ? property : kebab(property)
      return `${indent}${name}: ${value};`
    })
    .join('\n')
}
```

- [ ] **Step 5: Adaptar o store**

Em `src/theme/store.ts`, substituir `setElementProperty`, `removeElementProperty`, `setStateProperty` e `removeStateProperty` por uma API por camada, e `setElementTargets` passa a escrever na camada `elements`:

```ts
export type LayerName = 'base' | 'elements' | 'states'

setLayerProperty: (layer, selector, property, value) => set((state) => {
  const next = clone(state.theme)
  next.layers[layer][selector] ??= {}
  next.layers[layer][selector][property] = value
  return commit(state, next)
}),

removeLayerProperty: (layer, selector, property) => set((state) => {
  const next = clone(state.theme)
  delete next.layers[layer][selector]?.[property]
  if (next.layers[layer][selector] && Object.keys(next.layers[layer][selector]).length === 0) {
    delete next.layers[layer][selector]
  }
  return commit(state, next)
}),
```

`setElementTargets` troca `next.elements[...]` por `next.layers.elements[...]` nos quatro pontos onde aparece.

- [ ] **Step 6: Adaptar os editores**

Em `src/editor/ElementEditor.tsx`, `valueFor` lê `theme.layers.elements[target.selector]?.[target.property]` e `overrideCount` soma sobre `theme.layers.elements`.

Em `src/editor/StateEditor.tsx`, a leitura e a escrita passam a usar a chave achatada:

```tsx
const key = `${selectedElement}:${state}`
const styles = theme.layers.states[key] ?? {}
const change = (property: string, value: string) =>
  value
    ? setLayerProperty('states', key, property, value)
    : removeLayerProperty('states', key, property)
```

Trocar os hooks `setStateProperty`/`removeStateProperty` por `setLayerProperty`/`removeLayerProperty` na lista de seletores da store no topo do componente.

- [ ] **Step 7: Verificar que a saída não regrediu**

Run: `npx vitest run tests/presets.test.ts`
Expected: FAIL nos seis presets.

```bash
npx vite-node -e "
import { writeFileSync } from 'node:fs'
import { compileTheme } from './src/compiler/index.ts'
import { presets } from './src/theme/presets/index.ts'
for (const [name, theme] of Object.entries(presets)) {
  const file = 'tests/snapshots/presets/' + name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-') + '.css'
  writeFileSync(file, compileTheme(theme))
}
"
git diff tests/snapshots/presets/minimal.css
```

Expected: **exatamente três** categorias de diferença, e nenhuma outra:

1. dez linhas `--overscroll-behavior`, `--scroll-behavior`, `--scroll-padding-top`, `--scrollbar-*` acrescentadas ao `:root` — os tokens de scroll novos;
2. quatro linhas `--body-padding-sm`, `--body-padding-xs`, `--section-spacing-sm`, `--space-2xl-sm` acrescentadas ao `:root`;
3. reordenação alfabética das declarações em exatamente duas regras — `html` passa a `background` antes de `color-scheme`, e `input, textarea, select, button` passa a ter `background` antes de `border`. As regras semeadas passam por `declarations()`, que ordena alfabeticamente, enquanto as strings literais antigas não eram ordenadas.

E, dentro dos media queries, `--body-padding: 1rem` vira `--body-padding: var(--body-padding-sm)`, com o token novo valendo `1rem` — mesmo valor computado.

Qualquer seletor que suma, qualquer valor que mude, é regressão. Investigar antes de commitar.

- [ ] **Step 8: Rodar a suíte inteira**

Run: `npm test && npm run lint && npm run build`
Expected: PASS. `tests/elementProfiles.test.ts` pode precisar de ajuste se referenciar `theme.elements`; trocar para `theme.layers.elements`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat!: Theme v2 com mapas por camada

Theme deixa de ter elements/states/responsive soltos e passa a ter
layers: { base, elements, states, responsive }. As regras antes hardcoded
no compilador agora vivem no modelo, o que as torna editaveis. Presets e
defaults reescritos como literais v2 por codemod.

O compilador ainda emite CSS plano; @layer vem em seguida.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 7: Recuperar o tema salvo em vez de descartá-lo

`readStoredTheme()` em `src/theme/store.ts:64-74` descarta em silêncio qualquer conteúdo com `schemaVersion !== 1`, sem usar o `migrateTheme` que existe ao lado. Depois da Task 6 isso significa que **todo usuário existente perde o tema** ao abrir o app.

**Files:**
- Modify: `src/theme/store.ts:64-74`
- Create: `tests/storeMigration.test.ts`

**Interfaces:**
- Consumes: `migrateThemeV2` de `src/theme/migration.ts`
- Produces: `readStoredTheme(): Theme` (não exportada; testada pelo efeito na store)

- [ ] **Step 1: Escrever o teste que falha**

`tests/storeMigration.test.ts`:

```ts
import { readFileSync } from 'node:fs'
import { beforeEach, describe, expect, it } from 'vitest'

const themeV1 = readFileSync(new URL('./fixtures/theme-v1.json', import.meta.url), 'utf8')
const STORAGE_KEY = 'semantic-css-studio/theme-v1'

describe('leitura do tema salvo', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  it('migra um tema v1 salvo em vez de descarta-lo', async () => {
    localStorage.setItem(STORAGE_KEY, themeV1)
    const { useStudioStore } = await import('../src/theme/store')
    const theme = useStudioStore.getState().theme
    expect(theme.schemaVersion).toBe(2)
    // o conteudo do usuario sobreviveu
    expect(theme.layers.elements.article).toBeDefined()
    expect(theme.layers.states['a:hover']).toBeDefined()
  })

  it('cai no tema padrao quando o conteudo salvo e ilegivel', async () => {
    localStorage.setItem(STORAGE_KEY, '{ nao e json')
    const { useStudioStore } = await import('../src/theme/store')
    expect(useStudioStore.getState().theme.schemaVersion).toBe(2)
  })

  it('cai no tema padrao quando o schema e mais novo que o suportado', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 99 }))
    const { useStudioStore } = await import('../src/theme/store')
    expect(useStudioStore.getState().theme.metadata.name).toBe('Minimal')
  })
})
```

Adicionar `import { vi } from 'vitest'` ao topo.

- [ ] **Step 2: Rodar para verificar que falha**

Run: `npx vitest run tests/storeMigration.test.ts`
Expected: FAIL no primeiro teste — o tema v1 salvo é descartado e `layers.elements.article` vem do padrão, não do salvo. Para tornar a falha inequívoca, o teste checa `schemaVersion` antes.

- [ ] **Step 3: Implementar**

Em `src/theme/store.ts`, substituir `readStoredTheme`:

```ts
function readStoredTheme(): Theme {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(defaultTheme)
    // Rotear pela migração em vez de descartar: um tema v1 salvo pertence ao
    // usuário e deve sobreviver à atualização do app.
    return migrateThemeV2(JSON.parse(raw))
  } catch {
    return structuredClone(defaultTheme)
  }
}
```

E adicionar o import de `migrateThemeV2`.

- [ ] **Step 4: Rodar para verificar que passa**

Run: `npx vitest run tests/storeMigration.test.ts`
Expected: PASS, 3 testes

- [ ] **Step 5: Rodar a suíte inteira e commitar**

Run: `npm test && npm run lint`
Expected: PASS

```bash
git add src/theme/store.ts tests/storeMigration.test.ts
git commit -m "fix: migrar o tema salvo em vez de descarta-lo

readStoredTheme descartava em silencio qualquer schemaVersion diferente
de 1, sem usar o migrateTheme que existia ao lado. Sem isso, a troca para
v2 faria todo usuario existente perder o tema ao abrir o app.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Fase 2 — Camadas

### Task 8: Emitir o CSS em `@layer` com a base em `:where()`

O ganho: CSS sem camada sempre vence CSS em camada, independente de especificidade. Somado ao `:where()`, que zera a especificidade da base, o tema passa a ser piso e não teto — quem consome sobrescreve com uma linha, sem `!important` e sem caçar especificidade.

**Files:**
- Modify: `src/compiler/compileTheme.ts`
- Modify: `tests/compiler.test.ts`
- Modify: `tests/snapshots/presets/*.css`

**Interfaces:**
- Consumes: `Theme` v2 da Task 6
- Produces: `compileTheme(theme: Theme): string` com saída em camadas

- [ ] **Step 1: Escrever o teste que falha**

Acrescentar a `tests/compiler.test.ts`:

```ts
describe('camadas', () => {
  const css = compileTheme(presets.Minimal)

  it('declara a ordem das camadas antes de qualquer regra', () => {
    const declaration = css.indexOf('@layer reset, base, elements, states, responsive;')
    expect(declaration).toBeGreaterThan(-1)
    expect(declaration).toBeLessThan(css.indexOf('@layer base'))
  })

  it('envolve as regras-base em :where()', () => {
    expect(css).toContain(':where(pre code) {')
    expect(css).toContain(':where(h1, h2, h3, h4, h5, h6) {')
  })

  it('mantem os tokens no :root sem :where, para que o usuario sobrescreva', () => {
    expect(css).toContain(':root {')
    expect(css).not.toContain(':where(:root)')
  })

  it('nao envolve elements e states em :where()', () => {
    expect(css).toContain('\n  article {')
    expect(css).not.toContain(':where(article)')
  })

  it('agrupa cada camada em um bloco', () => {
    for (const layer of ['base', 'elements', 'states', 'responsive']) {
      expect(css, layer).toContain(`@layer ${layer} {`)
    }
  })

  it('continua deterministico', () => {
    expect(compileTheme(presets.Minimal)).toBe(compileTheme(structuredClone(presets.Minimal)))
  })

  it('minifica sem quebrar as camadas', () => {
    const minified = minifyCss(css)
    expect(minified).toContain('@layer reset,base,elements,states,responsive;')
    expect(minified).toContain(':where(pre code){')
  })
})
```

- [ ] **Step 2: Rodar para verificar que falha**

Run: `npx vitest run tests/compiler.test.ts`
Expected: FAIL — a saída ainda é plana, sem `@layer`.

- [ ] **Step 3: Implementar**

Em `src/compiler/compileTheme.ts`, adicionar o utilitário de indentação e a montagem por camada:

```ts
const LAYER_ORDER = ['reset', 'base', 'elements', 'states', 'responsive'] as const

function indent(block: string): string {
  return block
    .split('\n')
    .map((line) => (line ? `  ${line}` : line))
    .join('\n')
}

function layerBlock(name: string, rules: string[]): string {
  const body = rules.filter(Boolean).map(indent).join('\n\n')
  return body ? `@layer ${name} {\n${body}\n}` : ''
}
```

`baseRules` passa a envolver cada regra semeada em `:where()`. As duas regras estruturais **não** são envolvidas: `:root[data-theme]` precisa da especificidade de atributo para vencer os tokens claros, e o reset já é neutro por natureza.

```ts
function resetRules(theme: Theme): string[] {
  return theme.options.includeMinimalReset
    ? [`*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}`]
    : []
}

function baseRules(theme: Theme): string[] {
  const rules: string[] = [rootVariables(theme)]
  for (const [selector, declarations] of Object.entries(theme.layers.base)) {
    const emitted = rule(`:where(${selector})`, declarations)
    if (emitted) rules.push(emitted)
  }
  rules.push(`:root[data-theme="light"] { color-scheme: light; }\n:root[data-theme="dark"] { color-scheme: dark; }`)
  const dark = darkModeRule(theme)
  if (dark) rules.push(dark)
  return rules
}
```

`compileTheme` passa a ser:

```ts
export function compileTheme(theme: Theme): string {
  const blocks = [
    `/* ${theme.metadata.name} v${theme.metadata.version} — generated by Semantic CSS Studio */`,
    `@layer ${LAYER_ORDER.join(', ')};`,
    layerBlock('reset', resetRules(theme)),
    layerBlock('base', baseRules(theme)),
    layerBlock('elements', elementRules(theme)),
    layerBlock('states', stateRules(theme)),
    layerBlock('responsive', responsiveRules(theme)),
  ].filter(Boolean)
  return `${blocks.join('\n\n')}\n`
}
```

Os tokens e o dark mode passam a viver dentro de `@layer base`, conforme a spec: assim um `:root { --color-primary: red }` sem camada, escrito por quem consome o tema, vence.

- [ ] **Step 4: Rodar para verificar que passa**

Run: `npx vitest run tests/compiler.test.ts`
Expected: PASS

- [ ] **Step 5: Regerar os snapshots e auditar**

```bash
npx vite-node -e "
import { writeFileSync } from 'node:fs'
import { compileTheme } from './src/compiler/index.ts'
import { presets } from './src/theme/presets/index.ts'
for (const [name, theme] of Object.entries(presets)) {
  const file = 'tests/snapshots/presets/' + name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-') + '.css'
  writeFileSync(file, compileTheme(theme))
}
"
npx vitest run tests/presets.test.ts
grep -c "@layer" tests/snapshots/presets/minimal.css
```

Expected: os testes passam; o snapshot tem 6 ocorrências de `@layer` (a declaração de ordem mais os cinco blocos, descontando camadas vazias).

Conferir manualmente em `tests/snapshots/presets/minimal.css` que nenhum seletor sumiu:

```bash
git diff tests/snapshots/presets/minimal.css | grep '^-' | grep -v '^---' | grep -v '^-\s*$' | head -40
```

Expected: as linhas removidas são apenas reindentação e reposicionamento. Nenhum seletor ou declaração deve desaparecer do arquivo.

- [ ] **Step 6: Verificar no browser**

```bash
npm run dev
```

Abrir o preview, escolher o preset Minimal e confirmar que o documento continua estilizado — mesmas cores, tipografia e espaçamentos de antes. Uma camada mal fechada produz CSS silenciosamente inerte, e só a inspeção visual pega isso.

- [ ] **Step 7: Commit**

```bash
git add src/compiler/compileTheme.ts tests/compiler.test.ts tests/snapshots/
git commit -m "feat: emitir CSS em @layer com a base em :where()

CSS sem camada sempre vence CSS em camada, e :where() zera a
especificidade da base. Juntos, fazem o tema ser piso e nao teto: quem
consome sobrescreve com uma linha, sem !important.

Tokens e dark mode vivem em @layer base, entao um :root sem camada
escrito pelo consumidor vence.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 9: Ações de store para a camada base

**Files:**
- Modify: `src/theme/store.ts`
- Create: `tests/baseLayerStore.test.ts`

**Interfaces:**
- Consumes: `seedBaseRules` de `src/theme/baseRules.ts`; `setLayerProperty`/`removeLayerProperty` da Task 6
- Produces: `resetBaseRule(selector: string): void`, `toggleBaseRule(selector: string, enabled: boolean): void`, e o seletor derivado `isBaseRuleModified(theme, selector): boolean`

- [ ] **Step 1: Escrever o teste que falha**

`tests/baseLayerStore.test.ts`:

```ts
import { beforeEach, describe, expect, it } from 'vitest'
import { seedBaseRules } from '../src/theme/baseRules'
import { isBaseRuleModified, useStudioStore } from '../src/theme/store'

describe('camada base na store', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  it('edita uma declaracao da regra base', () => {
    useStudioStore.getState().setLayerProperty('base', 'pre code', 'padding', '4px')
    expect(useStudioStore.getState().theme.layers.base['pre code'].padding).toBe('4px')
  })

  it('reconhece uma regra modificada', () => {
    const theme = () => useStudioStore.getState().theme
    expect(isBaseRuleModified(theme(), 'pre code')).toBe(false)
    useStudioStore.getState().setLayerProperty('base', 'pre code', 'padding', '4px')
    expect(isBaseRuleModified(theme(), 'pre code')).toBe(true)
  })

  it('restaura a regra ao padrao semeado', () => {
    useStudioStore.getState().setLayerProperty('base', 'pre code', 'padding', '4px')
    useStudioStore.getState().resetBaseRule('pre code')
    expect(useStudioStore.getState().theme.layers.base['pre code']).toEqual(seedBaseRules()['pre code'])
  })

  it('desliga e religa uma regra sem perder as declaracoes', () => {
    const store = useStudioStore.getState()
    store.setLayerProperty('base', 'pre code', 'padding', '4px')
    store.toggleBaseRule('pre code', false)
    expect(useStudioStore.getState().theme.layers.base['pre code']).toBeUndefined()
    useStudioStore.getState().toggleBaseRule('pre code', true)
    // religar traz de volta o padrao semeado, nao a edicao descartada
    expect(useStudioStore.getState().theme.layers.base['pre code']).toEqual(seedBaseRules()['pre code'])
  })

  it('registra a mudanca no historico de undo', () => {
    useStudioStore.getState().setLayerProperty('base', 'pre code', 'padding', '4px')
    useStudioStore.getState().undo()
    expect(useStudioStore.getState().theme.layers.base['pre code'].padding).toBe('0')
  })
})
```

- [ ] **Step 2: Rodar para verificar que falha**

Run: `npx vitest run tests/baseLayerStore.test.ts`
Expected: FAIL — `isBaseRuleModified is not a function`

- [ ] **Step 3: Implementar**

Em `src/theme/store.ts`, acrescentar à interface `StudioState` e à implementação:

```ts
resetBaseRule: (selector: string) => void
toggleBaseRule: (selector: string, enabled: boolean) => void
```

```ts
resetBaseRule: (selector) => set((state) => {
  const seeded = seedBaseRules()[selector]
  if (!seeded) return state
  const next = clone(state.theme)
  next.layers.base[selector] = { ...seeded }
  return commit(state, next, 'Regra-base restaurada.')
}),

toggleBaseRule: (selector, enabled) => set((state) => {
  const next = clone(state.theme)
  if (enabled) {
    const seeded = seedBaseRules()[selector]
    if (!seeded) return state
    next.layers.base[selector] = { ...seeded }
  } else {
    delete next.layers.base[selector]
  }
  return commit(state, next)
}),
```

E, fora da store, o seletor derivado:

```ts
export function isBaseRuleModified(theme: Theme, selector: string): boolean {
  const seeded = seedBaseRules()[selector]
  const current = theme.layers.base[selector]
  if (!seeded) return true
  if (!current) return true
  return JSON.stringify(current) !== JSON.stringify(seeded)
}
```

- [ ] **Step 4: Rodar para verificar que passa**

Run: `npx vitest run tests/baseLayerStore.test.ts`
Expected: PASS, 5 testes

- [ ] **Step 5: Rodar a suíte inteira e commitar**

Run: `npm test && npm run lint`
Expected: PASS

```bash
git add src/theme/store.ts tests/baseLayerStore.test.ts
git commit -m "feat: acoes de store para restaurar e desligar regras-base

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 10: Painel da camada base

**Files:**
- Create: `src/editor/BaseRulesEditor.tsx`
- Modify: `src/editor/EditorSidebar.tsx`, `src/app/App.tsx`, `src/theme/store.ts` (tipo `EditorSection`), `src/studio.css`
- Create: `tests/baseRulesEditor.test.tsx`

**Interfaces:**
- Consumes: `seedBaseRules`, `isBaseRuleModified`, `resetBaseRule`, `toggleBaseRule`, `setLayerProperty`, `removeLayerProperty`
- Produces: componente `BaseRulesEditor`; `EditorSection` ganha o valor `'Base'`

- [ ] **Step 1: Escrever o teste que falha**

`tests/baseRulesEditor.test.tsx`:

```tsx
import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { BaseRulesEditor } from '../src/editor/BaseRulesEditor'
import { useStudioStore } from '../src/theme/store'

describe('BaseRulesEditor', () => {
  beforeEach(() => {
    useStudioStore.getState().resetTheme()
  })

  it('avisa que as regras tem especificidade zero', () => {
    render(<BaseRulesEditor />)
    expect(screen.getByRole('note')).toHaveTextContent(/especificidade/i)
  })

  it('lista as regras semeadas', () => {
    render(<BaseRulesEditor />)
    expect(screen.getByText('pre code')).toBeInTheDocument()
    expect(screen.getByText('th, td')).toBeInTheDocument()
  })

  it('edita uma declaracao', () => {
    render(<BaseRulesEditor />)
    const field = screen.getByLabelText('padding em pre code')
    fireEvent.change(field, { target: { value: '4px' } })
    expect(useStudioStore.getState().theme.layers.base['pre code'].padding).toBe('4px')
  })

  it('marca a regra como modificada e permite restaurar', () => {
    render(<BaseRulesEditor />)
    fireEvent.change(screen.getByLabelText('padding em pre code'), { target: { value: '4px' } })
    const group = screen.getByRole('group', { name: /pre code/ })
    expect(within(group).getByText(/modificada/i)).toBeInTheDocument()
    fireEvent.click(within(group).getByRole('button', { name: /restaurar/i }))
    expect(useStudioStore.getState().theme.layers.base['pre code'].padding).toBe('0')
  })

  it('desliga a regra', () => {
    render(<BaseRulesEditor />)
    const group = screen.getByRole('group', { name: /pre code/ })
    fireEvent.click(within(group).getByRole('checkbox'))
    expect(useStudioStore.getState().theme.layers.base['pre code']).toBeUndefined()
  })
})
```

- [ ] **Step 2: Rodar para verificar que falha**

Run: `npx vitest run tests/baseRulesEditor.test.tsx`
Expected: FAIL — `Cannot find module '../src/editor/BaseRulesEditor'`

- [ ] **Step 3: Implementar**

`src/editor/BaseRulesEditor.tsx`:

```tsx
import { seedBaseRules } from '../theme/baseRules'
import { isBaseRuleModified, useStudioStore } from '../theme/store'
import { TextField } from './Field'

const seeded = seedBaseRules()

export function BaseRulesEditor() {
  const theme = useStudioStore((s) => s.theme)
  const setProperty = useStudioStore((s) => s.setLayerProperty)
  const resetRule = useStudioStore((s) => s.resetBaseRule)
  const toggleRule = useStudioStore((s) => s.toggleBaseRule)

  return <div className="editor-panel base-rules-editor">
    <div className="panel-heading">
      <div>
        <h2>Regras-base</h2>
        <p>O piso do tema, aplicado antes de qualquer override de elemento.</p>
      </div>
    </div>

    <p className="panel-note" role="note">
      Estas regras são emitidas dentro de <code>:where()</code>, com
      especificidade zero, e dentro de <code>@layer base</code>. Qualquer CSS
      escrito por quem consome o tema vence sobre elas sem precisar de
      <code>!important</code>.
    </p>

    {Object.keys(seeded).map((selector) => {
      const enabled = Boolean(theme.layers.base[selector])
      const declarations = theme.layers.base[selector] ?? {}
      const modified = enabled && isBaseRuleModified(theme, selector)

      return <section key={selector} className="base-rule" role="group" aria-label={`Regra ${selector}`}>
        <header>
          <label>
            <input
              type="checkbox"
              checked={enabled}
              aria-label={`Ativar regra ${selector}`}
              onChange={(event) => toggleRule(selector, event.target.checked)}
            />
            <code>{selector}</code>
          </label>
          {modified && <span className="badge">modificada</span>}
          {modified && <button type="button" className="tiny-button" onClick={() => resetRule(selector)}>Restaurar</button>}
        </header>

        {enabled && <div className="field-grid">
          {Object.keys(seeded[selector]).map((property) => <TextField
            key={property}
            label={`${property} em ${selector}`}
            value={declarations[property] ?? ''}
            onChange={(value) => setProperty('base', selector, property, value)}
          />)}
        </div>}
      </section>
    })}
  </div>
}
```

- [ ] **Step 4: Ligar à navegação**

Em `src/theme/store.ts`, `EditorSection` ganha `'Base'`:

```ts
export type EditorSection = 'Colors' | 'Typography' | 'Spacing' | 'Layout' | 'Radius' | 'Shadows' | 'Base' | 'Elements' | 'States' | 'Accessibility'
```

Em `src/editor/EditorSidebar.tsx`, substituir o `slice(0,6)`/`slice(6)` por agrupamento declarado, o que remove o acoplamento à ordem do array:

```tsx
import { useStudioStore, type EditorSection } from '../theme/store'

const sections: Array<{ name: EditorSection; icon: string; group: 'TOKENS' | 'REGRAS' | 'CHECAGEM' }> = [
  { name: 'Colors', icon: '◐', group: 'TOKENS' },
  { name: 'Typography', icon: 'Aa', group: 'TOKENS' },
  { name: 'Spacing', icon: '↕', group: 'TOKENS' },
  { name: 'Layout', icon: '▦', group: 'TOKENS' },
  { name: 'Radius', icon: '⌒', group: 'TOKENS' },
  { name: 'Shadows', icon: '◫', group: 'TOKENS' },
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
```

Em `src/app/App.tsx`, adicionar ao `switch` de `ActiveEditor`:

```tsx
case 'Base': return <BaseRulesEditor />
```

com o import correspondente.

- [ ] **Step 5: Estilizar**

Acrescentar a `src/studio.css`:

```css
.panel-note { font-size:11px; line-height:1.5; color:#8b95a7; background:#141a24; border:1px solid #29303e; border-left:3px solid #7c3aed; border-radius:6px; padding:10px 12px; margin-bottom:16px; }
.panel-note code { background:#1c2330; border-radius:3px; padding:1px 4px; }
.base-rule { border:1px solid #2b3240; border-radius:8px; background:#11161e; padding:10px 12px; margin-bottom:10px; }
.base-rule header { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
.base-rule header label { display:flex; align-items:center; gap:8px; flex:1; min-width:0; cursor:pointer; }
.base-rule header code { font-size:11px; color:#c8d0dd; overflow-wrap:anywhere; }
.badge { font-size:9px; text-transform:uppercase; letter-spacing:.06em; color:#f0b429; border:1px solid #5c4a1a; background:#221c0d; border-radius:4px; padding:2px 5px; }
```

- [ ] **Step 6: Rodar para verificar que passa**

Run: `npx vitest run tests/baseRulesEditor.test.tsx`
Expected: PASS, 5 testes

- [ ] **Step 7: Verificar no browser**

```bash
npm run dev
```

Abrir a seção Base, desligar `pre code`, e confirmar no preview que o `<code>` dentro de `<pre>` volta a herdar o fundo de `code` — que é justamente o comportamento que a regra-base existia para suprimir. Religar e confirmar que volta ao normal.

- [ ] **Step 8: Rodar a suíte inteira e commitar**

Run: `npm test && npm run lint && npm run build && npm run test:e2e`
Expected: PASS

```bash
git add -A
git commit -m "feat: painel de edicao da camada base

As regras que antes eram invisiveis e hardcoded no compilador agora sao
listadas, editaveis, restauraveis e desligaveis. A barra lateral passa a
agrupar por dado, removendo o slice(0,6)/slice(6) acoplado a ordem do
array, e ganha aria-current.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Verificação final da entrega

- [ ] `npm test` — toda a suíte passa
- [ ] `npm run lint` — sem erro
- [ ] `npm run build` — compila
- [ ] `npm run test:e2e` — fluxo essencial passa
- [ ] `git diff --stat <commit-inicial>..HEAD tests/snapshots/` — os seis snapshots mudaram e nenhum seletor sumiu
- [ ] Abrir o app com um tema v1 salvo no `localStorage` e confirmar que ele sobrevive à migração
- [ ] Exportar o CSS e conferir que um `:root { --color-primary: red }` escrito depois do `<link>` do tema efetivamente vence

## Fora do escopo desta entrega

Emissão das regras de scroll, `@media print` e o bloco `prefers-reduced-motion` ficam para a entrega de Scroll — os tokens e a flag `options.reducedMotion` já existem no schema, mas não são consumidos aqui. O catálogo exaustivo de propriedades, as variantes de seletor e o campo de seletor livre na interface ficam para as entregas seguintes; o validador da Task 3 já está pronto para o escape hatch.
