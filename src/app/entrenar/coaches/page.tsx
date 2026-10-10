import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { CoachCard } from "@/components/blocks/Cards";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { getEntries } from "@/lib/content";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Coaches",
  description: "El equipo de coaches de Human Balance: especialidad y formación de cada uno.",
  path: "/entrenar/coaches",
  seccion: "Entrenar",
});

export default async function CoachesPage() {
  const coaches = await getEntries("coaches");
  return (
    <main>
      <PageHeader
        path="/entrenar/coaches"
        eyebrow="Human Balance"
        title="El equipo"
        tone="ink"
        lead="Quién te va a entrenar y qué sabe hacer."
      />
      <Section tone="surface">
        {coaches.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coaches.map((c) => (
              <li key={c.slug}>
                <CoachCard
                  href={`/entrenar/coaches/${c.slug}`}
                  nombre={c.frontmatter.nombre}
                  especialidad={c.frontmatter.especialidad}
                />
              </li>
            ))}
          </ul>
        ) : null}
        <Pendiente
          texto="fotografía y perfil de cada coach del equipo (Human Balance)"
          className="mt-8"
        />
      </Section>
      <CTABand
        title="Entrena con el equipo"
        action={
          <ButtonLink href="/entrenar/clase-de-prueba" size="lg">
            Agendar clase de prueba
          </ButtonLink>
        }
      />
    </main>
  );
}
