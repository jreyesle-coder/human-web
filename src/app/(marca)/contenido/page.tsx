import type { Metadata } from "next";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Contenido",
  description:
    "Artículos y videos de Juan Carlos Simó sobre alimentación, entrenamiento y salud funcional.",
  path: "/contenido",
  seccion: "Contenido",
});

export default function Page() {
  return (
    <main>
      <PageHeader
        path="/contenido"
        eyebrow="Contenido"
        title="Aprender antes de decidir"
        lead="Artículos y videos para entender el porqué antes de la acción."
      />
      <Section>
        <Pendiente texto="artículos publicados (equipo de contenido)" />
      </Section>
    </main>
  );
}
