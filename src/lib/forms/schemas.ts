import { z } from "zod";

/**
 * Esquemas compartidos entre cliente y servidor. Regla del proyecto: ningún formulario público pide
 * información clínica detallada; solo datos de contacto y un motivo general de una lista cerrada.
 */

const nombre = z
  .string()
  .trim()
  .min(2, "Escribe tu nombre.")
  .max(80, "El nombre es demasiado largo.");

const correo = z
  .string()
  .trim()
  .toLowerCase()
  .email("Escribe un correo válido, por ejemplo nombre@dominio.com.")
  .max(120);

/** Teléfono dominicano: 10 dígitos que empiezan por 809, 829 u 849 (con o sin +1, guiones o espacios). */
export function normalizarTelefono(valor: string): string | null {
  let d = valor.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  return /^(809|829|849)\d{7}$/.test(d) ? d : null;
}

const telefono = z
  .string()
  .trim()
  .transform((v, ctx) => {
    const n = normalizarTelefono(v);
    if (!n) {
      ctx.addIssue({
        code: "custom",
        message: "Escribe un teléfono dominicano de 10 dígitos, por ejemplo 809 555 1234.",
      });
      return z.NEVER;
    }
    return n;
  });

const consentimiento = z.literal(true, {
  error: "Necesitamos tu consentimiento para usar estos datos y contactarte.",
});

/** Trazabilidad: de qué página y campaña llega el envío. No viaja en la URL de envío. */
export const origenSchema = z.object({
  pagina: z.string().max(200).default(""),
  referente: z.string().max(300).default(""),
  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
});

const comunes = {
  origen: origenSchema.default({ pagina: "", referente: "" }),
  /** Respuesta del reto anti-spam (Turnstile). Se verifica en el servidor. */
  token: z.string().default(""),
  /** Campo trampa: los humanos lo dejan vacío. */
  sitio_web: z.string().max(0).optional().or(z.literal("")),
};

export const OBJETIVOS_ENTRENAMIENTO = [
  { value: "fuerza", label: "Ganar fuerza" },
  { value: "composicion", label: "Mejorar composición corporal" },
  { value: "movilidad", label: "Moverme mejor y sin molestias" },
  { value: "rendimiento", label: "Rendimiento deportivo" },
  { value: "salud", label: "Salud general" },
] as const;

export const DISPONIBILIDAD = [
  { value: "manana", label: "Mañana" },
  { value: "mediodia", label: "Mediodía" },
  { value: "tarde", label: "Tarde" },
  { value: "noche", label: "Noche" },
] as const;

/** Motivos generales: coinciden con las páginas de /sanar/motivos. Nada de texto libre clínico. */
export const MOTIVOS_CONSULTA = [
  { value: "fatiga", label: "Fatiga" },
  { value: "inflamacion", label: "Inflamación" },
  { value: "sueno", label: "Sueño" },
  { value: "digestion", label: "Digestión" },
  { value: "composicion-corporal", label: "Composición corporal" },
  { value: "prevencion", label: "Prevención" },
  { value: "otro", label: "Otro motivo (lo conversamos en consulta)" },
] as const;

const valores = <T extends readonly { value: string }[]>(lista: T) =>
  lista.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

export const claseDePruebaSchema = z.object({
  nombre,
  telefono,
  correo,
  objetivo: z.enum(valores(OBJETIVOS_ENTRENAMIENTO), { error: "Escoge tu objetivo general." }),
  disponibilidad: z.enum(valores(DISPONIBILIDAD), { error: "Escoge un horario aproximado." }),
  /** Coach elegido desde su perfil, si llegó por ahí. */
  coach: z
    .string()
    .regex(/^[a-z0-9-]*$/)
    .max(60)
    .optional(),
  consentimiento,
  ...comunes,
});

export const evaluacionSchema = z.object({
  nombre,
  telefono,
  correo,
  motivo: z.enum(valores(MOTIVOS_CONSULTA), { error: "Escoge el motivo general de tu consulta." }),
  horario: z.enum(valores(DISPONIBILIDAD), { error: "Escoge una preferencia de horario." }),
  consentimiento,
  ...comunes,
});

export const boletinSchema = z.object({
  correo,
  consentimiento,
  ...comunes,
});

export type ClaseDePrueba = z.infer<typeof claseDePruebaSchema>;
export type Evaluacion = z.infer<typeof evaluacionSchema>;
export type Boletin = z.infer<typeof boletinSchema>;

/** Errores de Zod a { campo: mensaje } para mostrarlos junto a cada campo. */
export function erroresPorCampo(error: z.ZodError): Record<string, string> {
  const salida: Record<string, string> = {};
  for (const issue of error.issues) {
    const campo = String(issue.path[0] ?? "formulario");
    salida[campo] ??= issue.message;
  }
  return salida;
}
