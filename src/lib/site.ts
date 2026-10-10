const FALLBACK_URL = "http://localhost:3000";

export const SITE_NAME = "HUMAN";

export const SITE_DESCRIPTION =
  "Human Performance Center: entrenamiento personalizado, dietética funcional y suplementación en Santo Domingo.";

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL).replace(/\/+$/, "");
}

/**
 * Producción real: en Vercel solo el despliegue de producción; fuera de Vercel, cualquier build de producción.
 * Los previews por rama no cuentan como producción (muestran borradores y no se indexan).
 */
export function isProduction(env: NodeJS.ProcessEnv = process.env): boolean {
  if (env.VERCEL_ENV) return env.VERCEL_ENV === "production";
  return env.NODE_ENV === "production";
}
