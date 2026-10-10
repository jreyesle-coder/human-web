import { cacheLife, cacheTag } from "next/cache";
import { type CategoriaApi, mapearCategoria, mapearProducto, type ProductoApi } from "./map";
import type { Categoria, Producto, Resultado } from "./types";

/** La Store API es pública y de solo lectura: no hay credenciales (D-003). */
const BASE = (
  process.env.WOO_STORE_API_URL || "https://humanstores.com/wp-json/wc/store/v1"
).replace(/\/+$/, "");

async function pedir<T>(ruta: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${ruta}`, {
    ...init,
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Store API ${res.status} en ${ruta}`);
  return (await res.json()) as T;
}

/**
 * Catálogo completo. Se cachea 10 minutos (S6-03); las existencias de la ficha se consultan aparte.
 * El error se captura dentro de la caché: un fallo se recuerda solo 2 minutos y no rompe el build
 * (una vida más corta haría la página dinámica y exigiría Suspense).
 */
async function catalogo(): Promise<Producto[] | null> {
  "use cache";
  cacheTag("catalogo");
  try {
    const productos: Producto[] = [];
    for (let pagina = 1; pagina <= 10; pagina++) {
      const lote = await pedir<ProductoApi[]>(`/products?per_page=100&page=${pagina}`);
      productos.push(...lote.map(mapearProducto));
      if (lote.length < 100) break;
    }
    cacheLife({ stale: 300, revalidate: 600, expire: 3600 });
    return productos;
  } catch (e) {
    console.error("[woo] catálogo:", e instanceof Error ? e.message : e);
    cacheLife({ stale: 60, revalidate: 120, expire: 900 });
    return null;
  }
}

async function categoriasApi(): Promise<Categoria[] | null> {
  "use cache";
  cacheTag("catalogo");
  try {
    const lista = await pedir<CategoriaApi[]>("/products/categories?per_page=100");
    cacheLife({ stale: 300, revalidate: 600, expire: 3600 });
    return lista.map(mapearCategoria);
  } catch (e) {
    console.error("[woo] categorías:", e instanceof Error ? e.message : e);
    cacheLife({ stale: 60, revalidate: 120, expire: 900 });
    return null;
  }
}

const NO_DISPONIBLE = "No pudimos cargar el catálogo en este momento.";

async function catalogoSeguro(): Promise<Producto[]> {
  const c = await catalogo();
  if (!c) throw new Error(NO_DISPONIBLE);
  return c;
}

/** Envuelve una lectura: si el API falla, la página se degrada en lugar de quedar en blanco (S6-04). */
async function seguro<T>(fn: () => Promise<T>): Promise<Resultado<T>> {
  try {
    return { ok: true, datos: await fn() };
  } catch {
    return { ok: false, error: NO_DISPONIBLE };
  }
}

export function listarProductos() {
  return seguro(catalogoSeguro);
}

export function listarCategorias() {
  return seguro(async () => {
    const lista = await categoriasApi();
    if (!lista) throw new Error(NO_DISPONIBLE);
    return lista.filter((c) => c.cantidad > 0 && c.slug !== "todos");
  });
}

export function productoPorSlug(slug: string) {
  return seguro(async () => (await catalogoSeguro()).find((p) => p.slug === slug) ?? null);
}

/** Productos de un protocolo: los que llevan su etiqueta en WooCommerce (S6-05), solo simples. */
export function productosPorEtiqueta(etiqueta: string) {
  return seguro(async () =>
    (await catalogoSeguro()).filter(
      (p) => p.tipo === "simple" && p.etiquetas.some((t) => t.slug === etiqueta),
    ),
  );
}

/** Existencia al momento (S6-03): sin caché, se resuelve dentro de un <Suspense>. */
export async function existenciaAhora(id: number): Promise<boolean | null> {
  try {
    const p = await pedir<ProductoApi>(`/products/${id}`, { cache: "no-store" });
    return p.is_in_stock;
  } catch {
    return null;
  }
}

/** Slugs para generateStaticParams. Con el API caído se genera al menos uno para que el build no falle. */
export async function slugsDeProductos(): Promise<{ slug: string }[]> {
  const r = await listarProductos();
  const slugs = r.ok
    ? r.datos.filter((p) => p.tipo === "simple").map((p) => ({ slug: p.slug }))
    : [];
  return slugs.length ? slugs : [{ slug: "sin-catalogo" }];
}

export { formatoDe, precioDOP } from "./map";
export type { Categoria, Producto } from "./types";
