const FALLBACK_URL = "http://localhost:3000";

export const SITE_NAME = "HUMAN";

export const SITE_DESCRIPTION =
  "Human Performance Center: entrenamiento personalizado, dietética funcional y suplementación en Santo Domingo.";

/** URL pública: la configurada; si falta, la que asigna Vercel (dominio de producción o del preview). */
export function siteUrl(env: NodeJS.ProcessEnv = process.env): string {
  const vercelHost =
    env.VERCEL_ENV === "production" ? env.VERCEL_PROJECT_PRODUCTION_URL : env.VERCEL_URL;
  const url = env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : FALLBACK_URL);
  return url.replace(/\/+$/, "");
}

/**
 * Sitio lanzado al público. Solo con HUMAN_LANZAMIENTO=si (ver D-008).
 * Mientras no esté lanzado, todo despliegue es de presentación: muestra borradores y pendientes y no se indexa.
 */
export function isProduction(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.HUMAN_LANZAMIENTO === "si";
}
