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
      expect(container.querySelector(element), `missing <${element}>`).not.toBeNull()
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
})
