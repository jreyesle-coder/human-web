import type { Metadata } from "next";
import { MethodSteps } from "@/components/blocks/MethodSteps";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";
import { Confirmacion } from "@/components/forms/Confirmacion";

export const metadata: Metadata = metaPagina({
  title: "Solicitud recibida",
  description: "Recibimos tu solicitud de clase de prueba en Human Balance.",
  path: "/entrenar/clase-de-prueba/gracias",
  seccion: "Entrenar",
  noindex: true,
});

/** S4-13: agradecimiento con siguiente paso sugerido. */
export default function GraciasPage() {
  return (
    <main>
      <Confirmacion formulario="clase_de_prueba" />
      <PageHeader
        path="/entrenar/clase-de-prueba/gracias"
        eyebrow="Human Balance"
        title="Recibimos tu solicitud"
        tone="ink"
        lead="Te vamos a contactar por teléfono o WhatsApp para coordinar el día y la hora de tu clase."
      />
      <Section tone="surface" title="Mientras tanto, conoce el método">
        <Pendiente
          texto="tiempo de respuesta comprometido por Human Balance (por ejemplo, en menos de un día laborable)"
          className="mb-8"
        />
        <MethodSteps />
        <ButtonLink href="/metodo" variant="secondary" className="mt-8">
          Conocer el método
        </ButtonLink>
      </Section>
    </main>
  );
}
