import { CTABand } from "@/components/blocks/Bands";
import { BookAside } from "@/components/blocks/BookAside";
import { ContentPage, metaContenido } from "@/components/blocks/ContentPage";
import { MethodSteps } from "@/components/blocks/MethodSteps";
import { ButtonLink } from "@/components/ui/Button";
import { slugsDe } from "@/lib/content";
import { PASOS_METODO } from "@/lib/marca";

export async function generateStaticParams() {
  return slugsDe("metodo", "paso");
}

export async function generateMetadata(props: PageProps<"/metodo/[paso]">) {
  const { paso } = await props.params;
  return metaContenido({ collection: "metodo", slug: paso, base: "/metodo", seccion: "Método" });
}

export default async function PasoPage(props: PageProps<"/metodo/[paso]">) {
  const { paso } = await props.params;
  const i = PASOS_METODO.findIndex((p) => p.slug === paso);
  const actual = PASOS_METODO[i];
  const siguiente = PASOS_METODO[i + 1];

  return (
    <ContentPage
      collection="metodo"
      slug={paso}
      base="/metodo"
      seccion="Método"
      eyebrow={actual ? `Paso ${actual.numero} de 3` : "El método"}
      antes={
        actual && (
          <nav aria-label="Posición en el método" className="bg-surface">
            <div className="mx-auto w-full max-w-content px-gutter py-6">
              <MethodSteps activo={actual.slug} headingLevel={2} />
            </div>
          </nav>
        )
      }
      despues={
        <>
          <div className="mx-auto w-full max-w-content px-gutter pb-12">
            <div className="max-w-reading">
              <BookAside />
            </div>
          </div>
          {/* S3-14: los dos primeros pasos llevan al siguiente; el tercero, a la evaluación. */}
          {siguiente ? (
            <CTABand
              title={`Siguiente paso: ${siguiente.nombre}`}
              text={siguiente.resumen}
              action={
                <ButtonLink href={`/metodo/${siguiente.slug}`} size="lg" variant="inverse">
                  Ir a {siguiente.nombre}
                </ButtonLink>
              }
            />
          ) : (
            <CTABand
              title="Tu recorrido empieza con una evaluación"
              text="En consulta se define desde qué paso partes y qué protocolo te corresponde."
              action={
                <ButtonLink href="/sanar/agendar" size="lg">
                  Agendar evaluación
                </ButtonLink>
              }
            />
          )}
        </>
      }
    />
  );
}
