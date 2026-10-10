import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Protocolos",
  description:
    "Los protocolos de Human Stores: Estrés y Sueño Crónico, Inmunidad, Fat Loss, Hígado y Requerimiento Diario.",
  path: "/tienda/protocolos",
  seccion: "Tienda",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/tienda/protocolos"
        eyebrow="Human Stores"
        title="Protocolos"
        lead="Cada protocolo combina productos con un objetivo, una forma de tomarlos y una duración."
      />
      <Section>
        <Pendiente texto="índice de protocolos (Sprint 6)" />
      </Section>
    </main>
  );
}
