import { ContentPage, metaContenido } from "@/components/blocks/ContentPage";
import { slugsDe } from "@/lib/content";

export async function generateStaticParams() {
  return slugsDe("coaches", "slug");
}

export async function generateMetadata(props: PageProps<"/entrenar/coaches/[slug]">) {
  const { slug } = await props.params;
  return metaContenido({
    collection: "coaches",
    slug: slug,
    base: "/entrenar/coaches",
    seccion: "Entrenar",
  });
}

export default async function Page(props: PageProps<"/entrenar/coaches/[slug]">) {
  const { slug } = await props.params;
  return (
    <ContentPage
      {...{ collection: "coaches", slug: slug, base: "/entrenar/coaches", seccion: "Entrenar" }}
      eyebrow="Coach"
      tone="ink"
    />
  );
}
