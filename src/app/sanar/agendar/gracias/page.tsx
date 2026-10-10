import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { Confirmacion } from "@/components/forms/Confirmacion";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Solicitud recibida",
  description: "Recibimos tu solicitud de evaluación en el Centro de Dietética Funcional.",
  path: "/sanar/agendar/gracias",
  seccion: "Sanar",
  noindex: true,
});

/** S5-16: agradecimiento con qué traer y cómo prepararse. */
export default function GraciasEvaluacionPage() {
  return (
    <main>
      <Confirmacion formulario="evaluacion" />
      <PageHeader
        path="/sanar/agendar/gracias"
        eyebrow="Centro de Dietética Funcional"
        title="Recibimos tu solicitud"
        tone="functional"
        lead="Te vamos a contactar por teléfono o WhatsApp para confirmar el día y la hora."
      />
      <Section tone="surface" title="Cómo prepararte">
        <Pendiente texto="qué traer a la evaluación y cómo prepararse (ayuno, ropa, estudios previos), definido por el consultorio" />
        <Pendiente texto="tiempo de respuesta comprometido por el consultorio" className="mt-4" />
        <ButtonLink href="/sanar/primera-consulta" variant="secondary" className="mt-8">
          Qué pasa en la primera consulta
        </ButtonLink>
      </Section>
    </main>
  );
}
