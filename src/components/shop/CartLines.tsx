"use client";

import Image from "next/image";
import Link from "next/link";
import { cart, type CartItem } from "@/lib/cart/store";
import { precioDOP } from "@/lib/woo/map";

/** Líneas del carrito con edición de cantidades (S6-25). Compartidas por el panel y la página. */
export function CartLines({ items, compacto = false }: { items: CartItem[]; compacto?: boolean }) {
  return (
    <ul className="divide-y-2 divide-line">
      {items.map((i) => (
        <li key={i.id} className="flex gap-4 py-4">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-md border-2 border-line bg-surface">
            {i.imagen && (
              <Image src={i.imagen} alt="" fill sizes="80px" className="object-contain p-1" />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Link
              href={`/tienda/productos/${i.slug}`}
              className="font-semibold underline-offset-4 hover:underline"
            >
              {i.nombre}
            </Link>
            <p className="text-small text-stone">{precioDOP(i.precio)} c/u</p>
            <div className="flex flex-wrap items-center gap-2">
              <div
                className="inline-flex items-center rounded-md border-2 border-line-strong"
                role="group"
                aria-label={`Cantidad de ${i.nombre}`}
              >
                <button
                  type="button"
                  onClick={() => cart.cambiar(i.id, i.cantidad - 1)}
                  className="inline-flex min-h-tap min-w-tap items-center justify-center text-h3 hover:bg-mist"
                >
                  <span aria-hidden="true">−</span>
                  <span className="sr-only">Quitar uno</span>
                </button>
                <span className="min-w-8 text-center font-semibold" aria-live="polite">
                  {i.cantidad}
                </span>
                <button
                  type="button"
                  onClick={() => cart.cambiar(i.id, i.cantidad + 1)}
                  className="inline-flex min-h-tap min-w-tap items-center justify-center text-h3 hover:bg-mist"
                >
                  <span aria-hidden="true">+</span>
                  <span className="sr-only">Agregar uno</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => cart.quitar(i.id)}
                className="inline-flex min-h-tap items-center px-2 text-small font-semibold text-stone underline underline-offset-4 hover:text-ink"
              >
                Quitar
              </button>
            </div>
          </div>
          {!compacto && <p className="font-semibold">{precioDOP(i.precio * i.cantidad)}</p>}
        </li>
      ))}
    </ul>
  );
}
