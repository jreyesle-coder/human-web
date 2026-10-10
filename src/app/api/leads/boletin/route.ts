import { boletinSchema } from "@/lib/forms/schemas";
import { enviarCorreo, procesarLead, textoOrigen } from "@/lib/forms/server";

export async function POST(request: Request) {
  return procesarLead({
    request,
    schema: boletinSchema,
    formulario: "boletin",
    alRecibir: async (d) => {
      const equipo = process.env.LEAD_NOTIFICATION_EMAIL;
      if (!equipo) return "no-configurado";
      return enviarCorreo({
        para: equipo,
        asunto: "Nueva suscripción al boletín",
        texto: `Correo: ${d.correo}\nConsentimiento: sí\n\n${textoOrigen(d.origen)}`,
      });
    },
  });
}
