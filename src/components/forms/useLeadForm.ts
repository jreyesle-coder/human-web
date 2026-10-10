"use client";

import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import type { z } from "zod";
import { track } from "@/lib/analytics";
import { erroresPorCampo } from "@/lib/forms/schemas";

type Estado = "inicial" | "enviando" | "enviado" | "error";

/** Origen del envío: página actual, referente y parámetros de campaña. Se manda en el cuerpo, no en la URL. */
function leerOrigen() {
  const url = new URL(window.location.href);
  const utm = (k: string) => url.searchParams.get(k) ?? undefined;
  return {
    pagina: url.pathname,
    referente: document.referrer,
    utm_source: utm("utm_source"),
    utm_medium: utm("utm_medium"),
    utm_campaign: utm("utm_campaign"),
  };
}

/**
 * Lógica común de formularios: validación en cliente con el mismo esquema del servidor,
 * envío JSON, errores por campo y eventos de embudo sin datos personales.
 */
export function useLeadForm<S extends z.ZodType>({
  schema,
  endpoint,
  formulario,
  alEnviar,
  extra,
}: {
  schema: S;
  endpoint: string;
  formulario: string;
  alEnviar?: () => void;
  /** Datos adicionales que se agregan al enviar (no son campos visibles). */
  extra?: () => Record<string, unknown>;
}) {
  const [estado, setEstado] = useState<Estado>("inicial");
  const [errores, setErrores] = useState<Record<string, string>>({});
  const token = useRef("");
  const setToken = useCallback((t: string) => {
    token.current = t;
  }, []);
  const iniciado = useRef(false);

  useEffect(() => {
    track("formulario_vista", { formulario });
  }, [formulario]);

  const alInteractuar = useCallback(() => {
    if (iniciado.current) return;
    iniciado.current = true;
    track("formulario_inicio", { formulario });
  }, [formulario]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const datos: Record<string, unknown> = Object.fromEntries(new FormData(form));
    // Las casillas sin marcar no aparecen en FormData.
    form.querySelectorAll<HTMLInputElement>("input[type=checkbox]").forEach((c) => {
      datos[c.name] = c.checked;
    });
    Object.assign(datos, extra?.());
    datos.origen = leerOrigen();

    const local = schema.safeParse(datos);
    if (!local.success) {
      const errs = erroresPorCampo(local.error);
      setErrores(errs);
      setEstado("error");
      track("formulario_error", { formulario });
      const primero = Object.keys(errs)[0];
      if (primero) form.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }

    setEstado("enviando");
    setErrores({});
    // Si la persona fue más rápida que el reto anti-spam, se espera hasta 8 s a que entregue el token.
    for (let i = 0; i < 40 && !token.current; i++) await new Promise((r) => setTimeout(r, 200));
    datos.token = token.current;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const cuerpo = (await res.json()) as { ok: boolean; errores?: Record<string, string> };
      if (!cuerpo.ok) {
        setErrores(cuerpo.errores ?? { formulario: "No pudimos enviar tu solicitud." });
        setEstado("error");
        track("formulario_error", { formulario });
        return;
      }
      setEstado("enviado");
      track("formulario_envio", { formulario });
      alEnviar?.();
    } catch {
      setErrores({ formulario: "Sin conexión. Revisa tu internet e inténtalo de nuevo." });
      setEstado("error");
      track("formulario_error", { formulario });
    }
  }

  return { estado, errores, onSubmit, alInteractuar, setToken };
}
