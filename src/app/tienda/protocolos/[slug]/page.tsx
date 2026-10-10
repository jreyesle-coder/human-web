import Link from "next/link";
import { notFound } from "next/navigation";
import { CTABand, FAQ } from "@/components/blocks/Bands";
import { ProductCard } from "@/components/blocks/Cards";
import { metaContenido } from "@/components/blocks/ContentPage";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Prose, Section } from "@/components/blocks/Section";
import { AddToCart } from "@/components/shop/AddToCart";
import { AvisoAlcance, CatalogoNoDisponible } from "@/components/shop/ShopNotices";
import { ButtonLink } from "@/components/ui/Button";
import { Pendiente } from "@/components/ui/Pendiente";
import { getEntry, slugsDe } from "@/lib/content";
import { cargarMdx } from "@/lib/content/render";
import { itemDe, protocoloCompleto } from "@/lib/protocolos";
import { precioDOP } from "@/lib/woo";

export async function generateStaticParams() {
  return slugsDe("protocolos", "slug");
}

export async function generateMetadata(props: PageProps<"/tienda/protocolos/[slug]">) {
  const { slug } = await props.params;
  return metaContenido({
    collection: "protocolos",
    slug,
    base: "/tienda/protocolos",
    seccion: "Tienda",
  });
}

/** S6-09: para quién es, qué incluye, cómo se toma, por cuánto tiempo, qué esperar, qué no es. */
const ESTRUCTURA = ["Cómo se toma", "Por cuánto tiempo", "Qué esperar", "Qué no es"];

export default async function ProtocoloPage(props: PageProps<"/tienda/protocolos/[slug]">) {
  const { slug } = await props.params;
  const p = await protocoloCompleto(slug);
  if (!p) notFound();
  const { entry, productos, disponibles, total, catalogoOk } = p;
  const Narrativa = await cargarMdx("protocolos", slug);
  const motivo = entry.frontmatter.motivo
    ? await getEntry("motivos", entry.frontmatter.motivo)
    : undefined;

  const agregar = (
    <AddToCart
      items={disponibles.map(itemDe)}
      protocolo={slug}
      size="lg"
      label={
        disponibles.length
          ? `Agregar protocolo completo · ${precioDOP(total)}`
          : "Protocolo no disponible"
      }
    />
  );

  return (
    <main>
      <PageHeader
        path={`/tienda/protocolos/${slug}`}
        actual={entry.frontmatter.title}
        eyebrow="Protocolo"
        title={entry.frontmatter.title}
        variant="producto"
        lead={
          <>
            <p className="font-semibold">Para quién es</p>
            <p>{entry.frontmatter.objetivo}</p>
          </>
        }
        actions={agregar}
      >
        <AvisoAlcance className="mt-6" />
      </PageHeader>

      <Section tone="surface" title="Qué incluye">
        {!catalogoOk ? (
          <CatalogoNoDisponible mensaje="No pudimos cargar los productos de este protocolo en este momento." />
        ) : productos.length === 0 ? (
          <Pendiente
            texto={`productos del protocolo ${entry.frontmatter.title}: etiquetarlos con "${entry.frontmatter.wooTag}" en WooCommerce (cliente)`}
          />
        ) : (
          <>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {productos.map((pr) => (
                <li key={pr.id}>
                  <ProductCard
                    href={`/tienda/productos/${pr.slug}`}
                    nombre={pr.nombre}
                    precio={precioDOP(pr.precio)}
                    imagen={pr.imagenes[0]}
                    categoria={pr.categorias[0]?.nombre}
                    agotado={!pr.enExistencia}
                  />
                </li>
              ))}
            </ul>
            {disponibles.length < productos.length && (
              <p className="mt-4 text-small text-stone">
                Los productos agotados no se agregan al carrito con el protocolo completo.
              </p>
            )}
            <div className="mt-8">{agregar}</div>
          </>
        )}
      </Section>

      <Section title="Cómo funciona">
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
          <Prose>
            <Narrativa />
          </Prose>
          <ul className="grid h-fit gap-2">
            {ESTRUCTURA.map((e) => (
              <li
                key={e}
                className="rounded-md border-2 border-dashed border-line-strong p-3 text-small"
              >
                <strong>{e}:</strong>{" "}
                <span className="text-stone">en la narrativa del protocolo</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="surface" title="Preguntas frecuentes">
        <FAQ
          items={entry.frontmatter.preguntas}
          pendiente={`preguntas frecuentes del protocolo ${entry.frontmatter.title} (Juan Carlos Simó)`}
        />
      </Section>

      {/* S6-12: cada protocolo apunta al motivo de consulta relacionado. */}
      {motivo && (
        <Section tone="mist" title="Antes de empezar">
          <p className="max-w-reading">
            Este protocolo se relaciona con el motivo de consulta{" "}
            <Link
              href={`/sanar/motivos/${motivo.slug}`}
              className="font-semibold underline underline-offset-4"
            >
              {motivo.frontmatter.nombre.toLowerCase()}
            </Link>
            . Una evaluación confirma si es el adecuado para ti.
          </p>
          <ButtonLink href="/sanar/agendar" variant="secondary" className="mt-6">
            Agendar evaluación
          </ButtonLink>
        </Section>
      )}

      <CTABand
        title={entry.frontmatter.title}
        text="Todo el protocolo, en un paso."
        action={agregar}
      />
    </main>
  );
}
