import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Agendar clase de prueba",
  description:
    "Solicita una clase de prueba en Human Balance. Te contactamos para coordinar el día y la hora.",
  path: "/entrenar/clase-de-prueba",
  seccion: "Entrenar",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/entrenar/clase-de-prueba"
        eyebrow="Human Balance"
        title="Agenda tu clase de prueba"
        tone="ink"
        lead="Déjanos tus datos y te contactamos para coordinar."
      />
      <Section>
        <Pendiente texto="formulario de clase de prueba (Sprint 4)" />
      </Section>
    </main>
  );
}
