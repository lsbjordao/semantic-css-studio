import { afterEach, expect, it, vi } from 'vitest'
import { useStudioStore } from '../src/theme/store'

const key = 'semantic-css-studio/theme-v1'
afterEach(() => vi.restoreAllMocks())

it('keeps editing and undo usable when saving fails, then recovers on the next edit', () => {
  const write = vi
    .spyOn(Storage.prototype, 'setItem')
    .mockImplementation(() => {
      throw new DOMException('Full', 'QuotaExceededError')
    })
  expect(() =>
    useStudioStore.getState().updateMetadata('name', 'Unsaved theme'),
  ).not.toThrow()
  expect(useStudioStore.getState().theme.metadata.name).toBe('Unsaved theme')
  expect(useStudioStore.getState()).toHaveProperty(
    'saveError',
    expect.any(String),
  )
  expect(() => useStudioStore.getState().undo()).not.toThrow()
  expect(() => useStudioStore.getState().redo()).not.toThrow()
  write.mockRestore()
  useStudioStore.getState().updateMetadata('name', 'Saved theme')
  expect(JSON.parse(localStorage.getItem(key)!).metadata.name).toBe(
    'Saved theme',
  )
  expect(useStudioStore.getState()).toHaveProperty('saveError', null)
})
