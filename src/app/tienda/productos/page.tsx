import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { Catalogo, type ProductoCatalogo } from "@/components/shop/Catalogo";
import { AvisoAlcance, CatalogoNoDisponible } from "@/components/shop/ShopNotices";
import { Pendiente } from "@/components/ui/Pendiente";
import { Skeleton } from "@/components/ui/Toast";
import { metaPagina } from "@/lib/seo";
import { formatoDe, listarProductos } from "@/lib/woo";

export const metadata: Metadata = metaPagina({
  title: "Productos",
  description: "Catálogo completo de Human Stores con filtros por objetivo y formato.",
  path: "/tienda/productos",
  seccion: "Tienda",
});

export default async function ProductosPage() {
  const r = await listarProductos();
  const productos: ProductoCatalogo[] = r.ok
    ? r.datos
        .filter((p) => p.tipo === "simple")
        .map((p) => {
          // La categoría "Todos" es un contenedor de WooCommerce, no un objetivo.
          const objetivo = p.categorias.find((c) => c.slug !== "todos") ?? p.categorias[0];
          return {
            id: p.id,
            slug: p.slug,
            nombre: p.nombre,
            precio: p.precio,
            imagen: p.imagenes[0],
            objetivo: { slug: objetivo?.slug ?? "otros", nombre: objetivo?.nombre ?? "Otros" },
            formato: formatoDe(p.nombre),
            agotado: !p.enExistencia,
          };
        })
    : [];

  return (
    <main>
      <PageHeader
        path="/tienda/productos"
        eyebrow="Human Stores"
        title="Productos"
        lead="Todo el catálogo, con precios y existencias de la tienda."
      >
        <AvisoAlcance className="mt-6" />
      </PageHeader>
      <Section tone="surface">
        {r.ok ? (
          <Suspense fallback={<Skeleton className="h-96" />}>
            <Catalogo productos={productos} />
          </Suspense>
        ) : (
          <CatalogoNoDisponible mensaje={r.error} />
        )}
        <Pendiente
          texto="filtro por sistema del cuerpo: falta la clasificación de cada producto en WooCommerce (cliente)"
          className="mt-10"
        />
      </Section>
    </main>
  );
}
