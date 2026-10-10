import { claseDePruebaSchema, DISPONIBILIDAD, OBJETIVOS_ENTRENAMIENTO } from "@/lib/forms/schemas";
import { enviarCorreo, procesarLead, textoOrigen } from "@/lib/forms/server";
import { siteUrl } from "@/lib/site";

const etiqueta = (lista: readonly { value: string; label: string }[], valor: string) =>
  lista.find((o) => o.value === valor)?.label ?? valor;

export async function POST(request: Request) {
  return procesarLead({
    request,
    schema: claseDePruebaSchema,
    formulario: "clase-de-prueba",
    alRecibir: async (d) => {
      const equipo = process.env.LEAD_NOTIFICATION_EMAIL;
      if (!equipo) return "no-configurado";
      const objetivo = etiqueta(OBJETIVOS_ENTRENAMIENTO, d.objetivo);
      const horario = etiqueta(DISPONIBILIDAD, d.disponibilidad);

      // S4-11: aviso al equipo con todos los datos y el origen.
      const aviso = await enviarCorreo({
        para: equipo,
        responderA: d.correo,
        asunto: `Clase de prueba: ${d.nombre}`,
        texto: [
          "Nueva solicitud de clase de prueba en Human Balance.",
          "",
          `Nombre: ${d.nombre}`,
          `Teléfono: ${d.telefono}`,
          `Correo: ${d.correo}`,
          `Objetivo: ${objetivo}`,
          `Disponibilidad: ${horario}`,
          `Coach elegido: ${d.coach || "ninguno"}`,
          "",
          textoOrigen(d.origen),
        ].join("\n"),
      });

      // S4-12: confirmación al solicitante con qué esperar.
      await enviarCorreo({
        para: d.correo,
        asunto: "Recibimos tu solicitud de clase de prueba · HUMAN",
        texto: [
          `Hola, ${d.nombre}:`,
          "",
          "Recibimos tu solicitud de clase de prueba en Human Balance.",
          `Te vamos a contactar al ${d.telefono} para coordinar el día y la hora, en el horario que indicaste (${horario.toLowerCase()}).`,
          "",
          "Mientras tanto, puedes conocer el método que guía todo lo que hacemos:",
          `${siteUrl()}/metodo`,
          "",
          "HUMAN · Human Balance",
          "Av. Abraham Lincoln, Santo Domingo",
        ].join("\n"),
      });
      return aviso;
    },
  });
}
