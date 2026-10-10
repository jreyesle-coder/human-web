import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Modalidades de entrenamiento",
  description: "Los tipos de entrenamiento de Human Balance y en qué se diferencian entre sí.",
  path: "/entrenar/modalidades",
  seccion: "Entrenar",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/entrenar/modalidades"
        eyebrow="Human Balance"
        title="Modalidades"
        tone="ink"
        lead="Cada modalidad responde a un objetivo distinto."
      />
      <Section>
        <Pendiente texto="lista de modalidades y en qué se diferencian (Human Balance)" />
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
