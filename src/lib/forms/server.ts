import type { z } from "zod";
import { isProduction } from "@/lib/site";
import { erroresPorCampo } from "./schemas";

/** Llaves de prueba públicas de Cloudflare Turnstile: siempre aprueban. Solo fuera del lanzamiento. */
export const TURNSTILE_PRUEBA = {
  siteKey: "1x00000000000000000000AA",
  secret: "1x0000000000000000000000000000000AA",
};

export function turnstileSecret(): string | null {
  return process.env.TURNSTILE_SECRET_KEY || (isProduction() ? null : TURNSTILE_PRUEBA.secret);
}

export async function verificarTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secret = turnstileSecret();
  if (!secret || !token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/**
 * Límite de intentos por IP en memoria: frena ráfagas desde un mismo origen.
 * En Vercel cada instancia lleva su propia cuenta; para un límite global hace falta un almacén compartido (DT-003).
 */
const intentos = new Map<string, number[]>();

export function limitar(clave: string, max = 5, ventanaMs = 10 * 60 * 1000): boolean {
  const ahora = Date.now();
  const recientes = (intentos.get(clave) ?? []).filter((t) => ahora - t < ventanaMs);
  if (recientes.length >= max) {
    intentos.set(clave, recientes);
    return false;
  }
  recientes.push(ahora);
  intentos.set(clave, recientes);
  return true;
}

type Correo = { para: string; asunto: string; texto: string; responderA?: string };

/** Envío por la API de Resend. Devuelve "no-configurado" si falta la llave (sitio de presentación). */
export async function enviarCorreo({ para, asunto, texto, responderA }: Correo) {
  const key = process.env.RESEND_API_KEY;
  const desde = process.env.RESEND_FROM || "HUMAN <onboarding@resend.dev>";
  if (!key) return "no-configurado" as const;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: desde,
      to: [para],
      subject: asunto,
      text: texto,
      ...(responderA ? { reply_to: responderA } : {}),
    }),
  });
  if (!res.ok) throw new Error(`Resend respondió ${res.status}`);
  return "enviado" as const;
}

export type RespuestaLead =
  | { ok: true; correo: "enviado" | "no-configurado" }
  | { ok: false; errores: Record<string, string> };

type ProcesarOpciones<S extends z.ZodType> = {
  request: Request;
  schema: S;
  /** Clave del formulario para el límite de intentos. */
  formulario: string;
  alRecibir: (datos: z.infer<S>) => Promise<"enviado" | "no-configurado">;
};

const json = (cuerpo: RespuestaLead, status: number) => Response.json(cuerpo, { status });

/** Flujo común de todo formulario: límite, validación en servidor, anti-spam y correos. */
export async function procesarLead<S extends z.ZodType>({
  request,
  schema,
  formulario,
  alRecibir,
}: ProcesarOpciones<S>) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  if (!limitar(`${formulario}:${ip ?? "sin-ip"}`)) {
    return json(
      {
        ok: false,
        errores: { formulario: "Demasiados intentos. Espera unos minutos y vuelve a intentarlo." },
      },
      429,
    );
  }

  const cuerpo: unknown = await request.json().catch(() => null);
  const parsed = schema.safeParse(cuerpo);
  if (!parsed.success) return json({ ok: false, errores: erroresPorCampo(parsed.error) }, 400);

  const datos = parsed.data as z.infer<S> & { token: string; sitio_web?: string };
  if (datos.sitio_web) return json({ ok: true, correo: "no-configurado" }, 200);
  if (!(await verificarTurnstile(datos.token, ip))) {
    return json(
      {
        ok: false,
        errores: {
          formulario:
            "No pudimos verificar que no eres un robot. Recarga la página e inténtalo de nuevo.",
        },
      },
      400,
    );
  }

  try {
    const correo = await alRecibir(datos);
    if (correo === "no-configurado" && isProduction()) {
      throw new Error("RESEND_API_KEY no configurada en el sitio lanzado");
    }
    return json({ ok: true, correo }, 200);
  } catch (e) {
    console.error(`[${formulario}]`, e instanceof Error ? e.message : e);
    return json(
      {
        ok: false,
        errores: {
          formulario:
            "No pudimos enviar tu solicitud. Escríbenos por WhatsApp o inténtalo más tarde.",
        },
      },
      502,
    );
  }
}

/** Texto de trazabilidad para el correo interno. */
export function textoOrigen(origen: {
  pagina: string;
  referente: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}) {
  const campana = [origen.utm_source, origen.utm_medium, origen.utm_campaign]
    .filter(Boolean)
    .join(" / ");
  return [
    `Página: ${origen.pagina || "desconocida"}`,
    `Llegó desde: ${origen.referente || "directo"}`,
    `Campaña: ${campana || "ninguna"}`,
  ].join("\n");
}
