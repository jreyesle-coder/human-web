import Link from "next/link";
import { cn } from "@/lib/cn";
import { UNIDADES } from "@/lib/marca";

const acentos = {
  entrenar: "bg-ink text-bone",
  sanar: "bg-functional text-surface",
  sostener: "bg-surface text-ink border-2 border-line",
};

/** Las tres puertas de entrada: la decisión principal de la portada. */
export function RouteCards({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {UNIDADES.map((u) => (
        <li key={u.clave}>
          <Link
            href={u.ruta}
            className={cn(
              "group flex h-full min-h-56 flex-col rounded-lg p-6 shadow-card transition-transform hover:-translate-y-0.5",
              acentos[u.clave],
            )}
          >
            <span className="text-small font-semibold tracking-widest uppercase opacity-90">
              {u.nombre}
            </span>
            <H className="mt-2 font-display text-h2 font-bold">{u.verbo}</H>
            <p className="mt-3 flex-1 text-body">{u.resumen}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold underline decoration-2 underline-offset-4">
              Entrar a {u.verbo.toLowerCase()}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
