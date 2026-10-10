import Link from "next/link";
import { CTABand, FAQ } from "@/components/blocks/Bands";
import { ContentPage, metaContenido } from "@/components/blocks/ContentPage";
import { MotivoSelector } from "@/components/blocks/MotivoSelector";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { getEntries, getEntry, slugsDe } from "@/lib/content";

export async function generateStaticParams() {
  return slugsDe("motivos", "motivo");
}

export async function generateMetadata(props: PageProps<"/sanar/motivos/[motivo]">) {
  const { motivo } = await props.params;
  return metaContenido({
    collection: "motivos",
    slug: motivo,
    base: "/sanar/motivos",
    seccion: "Sanar",
  });
}

/**
 * Plantilla de motivo (S5-02): qué se siente, qué puede haber detrás, cómo se aborda, qué esperar (en el MDX).
 * Cierra con la evaluación sugerida, el protocolo relacionado y las preguntas frecuentes.
 */
export default async function MotivoPage(props: PageProps<"/sanar/motivos/[motivo]">) {
  const { motivo } = await props.params;
  const entry = await getEntry("motivos", motivo);
  const [evaluacion, protocolo, todos] = await Promise.all([
    entry?.frontmatter.evaluacion
      ? getEntry("evaluaciones", entry.frontmatter.evaluacion)
      : undefined,
    entry?.frontmatter.protocolo ? getEntry("protocolos", entry.frontmatter.protocolo) : undefined,
    getEntries("motivos"),
  ]);
  const otros = todos
    .filter((m) => m.slug !== motivo)
    .sort((a, b) => a.frontmatter.orden - b.frontmatter.orden)
    .map((m) => ({ slug: m.slug, nombre: m.frontmatter.nombre }));

  return (
    <ContentPage
      collection="motivos"
      slug={motivo}
      base="/sanar/motivos"
      seccion="Sanar"
      eyebrow="Motivo de consulta"
      tone="functional"
      despues={
        <>
          {/* S5-09: cada motivo enlaza a su evaluación sugerida y a su protocolo relacionado. */}
          {(evaluacion || protocolo) && (
            <Section tone="mist" title="Siguiente paso">
              <ul className="grid gap-4 md:grid-cols-2">
                {evaluacion && (
                  <li>
                    <Link
                      href={`/sanar/evaluaciones/${evaluacion.slug}`}
                      className="block h-full rounded-lg bg-surface p-6 shadow-card hover:-translate-y-0.5"
                    >
                      <span className="text-small font-semibold tracking-widest text-functional uppercase">
                        Evaluación sugerida
                      </span>
                      <h3 className="mt-2 font-display text-h3 font-bold">
                        {evaluacion.frontmatter.nombre}
                      </h3>
                      <p className="mt-2 text-body text-stone">
                        {evaluacion.frontmatter.description}
                      </p>
                    </Link>
                  </li>
                )}
                {protocolo && (
                  <li>
                    <Link
                      href={`/tienda/protocolos/${protocolo.slug}`}
                      className="block h-full rounded-lg bg-surface p-6 shadow-card hover:-translate-y-0.5"
                    >
                      <span className="text-small font-semibold tracking-widest text-functional uppercase">
                        Protocolo relacionado
                      </span>
                      <h3 className="mt-2 font-display text-h3 font-bold">
                        {protocolo.frontmatter.title}
                      </h3>
                      <p className="mt-2 text-body text-stone">{protocolo.frontmatter.objetivo}</p>
                    </Link>
                  </li>
                )}
              </ul>
            </Section>
          )}
          {/* S5-10: FAQPage con la respuesta directa en la primera frase. */}
          <Section tone="surface" title="Preguntas frecuentes">
            <FAQ
              items={entry?.frontmatter.preguntas ?? []}
              pendiente={`preguntas frecuentes sobre ${entry?.frontmatter.nombre.toLowerCase() ?? "este motivo"}, con respuesta directa (Juan Carlos Simó)`}
            />
          </Section>
          <Section title="Otros motivos">
            <MotivoSelector motivos={otros} titulo="¿Es otra cosa?" />
          </Section>
          <CTABand
            tone="functional"
            title="Lo conversamos en consulta"
            action={
              <ButtonLink href="/sanar/agendar" size="lg" variant="inverse">
                Agendar evaluación
              </ButtonLink>
            }
          />
        </>
      }
    />
  );
}
