"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { esActivo } from "@/lib/navegacion";
import { useCart } from "@/lib/cart/store";

const ITEMS = [
  { label: "Entrenar", href: "/entrenar", icono: "◆" },
  { label: "Sanar", href: "/sanar", icono: "●" },
  { label: "Tienda", href: "/tienda", icono: "■" },
] as const;

/** Barra inferior fija en móvil: las tres rutas más el carrito. */
export function BottomBar() {
  const pathname = usePathname();
  const { unidades } = useCart();
  const enlace =
    "relative flex min-h-tap flex-1 flex-col items-center justify-center gap-0.5 text-micro font-semibold";

  return (
    <nav
      aria-label="Rutas"
      className="fixed inset-x-0 bottom-0 z-40 h-bottom-bar border-t-2 border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="flex h-full">
        {ITEMS.map((item) => {
          const activo = esActivo(pathname, item.href);
          return (
            <li key={item.href} className="flex flex-1">
              <Link
                href={item.href}
                aria-current={activo ? "page" : undefined}
                className={cn(enlace, activo ? "text-amber" : "text-ink")}
              >
                <span aria-hidden="true" className="text-body">
                  {item.icono}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
        <li className="flex flex-1">
          <Link
            href="/tienda/carrito"
            aria-current={pathname === "/tienda/carrito" ? "page" : undefined}
            className={cn(enlace, pathname === "/tienda/carrito" ? "text-amber" : "text-ink")}
          >
            <span aria-hidden="true" className="text-body">
              🛒
            </span>
            Carrito
            <span className="sr-only">
              , {unidades} {unidades === 1 ? "producto" : "productos"}
            </span>
            {unidades > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-1 left-1/2 ml-2 inline-flex min-w-5 items-center justify-center rounded-pill bg-amber px-1 text-micro font-bold text-surface"
              >
                {unidades}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
