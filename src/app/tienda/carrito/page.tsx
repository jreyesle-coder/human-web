import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { CartPage } from "@/components/shop/CartPage";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Carrito",
  description: "Tu carrito de Human Stores.",
  path: "/tienda/carrito",
  seccion: "Tienda",
  noindex: true,
});

export default function CarritoPage() {
  return (
    <main>
      <PageHeader
        path="/tienda/carrito"
        eyebrow="Human Stores"
        title="Tu carrito"
        lead="Revisa tu pedido y el costo de envío antes de pagar."
      />
      <Section tone="mist">
        <CartPage />
      </Section>
    </main>
  );
}
