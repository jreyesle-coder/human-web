import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "OMNI",
  description: "OMNI, la línea propia de suplementos de Human Stores.",
  path: "/tienda/omni",
  seccion: "Tienda",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/tienda/omni"
        eyebrow="Línea propia"
        title="OMNI"
        lead="La línea propia de Human Stores."
      />
      <Section>
        <Pendiente texto="historia y respaldo de la línea OMNI (cliente)" />
      </Section>
    </main>
  );
}
