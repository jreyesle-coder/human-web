import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Entrenar · Human Balance",
  description:
    "Human Balance: entrenamiento personalizado en Santo Domingo que empieza con una evaluación física, corrige la técnica y se ajusta a tu objetivo.",
  path: "/entrenar",
  seccion: "Entrenar",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/entrenar"
        eyebrow="Human Balance"
        title="Entrenar"
        tone="ink"
        lead="Entrenamiento personalizado que empieza con una evaluación."
      />
      <Section>
        <Pendiente texto="propuesta de Human Balance y fotografía de entrenamiento (cliente)" />
      </Section>
      <CTABand
        title="Agendar clase de prueba"
        action={
          <ButtonLink href="/entrenar/clase-de-prueba" size="lg">
            Agendar clase de prueba
          </ButtonLink>
        }
      />
    </main>
  );
}
