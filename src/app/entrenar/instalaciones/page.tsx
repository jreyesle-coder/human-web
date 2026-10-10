import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Instalaciones",
  description:
    "Los espacios de Human Balance en la Av. Abraham Lincoln, Santo Domingo: horarios y cómo llegar.",
  path: "/entrenar/instalaciones",
  seccion: "Entrenar",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/entrenar/instalaciones"
        eyebrow="Human Balance"
        title="Instalaciones"
        tone="ink"
        lead="Av. Abraham Lincoln, Santo Domingo."
      />
      <Section>
        <Pendiente texto="fotografía de instalaciones y horarios (cliente)" />
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
