import { expect, test } from "@playwright/test";

test("la portada ofrece las tres rutas como decisión principal", async ({ page }) => {
  await page.goto("/");
  for (const ruta of ["Entrenar", "Sanar", "Sostener"]) {
    await expect(page.getByRole("heading", { level: 2, name: ruta })).toBeVisible();
  }
  // En móvil, las rutas aparecen al primer desplazamiento: el inicio de la primera tarjeta cabe en dos pantallas.
  const tarjeta = page.getByRole("link", { name: /Entrar a entrenar/ });
  const caja = await tarjeta.boundingBox();
  const alto = page.viewportSize()!.height;
  expect(caja!.y).toBeLessThan(alto * 2);
});

test("los pasos del método se recorren en orden y el último lleva a la evaluación", async ({
  page,
}) => {
  await page.goto("/metodo/eliminar");
  await expect(page.locator('[aria-current="step"]')).toContainText("Eliminar");
  await page.getByRole("link", { name: "Ir a Reparar" }).click();
  await expect(page).toHaveURL(/\/metodo\/reparar$/);
  await page.getByRole("link", { name: "Ir a Liberar" }).click();
  await expect(page).toHaveURL(/\/metodo\/liberar$/);
  await expect(page.getByRole("link", { name: "Agendar evaluación" }).last()).toBeVisible();
});

test("una historia sin autorización no se publica (S3-20)", async ({ page, request }) => {
  const res = await request.get("/historias/historia-sin-autorizacion");
  expect(res.status()).toBe(404);
  await page.goto("/historias");
  await expect(page.getByText("Paciente de ejemplo")).toHaveCount(0);
});

test("la página de Juan Carlos Simó publica datos estructurados Person", async ({ page }) => {
  await page.goto("/juan-carlos-simo");
  const datos = await page.$$eval('script[type="application/ld+json"]', (s) =>
    s.map((x) => JSON.parse(x.textContent ?? "{}")),
  );
  expect(datos.some((d) => d["@type"] === "Person")).toBe(true);
});
