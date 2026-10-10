"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input, RadioGroup, Select } from "@/components/ui/Field";
import { claseDePruebaSchema, DISPONIBILIDAD, OBJETIVOS_ENTRENAMIENTO } from "@/lib/forms/schemas";
import { Consentimiento, ErrorGeneral, Trampa, Turnstile } from "./FormParts";
import { useLeadForm } from "./useLeadForm";

/** Solicitud de clase de prueba (S4-07). Sin datos clínicos: solo contacto, objetivo general y horario. */
export function ClaseDePruebaForm({ siteKey }: { siteKey: string }) {
  const router = useRouter();
  const { estado, errores, onSubmit, alInteractuar, setToken } = useLeadForm({
    schema: claseDePruebaSchema,
    endpoint: "/api/leads/clase-de-prueba",
    formulario: "clase_de_prueba",
    alEnviar: () => router.push("/entrenar/clase-de-prueba/gracias"),
    // El perfil del coach enlaza con ?coach=slug: se lee al enviar y viaja en el cuerpo, no en la URL del envío.
    extra: () => {
      const coach = new URLSearchParams(window.location.search).get("coach") ?? "";
      return /^[a-z0-9-]{1,60}$/.test(coach) ? { coach } : {};
    },
  });

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onFocus={alInteractuar}
      className="relative grid max-w-form gap-6"
    >
      <Input id="nombre" label="Nombre" autoComplete="name" error={errores.nombre} />
      <Input
        id="telefono"
        label="Teléfono"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        hint="Te llamamos o escribimos por WhatsApp a este número."
        error={errores.telefono}
      />
      <Input
        id="correo"
        label="Correo"
        type="email"
        inputMode="email"
        autoComplete="email"
        error={errores.correo}
      />
      <Select
        id="objetivo"
        label="Objetivo general"
        options={OBJETIVOS_ENTRENAMIENTO}
        error={errores.objetivo}
      />
      <RadioGroup
        name="disponibilidad"
        legend="¿Cuándo te queda mejor?"
        options={DISPONIBILIDAD}
        error={errores.disponibilidad}
      />
      <Consentimiento
        error={errores.consentimiento}
        finalidad="Usamos tus datos solo para coordinar tu clase de prueba en Human Balance."
      />
      <Trampa />
      <Turnstile siteKey={siteKey} onToken={setToken} />
      <ErrorGeneral mensaje={errores.formulario} />
      <Button
        type="submit"
        size="lg"
        loading={estado === "enviando"}
        className="justify-self-start"
      >
        Solicitar clase de prueba
      </Button>
    </form>
  );
}
