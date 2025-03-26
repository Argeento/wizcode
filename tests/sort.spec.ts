import { expect, test } from '@playwright/test'
import './utils/mock-api'

test.describe('Sort Tests', () => {
  test('Default sort displays albums in default order', async ({ page }) => {
    const albumList = page.locator('main >> li')
    await expect(albumList.nth(0)).toContainText('First Album')
    await expect(albumList.nth(1)).toContainText('Second Album')
    await expect(albumList.nth(2)).toContainText('Third Album')
  })

  test('Sort by Name displays albums in alphabetical order', async ({
    page,
  }) => {
    await page.locator('aside').getByText('Name').click()
    const albumList = page.locator('main >> li')
    await expect(albumList.nth(0)).toContainText('First Album')
    await expect(albumList.nth(1)).toContainText('Second Album')
    await expect(albumList.nth(2)).toContainText('Third Album')
  })

  test('Sort by Artist displays albums in order of artist name', async ({
    page,
  }) => {
    await page.locator('aside').getByText('Artist').click()
    const albumList = page.locator('main >> li')
    await expect(albumList.nth(0)).toContainText('First Album')
    await expect(albumList.nth(1)).toContainText('Second Album')
    await expect(albumList.nth(2)).toContainText('Third Album')
  })

  test('Sort by Release date displays albums in ascending order by release date', async ({
    page,
  }) => {
    await page.locator('aside').getByText('Release date').click()
    const albumList = page.locator('main >> li')
    // Expected order by release date:
    // "Third Album" (2021-11-20), "Second Album" (2022-05-15), "First Album" (2023-01-01)
    await expect(albumList.nth(0)).toContainText('Third Album')
    await expect(albumList.nth(1)).toContainText('Second Album')
    await expect(albumList.nth(2)).toContainText('First Album')
  })
})
