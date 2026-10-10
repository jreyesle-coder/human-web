import type { Metadata } from "next";
import Link from "next/link";
import { StoryCard } from "@/components/blocks/Cards";
import { ContactStrip } from "@/components/blocks/ContactStrip";
import { Hero } from "@/components/blocks/Hero";
import { MethodSteps } from "@/components/blocks/MethodSteps";
import { RouteCards } from "@/components/blocks/RouteCards";
import { Section } from "@/components/blocks/Section";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { getEntries } from "@/lib/content";
import { turnstileSiteKey } from "@/lib/forms/config";
import { CITAS, LIBRO } from "@/lib/marca";
import { metaPagina } from "@/lib/seo";
import { SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = metaPagina({
  title: "HUMAN · Entrenar, sanar y sostener",
  description: SITE_DESCRIPTION,
  path: "/",
});

export default async function Home() {
  const historias = (await getEntries("historias")).slice(0, 3);

  return (
    <main>
      {/* S3-01: la promesa específica la aprueba el cliente. */}
      <Hero
        variant="marca"
        eyebrow="Human Performance Center · Santo Domingo"
        title={
          <>
            Entrenar, sanar
            <br />y sostener.
          </>
        }
        lead={
          <>
            <Pendiente texto="promesa de portada aprobada por Juan Carlos Simó: a quién sirve y qué resuelve, en una frase" />
            <p className="mt-4">
              Escoge por dónde empezar. Las tres puertas llevan al mismo recorrido.
            </p>
          </>
        }
      >
        {/* S3-02: las tres rutas son la decisión principal, visibles al primer scroll en móvil. */}
        <div className="mt-8">
          <RouteCards />
        </div>
      </Hero>

      <Section
        tone="surface"
        title="Un método en tres pasos"
        intro={
          <p>
            La filosofía <cite>{LIBRO.titulo}</cite> ordena todo lo que hacemos: primero se elimina
            lo que inflama, después se repara la función y al final se sueltan las creencias que no
            sirven.
          </p>
        }
      >
        <MethodSteps />
        <ButtonLink href="/metodo" variant="secondary" className="mt-8">
          Conocer el método
        </ButtonLink>
      </Section>

      <Section
        title="Historias reales"
        intro={<p>Solo publicamos historias con autorización firmada de cada persona.</p>}
      >
        {historias.length > 0 ? (
          <ul className="grid gap-4 md:grid-cols-3">
            {historias.map((h) => (
              <li key={h.slug}>
                <StoryCard
                  href={`/historias/${h.slug}`}
                  nombre={h.frontmatter.nombre}
                  objetivo={h.frontmatter.objetivo}
                  extracto={h.frontmatter.description}
                />
              </li>
            ))}
          </ul>
        ) : (
          <Pendiente texto="historias con resultados concretos y autorización firmada (cliente)" />
        )}
      </Section>

      <Section tone="ink">
        <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:items-center">
          <div>
            <p className="text-small font-semibold tracking-widest uppercase">Fundador</p>
            <h2 className="mt-2 font-display text-h2 font-bold">Juan Carlos Simó</h2>
            <p className="mt-4 text-body">
              Fisioterapeuta, licenciado en psicología clínica, strength coach y mentor. Formado en
              el Institute for Functional Medicine y en la American Academy of Anti-Aging Medicine.
              Autor de <cite>{LIBRO.titulo}</cite> ({LIBRO.anio}).
            </p>
            <Link
              href="/juan-carlos-simo"
              className="mt-6 inline-flex min-h-tap items-center font-semibold underline decoration-2 underline-offset-4"
            >
              Trayectoria y formación
            </Link>
          </div>
          <blockquote className="border-l-4 border-amber pl-6 font-display text-h3 font-semibold">
            <p>“{CITAS[0]}”</p>
            <footer className="mt-3 text-small font-normal">Juan Carlos Simó</footer>
          </blockquote>
        </div>
      </Section>

      <Section
        tone="surface"
        title="Recibe lo nuevo del método"
        intro={
          <>
            <p>Te escribimos cuando publicamos un artículo o un protocolo nuevo. Nada más.</p>
            <Pendiente
              as="linea"
              texto="frecuencia y contenido del boletín (cliente)"
              className="mt-2 inline-block text-small"
            />
          </>
        }
      >
        <NewsletterForm siteKey={turnstileSiteKey()} />
      </Section>

      <Section title="Visítanos o escríbenos">
        <ContactStrip origen="portada" />
      </Section>
    </main>
  );
}
