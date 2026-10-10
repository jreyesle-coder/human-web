import { ContentPage, metaContenido } from "@/components/blocks/ContentPage";
import { slugsDe } from "@/lib/content";

export async function generateStaticParams() {
  return slugsDe("historias", "slug");
}

export async function generateMetadata(props: PageProps<"/historias/[slug]">) {
  const { slug } = await props.params;
  return metaContenido({
    collection: "historias",
    slug: slug,
    base: "/historias",
    seccion: "Historias",
  });
}

export default async function Page(props: PageProps<"/historias/[slug]">) {
  const { slug } = await props.params;
  return (
    <ContentPage
      {...{ collection: "historias", slug: slug, base: "/historias", seccion: "Historias" }}
      eyebrow="Historia"
    />
  );
}
