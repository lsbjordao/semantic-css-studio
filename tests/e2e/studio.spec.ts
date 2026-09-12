import { expect, test } from '@playwright/test'

test('essential theme editing flow', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Semantic CSS Studio').first()).toBeVisible()

  await page.getByLabel('Preset', { exact: true }).selectOption('Editorial')
  await page.getByRole('button', { name: /Typography/ }).click()
  await page.getByLabel('Base size value').fill('19px')
  await page.getByRole('button', { name: /Colors/ }).click()
  await page.getByLabel('Primary value').fill('#7b2cff')
  await page.getByRole('button', { name: 'Dark' }).last().click()
  await page.getByRole('button', { name: 'Mobile' }).click()

  const frame = page.locator('iframe')
  await expect(frame).toBeVisible()
})

test('selector catalog keeps the current story until Open story is requested', async ({
  page,
}) => {
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

test('clicking preview content selects its element without forcing a story change', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByLabel('Story').selectOption('All HTML')

  const frame = page.frameLocator('iframe')
  await frame.locator('blockquote').first().click()

  await expect(page.getByLabel('Story')).toHaveValue('All HTML')
  await expect(page.getByText('<blockquote>', { exact: true })).toBeVisible()
})

test('icon libraries keep checkbox controls visible in the preview', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByLabel('Story').selectOption('All HTML')
  await page.getByRole('button', { name: /Icons/ }).click()

  const frame = page.frameLocator('iframe')
  for (const label of [
    'Lucide',
    'Phosphor',
    'Heroicons',
    'Material Symbols',
    'Font Awesome',
    'Bootstrap Icons',
    'Tabler',
  ]) {
    await page.getByRole('radio', { name: new RegExp(`^${label}`) }).click()
    const checkbox = frame.locator('input[type="checkbox"]').first()
    await expect(checkbox).toBeVisible()
    await expect(checkbox).toHaveCSS('width', /\d/)
    await expect(checkbox).toHaveCSS('background-image', /data:image\/svg\+xml/)
  }
})

test('preview uses the selected viewport width even in a narrow pane', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1000, height: 800 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Desktop', exact: true }).click()
  await expect
    .poll(() =>
      page
        .frameLocator('iframe')
        .locator('html')
        .evaluate(() => window.innerWidth),
    )
    .toBe(1440)
  await page.getByRole('button', { name: 'Mobile', exact: true }).click()
  await expect
    .poll(() =>
      page
        .frameLocator('iframe')
        .locator('html')
        .evaluate(() => window.innerWidth),
    )
    .toBe(390)
})

