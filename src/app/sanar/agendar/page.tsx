import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Agendar evaluación",
  description:
    "Agenda tu evaluación en el Centro de Dietética Funcional. Solo pedimos tus datos de contacto y el motivo general.",
  path: "/sanar/agendar",
  seccion: "Sanar",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/sanar/agendar"
        eyebrow="Centro de Dietética Funcional"
        title="Agenda tu evaluación"
        tone="functional"
        lead="Solo pedimos lo necesario para contactarte. El detalle clínico se conversa en consulta."
      />
      <Section>
        <Pendiente texto="formulario de agendamiento (Sprint 5)" />
      </Section>
    </main>
  );
}
