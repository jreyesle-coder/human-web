import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Tu primera consulta",
  description:
    "Qué pasa en tu primera consulta en el Centro de Dietética Funcional, paso a paso, y qué traer.",
  path: "/sanar/primera-consulta",
  seccion: "Sanar",
});

/** S5-06: expectativas paso a paso. La estructura está; el contenido lo define el consultorio. */
const MOMENTOS = ["Antes de venir", "Al llegar", "Durante la consulta", "Al terminar", "Después"];

export default function PrimeraConsultaPage() {
  return (
    <main>
      <PageHeader
        path="/sanar/primera-consulta"
        eyebrow="Centro de Dietética Funcional"
        title="Tu primera consulta, paso a paso"
        tone="functional"
        lead="Saber qué esperar quita la mitad de la duda."
      />
      <Section tone="surface">
        <ol className="grid gap-4">
          {MOMENTOS.map((m, i) => (
            <li
              key={m}
              className="grid gap-3 rounded-lg border-2 border-line p-6 md:grid-cols-[auto_1fr] md:gap-6"
            >
              <span
                aria-hidden="true"
                className="flex size-12 items-center justify-center rounded-pill bg-functional font-display text-h3 font-bold text-surface"
              >
                {i + 1}
              </span>
              <div>
                <h2 className="font-display text-h3 font-bold">{m}</h2>
                <Pendiente
                  as="linea"
                  texto={`primera consulta: ${m.toLowerCase()} (consultorio)`}
                  className="mt-2 inline-block text-small"
                />
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <CTABand
        tone="functional"
        title="Cuando quieras, empezamos"
        action={
          <ButtonLink href="/sanar/agendar" size="lg" variant="inverse">
            Agendar evaluación
          </ButtonLink>
        }
      />
    </main>
  );
}
