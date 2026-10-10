import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";
import { getEntry } from "@/lib/content";
import { cargarMdx } from "@/lib/content/render";
import type { Collection } from "@/lib/content/schema";
import { metaPagina } from "@/lib/seo";
import { PageHeader } from "./PageHeader";
import { Prose } from "./Section";

type Opciones = {
  collection: Collection;
  slug: string;
  /** Ruta base de la colección, p. ej. "/sanar/motivos". */
  base: string;
  seccion: string;
};

export async function metaContenido({
  collection,
  slug,
  base,
  seccion,
}: Opciones): Promise<Metadata> {
  const entry = await getEntry(collection, slug);
  if (!entry) return {};
  return metaPagina({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: `${base}/${slug}`,
    seccion,
    type: collection === "contenido" ? "article" : "website",
  });
}

type ContentPageProps = Opciones & {
  eyebrow?: ReactNode;
  tone?: ComponentProps<typeof PageHeader>["tone"];
  /** Contenido antes del cuerpo MDX (p. ej. selector de pasos). */
  antes?: ReactNode;
  /** Contenido después del cuerpo MDX (relacionados, llamado final). */
  despues?: ReactNode;
  lead?: ReactNode;
};

/** Página de contenido MDX: 404 si no existe o no es visible en este entorno. */
export async function ContentPage({
  collection,
  slug,
  base,
  eyebrow,
  tone,
  antes,
  despues,
  lead,
}: ContentPageProps) {
  const entry = await getEntry(collection, slug);
  if (!entry) notFound();
  const Cuerpo = await cargarMdx(collection, slug);

  return (
    <main>
      <PageHeader
        path={`${base}/${slug}`}
        actual={entry.frontmatter.title}
        eyebrow={eyebrow}
        title={entry.frontmatter.title}
        lead={lead ?? entry.frontmatter.description}
        tone={tone}
      />
      {antes}
      <div className="mx-auto w-full max-w-content px-gutter py-10 lg:py-14">
        <Prose>
          <Cuerpo />
        </Prose>
      </div>
      {despues}
    </main>
  );
}
