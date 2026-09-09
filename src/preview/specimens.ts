import type { SpecimenName } from '../theme/store'

const intro = `
<header>
  <nav aria-label="Primary"><strong>Semantic CSS</strong><a href="#content">Content</a><a href="#forms">Forms</a><a href="#table">Data</a></nav>
</header>`

const typography = `
<main id="content">
  <p><small>TYPOGRAPHY SPECIMEN</small></p>
  <h1>Your HTML is your design system.</h1>
  <p>A classless stylesheet should make <strong>semantic HTML</strong> readable and useful without requiring a component runtime. This paragraph includes <a href="#">a link</a>, <em>emphasis</em>, <mark>highlighted text</mark>, <del>deleted text</del> and <ins>inserted text</ins>.</p>
  <h2>Heading level two</h2><h3>Heading level three</h3><h4>Heading level four</h4><h5>Heading level five</h5><h6>Heading level six</h6>
  <blockquote>HTML provides the structure. The theme provides the design.</blockquote>
</main>`

const content = `
<main id="content">
  <section><h1>Semantic content</h1><p>Sections, articles and asides should feel related without becoming a component system.</p></section>
  <article><h2>Article card</h2><p>This article uses only native HTML elements.</p><ul><li>Portable stylesheet</li><li>No runtime dependency</li><li>Readable source</li></ul></article>
  <aside><strong>Aside</strong><p>Useful supporting context belongs here.</p></aside>
  <h2>Lists</h2><ol><li>Model a theme</li><li>Compile CSS</li><li>Export it</li></ol>
  <dl><dt>Theme</dt><dd>Structured design data.</dd><dt>Compiler</dt><dd>Turns the theme into deterministic CSS.</dd></dl>
  <figure><svg viewBox="0 0 800 260" role="img" aria-label="Decorative geometric figure" style="width:100%;background:var(--color-surface-alt);border-radius:var(--radius-md)"><rect x="40" y="40" width="210" height="180" rx="18" fill="var(--color-primary)" opacity=".75"/><circle cx="410" cy="130" r="90" fill="var(--color-secondary)" opacity=".55"/><path d="M560 210 680 45 770 210Z" fill="var(--color-success)" opacity=".7"/></svg><figcaption>A figure can contain any media, including SVG.</figcaption></figure>
  <details><summary>Why classless CSS?</summary><p>Because useful defaults make plain semantic documents immediately presentable.</p></details>
  <hr><p><small>End of content specimen.</small></p>
</main>`

const forms = `
<main id="forms"><h1>Forms</h1><form><fieldset><legend>Profile</legend>
<label>Name <input type="text" placeholder="Ada Lovelace" required></label>
<label>Email <input type="email" placeholder="ada@example.org"></label>
<label>Password <input type="password" value="password"></label>
<label>Search <input type="search" placeholder="Search docs"></label>
<label>Number <input type="number" value="42"></label>
<label>Date <input type="date"></label>
<label>Role <select><optgroup label="Product"><option>Designer</option><option>Developer</option></optgroup><optgroup label="Content"><option>Writer</option></optgroup></select></label>
<label>Browser <input list="browsers" placeholder="Choose"><datalist id="browsers"><option value="Firefox"><option value="Chromium"><option value="Safari"></datalist></label>
<label>Notes <textarea placeholder="Write something…"></textarea></label>
<p><label><input type="checkbox" checked> Receive updates</label></p>
<p><label><input type="radio" name="plan" checked> Free</label> <label><input type="radio" name="plan"> Pro</label></p>
<p><button type="button">Primary action</button> <button type="button" disabled>Disabled</button></p>
<label>Disabled input <input type="text" value="Unavailable" disabled></label>
<label>Invalid email <input type="email" value="not-an-email" aria-invalid="true"></label>
<p>Progress <progress value="72" max="100">72%</progress></p>
<p>Score <meter min="0" max="100" low="35" high="80" optimum="90" value="84">84</meter></p>
<p>Computed output: <output>42px</output></p>
</fieldset></form></main>`

const tables = `
<main id="table"><h1>Data table</h1><table><caption>Theme quality checks</caption><colgroup><col><col><col></colgroup><thead><tr><th>Check</th><th>Status</th><th>Score</th></tr></thead><tbody><tr><td>Semantic coverage</td><td>Pass</td><td>90+ elements</td></tr><tr><td>Text contrast</td><td>Pass</td><td>12.2:1</td></tr><tr><td>Long content row used to demonstrate wrapping behavior in narrow viewports.</td><td>Review</td><td>—</td></tr></tbody><tfoot><tr><th>Total</th><td>2 pass</td><td>1 review</td></tr></tfoot></table></main>`

