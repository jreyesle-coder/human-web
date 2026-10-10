import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { getEntries } from "@/lib/content";
import { metaPagina } from "@/lib/seo";
import { FiltroHistorias } from "./FiltroHistorias";

export const metadata: Metadata = metaPagina({
  title: "Historias",
  description:
    "Historias reales de personas que pasaron por Human Balance y el Centro de Dietética Funcional, publicadas con autorización firmada.",
  path: "/historias",
  seccion: "Historias",
});

export default async function HistoriasPage() {
  // getEntries ya excluye toda historia sin autorizacion: true.
  const historias = await getEntries("historias");
  return (
    <main>
      <PageHeader
        path="/historias"
        eyebrow="Historias"
        title="Historias reales, con autorización"
        lead="Cada historia cuenta el punto de partida, el proceso y el resultado. Solo publicamos las que tienen autorización escrita de la persona."
      />
      <Section tone="surface">
        {historias.length > 0 ? (
          <FiltroHistorias
            historias={historias.map((h) => ({
              slug: h.slug,
              nombre: h.frontmatter.nombre,
              objetivo: h.frontmatter.objetivo,
              extracto: h.frontmatter.description,
            }))}
          />
        ) : (
          <Pendiente texto="historias con autorización firmada: punto de partida, proceso y resultado (cliente)" />
        )}
      </Section>
      <CTABand
        title="Tu historia empieza con una evaluación"
        action={
          <ButtonLink href="/sanar/agendar" size="lg">
            Agendar evaluación
          </ButtonLink>
        }
      />
    </main>
  );
}
