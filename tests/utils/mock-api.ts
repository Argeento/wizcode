import { test } from '@playwright/test'
import iTunesTopAlbumsMock from '../mocks/iTunesTopAlbums.mock.json' assert { type: 'json' }
import { ITUNES_TOP_ALBUMS_API_URL } from './constants'

test.beforeEach(async ({ page }) => {
  await page.route(ITUNES_TOP_ALBUMS_API_URL, async (route) => {
    await route.fulfill({ json: iTunesTopAlbumsMock })
  })
  await page.goto('/')
})