const code = `
<main><h1>Code</h1><p>Use <code>&lt;article&gt;</code> instead of a required card class. The variable <var>theme</var> can be inspected and a program may emit <samp>theme.css generated</samp>.</p><pre><code>article {
  padding: var(--space-lg);
  border: 1px solid var(--color-border);
}</code></pre><p>Save with <kbd>Ctrl</kbd> + <kbd>S</kbd>.</p></main>`

const overview = `
${intro}<main><h1>Semantic CSS Studio</h1><p>One HTML document, many visual systems.</p><article><h2>Portable by design</h2><p>Edit tokens and elements visually, then export plain CSS.</p><button>Try the button</button></article><blockquote>Design the HTML, not the classes.</blockquote></main>`

const imageData = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='260'%3E%3Crect width='100%25' height='100%25' fill='%23e8e8e8'/%3E%3Ccircle cx='150' cy='130' r='72' fill='%23888'/%3E%3Crect x='280' y='72' width='470' height='116' rx='18' fill='%23bbb'/%3E%3Ctext x='515' y='140' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='30' fill='%23555'%3Esemantic media%3C/text%3E%3C/svg%3E"

export const allHtml = `
${intro}
<main id="content">
<section><small>HTML CATALOG · VISUAL CONTENT ELEMENTS</small><h1>All visual HTML, one page.</h1><p>This page exercises the HTML elements that can meaningfully participate in a visual classless theme. Metadata/non-rendering elements such as <code>meta</code>, <code>title</code>, <code>script</code> and <code>template</code> are intentionally not treated as visual stories.</p></section>

<section><h2>Shadow tokens</h2><p>These samples always expose the reusable elevation tokens, even when a semantic selector is not currently using them.</p><article style="box-shadow:var(--shadow-sm)"><strong>Small shadow</strong><p><code>--shadow-sm</code></p></article><article style="box-shadow:var(--shadow-md)"><strong>Medium shadow</strong><p><code>--shadow-md</code></p></article><article style="box-shadow:var(--shadow-lg)"><strong>Large shadow</strong><p><code>--shadow-lg</code></p></article></section>

<section><h2>Document landmarks</h2><article><header><h3>Article header</h3><p>Header nested inside an article.</p></header><p>Article body.</p><footer><small>Article footer</small></footer></article><aside><p>Aside content.</p></aside><address>Semantic CSS Studio<br>Web standards lab<br><a href="mailto:hello@example.org">hello@example.org</a></address><search><form><label>Search this catalog <input type="search" placeholder="Selector name"></label><button type="button">Search</button></form></search></section>

<section><h2>Headings and text</h2><hgroup><h3>Grouped heading</h3><p>A subtitle represented inside <code>hgroup</code>.</p></hgroup><h4>Heading four</h4><h5>Heading five</h5><h6>Heading six</h6><p>Paragraph with <a href="#">anchor</a>, <strong>strong</strong>, <em>emphasis</em>, <small>small</small>, <mark>mark</mark>, <del>deleted</del>, <ins>inserted</ins>, <abbr title="Cascading Style Sheets">CSS</abbr>, <b>stylistically offset</b>, <bdi>إيان</bdi>, <bdo dir="rtl">bidirectional override</bdo>, <cite>A visual language</cite>, <data value="42">42 tokens</data>, <dfn>classless</dfn>, <i>alternate voice</i>, <q>inline quotation</q>, <s>no longer accurate</s>, <span>generic span</span>, H<sub>2</sub>O, x<sup>2</sup>, <time datetime="2026-09-08">8 September 2026</time>, <u>annotation</u>. A forced line break follows<br>next line, and a word-break opportunity: semantic<wbr>stylesheet.</p></section>

<section><h2>Lists</h2><ul><li>Unordered item</li><li>Second item</li></ul><ol start="3"><li>Ordered item</li><li>Second item</li></ol><menu><li><button type="button">Menu action</button></li><li><button type="button">Another action</button></li></menu><dl><dt>Theme</dt><dd>Structured design data.</dd><dt>Selector</dt><dd>A target for generated CSS.</dd></dl></section>

<section><h2>Quotes, code and separators</h2><blockquote cite="https://html.spec.whatwg.org/"><p>Meaningful markup gives a classless theme useful structure.</p></blockquote><p><code>const css = compile(theme)</code> · <kbd>Ctrl</kbd> + <kbd>S</kbd> · <samp>theme.css generated</samp> · <var>theme</var></p><pre><code>:root {
  --color-primary: #3157d5;
}</code></pre><hr></section>

<section id="table"><h2>Table</h2><table><caption>Selector coverage</caption><colgroup><col><col><col></colgroup><thead><tr><th scope="col">Group</th><th scope="col">Example</th><th scope="col">Status</th></tr></thead><tbody><tr><th scope="row">Text</th><td>p, a, q, mark</td><td>Visible</td></tr><tr><th scope="row">Forms</th><td>input, select, meter</td><td>Visible</td></tr></tbody><tfoot><tr><th colspan="2">Catalog</th><td>Ready</td></tr></tfoot></table></section>

<section id="forms"><h2>Forms</h2><form><fieldset><legend>Native controls</legend><label>Text <input type="text" value="Semantic HTML"></label><label>Email <input type="email" value="hello@example.org"></label><label>URL <input type="url" value="https://example.org"></label><label>Telephone <input type="tel" value="+55 21 5555-5555"></label><label>Password <input type="password" value="semantic"></label><label>Search <input type="search" placeholder="Search"></label><label>Number <input type="number" value="16"></label><label>Range <input type="range" min="0" max="100" value="65"></label><label>Date <input type="date"></label><label>Month <input type="month"></label><label>Week <input type="week"></label><label>Time <input type="time"></label><label>Color <input type="color" value="#3157d5"></label><label>File <input type="file"></label><p><label><input type="checkbox" checked> Checkbox</label> <label><input type="radio" name="catalog-mode" checked> Radio A</label> <label><input type="radio" name="catalog-mode"> Radio B</label></p><label>Select <select><optgroup label="Semantic"><option>Article</option><option>Section</option></optgroup><optgroup label="Forms"><option>Input</option></optgroup></select></label><label>Data list <input list="catalog-options" value="Article"><datalist id="catalog-options"><option value="Article"><option value="Button"><option value="Table"></datalist></label><label>Textarea <textarea>Editable multi-line text.</textarea></label><p><button type="button">Button</button> <button type="button" disabled>Disabled</button></p><p>Output: <output>16px</output></p><p>Progress: <progress value="68" max="100">68%</progress></p><p>Meter: <meter min="0" max="100" low="30" high="80" optimum="95" value="86">86</meter></p></fieldset></form></section>

<section><h2>Media</h2><figure><picture><source media="(max-width: 500px)" srcset="${imageData}"><img src="${imageData}" alt="Semantic placeholder"></picture><figcaption>Picture, source, image and figcaption.</figcaption></figure><p><audio controls aria-label="Audio control specimen"></audio></p><video controls width="480" poster="${imageData}" aria-label="Video control specimen"><track kind="captions" srclang="en" label="English"></video><p><iframe title="Inline frame specimen" srcdoc="<p style='font-family:sans-serif;padding:1rem'>iframe content</p>"></iframe></p><p><object type="text/html" data="data:text/html,%3Cp%3EObject%20content%3C%2Fp%3E">Object fallback text</object></p><p><embed type="image/svg+xml" src="${imageData}" width="260" height="90"></p><canvas width="320" height="90" aria-label="Canvas specimen">Canvas fallback text.</canvas><p><img src="${imageData}" usemap="#catalog-map" alt="Image map specimen"><map name="catalog-map"><area shape="rect" coords="0,0,450,260" href="#content" alt="Mapped area"></map></p></section>

<section><h2>Interactive and annotation</h2><details open><summary>Disclosure summary</summary><p>Details content.</p></details><dialog open><p>Non-modal open dialog.</p><form method="dialog"><button>Close</button></form></dialog><p><ruby>漢<rp>(</rp><rt>kan</rt><rp>)</rp>字<rp>(</rp><rt>ji</rt><rp>)</rp></ruby></p></section>
</main><footer><p>Footer landmark for the full HTML catalog.</p></footer>`

