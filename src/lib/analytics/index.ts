/**
 * Eventos de medición. Solo nombres de evento y propiedades de una lista permitida:
 * nunca datos personales ni el motivo de consulta (Ley 172-13, S5-20, S8-05).
 */

export type Evento =
  | "formulario_vista"
  | "formulario_inicio"
  | "formulario_envio"
  | "formulario_error"
  | "formulario_confirmacion"
  | "whatsapp_clic"
  | "producto_vista"
  | "carrito_agregar"
  | "protocolo_agregar"
  | "carrito_vista"
  | "boletin_suscripcion";

/** Las únicas propiedades que pueden salir del sitio. */
const PERMITIDAS = new Set([
  "formulario",
  "unidad",
  "origen",
  "producto_id",
  "protocolo",
  "valor",
  "cantidad",
]);

export function limpiarPropiedades(props: Record<string, unknown>) {
  const salida: Record<string, string | number> = {};
  for (const [k, v] of Object.entries(props)) {
    if (!PERMITIDAS.has(k)) continue;
    if (typeof v === "string" || typeof v === "number") salida[k] = v;
  }
  return salida;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Empuja el evento a dataLayer. Sin analítica configurada (S8), los eventos se acumulan sin salir del navegador. */
export function track(evento: Evento, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer ??= [];
  window.dataLayer.push({ event: evento, ...limpiarPropiedades(props) });
}
