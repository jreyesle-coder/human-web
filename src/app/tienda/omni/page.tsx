import type { Metadata } from "next";
import { ProductCard } from "@/components/blocks/Cards";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { AvisoAlcance, CatalogoNoDisponible } from "@/components/shop/ShopNotices";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";
import { listarProductos, precioDOP } from "@/lib/woo";

export const metadata: Metadata = metaPagina({
  title: "OMNI",
  description: "OMNI, la línea propia de suplementos de Human Stores.",
  path: "/tienda/omni",
  seccion: "Tienda",
});

/** S6-19: página de marca de la línea propia. Se identifica por la marca OMNI o por el nombre. */
export default async function OmniPage() {
  const r = await listarProductos();
  const omni = r.ok
    ? r.datos.filter(
        (p) =>
          p.tipo === "simple" &&
          (p.marcas.some((m) => m.slug === "omni") || /^OMNI\b/i.test(p.nombre)),
      )
    : [];

  return (
    <main>
      <PageHeader
        path="/tienda/omni"
        eyebrow="Línea propia"
        title="OMNI"
        tone="ink"
        lead="La línea propia de Human Stores."
      >
        <AvisoAlcance className="mt-6 text-ink" />
      </PageHeader>
      <Section tone="surface" title="La historia de OMNI">
        <Pendiente texto="historia, criterio de formulación y respaldo de la línea OMNI (cliente)" />
      </Section>
      <Section title="Productos OMNI">
        {!r.ok ? (
          <CatalogoNoDisponible mensaje={r.error} />
        ) : (
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {omni.map((p) => (
              <li key={p.id}>
                <ProductCard
                  href={`/tienda/productos/${p.slug}`}
                  nombre={p.nombre}
                  precio={precioDOP(p.precio)}
                  imagen={p.imagenes[0]}
                  categoria={p.categorias.find((c) => c.slug !== "todos")?.nombre}
                  agotado={!p.enExistencia}
                />
              </li>
            ))}
          </ul>
        )}
        <Pendiente
          texto="asignar la marca OMNI en WooCommerce a todos sus productos: hoy solo uno la tiene (cliente)"
          className="mt-8"
        />
      </Section>
    </main>
  );
}
