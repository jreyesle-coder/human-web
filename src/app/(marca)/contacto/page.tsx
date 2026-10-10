import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Contacto",
  description:
    "Escríbenos por WhatsApp a Human Balance, al Centro de Dietética Funcional o a Human Stores. Av. Abraham Lincoln, Santo Domingo.",
  path: "/contacto",
  seccion: "Contacto",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/contacto"
        eyebrow="Contacto"
        title="Hablemos"
        lead="Cada unidad tiene su propio canal. Escoge el que corresponde a lo que necesitas."
      />
      <Section>
        <Pendiente texto="formulario de contacto general (Sprint 3)" />
      </Section>
    </main>
  );
}
