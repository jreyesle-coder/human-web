import { CTABand } from "@/components/blocks/Bands";
import { ContentPage, metaContenido } from "@/components/blocks/ContentPage";
import { ButtonLink } from "@/components/ui/Button";
import { slugsDe } from "@/lib/content";

export async function generateStaticParams() {
  return slugsDe("historias", "slug");
}

export async function generateMetadata(props: PageProps<"/historias/[slug]">) {
  const { slug } = await props.params;
  return metaContenido({ collection: "historias", slug, base: "/historias", seccion: "Historias" });
}

/** Plantilla de historia (S3-19): punto de partida, proceso y resultado, en el MDX. */
export default async function HistoriaPage(props: PageProps<"/historias/[slug]">) {
  const { slug } = await props.params;
  return (
    <ContentPage
      collection="historias"
      slug={slug}
      base="/historias"
      seccion="Historias"
      eyebrow="Historia"
      despues={
        <CTABand
          title="Tu historia empieza con una evaluación"
          action={
            <ButtonLink href="/sanar/agendar" size="lg">
              Agendar evaluación
            </ButtonLink>
          }
        />
      }
    />
  );
}
