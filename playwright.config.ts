import { defineConfig, devices } from "@playwright/test";

const port = 3100;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "on-first-retry",
  },
  // Móvil primero: el proyecto principal es un teléfono.
  projects: [
    { name: "movil", use: { ...devices["Pixel 7"] } },
    { name: "escritorio", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    // Compila contra una Store API simulada con una copia fija del catálogo (e2e/servidor.mjs).
    command: "node e2e/servidor.mjs",
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
