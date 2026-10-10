import Link from "next/link";
import { ContentPage, metaContenido } from "@/components/blocks/ContentPage";
import { VideoLite } from "@/components/blocks/VideoLite";
import { JsonLd } from "@/components/ui/JsonLd";
import { getEntry, slugsDe } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export async function generateStaticParams() {
  return slugsDe("contenido", "slug");
}

export async function generateMetadata(props: PageProps<"/contenido/[slug]">) {
  const { slug } = await props.params;
  return metaContenido({ collection: "contenido", slug, base: "/contenido", seccion: "Contenido" });
}

/** Plantilla de artículo (S3-22): tiempo de lectura, video opcional y protocolo relacionado. */
export default async function ArticuloPage(props: PageProps<"/contenido/[slug]">) {
  const { slug } = await props.params;
  const entry = await getEntry("contenido", slug);
  const protocolo = entry?.frontmatter.protocolo
    ? await getEntry("protocolos", entry.frontmatter.protocolo)
    : undefined;
  const fecha = entry?.frontmatter.updated.toLocaleDateString("es-DO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <ContentPage
      collection="contenido"
      slug={slug}
      base="/contenido"
      seccion="Contenido"
      eyebrow={entry ? `Artículo · ${entry.lectura} min de lectura` : "Artículo"}
      antes={
        <div className="mx-auto w-full max-w-content px-gutter pt-8">
          <p className="text-small text-stone">Actualizado el {fecha}</p>
          {entry?.frontmatter.video && (
            <div className="mt-6 max-w-reading">
              <VideoLite id={entry.frontmatter.video} titulo={entry.frontmatter.title} />
            </div>
          )}
        </div>
      }
      despues={
        entry && (
          <>
            {protocolo && (
              <aside className="bg-mist">
                <div className="mx-auto w-full max-w-content px-gutter py-10">
                  <p className="text-small font-semibold tracking-widest text-functional uppercase">
                    Protocolo relacionado
                  </p>
                  <Link
                    href={`/tienda/protocolos/${protocolo.slug}`}
                    className="mt-2 inline-flex min-h-tap items-center font-display text-h2 font-bold underline decoration-2 underline-offset-4"
                  >
                    {protocolo.frontmatter.title}
                  </Link>
                  <p className="mt-2 max-w-reading">{protocolo.frontmatter.objetivo}</p>
                </div>
              </aside>
            )}
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "Article",
                headline: entry.frontmatter.title,
                description: entry.frontmatter.description,
                dateModified: entry.frontmatter.updated.toISOString(),
                inLanguage: "es-DO",
                author: { "@id": `${siteUrl()}/juan-carlos-simo#persona` },
                publisher: { "@id": `${siteUrl()}/#organizacion` },
                mainEntityOfPage: `${siteUrl()}/contenido/${slug}`,
              }}
            />
          </>
        )
      }
    />
  );
}
