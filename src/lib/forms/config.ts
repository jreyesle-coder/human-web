import { isProduction } from "@/lib/site";
import { TURNSTILE_PRUEBA } from "./server";

/** Llave pública de Turnstile para el navegador. Fuera del lanzamiento, la de prueba si no hay otra. */
export function turnstileSiteKey(): string {
  return (
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || (isProduction() ? "" : TURNSTILE_PRUEBA.siteKey)
  );
}
