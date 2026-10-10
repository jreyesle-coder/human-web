export type WhatsappUnidad = "ventas" | "consultorio" | "entrenamiento";

// Referencias literales para que Next las incruste en el cliente.
function numeroDe(unidad: WhatsappUnidad): string | undefined {
  switch (unidad) {
    case "ventas":
      return process.env.NEXT_PUBLIC_WHATSAPP_VENTAS;
    case "consultorio":
      return process.env.NEXT_PUBLIC_WHATSAPP_CONSULTORIO;
    case "entrenamiento":
      return process.env.NEXT_PUBLIC_WHATSAPP_ENTRENAMIENTO;
  }
}

type WhatsappOpciones = {
  /** Dónde se originó el clic (ruta o bloque). Va al final del mensaje para trazabilidad. */
  origen: string;
  /** Mensaje inicial sugerido. */
  mensaje?: string;
};

/** Enlace wa.me para la unidad; null si el número no está configurado. */
export function whatsappLink(
  unidad: WhatsappUnidad,
  { origen, mensaje = "Hola, quisiera información." }: WhatsappOpciones,
  numero: string | undefined = numeroDe(unidad),
): string | null {
  const digitos = (numero ?? "").replace(/\D/g, "");
  if (!digitos) return null;
  const texto = `${mensaje}\n\n(ref: ${origen})`;
  return `https://wa.me/${digitos}?text=${encodeURIComponent(texto)}`;
}
