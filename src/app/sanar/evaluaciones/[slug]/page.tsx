import { ContentPage, metaContenido } from "@/components/blocks/ContentPage";
import { slugsDe } from "@/lib/content";

export async function generateStaticParams() {
  return slugsDe("evaluaciones", "slug");
}

export async function generateMetadata(props: PageProps<"/sanar/evaluaciones/[slug]">) {
  const { slug } = await props.params;
  return metaContenido({
    collection: "evaluaciones",
    slug: slug,
    base: "/sanar/evaluaciones",
    seccion: "Sanar",
  });
}

export default async function Page(props: PageProps<"/sanar/evaluaciones/[slug]">) {
  const { slug } = await props.params;
  return (
    <ContentPage
      {...{ collection: "evaluaciones", slug: slug, base: "/sanar/evaluaciones", seccion: "Sanar" }}
      eyebrow="Evaluación"
      tone="functional"
    />
  );
}
