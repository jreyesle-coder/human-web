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
};

type LoadOptions = {
  /** Carpeta raíz del contenido. Por defecto, content/ del proyecto. */
  root?: string;
  production?: boolean;
};

const DEFAULT_ROOT = path.join(process.cwd(), "content");

/** Lee y valida el frontmatter de una colección. Un frontmatter inválido rompe el build con la ruta del archivo. */
export async function getEntries<C extends Collection>(
  collection: C,
  { root = DEFAULT_ROOT, production = isProduction() }: LoadOptions = {},
): Promise<Entry<C>[]> {
  const dir = path.join(root, collection);
  const files = (await readdir(dir).catch(() => [] as string[])).filter((f) => f.endsWith(".mdx"));

  const entries = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(dir, file), "utf8");
      const parsed = schemas[collection].safeParse(matter(raw).data);
      if (!parsed.success) {
        throw new Error(
          `Frontmatter inválido en content/${collection}/${file}: ${parsed.error.message}`,
        );
      }
      return {
        collection,
        slug: file.replace(/\.mdx$/, ""),
        frontmatter: parsed.data as Frontmatter<C>,
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
