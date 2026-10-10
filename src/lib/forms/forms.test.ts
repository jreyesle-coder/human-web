import { describe, expect, it } from "vitest";
import { limpiarPropiedades } from "@/lib/analytics";
import {
  boletinSchema,
  claseDePruebaSchema,
  evaluacionSchema,
  normalizarTelefono,
} from "./schemas";

const base = {
  nombre: "Ana Pérez",
  telefono: "+1 (809) 555-1234",
  correo: "ANA@correo.com ",
  consentimiento: true,
  token: "x",
};

describe("esquemas de formularios", () => {
  it("normaliza el teléfono dominicano", () => {
    expect(normalizarTelefono("1-829-555-0000")).toBe("8295550000");
    expect(normalizarTelefono("555-1234")).toBeNull();
  });

  it("acepta una clase de prueba válida y limpia los datos", () => {
    const r = claseDePruebaSchema.parse({ ...base, objetivo: "fuerza", disponibilidad: "tarde" });
    expect(r.telefono).toBe("8095551234");
    expect(r.correo).toBe("ana@correo.com");
  });

  it("exige consentimiento explícito", () => {
    const r = boletinSchema.safeParse({ correo: "a@b.co", consentimiento: false });
    expect(r.success).toBe(false);
  });

  it("la evaluación no admite campos clínicos de texto libre", () => {
    const r = evaluacionSchema.parse({
      ...base,
      motivo: "sueno",
      horario: "manana",
      sintomas: "texto que no debe pasar",
      medicacion: "x",
    });
    expect(r).not.toHaveProperty("sintomas");
    expect(r).not.toHaveProperty("medicacion");
  });

  it("rechaza un motivo fuera de la lista", () => {
    const r = evaluacionSchema.safeParse({ ...base, motivo: "diabetes", horario: "manana" });
    expect(r.success).toBe(false);
  });
});

describe("analítica sin datos sensibles (S5-20)", () => {
  it("descarta motivo, correo y cualquier propiedad fuera de la lista", () => {
    expect(
      limpiarPropiedades({
        formulario: "evaluacion",
        motivo: "sueno",
        correo: "a@b.co",
        origen: "/sanar",
      }),
    ).toEqual({ formulario: "evaluacion", origen: "/sanar" });
  });
});
