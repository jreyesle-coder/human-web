import type { Metadata } from "next";
import { ContactStrip } from "@/components/blocks/ContactStrip";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { UNIDADES } from "@/lib/marca";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Contacto",
  description:
    "Escríbenos por WhatsApp a Human Balance, al Centro de Dietética Funcional o a Human Stores. Av. Abraham Lincoln, Santo Domingo.",
  path: "/contacto",
  seccion: "Contacto",
});

export default function ContactoPage() {
  return (
    <main>
      <PageHeader
        path="/contacto"
        eyebrow="Contacto"
        title="Hablemos"
        lead="Cada unidad tiene su propio canal. Escoge el que corresponde a lo que necesitas."
      />
      <Section tone="surface">
        <ContactStrip origen="contacto" />
      </Section>
      <Section title="Si ya sabes lo que quieres">
        <ul className="grid gap-4 md:grid-cols-3">
          {UNIDADES.map((u) => (
            <li key={u.clave} className="rounded-lg bg-surface p-6">
              <p className="text-small font-semibold tracking-widest text-stone uppercase">
                {u.nombre}
              </p>
              <h3 className="mt-1 font-display text-h3 font-bold">{u.verbo}</h3>
              <ButtonLink href={u.accion.href} variant="secondary" className="mt-4">
                {u.accion.label}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
