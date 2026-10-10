import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { verificar } from "../../scripts/contraste.mjs";

const css = readFileSync(path.join(__dirname, "tokens.css"), "utf8");

describe("contraste de tokens (S1-06)", () => {
  it.each(verificar(css).map((r) => [`${r.texto} sobre ${r.fondo}`, r] as const))(
    "%s cumple su mínimo",
    (_, r) => {
      expect(r.falta).toBeUndefined();
      expect(r.ratio).toBeGreaterThanOrEqual(r.minimo);
    },
  );

  it("detecta un valor no conforme", () => {
    const malo = css.replace(/--color-amber: #[0-9a-f]{6}/i, "--color-amber: #b06b2c");
    expect(verificar(malo).some((r) => !r.ok)).toBe(true);
  });
});
