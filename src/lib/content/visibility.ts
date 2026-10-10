import type { Status } from "./schema";

/** En producción solo se publica lo aprobado; en previews y local también se ven borradores. */
export function isVisible(status: Status, production: boolean): boolean {
  return production ? status === "published" : true;
}

/** Salvaguarda de historias: sin autorización firmada explícita, no se renderiza en ningún entorno. */
export function isStoryAuthorized(frontmatter: object): boolean {
  return "autorizacion" in frontmatter && frontmatter.autorizacion === true;
}
