import Link from "next/link";
import { cn } from "@/lib/cn";
import { PASOS_METODO, type PasoMetodo } from "@/lib/marca";

type MethodStepsProps = {
  /** Paso actual: se marca y se anuncia como posición en el recorrido. */
  activo?: PasoMetodo["slug"];
  /** Enlaza cada paso a su página. */
  linked?: boolean;
  tone?: "light" | "dark";
  headingLevel?: 2 | 3;
};

/** Eliminar · Reparar · Liberar, con indicador de posición. */
export function MethodSteps({
  activo,
  linked = true,
  tone = "light",
  headingLevel = 3,
}: MethodStepsProps) {
  const H = `h${headingLevel}` as const;
  return (
    <ol className="grid gap-4 md:grid-cols-3" aria-label="Pasos del método">
      {PASOS_METODO.map((p) => {
        const esActivo = p.slug === activo;
        const contenido = (
          <>
            <span
              aria-hidden="true"
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-pill font-display text-h3 font-bold",
                esActivo
                  ? "bg-amber text-surface"
                  : tone === "light"
                    ? "bg-ink text-bone"
                    : "bg-bone text-ink",
              )}
            >
              {p.numero}
            </span>
            <H className="mt-4 font-display text-h3 font-bold">
              <span className="sr-only">Paso {p.numero}: </span>
              {p.nombre}
              {esActivo && <span className="sr-only"> (paso actual)</span>}
            </H>
            <p className="mt-2 text-body">{p.resumen}</p>
          </>
        );
        const clases = cn(
          "block h-full rounded-lg border-2 p-6",
          tone === "light" ? "bg-surface text-ink" : "bg-ink text-bone",
          esActivo ? "border-amber" : tone === "light" ? "border-line" : "border-bone/30",
        );
        return (
          <li key={p.slug} aria-current={esActivo ? "step" : undefined}>
            {linked ? (
              <Link
                href={`/metodo/${p.slug}`}
                className={cn(clases, "transition-colors hover:border-ink")}
              >
                {contenido}
              </Link>
            ) : (
              <div className={clases}>{contenido}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
