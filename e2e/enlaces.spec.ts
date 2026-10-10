import { expect, test } from "@playwright/test";

const MIN_PAGINAS = 15;

// Rastreador: recorre todo enlace interno alcanzable desde la portada y verifica que ninguno esté roto.
test("no hay enlaces internos rotos", async ({ page, request }) => {
  test.setTimeout(180_000);
  const vistos = new Set<string>(["/"]);
  const cola = ["/"];
  const rotos: string[] = [];

  while (cola.length) {
    const ruta = cola.shift()!;
    const res = await page.goto(ruta);
    if (!res || res.status() >= 400) {
      rotos.push(`${ruta} → ${res?.status()}`);
      continue;
    }
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href") ?? ""));
    for (const href of hrefs) {
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const limpio = href.split("#")[0]!.split("?")[0]!;
      if (limpio && !vistos.has(limpio)) {
        vistos.add(limpio);
        cola.push(limpio);
      }
    }
  }

  // El sitemap solo debe listar rutas que existen.
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const ruta = new URL(url!).pathname;
    const res = await request.get(ruta);
    if (res.status() >= 400) rotos.push(`sitemap ${ruta} → ${res.status()}`);
  }

  expect(rotos).toEqual([]);
  // Sube a medida que los índices enlazan a sus páginas hijas.
  expect(vistos.size).toBeGreaterThanOrEqual(MIN_PAGINAS);
});
