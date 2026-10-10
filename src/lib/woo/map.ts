import type { Categoria, Producto, Termino } from "./types";

/** Forma mínima de la respuesta de la Store API que usamos. */
export type ProductoApi = {
  id: number;
  name: string;
  slug: string;
  type: string;
  sku: string;
  permalink: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  is_purchasable: boolean;
  is_in_stock: boolean;
  average_rating: string;
  review_count: number;
  prices: { price: string; regular_price: string; currency_minor_unit: number };
  images: { src: string; alt: string; name: string }[];
  categories: { id: number; slug: string; name: string }[];
  tags: { id: number; slug: string; name: string }[];
  brands?: { id: number; slug: string; name: string }[];
  grouped_products?: number[];
};

export type CategoriaApi = {
  id: number;
  slug: string;
  name: string;
  count: number;
  parent: number;
};

const ENTIDADES: Record<string, string> = {
  "&amp;": "&",
  "&nbsp;": " ",
  "&quot;": '"',
  "&#039;": "'",
  "&#8217;": "’",
  "&#8220;": "“",
  "&#8221;": "”",
  "&#8211;": "–",
  "&#8212;": "—",
  "&lt;": "<",
  "&gt;": ">",
};

/** HTML de WordPress a texto plano: sin etiquetas ni entidades. */
export function textoPlano(html: string): string {
  return html
    .replace(/<\/(p|li|h\d)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&[a-z#0-9]+;/gi, (e) => ENTIDADES[e] ?? " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*/g, "\n")
    .trim();
}

/** Nombres de la tienda actual en mayúsculas a forma legible, sin tocar medidas como 500G o 120ML. */
export function nombreLegible(nombre: string): string {
  const limpio = textoPlano(nombre);
  if (limpio !== limpio.toUpperCase()) return limpio;
  return limpio
    .split(" ")
    .map((p) => {
      if (/\d/.test(p) || /^(OMNI|EAA|DHA|MCT|NAC|TMG|GI|ADP|DHEA|HCL|HP|XY|XX|DK)$/.test(p))
        return p;
      if (/^(Y|DE|LA|EL|THE)$/.test(p)) return p.toLowerCase();
      return p.charAt(0) + p.slice(1).toLowerCase();
    })
    .join(" ")
    .replace(/^the /, "The ");
}

const termino = (t: { id: number; slug: string; name: string }): Termino => ({
  id: t.id,
  slug: t.slug,
  nombre: textoPlano(t.name),
});

export function mapearProducto(p: ProductoApi): Producto {
  const factor = 10 ** (p.prices.currency_minor_unit - 2);
  return {
    id: p.id,
    slug: p.slug,
    nombre: nombreLegible(p.name),
    tipo: (["simple", "grouped", "variable", "external"].includes(p.type)
      ? p.type
      : "simple") as Producto["tipo"],
    sku: p.sku,
    precio: Math.round(Number(p.prices.price) / factor),
    precioRegular: Math.round(Number(p.prices.regular_price) / factor),
    enOferta: p.on_sale,
    comprable: p.is_purchasable && p.type === "simple",
    enExistencia: p.is_in_stock,
    imagenes: p.images.map((i) => ({ src: i.src, alt: textoPlano(i.alt || i.name || p.name) })),
    categorias: p.categories.map(termino),
    etiquetas: p.tags.map(termino),
    marcas: (p.brands ?? []).map(termino),
    resumen: textoPlano(p.short_description),
    descripcion: textoPlano(p.description),
    agrupados: p.grouped_products ?? [],
    resenas: { promedio: Number(p.average_rating) || 0, cantidad: p.review_count },
    urlTiendaActual: p.permalink,
  };
}

export function mapearCategoria(c: CategoriaApi): Categoria {
  return { id: c.id, slug: c.slug, nombre: textoPlano(c.name), cantidad: c.count, padre: c.parent };
}

const formato = new Intl.NumberFormat("es-DO", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Centavos a "RD$ 2,300.00". */
export function precioDOP(centavos: number): string {
  return `RD$ ${formato.format(centavos / 100)}`;
}

/** Formato del envase deducido del nombre (cápsulas, polvo, líquido…). Sin dato en Woo, es la mejor aproximación. */
export function formatoDe(nombre: string): string {
  const n = nombre.toUpperCase();
  if (/SOFTGEL/.test(n)) return "Cápsulas blandas";
  if (/CAPS|\d+C\b/.test(n)) return "Cápsulas";
  if (/\d+T\b|TABLET/.test(n)) return "Tabletas";
  if (/POWDER|\d+G\b|\bOZ\b|\d+OZ|LB\b|WHEY|PROTEIN|EAA/.test(n)) return "Polvo";
  if (/ML\b|LIQUIDO|MULSION|ONZ/.test(n)) return "Líquido";
  if (/LIBRO/.test(n)) return "Libro";
  return "Otro";
}
