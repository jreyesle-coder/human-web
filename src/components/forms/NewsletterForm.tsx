"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { track } from "@/lib/analytics";
import { boletinSchema } from "@/lib/forms/schemas";
import { Consentimiento, ErrorGeneral, Trampa, Turnstile } from "./FormParts";
import { useLeadForm } from "./useLeadForm";

/** Captación de correo para el boletín (S3-06). */
export function NewsletterForm({ siteKey }: { siteKey: string }) {
  const { estado, errores, onSubmit, alInteractuar, setToken } = useLeadForm({
    schema: boletinSchema,
    endpoint: "/api/leads/boletin",
    formulario: "boletin",
    alEnviar: () => track("boletin_suscripcion"),
  });

  if (estado === "enviado") {
    return (
      <p
        role="status"
        className="rounded-md border-2 border-success bg-success-soft p-4 font-semibold text-success"
      >
        Listo. Te escribiremos cuando publiquemos algo nuevo.
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onFocus={alInteractuar}
      className="relative grid max-w-form gap-5"
    >
      <Input
        id="correo"
        label="Tu correo"
        type="email"
        autoComplete="email"
        inputMode="email"
        error={errores.correo}
      />
      <Consentimiento
        error={errores.consentimiento}
        finalidad="Usamos tu correo solo para enviarte el boletín."
      />
      <Trampa />
      <Turnstile siteKey={siteKey} onToken={setToken} />
      <ErrorGeneral mensaje={errores.formulario} />
      <Button type="submit" loading={estado === "enviando"} className="justify-self-start">
        Suscribirme
      </Button>
    </form>
  );
}
