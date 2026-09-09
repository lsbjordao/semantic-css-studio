import { expect, test } from '@playwright/test'

test('essential theme editing flow', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Semantic CSS Studio').first()).toBeVisible()

  await page.getByLabel('Preset').selectOption('Editorial')
  await page.getByRole('button', { name: /Typography/ }).click()
  await page.getByLabel('Base size value').fill('19px')
  await page.getByRole('button', { name: /Colors/ }).click()
  await page.getByLabel('Primary value').fill('#7b2cff')
  await page.getByRole('button', { name: 'Dark' }).last().click()
  await page.getByRole('button', { name: 'Mobile' }).click()

  const frame = page.locator('iframe')
  await expect(frame).toBeVisible()
})

test('selector catalog keeps the current story until Open story is requested', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Story').selectOption('All HTML')
  await page.getByRole('button', { name: /Elements/ }).click()
  await page.getByRole('button', { name: '<p>' }).click()

  await expect(page.getByLabel('Story')).toHaveValue('All HTML')
  await page.getByRole('button', { name: 'Open story' }).click()
  await expect(page.getByLabel('Story')).toHaveValue('Selector')

  await page.getByRole('button', { name: 'Increase Font size' }).click()
  await expect(page.getByLabel('Font size value')).toHaveValue('0.125rem')
})

test('clicking preview content selects its element without forcing a story change', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Story').selectOption('All HTML')

  const frame = page.frameLocator('iframe')
  await frame.locator('blockquote').first().click()

  await expect(page.getByLabel('Story')).toHaveValue('All HTML')
  await expect(page.getByText('<blockquote>', { exact: true })).toBeVisible()
})
