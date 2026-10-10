import type { Metadata } from "next";
import Image from "next/image";
import { CTABand } from "@/components/blocks/Bands";
import { BookAside } from "@/components/blocks/BookAside";
import { Prose, Section } from "@/components/blocks/Section";
import { VideoLite } from "@/components/blocks/VideoLite";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Card";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumb } from "@/components/ui/Navigation";
import { Pendiente } from "@/components/ui/Pendiente";
import { CITAS, LIBRO } from "@/lib/marca";
import { migasPara } from "@/lib/routes";
import { metaPagina } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import { APARICIONES, FOTO_SIMO, PODCAST, REDES } from "@/lib/simo";

export const metadata: Metadata = metaPagina({
  title: "Juan Carlos Simó",
  description:
    "Fisioterapeuta, psicólogo clínico, strength coach y autor de Filosofía The Simó Diet. Conduce el podcast Vida Sana. Trayectoria, formación y apariciones.",
  path: "/juan-carlos-simo",
  seccion: "Fundador",
});

/** Formación según docs/00-marca-y-filosofia.md y la descripción de Clean Health (S3-15). */
const FORMACION = [
  "Fisioterapeuta",
  "Licenciado en psicología clínica",
  "Strength coach y mentor",
  "Formación en medicina funcional en el Institute for Functional Medicine",
  "Formación continuada en la American Academy of Anti-Aging Medicine",
];

const ESPECIALIDADES = [
  "Rehabilitación funcional",
  "Nutrición para transformación estética",
  "Prevención de enfermedades",
];

export default function JuanCarlosSimoPage() {
  const url = siteUrl();
  return (
    <main>
      <section className="bg-ink text-bone">
        <div className="mx-auto w-full max-w-content px-gutter pt-4">
          <Breadcrumb
            items={migasPara("/juan-carlos-simo")}
            className="[&_a]:text-bone/80 [&_span]:text-bone"
          />
        </div>
        <div className="mx-auto grid w-full max-w-content gap-10 px-gutter py-10 md:grid-cols-[2fr_3fr] md:items-center lg:py-16">
          <Image
            src={FOTO_SIMO.src}
            alt={FOTO_SIMO.alt}
            width={FOTO_SIMO.width}
            height={FOTO_SIMO.height}
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="h-auto max-h-[55vh] w-full max-w-md rounded-lg object-cover object-top md:max-h-none"
          />
          <div>
            <p className="text-small font-semibold tracking-widest uppercase">Fundador</p>
            <h1 className="mt-3 font-display text-display font-bold tracking-tight">
              Juan Carlos Simó
            </h1>
            <p className="mt-5 max-w-reading text-body">
              Fisioterapeuta, licenciado en psicología clínica, strength coach y mentor. Su gimnasio
              es Human Balance; al lado funciona el Centro de Dietética Funcional, y su tienda es
              Human Stores. Autor de <cite>{LIBRO.titulo}</cite> y conductor del podcast{" "}
              {PODCAST.nombre}.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {ESPECIALIDADES.map((e) => (
                <li key={e}>
                  <Badge className="bg-bone/10 text-bone">{e}</Badge>
                </li>
              ))}
            </ul>
            <blockquote className="mt-8 border-l-4 border-amber pl-5 font-display text-h3 font-semibold">
              <p>“{CITAS[0]}”</p>
            </blockquote>
          </div>
        </div>
      </section>

      <Section tone="surface" title="Formación">
        <ul className="grid gap-3 sm:grid-cols-2">
          {FORMACION.map((f) => (
            <li key={f} className="flex items-start gap-3 rounded-md border-2 border-line p-4">
              <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-pill bg-amber" />
              {f}
            </li>
          ))}
        </ul>
        <Pendiente
          texto="trayectoria con fechas e instituciones (años de práctica, títulos y dónde los obtuvo), verificada por Juan Carlos Simó"
          className="mt-6"
        />
      </Section>

      <Section
        title={PODCAST.nombre}
        intro={
          <p>
            Su podcast sobre alimentación, metabolismo, entrenamiento y hábitos, con más de{" "}
            {PODCAST.episodios} episodios publicados en YouTube. Ahí explica el método en detalle.
          </p>
        }
      >
        <ul className="grid gap-8 md:grid-cols-3">
          {PODCAST.destacados.map((v) => (
            <li key={v.id}>
              <VideoLite id={v.id} titulo={v.titulo} duracion={v.duracion} nota={v.nota} />
            </li>
          ))}
        </ul>
        <ButtonLink
          href={PODCAST.canal}
          variant="secondary"
          className="mt-8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver todos los episodios en YouTube
          <span className="sr-only"> (abre en otra ventana)</span>
        </ButtonLink>
      </Section>

      <Section tone="surface" title="Publicaciones">
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

      <Section tone="mist" title="Entrevistas y apariciones">
        <ul className="grid gap-3 md:grid-cols-2">
          {APARICIONES.map((a) => (
            <li key={a.url}>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col rounded-md bg-surface p-5 hover:shadow-card"
              >
                <span className="flex flex-wrap items-center gap-2 text-small font-semibold text-stone">
                  {a.medio}
                  <Badge>{a.tipo}</Badge>
                  {a.idioma && <Badge>En inglés</Badge>}
                  {a.anio && <span>{a.anio}</span>}
                </span>
                <span className="mt-2 block font-semibold underline decoration-2 underline-offset-4">
                  {a.titulo}
                </span>
                <span className="sr-only"> (abre en otra ventana)</span>
              </a>
            </li>
          ))}
        </ul>
        <Pendiente
          texto="enlaces a la cobertura del libro en Diario Libre, Listín Diario, El Caribe y Hoy (cliente)"
          className="mt-6"
        />
      </Section>

      <Section title="Síguelo">
        <ul className="flex flex-wrap gap-3">
          {REDES.map((r) => (
            <li key={r.url}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-tap items-center gap-2 rounded-pill border-2 border-ink px-5 font-semibold hover:bg-ink hover:text-bone"
              >
                {r.red} <span className="font-normal">{r.usuario}</span>
                <span className="sr-only"> (abre en otra ventana)</span>
              </a>
            </li>
          ))}
        </ul>
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
          image: `${url}${FOTO_SIMO.src}`,
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
          sameAs: REDES.filter((r) => r.red !== "Facebook").map((r) => r.url),
          subjectOf: [
            {
              "@type": "Book",
              name: LIBRO.titulo,
              datePublished: String(LIBRO.anio),
              inLanguage: "es",
            },
            {
              "@type": "PodcastSeries",
              name: PODCAST.nombre,
              url: PODCAST.canal,
              inLanguage: "es",
            },
            ...APARICIONES.map((a) => ({
              "@type":
                a.tipo === "Prensa"
                  ? "NewsArticle"
                  : a.tipo === "Video"
                    ? "VideoObject"
                    : "PodcastEpisode",
              name: a.titulo,
              url: a.url,
              publisher: { "@type": "Organization", name: a.medio },
            })),
          ],
        }}
      />
    </main>
  );
}
