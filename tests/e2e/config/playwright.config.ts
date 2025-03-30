import * as path from 'path';

import { defineConfig } from '@playwright/test';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

const envPath = path.resolve(__dirname, '../../../.env.testing');
const env = config({ path: envPath });
expand(env);

const port = process.env.PORT;
const baseURL = process.env.API_URL;

export { baseURL };

export default defineConfig({
  testDir: '../tests',
  outputDir: '../reports',
  fullyParallel: true,
  workers: !process.env['CI'] ? 6 : undefined,
  webServer: {
    command: `cross-env NEXT_PUBLIC_ENVIRONMENT=testing npm run dev -- -p ${port}`,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 180 * 1000,
  },
  use: {
    baseURL,
    viewport: { width: 1920, height: 1080 },
    testIdAttribute: 'data-testid',
    launchOptions: {
      args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
    },
  },
  reporter: [['html', { outputFolder: '../reports/' }]],
});
