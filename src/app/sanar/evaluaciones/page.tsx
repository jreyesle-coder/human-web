import type { Metadata } from "next";
import Link from "next/link";
import { CTABand } from "@/components/blocks/Bands";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { getEntries } from "@/lib/content";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Evaluaciones",
  description:
    "Las evaluaciones del Centro de Dietética Funcional, incluida OligoScan: qué mide cada una y qué se obtiene.",
  path: "/sanar/evaluaciones",
  seccion: "Sanar",
});

export default async function EvaluacionesPage() {
  const evaluaciones = (await getEntries("evaluaciones")).sort(
    (a, b) => a.frontmatter.orden - b.frontmatter.orden,
  );
  return (
    <main>
      <PageHeader
        path="/sanar/evaluaciones"
        eyebrow="Centro de Dietética Funcional"
        title="Evaluaciones"
        tone="functional"
        lead="Evaluaciones instrumentales para saber desde dónde partes. Cada una explica qué mide, cómo se hace, cuánto dura y qué recibes."
      />
      <Section tone="surface">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {evaluaciones.map((e) => (
            <li key={e.slug}>
              <Link
                href={`/sanar/evaluaciones/${e.slug}`}
                className="block h-full rounded-lg border-2 border-line p-6 hover:border-functional"
              >
                <h2 className="font-display text-h3 font-bold">{e.frontmatter.nombre}</h2>
                <p className="mt-2 text-body text-stone">{e.frontmatter.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Pendiente
          texto="lista completa de evaluaciones disponibles además de OligoScan (consultorio)"
          className="mt-8"
        />
      </Section>
      <CTABand
        tone="functional"
        title="La evaluación correcta se define en consulta"
        action={
          <ButtonLink href="/sanar/agendar" size="lg" variant="inverse">
            Agendar evaluación
          </ButtonLink>
        }
      />
    </main>
  );
}
