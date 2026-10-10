import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Historias",
  description:
    "Historias reales de personas que pasaron por Human Balance y el Centro de Dietética Funcional, publicadas con autorización firmada.",
  path: "/historias",
  seccion: "Historias",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/historias"
        eyebrow="Historias"
        title="Historias reales, con autorización"
        lead="Solo publicamos historias con autorización escrita de cada persona."
      />
      <Section>
        <Pendiente texto="historias con autorización firmada (cliente)" />
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
