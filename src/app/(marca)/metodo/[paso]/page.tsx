import { ContentPage, metaContenido } from "@/components/blocks/ContentPage";
import { slugsDe } from "@/lib/content";

export async function generateStaticParams() {
  return slugsDe("metodo", "paso");
}

export async function generateMetadata(props: PageProps<"/metodo/[paso]">) {
  const { paso } = await props.params;
  return metaContenido({ collection: "metodo", slug: paso, base: "/metodo", seccion: "Método" });
}

export default async function Page(props: PageProps<"/metodo/[paso]">) {
  const { paso } = await props.params;
  return (
    <ContentPage
      {...{ collection: "metodo", slug: paso, base: "/metodo", seccion: "Método" }}
      eyebrow="El método"
    />
  );
}
