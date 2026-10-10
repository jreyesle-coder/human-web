import { ContentPage, metaContenido } from "@/components/blocks/ContentPage";
import { slugsDe } from "@/lib/content";

export async function generateStaticParams() {
  return slugsDe("protocolos", "slug");
}

export async function generateMetadata(props: PageProps<"/tienda/protocolos/[slug]">) {
  const { slug } = await props.params;
  return metaContenido({
    collection: "protocolos",
    slug: slug,
    base: "/tienda/protocolos",
    seccion: "Tienda",
  });
}

export default async function Page(props: PageProps<"/tienda/protocolos/[slug]">) {
  const { slug } = await props.params;
  return (
    <ContentPage
      {...{ collection: "protocolos", slug: slug, base: "/tienda/protocolos", seccion: "Tienda" }}
      eyebrow="Protocolo"
    />
  );
}
