import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { isProduction } from "@/lib/site";
import { type Collection, type Frontmatter, schemas } from "./schema";
import { isStoryAuthorized, isVisible } from "./visibility";

export type Entry<C extends Collection> = {
  collection: C;
  slug: string;
  frontmatter: Frontmatter<C>;
  /** Minutos de lectura estimados a 200 palabras por minuto. */
  lectura: number;
};

type LoadOptions = {
  /** Carpeta raíz del contenido. Por defecto, content/ del proyecto. */
  root?: string;
  production?: boolean;
};

/** Carpeta de una colección. Sin `root`, la ruta queda acotada a content/ para que el empaquetador no rastree todo el proyecto. */
function carpeta(collection: Collection, root?: string) {
  return root ? path.join(root, collection) : path.join(process.cwd(), "content", collection);
}

export function minutosDeLectura(cuerpo: string): number {
  const palabras = cuerpo
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
}

/** Lee y valida el frontmatter de una colección. Un frontmatter inválido rompe el build con la ruta del archivo. */
export async function getEntries<C extends Collection>(
  collection: C,
  { root, production = isProduction() }: LoadOptions = {},
): Promise<Entry<C>[]> {
  return leerColeccion(collection, root ?? null, production);
}

/** El contenido solo cambia con un despliegue: se cachea por build. */
async function leerColeccion<C extends Collection>(
  collection: C,
  root: string | null,
  production: boolean,
): Promise<Entry<C>[]> {
  "use cache";
  const dir = carpeta(collection, root ?? undefined);
  const files = (await readdir(dir).catch(() => [] as string[])).filter((f) => f.endsWith(".mdx"));

  const entries = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = schemas[collection].safeParse(data);
      if (!parsed.success) {
        throw new Error(
          `Frontmatter inválido en content/${collection}/${file}: ${parsed.error.message}`,
        );
      }
      return {
        collection,
        slug: file.replace(/\.mdx$/, ""),
        frontmatter: parsed.data as Frontmatter<C>,
        lectura: minutosDeLectura(content),
      };
    }),
  );

  return entries
    .filter((e) => isVisible(e.frontmatter.status, production))
    .filter((e) => collection !== "historias" || isStoryAuthorized(e.frontmatter))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function getEntry<C extends Collection>(
  collection: C,
  slug: string,
  options?: LoadOptions,
): Promise<Entry<C> | undefined> {
  const entries = await getEntries(collection, options);
  return entries.find((e) => e.slug === slug);
}

/** Slug de relleno cuando una colección está vacía: la página responde 404. */
export const SIN_CONTENIDO = "sin-contenido";

/**
 * Parámetros para generateStaticParams. Con Cache Components debe haber al menos uno por ruta,
 * así que una colección vacía devuelve un slug de relleno que termina en notFound().
 */
export async function slugsDe(collection: Collection, clave = "slug") {
  const entries = await getEntries(collection);
  if (entries.length === 0) return [{ [clave]: SIN_CONTENIDO }];
  return entries.map((e) => ({ [clave]: e.slug }));
}
