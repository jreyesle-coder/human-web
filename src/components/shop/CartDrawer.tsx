"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { useCart } from "@/lib/cart/store";
import { ALCANCE_VENTAS } from "@/lib/marca";
import { precioDOP } from "@/lib/woo/map";
import { ABRIR_CARRITO } from "./AddToCart";
import { CartLines } from "./CartLines";

/** Panel lateral del carrito (S6-25): se abre al agregar y muestra resumen y cantidades. */
export function CartDrawer() {
  const [abierto, setAbierto] = useState(false);
  const { items, unidades, subtotal } = useCart();

  useEffect(() => {
    const abrir = () => setAbierto(true);
    window.addEventListener(ABRIR_CARRITO, abrir);
    return () => window.removeEventListener(ABRIR_CARRITO, abrir);
  }, []);

  return (
    <Dialog
      open={abierto}
      onClose={() => setAbierto(false)}
      title={`Tu carrito (${unidades})`}
      placement="side"
    >
      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="flex h-full flex-col">
          <CartLines items={items} compacto />
          <div className="mt-6 grid gap-3 border-t-2 border-line pt-4">
            <p className="flex justify-between text-h3 font-bold">
              <span>Subtotal</span>
              <span>{precioDOP(subtotal)}</span>
            </p>
            <p className="text-small text-stone">
              El envío se calcula en el carrito. {ALCANCE_VENTAS}
            </p>
            <ButtonLink href="/tienda/carrito" size="lg" onClick={() => setAbierto(false)}>
              Ver carrito y envío
            </ButtonLink>
          </div>
        </div>
      )}
    </Dialog>
  );
}