export const kitchenSink = allHtml

const contextualStories: Record<string, string> = {
  body: '<main><h1>Body selector</h1><p>The entire preview document is the target. Change background, font, color, spacing or width-related properties to see the effect globally.</p></main>',
  header: '<header><nav><strong>Header</strong><a href="#">Home</a><a href="#">Docs</a></nav></header><main><p>Content below the header.</p></main>',
  nav: '<header><nav><a href="#">Home</a><a href="#">Components</a><a href="#">About</a></nav></header>',
  main: '<main><h1>Main content</h1><p>This is the document main landmark.</p></main>',
  section: '<main><section><h2>Section</h2><p>A thematic grouping of content.</p></section></main>',
  article: '<main><article><h2>Article</h2><p>A self-contained composition rendered as a native element.</p><button>Action</button></article></main>',
  aside: '<main><aside><h2>Aside</h2><p>Complementary content.</p></aside></main>',
  footer: '<main><p>Page content.</p></main><footer><p>Footer information and links.</p></footer>',
  address: '<main><address>Semantic CSS Studio<br>Rio de Janeiro<br><a href="mailto:hello@example.org">hello@example.org</a></address></main>',
  search: '<main><search><form><label>Search <input type="search" value="semantic css"></label><button type="button">Go</button></form></search></main>',
  hgroup: '<main><hgroup><h1>Primary heading</h1><p>Subtitle grouped with the heading.</p></hgroup></main>',
  blockquote: '<main><blockquote><p>A selected block quotation with enough text to inspect indentation, borders, background and typography.</p></blockquote></main>',
  ul: '<main><ul><li>First unordered item</li><li>Second unordered item</li></ul></main>',
  ol: '<main><ol><li>First ordered item</li><li>Second ordered item</li></ol></main>',
  li: '<main><ul><li>Target list item</li><li>Another item</li></ul></main>',
  dl: '<main><dl><dt>Theme</dt><dd>A structured design model.</dd><dt>CSS</dt><dd>The compiled artifact.</dd></dl></main>',
  dt: '<main><dl><dt>Definition term</dt><dd>Its description.</dd></dl></main>',
  dd: '<main><dl><dt>Term</dt><dd>Definition description target.</dd></dl></main>',
  menu: '<main><menu><li><button type="button">Save</button></li><li><button type="button">Export</button></li></menu></main>',
  pre: '<main><pre><code>article {\n  padding: 1rem;\n}</code></pre></main>',
  table: tables,
  caption: tables,
  colgroup: tables,
  col: tables,
  thead: tables,
  tbody: tables,
  tfoot: tables,
  tr: tables,
  th: tables,
  td: tables,
  form: forms,
  fieldset: forms,
  legend: forms,
  label: forms,
  input: forms,
  textarea: forms,
  select: forms,
  optgroup: forms,
  option: forms,
  datalist: forms,
  button: '<main><p><button type="button">Default button</button> <button type="button" disabled>Disabled button</button></p></main>',
  output: forms,
  progress: forms,
  meter: forms,
  img: `<main><img src="${imageData}" alt="Image selector specimen"></main>`,
  picture: `<main><picture><source media="(max-width:500px)" srcset="${imageData}"><img src="${imageData}" alt="Picture specimen"></picture></main>`,
  source: `<main><p><strong>source</strong> is contextual and does not render a box by itself. It is shown here inside <code>picture</code>.</p><picture><source media="(max-width:500px)" srcset="${imageData}"><img src="${imageData}" alt="Source context"></picture></main>`,
  audio: '<main><audio controls aria-label="Audio selector specimen"></audio></main>',
  video: `<main><video controls width="480" poster="${imageData}" aria-label="Video selector specimen"><track kind="captions" srclang="en" label="English"></video></main>`,
  track: `<main><p><strong>track</strong> is contextual and not independently visible. It is mounted inside this video element.</p><video controls width="480" poster="${imageData}"><track kind="captions" srclang="en" label="English"></video></main>`,
  figure: `<main><figure><img src="${imageData}" alt="Figure selector specimen"><figcaption>Figure caption.</figcaption></figure></main>`,
  figcaption: `<main><figure><img src="${imageData}" alt="Caption selector specimen"><figcaption>This caption is the selected element.</figcaption></figure></main>`,
  iframe: '<main><iframe title="Inline frame selector specimen" srcdoc="<p style=\'font-family:sans-serif;padding:1rem\'>iframe content</p>"></iframe></main>',
  embed: `<main><embed type="image/svg+xml" src="${imageData}" width="360" height="110"></main>`,
  object: '<main><object type="text/html" data="data:text/html,%3Ch2%3EObject%3C%2Fh2%3E%3Cp%3EEmbedded%20HTML%20content.%3C%2Fp%3E">Object fallback.</object></main>',
  canvas: '<main><canvas width="420" height="140" aria-label="Canvas selector specimen">Canvas fallback.</canvas><p>Canvas has no painted content without script, but its box can be styled here.</p></main>',
  map: `<main><img src="${imageData}" usemap="#story-map" alt="Image map"><map name="story-map"><area shape="rect" coords="0,0,450,260" href="#" alt="Area"></map><p><code>map</code> is a contextual container and has no independent visual box by default.</p></main>`,
  area: `<main><img src="${imageData}" usemap="#area-map" alt="Image map"><map name="area-map"><area shape="rect" coords="0,0,450,260" href="#" alt="Area"></map><p><code>area</code> defines a hit region and has no independent visual box.</p></main>`,
  details: '<main><details open><summary>Details summary</summary><p>Expandable native disclosure content.</p></details></main>',
  summary: '<main><details open><summary>Selected summary</summary><p>Details content.</p></details></main>',
  dialog: '<main><dialog open><p>Open dialog selector specimen.</p><button>Action</button></dialog></main>',
  ruby: '<main><p><ruby>漢<rp>(</rp><rt>kan</rt><rp>)</rp>字<rp>(</rp><rt>ji</rt><rp>)</rp></ruby></p></main>',
  rt: '<main><p><ruby>漢<rt>kan</rt>字<rt>ji</rt></ruby></p></main>',
  rp: '<main><p><ruby>漢<rp>(</rp><rt>kan</rt><rp>)</rp></ruby></p></main>',
  hr: '<main><p>Before separator.</p><hr><p>After separator.</p></main>',
}

