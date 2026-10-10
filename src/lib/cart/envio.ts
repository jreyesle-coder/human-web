/**
 * Tarifas publicadas en la política de entrega vigente de humanstores.com (consultada el 2026-10-10).
 * El costo final lo confirma el pago en WooCommerce según la dirección (S7-07).
 */
export const TARIFAS_ENVIO = {
  metropolitana: 15000,
  gratisDesde: 1500000,
  interior: 40000,
  interiorConProteina: 50000,
} as const;

export type ZonaEnvio = "metropolitana" | "interior";

/** Costo estimado en centavos. `conProteina` sube la tarifa del interior según la política. */
export function costoEnvio(subtotal: number, zona: ZonaEnvio, conProteina: boolean): number {
  if (subtotal === 0) return 0;
  if (zona === "metropolitana") {
    return subtotal >= TARIFAS_ENVIO.gratisDesde ? 0 : TARIFAS_ENVIO.metropolitana;
  }
  return conProteina ? TARIFAS_ENVIO.interiorConProteina : TARIFAS_ENVIO.interior;
}

/** ¿Lleva proteína en polvo? Se deduce del nombre del producto. */
export function esProteina(nombre: string): boolean {
  return /whey|protein|prote[ií]na/i.test(nombre);
}
