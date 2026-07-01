const dotenv = require('dotenv');
const { defineConfig, devices } = require('@playwright/test');
const { defineBddConfig } = require('playwright-bdd');

dotenv.config({ quiet: true });

const generatedTestDirectory = defineBddConfig({
  features: ['e2e-tests/features/**/*.feature'],
  steps: ['e2e-tests/steps/**/*.js', 'e2e-tests/fixtures/test-fixtures.js'],
  outputDir: '.features-gen'
});

module.exports = defineConfig({
  testDir: generatedTestDirectory,
  testMatch: '**/*.spec.js',
  timeout: 120000,
  expect: {
    timeout: 15000
  },
  workers: 1,
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:8080',
    headless: process.env.PLAYWRIGHT_HEADLESS !== 'false',
    screenshot: 'on',
    video: 'on',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});
