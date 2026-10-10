import type { Metadata } from "next";
import Link from "next/link";
import { CTABand } from "@/components/blocks/Bands";
import { MethodSteps } from "@/components/blocks/MethodSteps";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Entrenar · Human Balance",
  description:
    "Human Balance: entrenamiento personalizado en Santo Domingo que empieza con una evaluación física, corrige la técnica y se ajusta a tu objetivo.",
  path: "/entrenar",
  seccion: "Entrenar",
});

/** S4-01: el diferencial es la evaluación, según lo declaran sus propios clientes (docs/00). */
const DIFERENCIAL = [
  {
    titulo: "Una evaluación que encuentra lo que no sabías",
    texto:
      "La evaluación detecta problemas físicos que no sabías que tenías, antes de empezar a entrenar.",
  },
  {
    titulo: "Técnica corregida",
    texto: "Corrección técnica en cada ejercicio.",
  },
  {
    titulo: "Ajustado a tu objetivo",
    texto: "El plan responde a lo que buscas. No es un gimnasio de membresía por volumen.",
  },
];

const SECCIONES = [
  {
    href: "/entrenar/modalidades",
    titulo: "Modalidades",
    texto: "Los tipos de entrenamiento y en qué se diferencian.",
  },
  { href: "/entrenar/coaches", titulo: "Coaches", texto: "Quién te entrena y qué sabe hacer." },
  {
    href: "/entrenar/instalaciones",
    titulo: "Instalaciones",
    texto: "Espacios, horarios y cómo llegar.",
  },
];

export default function EntrenarPage() {
  return (
    <main>
      <PageHeader
        path="/entrenar"
        eyebrow="Human Balance"
        title="Entrenar"
        tone="ink"
        lead="Entrenamiento personalizado que empieza con una evaluación física, corrige la técnica y se ajusta a tu objetivo."
        actions={
          <ButtonLink href="/entrenar/clase-de-prueba" size="lg">
            Agendar clase de prueba
          </ButtonLink>
        }
        media={
          <ImagePlaceholder
            width={1200}
            height={900}
            label="fotografía de entrenamiento en Human Balance"
            tone="dark"
          />
        }
      />

      <Section tone="surface" title="Qué cambia cuando entrenas aquí">
        <ul className="grid gap-4 md:grid-cols-3">
          {DIFERENCIAL.map((d, i) => (
            <li key={d.titulo} className="rounded-lg border-2 border-line p-6">
              <span aria-hidden="true" className="font-display text-h2 font-bold text-amber">
                0{i + 1}
              </span>
              <h3 className="mt-2 font-display text-h3 font-bold">{d.titulo}</h3>
              <p className="mt-2 text-body">{d.texto}</p>
            </li>
          ))}
        </ul>
        <Pendiente
          texto="propuesta de Human Balance en palabras del equipo, validada por Juan Carlos Simó"
          className="mt-8"
        />
      </Section>

      <Section title="Conoce Human Balance">
        <ul className="grid gap-4 md:grid-cols-3">
          {SECCIONES.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="block h-full rounded-lg bg-surface p-6 shadow-card hover:-translate-y-0.5"
              >
                <h3 className="font-display text-h3 font-bold">{s.titulo}</h3>
                <p className="mt-2 text-body text-stone">{s.texto}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* S4-06: el entrenamiento es parte del mismo recorrido. */}
      <Section
        tone="mist"
        title="Parte del mismo recorrido"
        intro={
          <p>
            El entrenamiento trabaja junto al consultorio y la suplementación, guiado por el método.
          </p>
        }
      >
        <MethodSteps />
        <ButtonLink href="/metodo" variant="secondary" className="mt-8">
          Conocer el método
        </ButtonLink>
      </Section>

      <CTABand
        title="Empieza con una clase de prueba"
        action={
          <ButtonLink href="/entrenar/clase-de-prueba" size="lg">
            Agendar clase de prueba
          </ButtonLink>
        }
      />
    </main>
  );
}
