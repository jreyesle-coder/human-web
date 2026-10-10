import type { Metadata } from "next";
import Link from "next/link";
import { ProtocolCard } from "@/components/blocks/Cards";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { AvisoAlcance, CatalogoNoDisponible } from "@/components/shop/ShopNotices";
import { ButtonLink } from "@/components/ui/Button";
import { listarProtocolos } from "@/lib/protocolos";
import { metaPagina } from "@/lib/seo";
import { listarCategorias, precioDOP } from "@/lib/woo";

export const metadata: Metadata = metaPagina({
  title: "Tienda · Human Stores",
  description:
    "Human Stores: suplementación organizada por protocolo, con la línea propia OMNI. Envíos dentro de República Dominicana.",
  path: "/tienda",
  seccion: "Tienda",
});

/** S6-06: la primera decisión es el protocolo, no una cuadrícula de productos. */
export default async function TiendaPage() {
  const [protocolos, categorias] = await Promise.all([listarProtocolos(), listarCategorias()]);

  return (
    <main>
      <PageHeader
        path="/tienda"
        eyebrow="Human Stores"
        title="Sostener"
        lead="Suplementación organizada por protocolo, no por producto suelto. Cada protocolo combina productos con un objetivo, una forma de tomarlos y una duración."
      >
        <AvisoAlcance className="mt-6" />
      </PageHeader>

      <Section tone="surface" title="Empieza por tu objetivo">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {protocolos.map((p) => (
            <li key={p.entry.slug}>
              <ProtocolCard
                href={`/tienda/protocolos/${p.entry.slug}`}
                nombre={p.entry.frontmatter.title}
                objetivo={p.entry.frontmatter.objetivo}
                productos={p.productos.length}
                precioDesde={p.total > 0 ? `Completo: ${precioDOP(p.total)}` : undefined}
              />
            </li>
          ))}
        </ul>
        <ButtonLink href="/tienda/protocolos" variant="secondary" className="mt-8">
          Ver todos los protocolos
        </ButtonLink>
      </Section>

      <Section title="O busca un producto">
        {categorias.ok ? (
          <ul className="flex flex-wrap gap-2">
            {categorias.datos.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/tienda/productos?objetivo=${c.slug}`}
                  className="inline-flex min-h-tap items-center rounded-pill border-2 border-line-strong bg-surface px-4 font-semibold hover:border-ink"
                >
                  {c.nombre} <span className="ml-2 text-small text-stone">{c.cantidad}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <CatalogoNoDisponible mensaje={categorias.error} />
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/tienda/productos" variant="secondary">
            Todo el catálogo
          </ButtonLink>
          <ButtonLink href="/tienda/omni" variant="ghost">
            Línea OMNI
          </ButtonLink>
        </div>
      </Section>

      <Section tone="mist" title="¿No sabes qué protocolo te corresponde?">
        <p className="max-w-reading">
          El protocolo personal se define en una evaluación en el consultorio.
        </p>
        <ButtonLink href="/sanar/agendar" className="mt-6">
          Agendar evaluación
        </ButtonLink>
      </Section>
    </main>
  );
}
