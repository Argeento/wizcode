import { expect, test } from '@playwright/test'
import './utils/mock-api'

test.use({
  locale: 'en-US',
})

test.describe('Album Card Tests', () => {
  test('Album card displays album name, artist name, category name, release date and iTunes link', async ({
    page,
  }) => {
    const albumCard = page.locator('main >> li').first()
    await expect(albumCard).toContainText('First Album')
    await expect(albumCard).toContainText('Artist A')
    await expect(albumCard).toContainText('Rock')
    await expect(albumCard).toContainText('1/1/2023')
    await expect(albumCard.getByText('Listen on iTunes')).toHaveAttribute(
      'href',
      'https://example.com/album1',
    )
  })

  test('Clicking on album show/hide the more info container', async ({
    page,
  }) => {
    const albumCard = page.locator('main >> li').first()
    const innerContainer = albumCard.getByTestId('album-info-container')
    await expect(innerContainer).toHaveCSS('opacity', '0')
    await albumCard.click()
    await expect(innerContainer).toHaveCSS('opacity', '1')
    await albumCard.click()
    await expect(innerContainer).toHaveCSS('opacity', '0')
  })
})
