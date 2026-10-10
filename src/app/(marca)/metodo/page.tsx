import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "El método: Eliminar, Reparar, Liberar",
  description:
    "La filosofía The Simó Diet en tres pasos: eliminar lo que inflama, reparar el metabolismo y liberar las creencias erradas sobre la alimentación.",
  path: "/metodo",
  seccion: "Método",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/metodo"
        eyebrow="The Simó Diet"
        title="Eliminar · Reparar · Liberar"
        lead="Tres pasos con origen en la dieta de eliminación. Son el recorrido que une el entrenamiento, el consultorio y la tienda."
      />
      <Section>
        <Pendiente texto="lógica completa del método y orden de los pasos (Juan Carlos Simó)" />
      </Section>
      <CTABand
        title="Agendar evaluación"
        action={
          <ButtonLink href="/sanar/agendar" size="lg">
            Agendar evaluación
          </ButtonLink>
        }
      />
    </main>
  );
}
