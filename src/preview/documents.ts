const readingPassage = `
<p>A page unfolds over time. The reader finds a title, follows an opening paragraph and gradually learns which details deserve attention. Typography supports that sequence through small, repeatable choices: the width of a line, the distance between paragraphs and the contrast between a heading and the words beneath it.</p>
<p>Reading is also a matter of finding the way back. After a pause, a clear paragraph shape helps the eye return to the right line. A section heading gives a name to the discussion, while a quotation introduces another voice without losing the thread of the argument.</p>
<p>Compare these paragraphs at an ordinary viewing distance. A larger font changes more than the size of the letters: it changes the number of words on each line, the height of each paragraph and the pace of the page. The reading column and the line height should be considered together.</p>`

const figure = `<figure><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 160" role="img" aria-label="Three reading columns with different line lengths" style="display:block;width:100%;height:auto;color:var(--color-primary)"><rect width="640" height="160" fill="var(--color-surface-alt)"/><g stroke="currentColor" stroke-width="4"><path d="M30 30h120m-120 20h120m-120 20h100m-100 20h120m-120 20h80m130-80h170m-170 20h170m-170 20h150m-150 20h170m-170 20h130m90-80h110m-110 20h110m-110 20h90m-90 20h110m-110 20h70"/></g></svg><figcaption>Line length changes the shape and pace of a paragraph.</figcaption></figure>`

export const articleDocument = `<main><article>
<header><p><small>Field notes on typography</small></p><h1>The shape of a readable page</h1><p>How type, measure and rhythm support a sustained reading experience.</p><p><small>Semantic CSS Studio · <time datetime="2026-09-12">September 12, 2026</time></small></p></header>
${readingPassage}
<h2>Give the text room to breathe</h2>
<p>A useful measure allows a sentence to develop without making the next line difficult to find. The margins around that measure belong to the composition too. On a small screen, generous desktop margins need to yield to the words.</p>
<blockquote><p>The page should make it easy to continue, and equally easy to find the way back.</p></blockquote>
${figure}
<h2>Build a hierarchy that survives real content</h2>
<p>A title can be short, but it can also take three lines. Test both situations before deciding on a scale. Section headings should introduce a change of subject without making every section feel like a new document.</p>
<h3>Details worth checking</h3><ul><li>Paragraph spacing and line height work together.</li><li>Links remain distinct inside a sentence.</li><li>Captions and notes stay readable at their smaller size.</li></ul>
${readingPassage}
<p>A small note can explain a qualification without interrupting the main paragraph.<sup><a href="#note-1">1</a></sup> Inline elements such as <em>emphasis</em>, <strong>strong emphasis</strong> and <code>line-height</code> should sit comfortably alongside ordinary words.</p>
<footer><p id="note-1"><small>1. This article is an original sample for comparing themes, not a research report.</small></p></footer>
</article></main>`

export const essayDocument = `<main><article><header><h1>A place to pause</h1><p><em>An essay on attention and the spaces between words</em></p></header>
<p>The first thing I noticed in the reading room was the quiet. It was not an absence of sound: pages turned, chairs moved and someone set a cup on a wooden table. It was the feeling that none of these small interruptions needed an answer.</p>
<p>A well-composed page can offer something similar. Its decisions are visible, yet they leave room for the reader to think. The words do not have to compete with their surroundings. The margins make a boundary, and the paragraph makes a place to begin.</p>
${readingPassage}<h2>The next paragraph</h2>
<p>At the end of a sentence, the eye moves before the thought is quite finished. Too much distance makes that movement conspicuous. Too little makes the lines gather into a dense surface. Between them is a rhythm that feels different with every typeface.</p>
<blockquote><p>Space becomes useful when it gives a thought enough time to settle.</p></blockquote>
${readingPassage}<h2>Returning to the page</h2>
<p>I came back to the reading room the following afternoon. The light had shifted, but the room was still easy to understand. That is a useful ambition for a document: it should remain familiar when the screen, the light or the reader's attention changes.</p>
</article></main>`

export const documentationDocument = `<header><nav aria-label="Documentation navigation"><strong>Field notes</strong><a href="#start">Guide</a><a href="#settings">Reference</a></nav></header><main><article>
<header><h1>A theme for your documents</h1><p>Set up a portable stylesheet and refine it with a repeatable reading check.</p></header>
<h2 id="start">Getting started</h2><p>Keep the HTML structure meaningful. Use headings for sections, paragraphs for prose and a figure with a caption when an image needs an explanation.</p>
<pre><code>&lt;link rel="stylesheet" href="theme.css"&gt;
&lt;main&gt;
  &lt;article&gt;
    &lt;h1&gt;Your document title&lt;/h1&gt;
    &lt;p&gt;Your opening paragraph.&lt;/p&gt;
  &lt;/article&gt;
&lt;/main&gt;</code></pre>
<h2 id="settings">Reading settings</h2><table><caption>A starting point for comparison</caption><thead><tr><th>Setting</th><th>Example</th><th>Purpose</th></tr></thead><tbody><tr><td>Column width</td><td>68ch</td><td>Comfortable line length</td></tr><tr><td>Body size</td><td>18px</td><td>Readable text at normal zoom</td></tr><tr><td>Line height</td><td>1.65</td><td>Separation between lines</td></tr></tbody></table>
<h3>Compare before exporting</h3><ol><li>Read a complete section.</li><li>Check a narrow screen and dark mode.</li><li>Export the stylesheet and its editable JSON source.</li></ol>
<aside><p><strong>Keep the source.</strong> A Theme JSON file lets you reopen and adjust the design later.</p></aside>
${readingPassage}</article></main>`

export const websiteDocument = `<header><nav aria-label="Website navigation"><strong>Field notes</strong><a href="#journal">Journal</a><a href="#about">About</a><a href="#contact">Contact</a></nav></header>
<main><h1>A journal of careful observation</h1><p>Essays, working notes and practical guides about making room for ideas.</p><section id="journal"><h2>From the journal</h2><article><header><h3>The shape of a readable page</h3><p><small>Design notes · September 12, 2026</small></p></header>${readingPassage}<p><a href="#about">About this publication</a></p></article></section>
<section id="about"><h2>About Field notes</h2><p>This sample website puts prose inside a publication. Compare the reading column with the wider navigation and footer, then adjust their spacing independently in Site layout.</p><aside><h3>A note to readers</h3><p>Good navigation makes it easy to leave a document and easy to return to it.</p></aside></section></main>
<footer id="contact"><nav aria-label="Footer navigation"><strong>Field notes</strong><a href="#journal">Journal</a><a href="#about">About</a></nav><p><small>An original website specimen for Semantic CSS Studio.</small></p></footer>`
