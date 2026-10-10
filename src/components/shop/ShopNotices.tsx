import { ALCANCE_VENTAS } from "@/lib/marca";
import { cn } from "@/lib/cn";

/** Aviso de alcance (S6-23): visible antes del carrito, en toda la tienda. */
export function AvisoAlcance({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 rounded-md bg-mist px-4 py-3 text-small text-ink",
        className,
      )}
    >
      <span aria-hidden="true">📦</span>
      <span>
        <strong>{ALCANCE_VENTAS}</strong> Zona metropolitana RD$150, gratis desde RD$15,000.
      </span>
    </p>
  );
}

/** Catálogo degradado (S6-04): nunca una pantalla en blanco si la tienda no responde. */
export function CatalogoNoDisponible({ mensaje }: { mensaje: string }) {
  return (
    <div role="alert" className="rounded-lg border-2 border-warning bg-warning-soft p-6 text-ink">
      <p className="font-display text-h3 font-bold text-warning">{mensaje}</p>
      <p className="mt-2">
        Intenta de nuevo en unos minutos. Si necesitas algo ahora, escríbenos por WhatsApp y te
        atendemos por ahí.
      </p>
    </div>
  );
}
