import { expect, test } from '@playwright/test'
import './utils/mock-api'

test.describe('Search Tests', () => {
  test('Search functionality filters albums by album name', async ({
    page,
  }) => {
    await page.getByLabel('search').fill('First')
    const albumList = page.locator('main')

    await expect(albumList).toContainText('First Album')
    await expect(albumList).not.toContainText('Second Album')
    await expect(albumList).not.toContainText('Third Album')
  })

  test('Search functionality filters albums by artist name', async ({
    page,
  }) => {
    await page.getByLabel('search').fill('Artist B')
    const albumList = page.locator('main')

    await expect(albumList).not.toContainText('First Album')
    await expect(albumList).toContainText('Second Album')
    await expect(albumList).not.toContainText('Third Album')
  })

  test('Search functionality filters albums (case insensitive)', async ({
    page,
  }) => {
    await page.getByLabel('search').fill('ARTIST B')
    const albumList = page.locator('main')

    await expect(albumList).not.toContainText('First Album')
    await expect(albumList).toContainText('Second Album')
    await expect(albumList).not.toContainText('Third Album')
  })

  test('Empty search displays all albums', async ({ page }) => {
    await page.getByLabel('search').fill('')
    const albums = page.locator('main >> li')

    await expect(albums).toHaveCount(3)
  })

  test('No albums found message is displayed when no albums match the query', async ({
    page,
  }) => {
    await page.getByLabel('search').fill('No albums found')
    await expect(page.getByText('No albums found')).toBeVisible()
  })
})