const inlineSamples: Record<string, string> = {
  p: '<p>This paragraph is the selected selector. Change its typography, spacing, color or width.</p>',
  a: '<p><a href="#">Selected anchor link</a> alongside surrounding text.</p>',
  strong: '<p>Normal text and <strong>selected strong text</strong>.</p>',
  em: '<p>Normal text and <em>selected emphasis</em>.</p>',
  small: '<p>Normal text and <small>selected small text</small>.</p>',
  mark: '<p>Normal text and <mark>selected marked text</mark>.</p>',
  del: '<p>Normal text and <del>selected deleted text</del>.</p>',
  ins: '<p>Normal text and <ins>selected inserted text</ins>.</p>',
  abbr: '<p><abbr title="Cascading Style Sheets">CSS</abbr> is the selected abbreviation.</p>',
  b: '<p>This is <b>stylistically offset text</b> inside a paragraph.</p>',
  bdi: '<p>User name: <bdi>إيان</bdi> is isolated directionally.</p>',
  bdo: '<p><bdo dir="rtl">bidirectional override text</bdo></p>',
  cite: '<p><cite>The selected citation title</cite></p>',
  data: '<p><data value="42">42 semantic tokens</data></p>',
  dfn: '<p><dfn>classless CSS</dfn> is being defined here.</p>',
  i: '<p>An <i>alternate voice or term</i> is selected.</p>',
  q: '<p>The browser renders <q>this inline quotation</q> in context.</p>',
  s: '<p><s>This statement is no longer accurate.</s></p>',
  span: '<p>A generic <span>selected span element</span> in context.</p>',
  sub: '<p>Water is H<sub>2</sub>O.</p>',
  sup: '<p>The equation is x<sup>2</sup>.</p>',
  time: '<p>Published <time datetime="2026-09-08">8 September 2026</time>.</p>',
  u: '<p><u>Annotated text</u> using the u element.</p>',
  br: '<p>First line<br>Second line after the selected break.</p>',
  wbr: '<p>semantic<wbr>stylesheet contains a word break opportunity.</p>',
  code: '<p>Inline code: <code>compileTheme(theme)</code>.</p>',
  kbd: '<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd>.</p>',
  samp: '<p>Program output: <samp>theme.css generated</samp>.</p>',
  var: '<p>Let <var>x</var> be the current spacing token.</p>',
}

export function selectorStory(element: string): string {
  if (/^h[1-6]$/.test(element)) return `<main><${element}>Selected &lt;${element}&gt; heading</${element}><p>Supporting paragraph for scale comparison.</p></main>`
  const context = contextualStories[element]
  if (context) return context
  const inline = inlineSamples[element]
  if (inline) return `<main><h1>&lt;${element}&gt;</h1>${inline}</main>`
  return `<main><h1>&lt;${element}&gt;</h1><p>This selector is available for direct CSS overrides.</p></main>`
}

export function specimenHtml(name: SpecimenName, selectedElement = 'article'): string {
  switch (name) {
    case 'Overview': return overview
    case 'Typography': return intro + typography
    case 'Content': return intro + content
    case 'Forms': return intro + forms
    case 'Tables': return intro + tables
    case 'Code': return intro + code
    case 'All HTML': return allHtml
    case 'Kitchen Sink': return kitchenSink
    case 'Selector': return selectorStory(selectedElement)
  }
}
