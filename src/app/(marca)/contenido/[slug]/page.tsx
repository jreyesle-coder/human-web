import { ContentPage, metaContenido } from "@/components/blocks/ContentPage";
import { slugsDe } from "@/lib/content";

export async function generateStaticParams() {
  return slugsDe("contenido", "slug");
}

export async function generateMetadata(props: PageProps<"/contenido/[slug]">) {
  const { slug } = await props.params;
  return metaContenido({
    collection: "contenido",
    slug: slug,
    base: "/contenido",
    seccion: "Contenido",
  });
}

export default async function Page(props: PageProps<"/contenido/[slug]">) {
  const { slug } = await props.params;
  return (
    <ContentPage
      {...{ collection: "contenido", slug: slug, base: "/contenido", seccion: "Contenido" }}
      eyebrow="Artículo"
    />
  );
}
