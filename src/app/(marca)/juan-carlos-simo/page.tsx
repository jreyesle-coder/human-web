import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Juan Carlos Simó",
  description:
    "Fisioterapeuta, psicólogo clínico, strength coach y autor de Filosofía The Simó Diet. Trayectoria, formación y publicaciones.",
  path: "/juan-carlos-simo",
  seccion: "Fundador",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/juan-carlos-simo"
        eyebrow="Fundador"
        title="Juan Carlos Simó"
        lead="Fisioterapeuta, licenciado en psicología clínica, strength coach y mentor."
      />
      <Section>
        <Pendiente texto="trayectoria completa y fotografía oficial de Juan Carlos Simó" />
      </Section>
      <CTABand
        title="Conocer el método"
        action={
          <ButtonLink href="/metodo" size="lg">
            Conocer el método
          </ButtonLink>
        }
      />
    </main>
  );
}
