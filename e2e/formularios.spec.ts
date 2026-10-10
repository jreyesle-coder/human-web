import { expect, type Page, test } from "@playwright/test";

/** Sustituye el widget de Turnstile por uno que entrega un token al instante (la llave de prueba del servidor lo acepta). */
async function turnstileDePrueba(page: Page) {
  await page.route("https://challenges.cloudflare.com/**", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: "window.turnstile={render:function(el,o){setTimeout(function(){o.callback('XXXX.DUMMY.TOKEN.XXXX')},10);return 'w'},remove:function(){}};",
    }),
  );
}

test.describe("clase de prueba (S4-19)", () => {
  test("rechaza envíos inválidos con mensajes en texto", async ({ page }) => {
    await turnstileDePrueba(page);
    await page.goto("/entrenar/clase-de-prueba");
    await page.getByRole("button", { name: "Solicitar clase de prueba" }).click();
    await expect(page.getByText("Escribe tu nombre.")).toBeVisible();
    await expect(page.getByText(/teléfono dominicano/)).toBeVisible();
    await expect(page.getByText(/consentimiento/).last()).toBeVisible();
    await expect(page.getByLabel("Nombre")).toBeFocused();
  });

  test("envía una solicitud válida y llega al agradecimiento", async ({ page }) => {
    await turnstileDePrueba(page);
    await page.goto("/entrenar/clase-de-prueba?utm_source=prueba");
    await page.getByLabel("Nombre").fill("Prueba Automatizada");
    await page.getByLabel("Teléfono").fill("809 555 1234");
    await page.getByLabel("Correo").fill("prueba@example.com");
    await page.getByLabel("Objetivo general").selectOption("fuerza");
    await page.getByLabel("Tarde").check();
    await page.getByLabel(/Acepto que HUMAN use estos datos/).check();
    const [respuesta] = await Promise.all([
      page.waitForResponse("**/api/leads/clase-de-prueba"),
      page.getByRole("button", { name: "Solicitar clase de prueba" }).click(),
    ]);
    expect(respuesta.status(), await respuesta.text()).toBe(200);
    // Ningún dato personal viaja en la URL.
    expect(respuesta.url()).not.toContain("prueba@example.com");
    await expect(page).toHaveURL(/\/entrenar\/clase-de-prueba\/gracias$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Recibimos tu solicitud");
  });

  test("el servidor rechaza datos inválidos aunque se salte el navegador", async ({ request }) => {
    const res = await request.post("/api/leads/clase-de-prueba", {
      data: { nombre: "A", telefono: "1", correo: "x", consentimiento: false },
    });
    expect(res.status()).toBe(400);
  });
});
