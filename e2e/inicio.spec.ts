import { expect, test } from "@playwright/test";

test("la portada carga con un solo h1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("html")).toHaveAttribute("lang", "es-DO");
});

test("una ruta inexistente muestra el 404 de la marca", async ({ page }) => {
  const res = await page.goto("/no-existe");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Esta página no existe");
});

test("robots.txt y sitemap.xml responden", async ({ request }) => {
  expect((await request.get("/robots.txt")).ok()).toBe(true);
  expect((await request.get("/sitemap.xml")).ok()).toBe(true);
});
