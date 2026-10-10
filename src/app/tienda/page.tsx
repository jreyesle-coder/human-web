import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Tienda · Human Stores",
  description:
    "Human Stores: suplementación organizada por protocolo, con la línea propia OMNI. Envíos dentro de República Dominicana.",
  path: "/tienda",
  seccion: "Tienda",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/tienda"
        eyebrow="Human Stores"
        title="Sostener"
        lead="Suplementación organizada por protocolo, no por producto suelto."
      />
      <Section>
        <Pendiente texto="catálogo conectado a WooCommerce (Sprint 6)" />
      </Section>
    </main>
  );
}
