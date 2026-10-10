"use client";

import { useState } from "react";
import { StoryCard } from "@/components/blocks/Cards";
import { cn } from "@/lib/cn";

type Historia = { slug: string; nombre: string; objetivo: string; extracto: string };

/** Filtro por objetivo (S3-18). El filtrado ocurre en el navegador: la lista completa ya está en la página. */
export function FiltroHistorias({ historias }: { historias: Historia[] }) {
  const objetivos = [...new Set(historias.map((h) => h.objetivo))].sort();
  const [activo, setActivo] = useState<string | null>(null);
  const visibles = activo ? historias.filter((h) => h.objetivo === activo) : historias;

  const chip = (seleccionado: boolean) =>
    cn(
      "inline-flex min-h-tap items-center rounded-pill border-2 px-4 font-semibold",
      seleccionado
        ? "border-ink bg-ink text-bone"
        : "border-line-strong bg-surface hover:border-ink",
    );

  return (
    <div>
      <div role="group" aria-label="Filtrar por objetivo" className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={activo === null}
          onClick={() => setActivo(null)}
          className={chip(activo === null)}
        >
          Todas
        </button>
        {objetivos.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={activo === o}
            onClick={() => setActivo(o)}
            className={chip(activo === o)}
          >
            {o}
          </button>
        ))}
      </div>
      <p className="mt-4 text-small text-stone" aria-live="polite">
        {visibles.length} {visibles.length === 1 ? "historia" : "historias"}
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((h) => (
          <li key={h.slug}>
            <StoryCard
              href={`/historias/${h.slug}`}
              nombre={h.nombre}
              objetivo={h.objetivo}
              extracto={h.extracto}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
