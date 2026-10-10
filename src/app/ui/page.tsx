import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CTABand, FAQ, TrustSignals } from "@/components/blocks/Bands";
import { CoachCard, ProductCard, ProtocolCard, StoryCard } from "@/components/blocks/Cards";
import { ContactStrip } from "@/components/blocks/ContactStrip";
import { Hero } from "@/components/blocks/Hero";
import { MethodSteps } from "@/components/blocks/MethodSteps";
import { RouteCards } from "@/components/blocks/RouteCards";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Badge, Card } from "@/components/ui/Card";
import { Checkbox, Input, RadioGroup, Select, Textarea } from "@/components/ui/Field";
import { Accordion } from "@/components/ui/Disclosure";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Breadcrumb, Pagination } from "@/components/ui/Navigation";
import { Pendiente } from "@/components/ui/Pendiente";
import { Skeleton } from "@/components/ui/Toast";
import { DialogDemo, LoadingDemo, TabsDemo, ToastDemo } from "./Demos";

export const metadata: Metadata = {
  title: "Catálogo de componentes",
  robots: { index: false, follow: false },
};

const COLORES = [
  "ink",
  "bone",
  "surface",
  "functional",
  "functional-soft",
  "amber",
  "amber-strong",
  "stone",
  "line",
  "line-strong",
  "mist",
  "error",
  "success",
  "warning",
];

