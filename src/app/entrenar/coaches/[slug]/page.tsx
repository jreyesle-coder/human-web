import { CTABand } from "@/components/blocks/Bands";
import { ContentPage, metaContenido } from "@/components/blocks/ContentPage";
import { ButtonLink } from "@/components/ui/Button";
import { getEntry, slugsDe } from "@/lib/content";

export async function generateStaticParams() {
  return slugsDe("coaches", "slug");
}

export async function generateMetadata(props: PageProps<"/entrenar/coaches/[slug]">) {
  const { slug } = await props.params;
  return metaContenido({
    collection: "coaches",
    slug,
    base: "/entrenar/coaches",
    seccion: "Entrenar",
  });
}

/** Perfil de coach (S4-04): especialidad y formación; el llamado agenda con ese coach. */
export default async function CoachPage(props: PageProps<"/entrenar/coaches/[slug]">) {
  const { slug } = await props.params;
  const coach = await getEntry("coaches", slug);
  const nombre = coach?.frontmatter.nombre ?? "este coach";
  return (
    <ContentPage
      collection="coaches"
      slug={slug}
      base="/entrenar/coaches"
      seccion="Entrenar"
      eyebrow={coach?.frontmatter.especialidad ?? "Coach"}
      tone="ink"
      despues={
        <CTABand
          title={`Entrena con ${nombre}`}
          action={
            <ButtonLink href={`/entrenar/clase-de-prueba?coach=${slug}`} size="lg">
              Agendar con {nombre}
            </ButtonLink>
          }
        />
      }
    />
  );
}
