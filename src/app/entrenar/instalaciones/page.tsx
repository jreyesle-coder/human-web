import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/Bands";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Pendiente } from "@/components/ui/Pendiente";
import { UBICACION } from "@/lib/marca";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Instalaciones",
  description:
    "Los espacios de Human Balance en la Av. Abraham Lincoln, Santo Domingo: horarios y cómo llegar.",
  path: "/entrenar/instalaciones",
  seccion: "Entrenar",
});

const MAPA = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Human Balance ${UBICACION.calle} ${UBICACION.ciudad}`,
)}`;

export default function InstalacionesPage() {
  return (
    <main>
      <PageHeader
        path="/entrenar/instalaciones"
        eyebrow="Human Balance"
        title="Instalaciones"
        tone="ink"
        lead={`${UBICACION.calle}, ${UBICACION.ciudad}. Al lado funciona el Centro de Dietética Funcional.`}
      />
      <Section tone="surface" title="Los espacios">
        <div className="grid gap-4 md:grid-cols-3">
          <ImagePlaceholder width={1200} height={900} label="área de entrenamiento" />
          <ImagePlaceholder width={1200} height={900} label="área de evaluación" />
          <ImagePlaceholder width={1200} height={900} label="fachada y acceso" />
        </div>
      </Section>
      <Section title="Horarios y cómo llegar">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-h3 font-bold">Horarios</h3>
            <Pendiente texto="horario de Human Balance por día de la semana" className="mt-3" />
          </div>
          <div>
            <h3 className="font-display text-h3 font-bold">Ubicación</h3>
            <address className="mt-3 text-body not-italic">
              {UBICACION.calle}
              <br />
              {UBICACION.ciudad}, {UBICACION.pais}
            </address>
            <Pendiente
              as="linea"
              texto="dirección exacta con número y referencia"
              className="mt-2 inline-block text-small"
            />
            <ButtonLink
              href={MAPA}
              variant="secondary"
              className="mt-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir en el mapa
              <span className="sr-only"> (abre en otra ventana)</span>
            </ButtonLink>
          </div>
        </div>
      </Section>
      <CTABand
        title="Ven a conocer el espacio"
        action={
          <ButtonLink href="/entrenar/clase-de-prueba" size="lg">
            Agendar clase de prueba
          </ButtonLink>
        }
      />
    </main>
  );
}
