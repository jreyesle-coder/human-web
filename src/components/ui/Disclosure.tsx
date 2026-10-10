"use client";

import { type KeyboardEvent, type ReactNode, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type Tab = { id: string; label: string; content: ReactNode };

/** Pestañas WAI-ARIA: flechas para moverse, Inicio/Fin para los extremos, foco itinerante. */
export function Tabs({
  tabs,
  label,
  className,
}: {
  tabs: Tab[];
  label: string;
  className?: string;
}) {
  const [activa, setActiva] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();

  function onKeyDown(e: KeyboardEvent) {
    const ultimo = tabs.length - 1;
    const destino =
      e.key === "ArrowRight"
        ? activa === ultimo
          ? 0
          : activa + 1
        : e.key === "ArrowLeft"
          ? activa === 0
            ? ultimo
            : activa - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? ultimo
              : null;
    if (destino === null) return;
    e.preventDefault();
    setActiva(destino);
    refs.current[destino]?.focus();
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="flex gap-1 overflow-x-auto border-b-2 border-line"
      >
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`${base}-tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={i === activa}
            aria-controls={`${base}-panel-${t.id}`}
            tabIndex={i === activa ? 0 : -1}
            onClick={() => setActiva(i)}
            className={cn(
              "-mb-0.5 min-h-tap shrink-0 border-b-2 px-4 font-semibold transition-colors",
              i === activa ? "border-ink text-ink" : "border-transparent text-stone hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          id={`${base}-panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${t.id}`}
          hidden={i !== activa}
          tabIndex={0}
          className="pt-6"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}

export type AccordionItem = { id: string; title: string; content: ReactNode };

/** Acordeón sobre <details>: accesible por teclado sin JavaScript y encontrable con la búsqueda del navegador. */
export function Accordion({
  items,
  headingLevel = 3,
  className,
}: {
  items: AccordionItem[];
  headingLevel?: 2 | 3 | 4;
  className?: string;
}) {
  const H = `h${headingLevel}` as const;
  return (
    <div className={cn("divide-y-2 divide-line border-y-2 border-line", className)}>
      {items.map((item) => (
        <details key={item.id} className="group">
          <summary className="flex min-h-tap cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
            <H className="font-display text-h3 font-semibold">{item.title}</H>
            <span aria-hidden="true" className="text-h3 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="max-w-reading pb-6 text-body">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
