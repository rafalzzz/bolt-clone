import { defineConfig } from '@playwright/test';

export const baseURL = `http://localhost:4000`;

export default defineConfig({
  testDir: '../tests',
  outputDir: '../reports',
  fullyParallel: true,
  /* workers: !process.env['CI'] ? 3 : undefined, */
  workers: 6,
  webServer: {
    command: 'npm run dev -- -p 4000',
    url: 'http://localhost:4000',
    reuseExistingServer: true,
    timeout: 180 * 1000,
  },
  use: {
    baseURL: baseURL,
    viewport: { width: 1920, height: 1080 },
    testIdAttribute: 'data-testid',
    launchOptions: {
      args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
    },
  },
  reporter: [['html', { outputFolder: '../reports/' }]],
});