for (const width of [1000, 390]) {
  test(`theme actions remain available at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/')
    await page.getByLabel('Theme name').fill('Mobile theme')
    await page.getByRole('button', { name: 'Actions', exact: true }).click()
    await expect(
      page.getByRole('button', { name: 'Import', exact: true }),
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'New', exact: true }),
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Reset', exact: true }),
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Undo', exact: true }),
    ).toBeEnabled()
    await page.keyboard.press('Escape')
    await expect(
      page.getByRole('button', { name: 'Actions', exact: true }),
    ).toBeFocused()
  })
}

test('separately exported demo references the downloaded stylesheet', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByLabel('Theme name').fill('My custom theme')
  await page.getByRole('button', { name: 'Export' }).click()
  const cssDownload = page.waitForEvent('download')
  await page
    .getByRole('button', { name: 'CSS Readable stylesheet', exact: true })
    .click()
  const css = await cssDownload
  await page.getByRole('button', { name: 'Export' }).click()
  const demoDownload = page.waitForEvent('download')
  await page
    .getByRole('button', { name: 'Demo HTML Kitchen Sink page', exact: true })
    .click()
  const demo = await demoDownload
  const stream = await demo.createReadStream()
  const chunks = []
  for await (const chunk of stream!) chunks.push(chunk)
  expect(Buffer.concat(chunks).toString()).toContain(
    `href="${css.suggestedFilename()}"`,
  )
})

test('reading workspace edits the article and supports undo', async ({
  page,
}) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'Text & reading' }),
  ).toBeVisible()
  await expect(page.getByLabel('Story')).toHaveValue('Article')
  await page.getByLabel('Reading size value').fill('20px')
  await page.getByLabel('Paragraph spacing value').fill('2em')
  const paragraph = page.frameLocator('iframe').locator('article > p').first()
  await expect(paragraph).toHaveCSS('font-size', '20px')
  await expect(paragraph).toHaveCSS('margin-block-end', '40px')
  await page.getByRole('button', { name: 'Undo', exact: true }).click()
  await expect(paragraph).not.toHaveCSS('margin-block-end', '40px')
})

test('editorial presets choose a document and site controls keep reading controls separate', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Apply Editorial preset' }).click()
  await expect(page.getByLabel('Preset', { exact: true })).toHaveValue(
    'Editorial',
  )
  await expect(page.getByLabel('Story')).toHaveValue('Essay')
  await page
    .getByRole('button', { name: 'Site layout', exact: true })
    .first()
    .click()
  await page.getByRole('button', { name: 'Preview website' }).click()
  await expect(page.getByLabel('Story')).toHaveValue('Website')
  await expect(
    page.frameLocator('iframe').locator('body > header nav'),
  ).toBeVisible()
})

test('Quarto reference renders with the exported theme and keeps its document on edits', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByLabel('Story').selectOption('Quarto')
  const frame = page.frameLocator('iframe')
  await expect(frame.locator('#quarto-document-content')).toBeVisible()
  await expect(frame.locator('#TOC')).toBeVisible()
  await expect(frame.locator('.callout')).toHaveCount(1)
  await expect(frame.locator('#refs .csl-entry')).toHaveCount(1)
  await expect(frame.locator('script')).toHaveCount(0)
  await frame
    .locator('html')
    .evaluate((element) => element.setAttribute('data-preview-session', 'kept'))
  await page.getByLabel('Reading size value').fill('21px')
  await expect(frame.locator('main.content > section p').first()).toHaveCSS(
    'font-size',
    '21px',
  )
  await page.getByRole('button', { name: 'Dark', exact: true }).click()
  await expect(frame.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(frame.locator('html')).toHaveAttribute(
    'data-preview-session',
    'kept',
  )
  await expect(frame.locator('body')).toHaveCSS(
    'background-color',
    'rgb(17, 19, 23)',
  )
})

test('Quarto footnotes and callout headings can be selected and recolored', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByLabel('Story').selectOption('Quarto')
  const frame = page.frameLocator('iframe')
  await expect(frame.locator('section.footnotes')).toHaveCSS(
    'background-color',
    'rgb(247, 247, 245)',
  )
  await expect(frame.locator('.callout .callout-header')).toHaveCSS(
    'background-color',
    'rgb(239, 239, 236)',
  )
  for (const [selector, label, color, rgb] of [
    ['section.footnotes', 'Footnotes', '#24364a', 'rgb(36, 54, 74)'],
    [
      '.callout .callout-header',
      'Callout heading',
      '#3b294c',
      'rgb(59, 41, 76)',
    ],
  ]) {
    await frame
      .locator(selector)
      .locator('p, h2, .callout-title-container')
      .first()
      .click()
    await expect(page.locator('.selected-selector-card')).toContainText(label)
    await expect(frame.locator(selector)).toHaveAttribute(
      'data-studio-selected',
      'true',
    )
    await page.getByLabel('Background color value', { exact: true }).fill(color)
    await expect(frame.locator(selector)).toHaveCSS('background-color', rgb)
    await page.getByRole('button', { name: 'Undo', exact: true }).click()
    await expect(frame.locator(selector)).not.toHaveCSS('background-color', rgb)
    await page.getByRole('button', { name: 'Redo', exact: true }).click()
    await expect(frame.locator(selector)).toHaveCSS('background-color', rgb)
    await expect(page.getByLabel('Story')).toHaveValue('Quarto')
  }
})

test('theme JSON round trip preserves edits, CSS and ZIP contents', async ({
  page,
}) => {
  async function download(label: string) {
    await page
      .getByRole('button', { name: 'Export', exact: false })
      .first()
      .click()
    const pending = page.waitForEvent('download')
    await page.getByRole('button', { name: label, exact: true }).click()
    const file = await pending
    const stream = await file.createReadStream()
    const chunks = []
    for await (const chunk of stream!) chunks.push(chunk)
    return Buffer.concat(chunks)
  }
  await page.goto('/')
  await page.getByLabel('Theme name').fill('Round trip theme')
  await page.getByLabel('Reading size value').fill('19px')
  await page.getByLabel('Story').selectOption('Quarto')
  await page.frameLocator('iframe').locator('.callout-title-container').click()
  await page
    .getByLabel('Background color value', { exact: true })
    .fill('#324567')
  const json = await download('Theme JSON Editable source')
  const before = JSON.parse(json.toString())
  const css = await download('CSS Readable stylesheet')
  const quarto = await download('Quarto theme.css after Bootstrap')
  await page.getByLabel('Preset', { exact: true }).selectOption('Editorial')
  await page.locator('input[type="file"]').setInputFiles({
    name: 'theme.json',
    mimeType: 'application/json',
    buffer: json,
  })
  await expect(page.getByLabel('Theme name')).toHaveValue('Round trip theme')
  expect(
    JSON.parse((await download('Theme JSON Editable source')).toString()),
  ).toEqual(before)
  expect(await download('CSS Readable stylesheet')).toEqual(css)
  expect(await download('Quarto theme.css after Bootstrap')).toEqual(quarto)
  await page.reload()
  expect(
    JSON.parse((await download('Theme JSON Editable source')).toString()),
  ).toEqual(before)
  const { default: JSZip } = await import('jszip')
  const zip = await JSZip.loadAsync(
    await download('Complete package CSS + JSON + demo ZIP'),
  )
  expect(
    JSON.parse(await zip.file('round-trip-theme/theme.json')!.async('string')),
  ).toEqual(before)
  expect(
    await zip.file('round-trip-theme/theme.css')!.async('nodebuffer'),
  ).toEqual(css)
  expect(
    await zip.file('round-trip-theme/demo.html')!.async('string'),
  ).toContain('href="theme.css"')
  const dialog = page.waitForEvent('dialog')
  await page.locator('input[type="file"]').setInputFiles({
    name: 'broken.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{broken'),
  })
  await (await dialog).dismiss()
  expect(
    JSON.parse((await download('Theme JSON Editable source')).toString()),
  ).toEqual(before)
})
