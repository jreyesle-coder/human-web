import type { Metadata } from "next";
import { SITE_NAME } from "./site";

type MetaPagina = {
  title: string;
  description: string;
  /** Ruta canónica, empezando por "/". */
  path: string;
  /** Rótulo pequeño de la imagen para compartir (sección). */
  seccion?: string;
  /** Páginas internas o de agradecimiento: fuera de buscadores. */
  noindex?: boolean;
  type?: "website" | "article";
};

/** URL de la imagen Open Graph generada con la marca (src/app/og/route.tsx). */
export function ogImage(titulo: string, seccion?: string) {
  const params = new URLSearchParams({ titulo });
  if (seccion) params.set("seccion", seccion);
  return `/og?${params.toString()}`;
}

/** Metadatos propios de cada página: título, descripción, canónica, Open Graph y Twitter. */
export function metaPagina({
  title,
  description,
  path,
  seccion,
  noindex,
  type = "website",
}: MetaPagina): Metadata {
  const imagen = { url: ogImage(title, seccion), width: 1200, height: 630, alt: title };
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "es_DO",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: [imagen],
    },
    twitter: { card: "summary_large_image", title, description, images: [imagen.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
