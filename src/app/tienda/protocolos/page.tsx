import type { Metadata } from "next";
import { ProtocolCard } from "@/components/blocks/Cards";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { AvisoAlcance } from "@/components/shop/ShopNotices";
import { listarProtocolos } from "@/lib/protocolos";
import { metaPagina } from "@/lib/seo";
import { precioDOP } from "@/lib/woo";

export const metadata: Metadata = metaPagina({
  title: "Protocolos",
  description:
    "Los protocolos de Human Stores: Estrés y Sueño Crónico, Inmunidad, Fat Loss, Hígado y Requerimiento Diario.",
  path: "/tienda/protocolos",
  seccion: "Tienda",
});

export default async function ProtocolosPage() {
  const protocolos = await listarProtocolos();
  return (
    <main>
      <PageHeader
        path="/tienda/protocolos"
        eyebrow="Human Stores"
        title="Protocolos"
        lead="Cada protocolo combina productos con un objetivo, una forma de tomarlos y una duración. Se compra completo, en un paso."
      >
        <AvisoAlcance className="mt-6" />
      </PageHeader>
      <Section tone="surface">
        <ul className="grid gap-4 md:grid-cols-2">
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
      </Section>
    </main>
  );
}
