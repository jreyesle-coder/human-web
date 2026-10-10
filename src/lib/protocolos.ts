import { getEntries, getEntry } from "@/lib/content";
import type { ItemAgregable } from "@/components/shop/AddToCart";
import { productosPorEtiqueta, type Producto } from "@/lib/woo";

export function itemDe(p: Producto): ItemAgregable {
  return { id: p.id, slug: p.slug, nombre: p.nombre, precio: p.precio, imagen: p.imagenes[0]?.src };
}

/** Narrativa del protocolo (MDX) + productos reales de WooCommerce por etiqueta (S6-08). */
export async function protocoloCompleto(slug: string) {
  const entry = await getEntry("protocolos", slug);
  if (!entry) return null;
  const productos = await productosPorEtiqueta(entry.frontmatter.wooTag);
  const lista = productos.ok ? productos.datos : [];
  const disponibles = lista.filter((p) => p.enExistencia && p.comprable);
  return {
    entry,
    catalogoOk: productos.ok,
    productos: lista,
    disponibles,
    total: disponibles.reduce((s, p) => s + p.precio, 0),
  };
}

export async function listarProtocolos() {
  const entries = (await getEntries("protocolos")).sort(
    (a, b) => a.frontmatter.orden - b.frontmatter.orden,
  );
  return Promise.all(entries.map((e) => protocoloCompleto(e.slug))).then((l) =>
    l.filter((p): p is NonNullable<typeof p> => p !== null),
  );
}

/** Protocolos a los que pertenece un producto (S6-17). */
export async function protocolosDe(producto: Producto) {
  const etiquetas = new Set(producto.etiquetas.map((t) => t.slug));
  return (await getEntries("protocolos")).filter((e) => etiquetas.has(e.frontmatter.wooTag));
}
