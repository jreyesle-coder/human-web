import type { ComponentType } from "react";
import type { Collection } from "./schema";

/**
 * Carga el cuerpo compilado de un MDX. La ruta es literal por colección para que el empaquetador
 * sepa qué archivos incluir.
 */
export async function cargarMdx(collection: Collection, slug: string): Promise<ComponentType> {
  switch (collection) {
    case "metodo":
      return (await import(`@content/metodo/${slug}.mdx`)).default;
    case "protocolos":
      return (await import(`@content/protocolos/${slug}.mdx`)).default;
    case "motivos":
      return (await import(`@content/motivos/${slug}.mdx`)).default;
    case "evaluaciones":
      return (await import(`@content/evaluaciones/${slug}.mdx`)).default;
    case "coaches":
      return (await import(`@content/coaches/${slug}.mdx`)).default;
    case "historias":
      return (await import(`@content/historias/${slug}.mdx`)).default;
    case "contenido":
      return (await import(`@content/contenido/${slug}.mdx`)).default;
  }
}
