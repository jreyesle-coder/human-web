import Link from "next/link";

type Motivo = { slug: string; nombre: string };

/** Selector de motivo (S5-08): botones grandes, usables con el pulgar, en una cuadrícula de dos columnas en móvil. */
export function MotivoSelector({
  motivos,
  titulo = "¿Qué te trae?",
}: {
  motivos: Motivo[];
  titulo?: string;
}) {
  return (
    <nav aria-label="Motivos de consulta">
      <h2 className="font-display text-h3 font-bold">{titulo}</h2>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {motivos.map((m) => (
          <li key={m.slug}>
            <Link
              href={`/sanar/motivos/${m.slug}`}
              className="flex min-h-14 items-center justify-between gap-2 rounded-md bg-surface px-4 py-3 font-semibold text-ink shadow-card transition-colors hover:bg-functional-soft"
            >
              {m.nombre}
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
