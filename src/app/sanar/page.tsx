import type { Metadata } from "next";
import Link from "next/link";
import { CTABand } from "@/components/blocks/Bands";
import { MethodSteps } from "@/components/blocks/MethodSteps";
import { MotivoSelector } from "@/components/blocks/MotivoSelector";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { getEntries } from "@/lib/content";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Sanar · Centro de Dietética Funcional",
  description:
    "Consulta de dietética funcional en Santo Domingo. Entra por lo que te pasa: fatiga, inflamación, sueño, digestión, composición corporal o prevención.",
  path: "/sanar",
  seccion: "Sanar",
});

export default async function SanarPage() {
  const motivos = (await getEntries("motivos")).sort(
    (a, b) => a.frontmatter.orden - b.frontmatter.orden,
  );

  return (
    <main>
      <PageHeader
        path="/sanar"
        eyebrow="Centro de Dietética Funcional"
        title="Sanar"
        tone="functional"
        lead="Consulta de salud funcional y dietética, con evaluaciones instrumentales como OligoScan. Es la puerta de entrada a tu protocolo personal."
      >
        <div className="mt-8 rounded-lg bg-functional-soft p-5 text-ink">
          <MotivoSelector
            motivos={motivos.map((m) => ({ slug: m.slug, nombre: m.frontmatter.nombre }))}
          />
        </div>
      </PageHeader>

      {/* S5-01: la respuesta primero, la explicación después. */}
      <Section tone="surface" title="Qué es la dietética funcional">
        <Pendiente texto="qué es la dietética funcional y en qué se diferencia de una consulta nutricional tradicional, con la respuesta en la primera frase (Juan Carlos Simó)" />
      </Section>

      <Section title="Cómo empieza">
        <ol className="grid gap-4 md:grid-cols-3">
          <li>
            <Link
              href="/sanar/agendar"
              className="block h-full rounded-lg bg-surface p-6 shadow-card hover:-translate-y-0.5"
            >
              <span className="font-display text-h2 font-bold text-functional">1</span>
              <h3 className="mt-2 font-display text-h3 font-bold">Agendas tu evaluación</h3>
              <p className="mt-2 text-body text-stone">
                Solo te pedimos datos de contacto y el motivo general.
              </p>
            </Link>
          </li>
          <li>
            <Link
              href="/sanar/primera-consulta"
              className="block h-full rounded-lg bg-surface p-6 shadow-card hover:-translate-y-0.5"
            >
              <span className="font-display text-h2 font-bold text-functional">2</span>
              <h3 className="mt-2 font-display text-h3 font-bold">Primera consulta</h3>
              <p className="mt-2 text-body text-stone">Qué pasa ese día, paso a paso.</p>
            </Link>
          </li>
          <li>
            <Link
              href="/sanar/evaluaciones"
              className="block h-full rounded-lg bg-surface p-6 shadow-card hover:-translate-y-0.5"
            >
              <span className="font-display text-h2 font-bold text-functional">3</span>
              <h3 className="mt-2 font-display text-h3 font-bold">Evaluaciones</h3>
              <p className="mt-2 text-body text-stone">
                Las mediciones que definen tu protocolo personal.
              </p>
            </Link>
          </li>
        </ol>
      </Section>

      {/* S5-07: enlace al método y a la tienda. */}
      <Section
        tone="mist"
        title="Del diagnóstico al protocolo"
        intro={
          <p>
            La evaluación define tu protocolo personal: alimentación, entrenamiento y
            suplementación, guiados por el método.
          </p>
        }
      >
        <MethodSteps />
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/metodo" variant="secondary">
            Conocer el método
          </ButtonLink>
          <ButtonLink href="/tienda/protocolos" variant="ghost">
            Ver los protocolos
          </ButtonLink>
        </div>
      </Section>

      <CTABand
        tone="functional"
        title="Agenda tu evaluación"
        text="El detalle clínico se conversa en consulta, no en un formulario."
        action={
          <ButtonLink href="/sanar/agendar" size="lg" variant="inverse">
            Agendar evaluación
          </ButtonLink>
        }
      />
    </main>
  );
}
