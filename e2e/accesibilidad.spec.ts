import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

export const RUTAS_AXE = ["/ui"];

for (const ruta of RUTAS_AXE) {
  test(`axe no reporta violaciones en ${ruta}`, async ({ page }) => {
    await page.goto(ruta);
    const resultado = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const resumen = resultado.violations.map(
      (v) => `${v.id}: ${v.help} → ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
    );
    expect(resumen).toEqual([]);
  });
}

test("/ui se recorre por teclado sin trampas de foco", async ({ page }) => {
  await page.goto("/ui");
  const vistos = new Set<string>();
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press("Tab");
    const actual = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? `${el.tagName}#${el.id}.${el.textContent?.slice(0, 20)}` : "";
    });
    vistos.add(actual);
  }
  // Si el foco quedara atrapado, se repetirían unos pocos elementos.
  expect(vistos.size).toBeGreaterThan(40);
});
