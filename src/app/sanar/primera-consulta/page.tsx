import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Tu primera consulta",
  description:
    "Qué pasa en tu primera consulta en el Centro de Dietética Funcional, paso a paso, y qué traer.",
  path: "/sanar/primera-consulta",
  seccion: "Sanar",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/sanar/primera-consulta"
        eyebrow="Centro de Dietética Funcional"
        title="Tu primera consulta, paso a paso"
        tone="functional"
        lead="Saber qué esperar quita la mitad de la duda."
      />
      <Section>
        <Pendiente texto="pasos de la primera consulta (consultorio)" />
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
