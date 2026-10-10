"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ProductCard } from "@/components/blocks/Cards";
import { cn } from "@/lib/cn";
import { precioDOP } from "@/lib/woo/map";

export type ProductoCatalogo = {
  id: number;
  slug: string;
  nombre: string;
  precio: number;
  imagen?: { src: string; alt: string };
  objetivo: { slug: string; nombre: string };
  formato: string;
  agotado: boolean;
};

const quitarTildes = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

/**
 * Catálogo con filtros por objetivo y formato y buscador (S6-13, S6-14). Los filtros viven en la URL
 * (?objetivo=&formato=&q=) para poder compartir un enlace filtrado.
 */
export function Catalogo({ productos }: { productos: ProductoCatalogo[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const objetivo = params.get("objetivo") ?? "";
  const formato = params.get("formato") ?? "";
  const q = params.get("q") ?? "";

  const objetivos = useMemo(
    () =>
      [...new Map(productos.map((p) => [p.objetivo.slug, p.objetivo])).values()].sort((a, b) =>
        a.nombre.localeCompare(b.nombre),
      ),
    [productos],
  );
  const formatos = useMemo(() => [...new Set(productos.map((p) => p.formato))].sort(), [productos]);

  const visibles = productos.filter(
    (p) =>
      (!objetivo || p.objetivo.slug === objetivo) &&
      (!formato || p.formato === formato) &&
      (!q || quitarTildes(p.nombre).includes(quitarTildes(q))),
  );

  function cambiar(clave: string, valor: string) {
    const siguiente = new URLSearchParams(params);
    if (valor) siguiente.set(clave, valor);
    else siguiente.delete(clave);
    const qs = siguiente.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const chip = (activo: boolean) =>
    cn(
      "inline-flex min-h-tap items-center rounded-pill border-2 px-4 text-small font-semibold",
      activo ? "border-ink bg-ink text-bone" : "border-line-strong bg-surface hover:border-ink",
    );

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <div className="grid h-fit gap-6">
        <div>
          <label htmlFor="buscar" className="block font-semibold">
            Buscar
          </label>
          <input
            id="buscar"
            type="search"
            defaultValue={q}
            onChange={(e) => cambiar("q", e.target.value.trim())}
            placeholder="Magnesio, omega, proteína…"
            className="mt-2 block min-h-tap w-full rounded-md border-2 border-line-strong bg-surface px-3 hover:border-ink"
          />
        </div>
        <fieldset>
          <legend className="font-semibold">Objetivo</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={!objetivo}
              onClick={() => cambiar("objetivo", "")}
              className={chip(!objetivo)}
            >
              Todos
            </button>
            {objetivos.map((o) => (
              <button
                key={o.slug}
                type="button"
                aria-pressed={objetivo === o.slug}
                onClick={() => cambiar("objetivo", objetivo === o.slug ? "" : o.slug)}
                className={chip(objetivo === o.slug)}
              >
                {o.nombre}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="font-semibold">Formato</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {formatos.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={formato === f}
                onClick={() => cambiar("formato", formato === f ? "" : f)}
                className={chip(formato === f)}
              >
                {f}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div>
        <p className="text-small text-stone" aria-live="polite">
          {visibles.length} {visibles.length === 1 ? "producto" : "productos"}
        </p>
        {visibles.length === 0 ? (
          <p className="mt-6 rounded-md bg-mist p-6">
            Ningún producto coincide con estos filtros.{" "}
            <button
              type="button"
              onClick={() => router.replace(pathname, { scroll: false })}
              className="font-semibold underline underline-offset-4"
            >
              Quitar filtros
            </button>
          </p>
        ) : (
          <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            {visibles.map((p) => (
              <li key={p.id}>
                <ProductCard
                  href={`/tienda/productos/${p.slug}`}
                  nombre={p.nombre}
                  precio={precioDOP(p.precio)}
                  imagen={p.imagen}
                  categoria={p.objetivo.nombre}
                  agotado={p.agotado}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
