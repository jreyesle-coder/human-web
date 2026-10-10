"use client";

import { useEffect, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { RadioGroup } from "@/components/ui/Field";
import { track } from "@/lib/analytics";
import { costoEnvio, esProteina, TARIFAS_ENVIO, type ZonaEnvio } from "@/lib/cart/envio";
import { useCart } from "@/lib/cart/store";
import { ALCANCE_VENTAS } from "@/lib/marca";
import { precioDOP } from "@/lib/woo/map";
import { CartLines } from "./CartLines";

/** Carrito completo (S6-26): resumen, envío visible antes de pagar y salida al pago. */
export function CartPage() {
  const { items, subtotal } = useCart();
  const [zona, setZona] = useState<ZonaEnvio>("metropolitana");
  const conProteina = items.some((i) => esProteina(i.nombre));
  const envio = costoEnvio(subtotal, zona, conProteina);

  useEffect(() => {
    track("carrito_vista");
  }, []);

  if (items.length === 0) {
    return (
      <div className="rounded-lg bg-mist p-8">
        <p className="font-display text-h3 font-bold">Tu carrito está vacío.</p>
        <p className="mt-2">Empieza por un protocolo: es la forma en que trabajamos.</p>
        <ButtonLink href="/tienda/protocolos" className="mt-6">
          Ver protocolos
        </ButtonLink>
      </div>
    );
  }

  const faltaParaGratis = TARIFAS_ENVIO.gratisDesde - subtotal;

  return (
    <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
      <CartLines items={items} />
      <aside className="h-fit rounded-lg bg-surface p-6 shadow-card">
        <h2 className="font-display text-h3 font-bold">Resumen</h2>
        <dl className="mt-4 grid gap-2">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-semibold">{precioDOP(subtotal)}</dd>
          </div>
        </dl>
        <RadioGroup
          name="zona"
          legend="¿Dónde lo recibes?"
          value={zona}
          onChange={(v) => setZona(v as ZonaEnvio)}
          options={[
            { value: "metropolitana", label: "Zona metropolitana de Santo Domingo" },
            { value: "interior", label: "Interior del país" },
          ]}
          className="mt-4"
        />
        <dl className="mt-4 grid gap-2 border-t-2 border-line pt-4">
          <div className="flex justify-between">
            <dt>Envío estimado</dt>
            <dd className="font-semibold">{envio === 0 ? "Gratis" : precioDOP(envio)}</dd>
          </div>
          <div className="flex justify-between text-h3 font-bold">
            <dt>Total estimado</dt>
            <dd>{precioDOP(subtotal + envio)}</dd>
          </div>
        </dl>
        {zona === "metropolitana" && faltaParaGratis > 0 && (
          <p className="mt-3 text-small text-stone">
            Te faltan {precioDOP(faltaParaGratis)} para el envío gratis.
          </p>
        )}
        {zona === "interior" && conProteina && (
          <p className="mt-3 text-small text-stone">
            Los envíos al interior con proteínas cuestan RD$500.
          </p>
        )}
        <p className="mt-3 text-small text-stone">
          Tarifas de la política de entrega vigente. El costo final se confirma con tu dirección.{" "}
          {ALCANCE_VENTAS}
        </p>
        {/* El traspaso del carrito al pago de WooCommerce es el Sprint 7 (D-003). */}
        <Button size="lg" className="mt-6 w-full" disabled>
          Ir a pagar
        </Button>
        <p className="mt-2 text-center text-small text-stone">
          El pago con AZUL se conecta en la siguiente fase del proyecto.
        </p>
      </aside>
    </div>
  );
}
