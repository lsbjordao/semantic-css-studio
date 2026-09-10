import { describe, expect, it } from 'vitest'
import { minifyCss } from '../src/compiler/minify'

describe('minifyCss', () => {
  it('removes space and the trailing semicolon', () => {
    expect(minifyCss('a {\n  color: red;\n}\n')).toBe('a{color:red}')
  })

  it('discards comments', () => {
    expect(minifyCss('/* note */\na { color: red }')).toBe('a{color:red}')
  })

  it('preserves string contents', () => {
    expect(minifyCss('a::after { content: "a;  b" }')).toBe(
      'a::after{content:"a;  b"}',
    )
  })

  it('does not break comments inside strings', () => {
    expect(minifyCss('a::after { content: "/* not a comment */" }')).toBe(
      'a::after{content:"/* not a comment */"}',
    )
  })

  it('preserves unquoted url()', () => {
    const css = 'a { background: url(data:image/svg+xml;base64,AA==) }'
    expect(minifyCss(css)).toBe(
      'a{background:url(data:image/svg+xml;base64,AA==)}',
    )
  })

  it('preserves the descendant combinator before pseudo-classes', () => {
    // `a :hover` and `a:hover` are different selectors; collapsing the space
    // here would change the rule meaning.
    expect(minifyCss('a :hover { color: red }')).toBe('a :hover{color:red}')
  })

  it('preserves commas in font lists', () => {
    expect(
      minifyCss('a { font-family: "Iowan Old Style", Georgia, serif }'),
    ).toBe('a{font-family:"Iowan Old Style",Georgia,serif}')
  })

  it('keeps media queries valid', () => {
    expect(
      minifyCss('@media (max-width: 768px) {\n  a { color: red }\n}'),
    ).toBe('@media (max-width: 768px){a{color:red}}')
  })

  it('preserves the descendant combinator inside at-rules', () => {
    // A naive depth counter would treat the inside of @media as a declaration
    // block and erase the space, turning the selector into 'a:hover'.
    expect(minifyCss('@media print {\n  a :hover { color: red }\n}')).toBe(
      '@media print{a :hover{color:red}}',
    )
  })

  it('resets pendingAtRule after a blockless at-rule at the top level', () => {
    const css = '@layer reset, base, elements;\na { color: red }'
    expect(minifyCss(css)).toBe('@layer reset,base,elements;a{color:red}')
  })

  it('resets pendingAtRule after a blockless at-rule nested inside another at-rule', () => {
    // pendingAtRule is set by any '@', at any depth. If the ';' reset only
    // fired at blocks.length === 0, a blockless at-rule nested inside another
    // at-rule would end with ';' while blocks.length > 0, the reset would not
    // fire, and the flag would leak into the next sibling '{' — misclassifying
    // a declaration block as an at-rule body (space around ':' would no longer
    // be removed).
    const css = '@layer components { @layer buttons, cards; a { color: red } }'
    expect(minifyCss(css)).toBe(
      '@layer components{@layer buttons,cards;a{color:red}}',
    )
  })
})

/**
 * Known minifier limitations, found by probing during the Task 2 review and
 * deliberately NOT fixed there: they are outside that task brief scope.
 *
 * None is reachable from the current compileTheme() output. The six presets
 * emit no url(), no CSS nesting and no declaration at-rules, and the only
 * comment is the header. But three stand in the roadmap path:
 *
 *  - @font-face is named in the spec as a gap to fill;
 *  - nesting may arrive via the free selector field;
 *  - comments between tokens become reachable once the exhaustive property
 *    catalog allows freely typed values.
 *
 * The most severe is the last one: deleting a comment between two tokens fuses
 * them, turning a descendant selector into a type selector. Fix before the
 * property-catalog delivery.
 */
describe('minifyCss — known limitations (not fixed)', () => {
  it.skip('preserves escaped parentheses inside unquoted url()', () => {
    const css = String.raw`a { background: url(foo\)/**/bar) }`
    expect(minifyCss(css)).toBe(String.raw`a{background:url(foo\)/**/bar)}`)
  })

  it.skip('preserves escaped spaces inside unquoted url()', () => {
    // The fast url() path does replace(/\s+/g, ''), which also erases the
    // escaped space that is significant in file names.
    const css = String.raw`a { background: url(foo\ bar) }`
    expect(minifyCss(css)).toBe(String.raw`a{background:url(foo\ bar)}`)
  })

  it.skip('preserves the descendant combinator in nested selectors', () => {
    // Same class as the at-rule bug, now for native CSS nesting:
    // '& :hover' (descendant) and '&:hover' (compound) are different selectors.
    expect(minifyCss('a { & :hover { color: red } }')).toBe(
      'a{& :hover{color:red}}',
    )
  })

  it.skip('minifies declarations inside declaration at-rules', () => {
    // @font-face, @property, @page and @counter-style have DECLARATION bodies,
    // not rule bodies, but the classifier treats them as at-rules and switches
    // off space removal around ':'. Under-minification, not corruption.
    expect(
      minifyCss('@font-face { font-family: x; src: url(font.woff2); }'),
    ).toBe('@font-face{font-family:x;src:url(font.woff2)}')
  })

  it.skip('keeps adjacent tokens separated after comment removal', () => {
    // The most severe of the five: in CSS comments separate tokens. Deleting one
    // without restoring a space fuses 'a' and 'b' into a single identifier,
    // turning a descendant selector into a type selector.
    expect(minifyCss('a/**/b { color: red }')).toBe('a b{color:red}')
  })
})
