import { DISPONIBILIDAD, evaluacionSchema, MOTIVOS_CONSULTA } from "@/lib/forms/schemas";
import { enviarCorreo, procesarLead, textoOrigen } from "@/lib/forms/server";
import { siteUrl } from "@/lib/site";

const etiqueta = (lista: readonly { value: string; label: string }[], valor: string) =>
  lista.find((o) => o.value === valor)?.label ?? valor;

export async function POST(request: Request) {
  return procesarLead({
    request,
    schema: evaluacionSchema,
    formulario: "evaluacion",
    alRecibir: async (d) => {
      const consultorio = process.env.LEAD_NOTIFICATION_EMAIL;
      if (!consultorio) return "no-configurado";
      const motivo = etiqueta(MOTIVOS_CONSULTA, d.motivo);
      const horario = etiqueta(DISPONIBILIDAD, d.horario);

      // S5-15: aviso al consultorio. El motivo es general; no hay datos clínicos que transmitir.
      const aviso = await enviarCorreo({
        para: consultorio,
        responderA: d.correo,
        asunto: `Evaluación solicitada: ${d.nombre}`,
        texto: [
          "Nueva solicitud de evaluación en el Centro de Dietética Funcional.",
          "",
          `Nombre: ${d.nombre}`,
          `Teléfono: ${d.telefono}`,
          `Correo: ${d.correo}`,
          `Motivo general: ${motivo}`,
          `Preferencia de horario: ${horario}`,
          "",
          textoOrigen(d.origen),
        ].join("\n"),
      });

      // Confirmación al paciente: sin repetir el motivo, por si el correo lo lee otra persona.
      await enviarCorreo({
        para: d.correo,
        asunto: "Recibimos tu solicitud de evaluación · HUMAN",
        texto: [
          `Hola, ${d.nombre}:`,
          "",
          "Recibimos tu solicitud de evaluación en el Centro de Dietética Funcional.",
          `Te vamos a contactar al ${d.telefono} para confirmar el día y la hora.`,
          "",
          "Qué esperar en tu primera consulta:",
          `${siteUrl()}/sanar/primera-consulta`,
          "",
          "HUMAN · Centro de Dietética Funcional",
          "Av. Abraham Lincoln, Santo Domingo",
        ].join("\n"),
      });
      return aviso;
    },
  });
}
