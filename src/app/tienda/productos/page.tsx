import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Productos",
  description: "Catálogo completo de Human Stores con filtros por objetivo y formato.",
  path: "/tienda/productos",
  seccion: "Tienda",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/tienda/productos"
        eyebrow="Human Stores"
        title="Productos"
        lead="Todo el catálogo, con precios y existencias reales."
      />
      <Section>
        <Pendiente texto="catálogo con filtros (Sprint 6)" />
      </Section>
    </main>
  );
}
