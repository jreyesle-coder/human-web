import { describe, expect, it } from "vitest";
import { whatsappLink } from "./whatsapp";

describe("whatsappLink (S0-22)", () => {
  it("limpia el número y agrega el origen al mensaje", () => {
    const url = whatsappLink(
      "consultorio",
      { origen: "/sanar", mensaje: "Hola" },
      "+1 (809) 555-1234",
    );
    expect(url).toBe(
      `https://wa.me/18095551234?text=${encodeURIComponent("Hola\n\n(ref: /sanar)")}`,
    );
  });

  it("devuelve null si el número no está configurado", () => {
    expect(whatsappLink("ventas", { origen: "/tienda" }, "")).toBeNull();
  });
});
