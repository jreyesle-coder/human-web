import { isProduction } from "@/lib/site";
import { cn } from "@/lib/cn";

type PendienteProps = {
  /** Qué falta, con quién lo entrega si se sabe. Lo recoge `pnpm pendientes`. */
  texto: string;
  /** "bloque" ocupa un párrafo; "linea" va dentro de un texto. */
  as?: "bloque" | "linea";
  className?: string;
};

/**
 * Contenido que falta, visible y rastreable. En el sitio lanzado (HUMAN_LANZAMIENTO=si) rompe
 * el build: nada pendiente llega al público por descuido.
 */
export function Pendiente({ texto, as = "bloque", className }: PendienteProps) {
  if (isProduction()) {
    throw new Error(`Contenido pendiente en el build de lanzamiento: ${texto}`);
  }
  const contenido = `{{PENDIENTE: ${texto}}}`;
  if (as === "linea") {
    return (
      <mark
        data-pendiente={texto}
        className={cn("rounded-sm bg-warning-soft px-1 text-warning", className)}
      >
        {contenido}
      </mark>
    );
  }
  return (
    <p
      data-pendiente={texto}
      className={cn(
        "rounded-md border-2 border-dashed border-warning bg-warning-soft px-4 py-3 text-body text-warning",
        className,
      )}
    >
      {contenido}
    </p>
  );
}
