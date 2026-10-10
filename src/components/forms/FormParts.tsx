"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useId, useRef } from "react";
import { Checkbox } from "@/components/ui/Field";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
  }
}

/** Reto anti-spam de Cloudflare Turnstile. El token se verifica siempre en el servidor. */
export function Turnstile({ siteKey, onToken }: { siteKey: string; onToken: (t: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  useEffect(() => {
    let cancelado = false;
    const montar = () => {
      if (cancelado || !ref.current || !window.turnstile || widget.current) return;
      widget.current = window.turnstile.render(ref.current, {
        sitekey: siteKey,
        language: "es",
        callback: onToken,
        "expired-callback": () => onToken(""),
      });
    };
    const intervalo = window.setInterval(montar, 300);
    montar();
    return () => {
      cancelado = true;
      window.clearInterval(intervalo);
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, [siteKey, onToken]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
      />
      <div ref={ref} className="min-h-[65px]" />
    </>
  );
}

/** Aviso de privacidad y consentimiento explícito, no premarcado (Ley No. 172-13). */
export function Consentimiento({
  error,
  finalidad,
  avisoHref = "/privacidad",
}: {
  error?: string;
  /** Qué se hace con los datos, en una frase. */
  finalidad: string;
  avisoHref?: string;
}) {
  return (
    <div className="grid gap-3 rounded-md bg-mist p-4">
      <p className="text-small text-ink">
        <strong>Tus datos.</strong> {finalidad} No los compartimos con terceros ni los usamos para
        otra cosa. Puedes pedir que los borremos cuando quieras. Detalles en el{" "}
        <Link href={avisoHref} className="font-semibold underline underline-offset-4">
          aviso de privacidad
        </Link>
        .
      </p>
      <Checkbox id="consentimiento" error={error}>
        Acepto que HUMAN use estos datos para contactarme con este fin.
      </Checkbox>
    </div>
  );
}

/** Campo trampa invisible para robots que llenan todo. */
export function Trampa() {
  const id = useId();
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
      <label htmlFor={id}>No llenar</label>
      <input id={id} name="sitio_web" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function ErrorGeneral({ mensaje }: { mensaje?: string }) {
  if (!mensaje) return null;
  return (
    <p
      role="alert"
      className="rounded-md border-2 border-error bg-error-soft p-4 font-semibold text-error"
    >
      {mensaje}
    </p>
  );
}
