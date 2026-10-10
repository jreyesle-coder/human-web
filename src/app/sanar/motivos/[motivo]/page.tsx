import { ContentPage, metaContenido } from "@/components/blocks/ContentPage";
import { slugsDe } from "@/lib/content";

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

export default async function Page(props: PageProps<"/sanar/motivos/[motivo]">) {
  const { motivo } = await props.params;
  return (
    <ContentPage
      {...{ collection: "motivos", slug: motivo, base: "/sanar/motivos", seccion: "Sanar" }}
      eyebrow="Motivo de consulta"
      tone="functional"
    />
  );
}
