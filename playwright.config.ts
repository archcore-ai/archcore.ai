import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 3,
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:4322",
    locale: "en-US",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "node scripts/preview-test.mjs",
    url: "http://127.0.0.1:4322",
    reuseExistingServer: !process.env.CI,
  },
});