function Muestra({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="border-t-2 border-line py-10" aria-labelledby={`ui-${titulo}`}>
      <h2 id={`ui-${titulo}`} className="font-display text-h2 font-bold">
        {titulo}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function UiCatalog() {
  return (
    <main>
      <div className="mx-auto w-full max-w-content px-gutter py-12">
        <h1 className="font-display text-h1 font-bold">Catálogo de componentes</h1>
        <p className="mt-3 max-w-reading text-body text-stone">
          Sistema de diseño de HUMAN: todos los primitivos y bloques con sus variantes y estados.
          Página interna, no indexada.
        </p>

        <Muestra titulo="Color">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {COLORES.map((c) => (
              <li key={c} className="overflow-hidden rounded-md border-2 border-line bg-surface">
                <div className="h-16" style={{ background: `var(--color-${c})` }} />
                <p className="p-2 text-small font-semibold">{c}</p>
              </li>
            ))}
          </ul>
        </Muestra>

        <Muestra titulo="Tipografía">
          <div className="grid gap-3">
            <p className="font-display text-display font-bold">Display · Archivo</p>
            <p className="font-display text-h1 font-bold">Título de página · Ñandú</p>
            <p className="font-display text-h2 font-bold">Sección · Señales de confianza</p>
            <p className="font-display text-h3 font-semibold">
              Subsección · Árbol, acción, búsqueda
            </p>
            <p className="text-body">
              Cuerpo · Source Sans 3. Tildes y eñes: canción, nutrición, pequeño, años, Simó.
            </p>
            <p className="text-small text-stone">Apoyo · 14 px</p>
            <p className="text-micro text-stone">Legales · 12 px, única excepción bajo 14 px</p>
          </div>
        </Muestra>

        <Muestra titulo="Botones">
          <div className="grid gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primario</Button>
              <Button variant="secondary">Secundario</Button>
              <Button variant="ghost">Fantasma</Button>
              <Button variant="link">Enlace</Button>
              <ButtonLink href="/ui" variant="secondary">
                Como enlace
              </ButtonLink>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg">Grande</Button>
              <Button disabled>Deshabilitado</Button>
              <Button variant="secondary" disabled>
                Secundario deshabilitado
              </Button>
              <Button loading>Cargando</Button>
              <LoadingDemo />
            </div>
            <div className="flex flex-wrap items-center gap-3 rounded-lg bg-ink p-6">
              <Button variant="inverse">Inverso sobre negro</Button>
              <Button>Primario sobre negro</Button>
            </div>
          </div>
        </Muestra>

        <Muestra titulo="Formularios">
          <form className="grid max-w-form gap-6" noValidate>
            <Input id="ui-nombre" label="Nombre" autoComplete="name" />
            <Input
              id="ui-correo"
              label="Correo"
              type="email"
              hint="Te escribimos solo para confirmar tu cita."
              defaultValue="correo-invalido"
              error="Escribe un correo válido, por ejemplo nombre@dominio.com."
            />
            <Input id="ui-telefono" label="Teléfono" optional type="tel" />
            <Input
              id="ui-deshabilitado"
              label="Campo deshabilitado"
              disabled
              defaultValue="No editable"
            />
            <Select
              id="ui-motivo"
              label="Motivo general"
              options={[
                { value: "fatiga", label: "Fatiga" },
                { value: "sueno", label: "Sueño" },
              ]}
            />
            <Textarea id="ui-mensaje" label="Mensaje" optional />
            <RadioGroup
              name="ui-horario"
              legend="Preferencia de horario"
              defaultValue="manana"
              options={[
                { value: "manana", label: "Mañana" },
                { value: "tarde", label: "Tarde" },
                { value: "noche", label: "Noche", disabled: true },
              ]}
            />
            <Checkbox id="ui-consentimiento">Acepto el aviso de privacidad.</Checkbox>
            <Checkbox id="ui-consentimiento-error" error="Debes aceptar para continuar.">
              Casilla con error
            </Checkbox>
          </form>
        </Muestra>

        <Muestra titulo="Tarjetas e insignias">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>Superficie</Card>
            <Card tone="bone">Hueso</Card>
            <Card tone="functional">Funcional</Card>
            <Card tone="ink" href="/ui">
              Tarjeta enlace
            </Card>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>Neutra</Badge>
            <Badge tone="functional">Funcional</Badge>
            <Badge tone="success">En existencia</Badge>
            <Badge tone="warning">Agotado</Badge>
            <Badge tone="error">Error</Badge>
            <Badge tone="pending">Pendiente</Badge>
          </div>
        </Muestra>

        <Muestra titulo="Navegación">
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Tienda", href: "/tienda" },
              { label: "Protocolos", href: "/tienda/protocolos" },
            ]}
          />
          <Pagination current={2} total={4} hrefFor={(p) => `/ui?pagina=${p}`} className="mt-6" />
        </Muestra>

        <Muestra titulo="Pestañas, acordeón y diálogo">
          <TabsDemo />
          <Accordion
            className="mt-8"
            items={[
              {
                id: "a",
                title: "¿Qué incluye la primera consulta?",
                content: <p>Respuesta directa primero.</p>,
              },
              {
                id: "b",
                title: "¿Cuánto dura?",
                content: <p>Explicación después.</p>,
              },
            ]}
          />
          <div className="mt-8">
            <DialogDemo />
          </div>
        </Muestra>

        <Muestra titulo="Avisos, carga y pendientes">
          <ToastDemo />
          <div className="mt-6 grid max-w-form gap-3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Pendiente texto="texto que el cliente debe aprobar" />
            <ImagePlaceholder width={1200} height={800} label="foto de instalaciones" />
          </div>
        </Muestra>
      </div>

      <Muestra titulo="Bloques">
        <div className="grid gap-12">
          <Hero
            variant="marca"
            eyebrow="Hero · marca"
            title="HUMAN"
            lead={<Pendiente texto="promesa de portada" />}
            actions={<ButtonLink href="/ui">Acción principal</ButtonLink>}
          />
          <Hero
            tone="functional"
            eyebrow="Hero · unidad"
            title="Sanar"
            lead="Variante de unidad, con color de la sección."
            media={
              <ImagePlaceholder width={800} height={600} label="foto del consultorio" tone="dark" />
            }
          />
          <Hero
            tone="ink"
            variant="producto"
            eyebrow="Hero · producto"
            title="Protocolo de ejemplo"
          />
          <div className="mx-auto w-full max-w-content px-gutter">
            <RouteCards headingLevel={3} />
          </div>
          <div className="mx-auto w-full max-w-content px-gutter">
            <MethodSteps activo="reparar" />
          </div>
          <div className="mx-auto grid w-full max-w-content gap-4 px-gutter sm:grid-cols-2 lg:grid-cols-4">
            <StoryCard
              href="/ui"
              nombre="Nombre autorizado"
              objetivo="Composición corporal"
              extracto="Extracto de la historia."
            />
            <CoachCard href="/ui" nombre="Nombre del coach" especialidad="Especialidad" />
            <ProtocolCard
              href="/ui"
              nombre="Protocolo"
              objetivo="Objetivo del protocolo."
              productos={3}
            />
            <ProductCard
              href="/ui"
              nombre="Producto de ejemplo"
              precio="RD$ 2,300.00"
              categoria="Categoría"
              agotado
            />
          </div>
          <div className="mx-auto w-full max-w-content px-gutter">
            <TrustSignals
              items={[
                {
                  titulo: "Ingredientes",
                  detalle: "Lista completa en cada ficha.",
                },
                {
                  titulo: "Certificaciones",
                  pendiente: "certificaciones de los productos",
                },
                { titulo: "Origen", pendiente: "país de fabricación" },
                { titulo: "Asesoría", detalle: "Respaldo del consultorio." },
              ]}
            />
          </div>
          <div className="mx-auto w-full max-w-content px-gutter">
            <FAQ
              schema={false}
              items={[
                {
                  pregunta: "¿Pregunta frecuente?",
                  respuesta: "Respuesta directa en la primera frase.",
                },
              ]}
            />
          </div>
          <div className="mx-auto w-full max-w-content px-gutter">
            <ContactStrip origen="ui" />
          </div>
          <CTABand
            title="Banda de llamado"
            text="Una sola acción."
            action={<ButtonLink href="/ui">Acción</ButtonLink>}
          />
        </div>
      </Muestra>
    </main>
  );
}
