import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  // Maximum time one test can run for
  timeout: 30 * 1000,
  // Run tests in files in parallel
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  //Retry on CI only
  retries: process.env.CI ? 2 : 0,
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  globalSetup: require.resolve("./utils/global-setup"),
  use: {
    trace: "on-first-retry",
    headless: false,
    // Base URL to use in actions like 'await page.goto('/)'
    baseURL: "https://practice.sdetunicorns.com/",

    storageState: "loggedInState.json",
  },
  expect: {
    // Maximum time expect() should wait for the condition to be match
    //Ex: in await expect(locator).toHaveText();
    timeout: 5000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], headless: false },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], headless: false },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], headless: false },
    },
    /*

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
