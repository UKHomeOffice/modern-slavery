import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const port = Number(process.env.PLAYWRIGHT_PORT || 8081);
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${port}`;

const testDir = defineBddConfig({
  features: 'e2e-tests/features/**/*.feature',
  steps: [
    'e2e-tests/steps/**/*.step.ts',
    'e2e-tests/fixture/fixtures.ts'
  ],
  outputDir: '.features-gen'
});

export default defineConfig({
  testDir,
  timeout: 120_000,
  expect: {
    timeout: 15_000,
  },
  fullyParallel: false,
  workers: process.env.CI ? 2 : 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL,
    viewport: { width: 1920, height: 1080 },
    screenshot: 'on',
    video: 'on',
    trace: 'on-first-retry',
    headless: true,
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
      command: `NODE_ENV=local ALLOW_SKIP=true SKIP_EMAIL=sas-hof-test@digital.homeoffice.gov.uk NOTIFY_STUB=true REDIS_HOST=127.0.0.1 REDIS_PORT=6379 SESSION_SECRET=12345678901234567890123456789012 PORT=${port} yarn start`,
      port,
      reuseExistingServer: false,
      timeout: 180_000,
    },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
      },
    },
  ],
});
