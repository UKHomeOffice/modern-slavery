import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

// baseURL defaults to the local app unless PLAYWRIGHT_BASE_URL is set
const port = Number(process.env.PLAYWRIGHT_PORT || process.env.PORT || 8080);
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${port}`;

const testDir = defineBddConfig({
  features: 'e2e-tests/features/**/*.feature',
  steps: [
    'e2e-tests/steps/**/*.step.ts',
    'e2e-tests/fixture/fixtures.ts',
  ],
  outputDir: '.features-gen',
});

export default defineConfig({
  testDir,
  testMatch: '**/*.spec.js',
  timeout: 60000,
  expect: {
    timeout: 6000,
  },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL,
    viewport: null,
    screenshot: 'on',
    video: 'on',
    trace: 'on-first-retry',
    headless: !!process.env.CI,
  },

  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
      command: 'yarn start:dev',
      port,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000
    },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
});
