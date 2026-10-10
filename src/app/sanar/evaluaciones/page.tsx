import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Evaluaciones",
  description:
    "Las evaluaciones del Centro de Dietética Funcional, incluida OligoScan: qué mide cada una y qué se obtiene.",
  path: "/sanar/evaluaciones",
  seccion: "Sanar",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/sanar/evaluaciones"
        eyebrow="Centro de Dietética Funcional"
        title="Evaluaciones"
        tone="functional"
        lead="Evaluaciones instrumentales para saber desde dónde partes."
      />
      <Section>
        <Pendiente texto="lista completa de evaluaciones disponibles (consultorio)" />
      </Section>
      <CTABand
        title="Agendar evaluación"
        action={
          <ButtonLink href="/sanar/agendar" size="lg">
            Agendar evaluación
          </ButtonLink>
        }
      />
    </main>
  );
}
