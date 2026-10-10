import { describe, expect, it } from "vitest";
import { agregarItems, cambiarCantidad, totales } from "./store";

const a = { id: 1, slug: "a", nombre: "A", precio: 100000 };
const b = { id: 2, slug: "b", nombre: "B", precio: 250000 };

describe("carrito (S6-24)", () => {
  it("agrega un protocolo completo de una vez y suma repetidos", () => {
    let s = agregarItems({ items: [] }, [a, b]);
    s = agregarItems(s, [a]);
    expect(s.items.map((x) => [x.id, x.cantidad])).toEqual([
      [1, 2],
      [2, 1],
    ]);
    expect(totales(s)).toEqual({ unidades: 3, subtotal: 450000 });
  });

  it("cantidad cero quita el producto y hay un tope por línea", () => {
    let s = agregarItems({ items: [] }, [a], 50);
    expect(s.items[0]?.cantidad).toBe(20);
    s = cambiarCantidad(s, 1, 0);
    expect(s.items).toEqual([]);
  });
});
