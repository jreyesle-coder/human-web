import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Coaches",
  description: "El equipo de coaches de Human Balance: especialidad y formación de cada uno.",
  path: "/entrenar/coaches",
  seccion: "Entrenar",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/entrenar/coaches"
        eyebrow="Human Balance"
        title="El equipo"
        tone="ink"
        lead="Quién te va a entrenar y qué sabe hacer."
      />
      <Section>
        <Pendiente texto="fotografía y perfil de cada coach (cliente)" />
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
