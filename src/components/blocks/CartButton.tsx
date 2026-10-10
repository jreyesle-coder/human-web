"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/cart/store";

/** Enlace al carrito con el número de unidades. */
export function CartButton({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { unidades } = useCart();
  return (
    <Link
      href="/tienda/carrito"
      className={cn(
        "relative inline-flex min-h-tap min-w-tap items-center justify-center gap-2 rounded-md px-2 font-semibold hover:bg-mist",
        className,
      )}
    >
      <span aria-hidden="true" className="text-h3">
        🛒
      </span>
      {!compact && <span>Carrito</span>}
      <span className="sr-only">
        , {unidades} {unidades === 1 ? "producto" : "productos"}
      </span>
      {unidades > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-pill bg-amber px-1 text-micro font-bold text-surface"
        >
          {unidades}
        </span>
      )}
    </Link>
  );
}
