import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Sanar · Centro de Dietética Funcional",
  description:
    "Consulta de dietética funcional en Santo Domingo. Entra por lo que te pasa: fatiga, inflamación, sueño, digestión, composición corporal o prevención.",
  path: "/sanar",
  seccion: "Sanar",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/sanar"
        eyebrow="Centro de Dietética Funcional"
        title="Sanar"
        tone="functional"
        lead="La consulta funcional es la puerta de entrada a tu protocolo personal."
      />
      <Section>
        <Pendiente texto="qué es la dietética funcional y en qué se diferencia de una consulta nutricional tradicional (Juan Carlos Simó)" />
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
