import type { MetadataRoute } from "next";
import { getEntries } from "@/lib/content";
import { COLLECTIONS, type Collection } from "@/lib/content/schema";
import { STATIC_ROUTES } from "@/lib/routes";
import { siteUrl } from "@/lib/site";

/** Dónde vive cada colección. Las historias y los coaches solo entran publicados y autorizados. */
const BASE: Record<Collection, string> = {
  metodo: "/metodo",
  protocolos: "/tienda/protocolos",
  motivos: "/sanar/motivos",
  evaluaciones: "/sanar/evaluaciones",
  coaches: "/entrenar/coaches",
  historias: "/historias",
  contenido: "/contenido",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const estaticas = STATIC_ROUTES.map((path) => ({ url: `${base}${path === "/" ? "" : path}` }));

  // Siempre con la regla de producción: el sitemap nunca lista borradores, ni en el sitio de presentación.
  const contenido = await Promise.all(
    COLLECTIONS.map(async (c) =>
      (await getEntries(c, { production: true })).map((e) => ({
        url: `${base}${BASE[c]}/${e.slug}`,
        lastModified: e.frontmatter.updated,
      })),
    ),
  );

  return [...estaticas, ...contenido.flat()];
}
