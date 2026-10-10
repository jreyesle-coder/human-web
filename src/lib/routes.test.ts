import { describe, expect, it } from "vitest";
import { migasPara, STATIC_ROUTES } from "./routes";

describe("migasPara (S2-05)", () => {
  it("arma la jerarquía con los nombres del mapa de rutas", () => {
    expect(migasPara("/entrenar/coaches")).toEqual([
      { label: "Inicio", href: "/" },
      { label: "Entrenar", href: "/entrenar" },
      { label: "Coaches", href: "/entrenar/coaches" },
    ]);
  });

  it("salta los tramos sin página y usa el título del contenido al final", () => {
    expect(migasPara("/sanar/motivos/fatiga", "Fatiga").map((m) => m.label)).toEqual([
      "Inicio",
      "Sanar",
      "Fatiga",
    ]);
  });
});

describe("sitemap estático", () => {
  it("excluye carrito y páginas de agradecimiento", () => {
    expect(STATIC_ROUTES).not.toContain("/tienda/carrito");
    expect(STATIC_ROUTES.some((r) => r.endsWith("/gracias"))).toBe(false);
  });
});
