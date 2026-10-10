import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { WhatsappLinks } from "@/components/blocks/ContactStrip";
import { ClaseDePruebaForm } from "@/components/forms/ClaseDePruebaForm";
import { turnstileSiteKey } from "@/lib/forms/config";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Agendar clase de prueba",
  description:
    "Solicita una clase de prueba en Human Balance. Te contactamos para coordinar el día y la hora.",
  path: "/entrenar/clase-de-prueba",
  seccion: "Entrenar",
});

export default function ClaseDePruebaPage() {
  return (
    <main>
      <PageHeader
        path="/entrenar/clase-de-prueba"
        eyebrow="Human Balance"
        title="Agenda tu clase de prueba"
        tone="ink"
        lead="Déjanos tus datos y te contactamos para coordinar."
      />
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
          <ClaseDePruebaForm siteKey={turnstileSiteKey()} />
          <aside className="h-fit rounded-lg bg-mist p-6">
            <h2 className="font-display text-h3 font-bold">¿Prefieres escribir?</h2>
            <p className="mt-2 text-body">También puedes coordinar tu clase por WhatsApp.</p>
            <div className="mt-3">
              <WhatsappLinks origen="clase-de-prueba" solo="entrenamiento" />
            </div>
          </aside>
        </div>
      </Section>
    </main>
  );
}
