import { expect, test } from '@playwright/test'
import { ITUNES_TOP_ALBUMS_API_URL } from './utils/constants'

test.describe('Home Tests', () => {
  test('Home page displays the correct title', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('h1')
    await expect(header).toHaveText(/iTunes Top Albums/i)
  })

  test('Loading state is displayed while fetching albums', async ({ page }) => {
    await page.route(ITUNES_TOP_ALBUMS_API_URL, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await route.continue()
    })

    await page.goto('/')
    await expect(page.getByText('Loading')).toBeVisible()
  })

  test('Error message is displayed when album fetch fails', async ({
    page,
  }) => {
    await page.route(ITUNES_TOP_ALBUMS_API_URL, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' }),
      })
    })

    await page.goto('/')
    await expect(page.getByText('error occurred')).toBeVisible()
  })
})
