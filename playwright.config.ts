import type { PlaywrightTestConfig } from '@playwright/test'

const siteUrl = 'http://localhost:1234/'

export default <PlaywrightTestConfig>{
  timeout: 50000,
  use: {
    baseURL: siteUrl,
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
  },
}
