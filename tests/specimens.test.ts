import { describe, expect, it } from 'vitest'
import { allHtml, kitchenSink, selectorStory } from '../src/preview/specimens'
import { supportedElements } from '../src/theme/schema'

function mount(html: string) {
  const container = document.createElement('div')
  container.innerHTML = html
  return container
}

describe('HTML specimens', () => {
  it('covers every supported visual/contextual selector in All HTML', () => {
    expect(supportedElements).toHaveLength(100)
    const container = mount(allHtml)
    for (const element of supportedElements.filter((tag) => tag !== 'body')) {
      expect(
        container.querySelector(element),
        `missing <${element}>`,
      ).not.toBeNull()
    }
  })

  it('keeps Kitchen Sink as the full integration specimen', () => {
    expect(kitchenSink).toBe(allHtml)
  })

  it('provides a selector story for every supported selector', () => {
    for (const element of supportedElements) {
      const story = selectorStory(element)
      expect(story.length, `empty story for <${element}>`).toBeGreaterThan(20)
    }
  })

  it('shows icon-bearing controls in an Icons section of All HTML', () => {
    const container = mount(allHtml)
    const section = container.querySelector('section#icons')
    expect(section).not.toBeNull()
    expect(section?.querySelector('input[type="checkbox"]')).not.toBeNull()
    expect(section?.querySelector('input[type="radio"]')).not.toBeNull()
    expect(section?.querySelector('select')).not.toBeNull()
    expect(section?.querySelector('details > summary')).not.toBeNull()
  })
})
