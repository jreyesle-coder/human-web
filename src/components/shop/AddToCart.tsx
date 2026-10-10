"use client";

import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { track } from "@/lib/analytics";
import { type CartItem, cart } from "@/lib/cart/store";

export type ItemAgregable = Omit<CartItem, "cantidad">;

export const ABRIR_CARRITO = "human:abrir-carrito";

/** Agrega uno o varios productos (un protocolo completo en un paso, S6-10) y abre el panel del carrito. */
export function AddToCart({
  items,
  protocolo,
  label = "Agregar al carrito",
  variant = "primary",
  size = "md",
  disabled,
  className,
}: {
  items: ItemAgregable[];
  protocolo?: string;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}) {
  const toast = useToast();
  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled || items.length === 0}
      className={className}
      onClick={() => {
        cart.agregar(items);
        const valor = items.reduce((s, i) => s + i.precio, 0) / 100;
        if (protocolo) track("protocolo_agregar", { protocolo, valor, cantidad: items.length });
        else track("carrito_agregar", { producto_id: items[0]?.id, valor });
        toast(
          items.length > 1
            ? `Agregaste ${items.length} productos al carrito`
            : "Agregado al carrito",
          "success",
        );
        window.dispatchEvent(new Event(ABRIR_CARRITO));
      }}
    >
      {label}
    </Button>
  );
}
