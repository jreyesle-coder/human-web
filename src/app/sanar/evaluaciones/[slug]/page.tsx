import { CTABand } from "@/components/blocks/Bands";
import { ContentPage, metaContenido } from "@/components/blocks/ContentPage";
import { ButtonLink } from "@/components/ui/Button";
import { getEntry, slugsDe } from "@/lib/content";

export async function generateStaticParams() {
  return slugsDe("evaluaciones", "slug");
}

export async function generateMetadata(props: PageProps<"/sanar/evaluaciones/[slug]">) {
  const { slug } = await props.params;
  return metaContenido({
    collection: "evaluaciones",
    slug,
    base: "/sanar/evaluaciones",
    seccion: "Sanar",
  });
}

/** Plantilla de evaluación (S5-05): qué mide, cómo se hace, cuánto dura, qué se obtiene (en el MDX). */
export default async function EvaluacionPage(props: PageProps<"/sanar/evaluaciones/[slug]">) {
  const { slug } = await props.params;
  const entry = await getEntry("evaluaciones", slug);
  return (
    <ContentPage
      collection="evaluaciones"
      slug={slug}
      base="/sanar/evaluaciones"
      seccion="Sanar"
      eyebrow="Evaluación"
      tone="functional"
      despues={
        <CTABand
          tone="functional"
          title={`Agenda tu evaluación${entry ? ` con ${entry.frontmatter.nombre}` : ""}`}
          action={
            <ButtonLink href="/sanar/agendar" size="lg" variant="inverse">
              Agendar evaluación
            </ButtonLink>
          }
        />
      }
    />
  );
}
