"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input, RadioGroup, Select } from "@/components/ui/Field";
import { DISPONIBILIDAD, evaluacionSchema, MOTIVOS_CONSULTA } from "@/lib/forms/schemas";
import { Consentimiento, ErrorGeneral, Trampa, Turnstile } from "./FormParts";
import { useLeadForm } from "./useLeadForm";

/**
 * Agendamiento de evaluación (S5-11). S5-12: ningún campo de texto libre para síntomas, historial o
 * medicación. El motivo es una lista cerrada y no se envía a la analítica.
 */
export function EvaluacionForm({ siteKey }: { siteKey: string }) {
  const router = useRouter();
  const { estado, errores, onSubmit, alInteractuar, setToken } = useLeadForm({
    schema: evaluacionSchema,
    endpoint: "/api/leads/evaluacion",
    formulario: "evaluacion",
    alEnviar: () => router.push("/sanar/agendar/gracias"),
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
        hint="Te llamamos o escribimos por WhatsApp para confirmar la cita."
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
        id="motivo"
        label="Motivo general de la consulta"
        hint="Solo el tema general. Los detalles los conversamos en persona."
        options={MOTIVOS_CONSULTA}
        error={errores.motivo}
      />
      <RadioGroup
        name="horario"
        legend="Preferencia de horario"
        options={DISPONIBILIDAD}
        error={errores.horario}
      />
      <Consentimiento
        error={errores.consentimiento}
        avisoHref="/privacidad#consultorio"
        finalidad="El Centro de Dietética Funcional usa tus datos solo para agendar y confirmar tu evaluación."
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
        Agendar evaluación
      </Button>
    </form>
  );
}
