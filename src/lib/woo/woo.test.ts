import { describe, expect, it } from "vitest";
import {
  formatoDe,
  mapearProducto,
  nombreLegible,
  precioDOP,
  textoPlano,
  type ProductoApi,
} from "./map";

const api: ProductoApi = {
  id: 10753,
  name: "NAC 180CAPS",
  slug: "nac-180caps",
  type: "simple",
  sku: "000298",
  permalink: "https://humanstores.com/producto/nac-180caps/",
  short_description: "<p>Antioxidante&nbsp;&amp; apoyo.</p>",
  description: "",
  on_sale: false,
  is_purchasable: true,
  is_in_stock: true,
  average_rating: "0",
  review_count: 0,
  prices: { price: "210000", regular_price: "210000", currency_minor_unit: 2 },
  images: [{ src: "https://i0.wp.com/x.jpg", alt: "", name: "NAC" }],
  categories: [{ id: 338, slug: "detox", name: "Detox" }],
  tags: [{ id: 87, slug: "stress-y-sueno-cronico", name: "stress y sueño crónico" }],
};

describe("mapeo de la Store API (S6-01)", () => {
  it("convierte a tipos propios con precio en centavos y texto plano", () => {
    const p = mapearProducto(api);
    expect(p.precio).toBe(210000);
    expect(p.resumen).toBe("Antioxidante & apoyo.");
    expect(p.etiquetas[0]?.slug).toBe("stress-y-sueno-cronico");
    expect(p.imagenes[0]?.alt).toBe("NAC");
  });

  it("un producto agrupado no se agrega al carrito directamente", () => {
    expect(mapearProducto({ ...api, type: "grouped" }).comprable).toBe(false);
  });

  it("formatea precios en pesos dominicanos", () => {
    expect(precioDOP(210000)).toBe("RD$ 2,100.00");
  });

  it("vuelve legibles los nombres en mayúsculas sin tocar medidas ni siglas", () => {
    expect(nombreLegible("GRASS FED WHEY VAINILLA 900G")).toBe("Grass Fed Whey Vainilla 900G");
    expect(nombreLegible("OMNI MAG 120CAPS")).toBe("OMNI Mag 120CAPS");
    expect(nombreLegible("Libido XY")).toBe("Libido XY");
    expect(textoPlano("A&#8217;s")).toBe("A’s");
  });

  it("deduce el formato del envase", () => {
    expect(formatoDe("BIOMEGA-1000 90SOFTGELS")).toBe("Cápsulas blandas");
    expect(formatoDe("NAC 180CAPS")).toBe("Cápsulas");
    expect(formatoDe("HYDRO-ZYME 90T")).toBe("Tabletas");
    expect(formatoDe("GLUTAMED 500G")).toBe("Polvo");
    expect(formatoDe("OMNI C LIPOSOMAL 120ML")).toBe("Líquido");
  });
});
