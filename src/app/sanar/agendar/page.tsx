import type { Metadata } from "next";
import Link from "next/link";
import { WhatsappLinks } from "@/components/blocks/ContactStrip";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { EvaluacionForm } from "@/components/forms/EvaluacionForm";
import { turnstileSiteKey } from "@/lib/forms/config";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Agendar evaluación",
  description:
    "Agenda tu evaluación en el Centro de Dietética Funcional. Solo pedimos tus datos de contacto y el motivo general.",
  path: "/sanar/agendar",
  seccion: "Sanar",
});

export default function AgendarPage() {
  return (
    <main>
      <PageHeader
        path="/sanar/agendar"
        eyebrow="Centro de Dietética Funcional"
        title="Agenda tu evaluación"
        tone="functional"
        lead="Solo pedimos lo necesario para contactarte. El detalle clínico se conversa en consulta, en persona."
      />
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
          <EvaluacionForm siteKey={turnstileSiteKey()} />
          <aside className="grid h-fit gap-6">
            <div className="rounded-lg bg-mist p-6">
              <h2 className="font-display text-h3 font-bold">Antes de agendar</h2>
              <p className="mt-2 text-body">
                Mira{" "}
                <Link
                  href="/sanar/primera-consulta"
                  className="font-semibold underline underline-offset-4"
                >
                  qué pasa en la primera consulta
                </Link>
                .
              </p>
            </div>
            <div className="rounded-lg bg-mist p-6">
              <h2 className="font-display text-h3 font-bold">¿Prefieres escribir?</h2>
              <div className="mt-3">
                <WhatsappLinks origen="agendar-evaluacion" solo="consultorio" />
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </main>
  );
}
