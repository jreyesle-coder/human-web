import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Carrito",
  description: "Tu carrito de Human Stores.",
  path: "/tienda/carrito",
  seccion: "Tienda",
  noindex: true,
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/tienda/carrito"
        eyebrow="Human Stores"
        title="Tu carrito"
        lead="Revisa tu pedido antes de pagar."
      />
      <Section>
        <Pendiente texto="carrito (Sprint 6)" />
      </Section>
    </main>
  );
}
