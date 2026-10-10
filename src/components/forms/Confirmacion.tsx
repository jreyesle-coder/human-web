"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Registra la llegada a la página de agradecimiento como confirmación del embudo. */
export function Confirmacion({ formulario }: { formulario: string }) {
  useEffect(() => {
    track("formulario_confirmacion", { formulario });
  }, [formulario]);
  return null;
}
