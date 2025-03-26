import { expect, test } from '@playwright/test'
import './utils/mock-api'

test.describe('Filters Tests', () => {
  test('No category selected displays all albums', async ({ page }) => {
    await expect(page.getByText('First Album')).toBeVisible()
    await expect(page.getByText('Second Album')).toBeVisible()
    await expect(page.getByText('Third Album')).toBeVisible()
  })

  test('Filtering by category "Rock" displays only albums in that category', async ({
    page,
  }) => {
    await page.locator('aside').getByText('Rock').click()

    await expect(page.getByText('First Album')).toBeVisible()
    await expect(page.getByText('Second Album')).not.toBeVisible()
    await expect(page.getByText('Third Album')).not.toBeVisible()
  })

  test('Filtering by category "Pop" displays only albums in that category', async ({
    page,
  }) => {
    await page.locator('aside').getByText('Pop').click()

    await expect(page.getByText('Second Album')).toBeVisible()
    await expect(page.getByText('First Album')).not.toBeVisible()
    await expect(page.getByText('Third Album')).not.toBeVisible()
  })

  test('Filtering by multiple categories ("Rock" and "Pop") displays albums from both categories', async ({
    page,
  }) => {
    await page.locator('aside').getByText('Rock').click()
    await page.locator('aside').getByText('Pop').click()

    await expect(page.getByText('First Album')).toBeVisible()
    await expect(page.getByText('Second Album')).toBeVisible()
    await expect(page.getByText('Third Album')).not.toBeVisible()
  })
})

test.describe('Category Tests', () => {
  test('Category labels display correct counts with no filters', async ({
    page,
  }) => {
    await expect(page.getByText('Rock (1)')).toBeVisible()
    await expect(page.getByText('Pop (1)')).toBeVisible()
    await expect(page.getByText('Jazz (1)')).toBeVisible()
  })

  test('Category labels update counts when filtered by search', async ({
    page,
  }) => {
    await page.getByLabel('search').fill('First')

    await expect(page.getByText('Rock (1)')).toBeVisible()
    await expect(page.getByText('Pop (0)')).toBeVisible()
    await expect(page.getByText('Jazz (0)')).toBeVisible()
  })

  test('All categories are rendered correctly based on album data', async ({
    page,
  }) => {
    const categoryItems = page
      .locator('fieldset')
      .filter({ hasText: 'Categories' })
      .locator('li')

    await expect(categoryItems).toHaveCount(3)
    await expect(categoryItems.nth(0)).toContainText('Rock (1)')
    await expect(categoryItems.nth(1)).toContainText('Pop (1)')
    await expect(categoryItems.nth(2)).toContainText('Jazz (1)')
  })
})
