import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { BookAside } from "@/components/blocks/BookAside";
import { MethodSteps } from "@/components/blocks/MethodSteps";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Prose, Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { CITAS, LIBRO, UNIDADES } from "@/lib/marca";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "El método: Eliminar, Reparar, Liberar",
  description:
    "La filosofía The Simó Diet en tres pasos: eliminar lo que inflama, reparar el metabolismo y liberar las creencias erradas sobre la alimentación.",
  path: "/metodo",
  seccion: "Método",
});

export default function MetodoPage() {
  return (
    <main>
      <PageHeader
        path="/metodo"
        eyebrow="The Simó Diet"
        title="Eliminar · Reparar · Liberar"
        lead={
          <p>
            El método nace del libro <cite>{LIBRO.titulo}</cite> ({LIBRO.anio}) y tiene su origen en
            la dieta de eliminación. Los pasos se recorren en orden: cada uno prepara el siguiente.
          </p>
        }
      />

      <Section tone="surface" title="Los tres pasos, en orden">
        <MethodSteps />
      </Section>

      <Section title="Por qué en este orden">
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
          <Prose>
            <p>
              Primero se retiran los patrones alimenticios que inflaman el organismo. Después se
              restablecen el metabolismo y la función. Al final se sueltan las creencias erradas
              sobre la alimentación.
            </p>
            <Pendiente texto="lógica completa del método y criterios para pasar de un paso al siguiente (Juan Carlos Simó)" />
            <blockquote>
              <p>“{CITAS[2]}”</p>
            </blockquote>
          </Prose>
          <BookAside />
        </div>
      </Section>

      <Section tone="mist" title="El método en cada unidad">
        <ul className="grid gap-4 md:grid-cols-3">
          {UNIDADES.map((u) => (
            <li key={u.clave} className="rounded-lg bg-surface p-6">
              <h3 className="font-display text-h3 font-bold">
                {u.verbo} · {u.nombre}
              </h3>
              <p className="mt-2 text-body">{u.resumen}</p>
              <ButtonLink href={u.ruta} variant="link" className="mt-3">
                Ir a {u.verbo.toLowerCase()}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Section>

      <CTABand
        title="El recorrido empieza con una evaluación"
        text="En consulta se define desde qué paso partes y qué protocolo te corresponde."
        action={
          <ButtonLink href="/sanar/agendar" size="lg">
            Agendar evaluación
          </ButtonLink>
        }
      />
    </main>
  );
}
