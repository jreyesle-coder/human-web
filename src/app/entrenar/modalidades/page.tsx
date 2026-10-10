import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Modalidades de entrenamiento",
  description: "Los tipos de entrenamiento de Human Balance y en qué se diferencian entre sí.",
  path: "/entrenar/modalidades",
  seccion: "Entrenar",
});

/** Estructura de cada modalidad: se llena cuando Human Balance entregue la lista (S4-02). */
const CAMPOS = [
  "Para quién es",
  "Cómo es una sesión",
  "Frecuencia sugerida",
  "En qué se diferencia",
];

export default function ModalidadesPage() {
  return (
    <main>
      <PageHeader
        path="/entrenar/modalidades"
        eyebrow="Human Balance"
        title="Modalidades"
        tone="ink"
        lead="Cada modalidad responde a un objetivo distinto."
      />
      <Section tone="surface">
        <Pendiente texto="lista de modalidades de Human Balance con nombre y descripción (Human Balance)" />
        <div className="mt-8 rounded-lg border-2 border-dashed border-line-strong p-6">
          <p className="font-display text-h3 font-bold">Cada modalidad mostrará:</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {CAMPOS.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-2 rounded-pill bg-amber" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <CTABand
        title="¿No sabes cuál te corresponde?"
        text="En la clase de prueba lo definimos contigo."
        action={
          <ButtonLink href="/entrenar/clase-de-prueba" size="lg">
            Agendar clase de prueba
          </ButtonLink>
        }
      />
    </main>
  );
}
