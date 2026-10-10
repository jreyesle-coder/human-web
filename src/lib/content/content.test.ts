import path from "node:path";
import { describe, expect, it } from "vitest";
import { getEntries } from "./index";

const root = path.join(__dirname, "__fixtures__");
const slugs = (entries: { slug: string }[]) => entries.map((e) => e.slug);

describe("regla de status (S0-16)", () => {
  it("en producción solo devuelve published", async () => {
    expect(
      slugs(await getEntries("metodo", { root, production: true })),
    ).toEqual(["a-publicado"]);
  });

  it("fuera de producción también devuelve borradores", async () => {
    expect(
      slugs(await getEntries("metodo", { root, production: false })),
    ).toEqual(["a-publicado", "b-borrador"]);
  });
});

describe("salvaguarda de historias (S0-17)", () => {
  it.each([true, false])(
    "sin autorizacion: true no se renderiza (producción=%s)",
    async (production) => {
      expect(
        slugs(await getEntries("historias", { root, production })),
      ).toEqual(["autorizada"]);
    },
  );
});

describe("validación de frontmatter (S0-15)", () => {
  it("rompe con la ruta del archivo si falta un campo", async () => {
    const invalido = path.join(__dirname, "__fixtures_invalido__");
    await expect(getEntries("metodo", { root: invalido })).rejects.toThrow(
      "content/metodo/roto.mdx",
    );
  });

  it("una colección sin archivos devuelve vacío", async () => {
    expect(await getEntries("coaches", { root })).toEqual([]);
  });
});
