import { expect, test } from "@playwright/test";

test("un protocolo completo se agrega al carrito en un paso (S6-10)", async ({ page }) => {
  await page.goto("/tienda/protocolos/fat-loss");
  const boton = page.getByRole("button", { name: /Agregar protocolo completo/ }).first();
  await expect(boton).toBeEnabled();
  await boton.click();
  const panel = page.getByRole("dialog");
  await expect(panel).toBeVisible();
  const lineas = await panel.getByRole("group", { name: /Cantidad de/ }).count();
  expect(lineas).toBeGreaterThan(1);
  await panel.getByRole("link", { name: "Ver carrito y envío" }).click();
  await expect(page).toHaveURL(/\/tienda\/carrito$/);
  // S6-26: el envío se ve antes de ir a pagar.
  await expect(page.getByText("Envío estimado")).toBeVisible();
  await page.getByLabel("Interior del país").check();
  await expect(page.getByText(/RD\$ 400\.00|RD\$ 500\.00/)).toBeVisible();
});

test("la ficha de producto publica Product con precio y disponibilidad (S6-27)", async ({
  page,
}) => {
  await page.goto("/tienda/productos/nac-180caps");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("NAC");
  await expect(page.getByText(/En existencia|Agotado/).first()).toBeVisible();
  const datos = await page.$$eval('script[type="application/ld+json"]', (s) =>
    s.map((x) => JSON.parse(x.textContent ?? "{}")),
  );
  const producto = datos.find((d) => d["@type"] === "Product");
  expect(producto?.offers?.priceCurrency).toBe("DOP");
  expect(Number(producto?.offers?.price)).toBeGreaterThan(0);
});

test("el catálogo filtra por objetivo y busca sin tildes (S6-13, S6-14)", async ({ page }) => {
  await page.goto("/tienda/productos");
  const total = Number((await page.getByText(/^\d+ productos?$/).textContent())!.split(" ")[0]);
  await page.getByRole("button", { name: "Detox" }).click();
  await expect(page).toHaveURL(/objetivo=detox/);
  const filtrados = Number((await page.getByText(/^\d+ productos?$/).textContent())!.split(" ")[0]);
  expect(filtrados).toBeLessThan(total);
  await page.goto("/tienda/productos?q=omega");
  await expect(page.getByText(/^\d+ productos?$/)).not.toHaveText("0 productos");
});

test("un producto inexistente responde 404", async ({ request }) => {
  expect((await request.get("/tienda/productos/no-existe")).status()).toBe(404);
});
