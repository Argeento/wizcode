import { expect, test } from '@playwright/test'
import './utils/mock-api'

test.describe('Search Tests', () => {
  test('Search functionality filters albums by album name', async ({
    page,
  }) => {
    await page.getByLabel('search').fill('First')
    await expect(page.getByText('First Album')).toBeVisible()
    await expect(page.getByText('Second Album')).not.toBeVisible()
    await expect(page.getByText('Third Album')).not.toBeVisible()
  })

  test('Search functionality filters albums by artist name', async ({
    page,
  }) => {
    await page.getByLabel('search').fill('Artist B')
    await expect(page.getByText('First Album')).not.toBeVisible()
    await expect(page.getByText('Second Album')).toBeVisible()
    await expect(page.getByText('Third Album')).not.toBeVisible()
  })

  test('Search functionality filters albums (case insensitive)', async ({
    page,
  }) => {
    await page.getByLabel('search').fill('ARTIST B')
    await expect(page.getByText('First Album')).not.toBeVisible()
    await expect(page.getByText('Second Album')).toBeVisible()
    await expect(page.getByText('Third Album')).not.toBeVisible()
  })

  test('Empty search displays all albums', async ({ page }) => {
    await page.getByLabel('search').fill('')
    await expect(page.getByText('First Album')).toBeVisible()
    await expect(page.getByText('Second Album')).toBeVisible()
    await expect(page.getByText('Third Album')).toBeVisible()
  })

  test.skip('No albums found message is displayed when no albums match the query', async ({
    page,
  }) => {
    await page.getByLabel('search').fill('No albums found')
    await expect(page.getByText('No albums found')).toBeVisible()
  })
})
