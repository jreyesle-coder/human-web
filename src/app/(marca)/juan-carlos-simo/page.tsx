import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { BookAside } from "@/components/blocks/BookAside";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Prose, Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { JsonLd } from "@/components/ui/JsonLd";
import { Pendiente } from "@/components/ui/Pendiente";
import { CITAS, LIBRO } from "@/lib/marca";
import { metaPagina } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = metaPagina({
  title: "Juan Carlos Simó",
  description:
    "Fisioterapeuta, psicólogo clínico, strength coach y autor de Filosofía The Simó Diet. Trayectoria, formación y publicaciones.",
  path: "/juan-carlos-simo",
  seccion: "Fundador",
});

/** Todo lo de esta página sale de docs/00-marca-y-filosofia.md. Nada agregado (S3-15). */
const FORMACION = [
  "Fisioterapeuta",
  "Licenciado en psicología clínica",
  "Strength coach y mentor",
  "Formación en el Institute for Functional Medicine",
  "Formación en la American Academy of Anti-Aging Medicine",
];

/** Apariciones en medios con enlace verificable (S3-16). */
const MEDIOS = [
  {
    medio: "El Nuevo Diario",
    titulo: "Juan Carlos Simó considera un error comer con frecuencia para aumentar metabolismo",
    url: "https://elnuevodiario.com.do/juan-carlos-simo-considera-un-error-comer-con-frecuencia-para-aumentar-metabolismo/",
  },
];

export default function JuanCarlosSimoPage() {
  const url = siteUrl();
  return (
    <main>
      <PageHeader
        path="/juan-carlos-simo"
        eyebrow="Fundador"
        title="Juan Carlos Simó"
        tone="ink"
        lead={
          <p>
            Especialista en rehabilitación funcional, nutrición para transformación estética y
            prevención de enfermedades. Su gimnasio es Human Balance; al lado funciona el Centro de
            Dietética Funcional, y su tienda es Human Stores.
          </p>
        }
        media={
          <ImagePlaceholder
            width={800}
            height={1000}
            label="fotografía oficial de Juan Carlos Simó"
            tone="dark"
          />
        }
      />

      <Section tone="surface" title="Formación">
        <ul className="grid gap-3 sm:grid-cols-2">
          {FORMACION.map((f) => (
            <li key={f} className="flex items-start gap-3 rounded-md border-2 border-line p-4">
              <span aria-hidden="true" className="mt-1 size-2 shrink-0 rounded-pill bg-amber" />
              {f}
            </li>
          ))}
        </ul>
        <Pendiente
          texto="trayectoria completa con fechas e instituciones, verificada por Juan Carlos Simó"
          className="mt-6"
        />
      </Section>

      <Section title="Publicaciones">
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
          <Prose>
            <p>
              En {LIBRO.anio} publicó <cite>{LIBRO.titulo}</cite>, estructurado en tres pasos con
              origen en la dieta de eliminación: eliminar, reparar y liberar.
            </p>
            <blockquote>
              <p>“{CITAS[1]}”</p>
            </blockquote>
          </Prose>
          <BookAside />
        </div>
      </Section>

      <Section tone="mist" title="En medios">
        <ul className="grid gap-3">
          {MEDIOS.map((m) => (
            <li key={m.url}>
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md bg-surface p-4 hover:shadow-card"
              >
                <span className="text-small font-semibold text-stone">{m.medio}</span>
                <span className="mt-1 block font-semibold underline decoration-2 underline-offset-4">
                  {m.titulo}
                </span>
                <span className="sr-only"> (abre en otra ventana)</span>
              </a>
            </li>
          ))}
        </ul>
        <Pendiente
          texto="enlaces oficiales a la cobertura del libro (Diario Libre, Listín Diario, El Caribe, Hoy) y a podcasts (cliente)"
          className="mt-6"
        />
      </Section>

      <CTABand
        title="Conoce el método"
        action={
          <ButtonLink href="/metodo" size="lg" variant="inverse">
            Eliminar · Reparar · Liberar
          </ButtonLink>
        }
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${url}/juan-carlos-simo#persona`,
          name: "Juan Carlos Simó Velázquez",
          alternateName: "Juan Carlos Simó",
          url: `${url}/juan-carlos-simo`,
          jobTitle: "Fisioterapeuta y strength coach",
          description:
            "Fisioterapeuta, licenciado en psicología clínica, strength coach y mentor. Especialista en rehabilitación funcional, nutrición y prevención de enfermedades.",
          knowsAbout: [
            "Rehabilitación funcional",
            "Dietética funcional",
            "Entrenamiento de fuerza",
          ],
          alumniOf: [
            { "@type": "Organization", name: "Institute for Functional Medicine" },
            { "@type": "Organization", name: "American Academy of Anti-Aging Medicine" },
          ],
          worksFor: { "@id": `${url}/#organizacion` },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Santo Domingo",
            addressCountry: "DO",
          },
          subjectOf: [
            {
              "@type": "Book",
              name: LIBRO.titulo,
              datePublished: String(LIBRO.anio),
              inLanguage: "es",
            },
            ...MEDIOS.map((m) => ({
              "@type": "NewsArticle",
              headline: m.titulo,
              url: m.url,
              publisher: { "@type": "Organization", name: m.medio },
            })),
          ],
        }}
      />
    </main>
  );
}
