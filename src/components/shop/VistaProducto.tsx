"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Evento de comercio "ver producto" (S6-28). */
export function VistaProducto({ id }: { id: number }) {
  useEffect(() => {
    track("producto_vista", { producto_id: id });
  }, [id]);
  return null;
}
