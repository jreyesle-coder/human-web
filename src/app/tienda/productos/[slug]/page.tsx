import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FAQ, TrustSignals } from "@/components/blocks/Bands";
import { ProductCard } from "@/components/blocks/Cards";
import { Prose, Section } from "@/components/blocks/Section";
import { AddToCart } from "@/components/shop/AddToCart";
import { VistaProducto } from "@/components/shop/VistaProducto";
import { AvisoAlcance } from "@/components/shop/ShopNotices";
import { Badge } from "@/components/ui/Card";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumb } from "@/components/ui/Navigation";
import { Pendiente } from "@/components/ui/Pendiente";
import { Skeleton } from "@/components/ui/Toast";
import { itemDe, protocolosDe } from "@/lib/protocolos";
import { migasPara } from "@/lib/routes";
import { metaPagina } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import {
  existenciaAhora,
  formatoDe,
  listarProductos,
  precioDOP,
  type Producto,
  productoPorSlug,
  slugsDeProductos,
} from "@/lib/woo";

export async function generateStaticParams() {
  return slugsDeProductos();
}

export async function generateMetadata(props: PageProps<"/tienda/productos/[slug]">) {
  const { slug } = await props.params;
  const r = await productoPorSlug(slug);
  if (!r.ok || !r.datos) return {};
  const p = r.datos;
  return metaPagina({
    title: p.nombre,
    description: (p.resumen || `${p.nombre} en Human Stores.`).slice(0, 155),
    path: `/tienda/productos/${slug}`,
    seccion: "Tienda",
  });
}

/** Existencia consultada al momento (S6-03) y producto agotado con alternativa (S6-18). */
async function Existencia({ producto }: { producto: Producto }) {
  const enExistencia = (await existenciaAhora(producto.id)) ?? producto.enExistencia;
  if (enExistencia) {
    return (
      <div className="grid gap-3">
        <Badge tone="success" className="self-start">
          En existencia
        </Badge>
        <AddToCart items={[itemDe(producto)]} size="lg" />
      </div>
    );
  }
  const r = await listarProductos();
  const categoria = producto.categorias.find((c) => c.slug !== "todos")?.slug;
  const alternativas = r.ok
    ? r.datos
        .filter((p) => p.id !== producto.id && p.enExistencia && p.comprable)
        .filter((p) => p.categorias.some((c) => c.slug === categoria))
        .slice(0, 3)
    : [];
  return (
    <div className="grid gap-3 rounded-lg border-2 border-warning bg-warning-soft p-4">
      <Badge tone="warning" className="self-start">
        Agotado
      </Badge>
      <p>
        Este producto no está disponible ahora. Escríbenos por WhatsApp y te avisamos cuando vuelva.
      </p>
      {alternativas.length > 0 && (
        <div>
          <p className="font-semibold">Mientras tanto, de la misma línea:</p>
          <ul className="mt-2 grid gap-1">
            {alternativas.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/tienda/productos/${a.slug}`}
                  className="inline-flex min-h-tap items-center font-semibold underline underline-offset-4"
                >
                  {a.nombre} · {precioDOP(a.precio)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/** Ficha nueva (S6-15): para qué sirve · cómo se toma · por cuánto tiempo · qué esperar · qué contiene. */
export default async function ProductoPage(props: PageProps<"/tienda/productos/[slug]">) {
  const { slug } = await props.params;
  const r = await productoPorSlug(slug);
  if (!r.ok || !r.datos || r.datos.tipo !== "simple") notFound();
  const p = r.datos;
  const protocolos = await protocolosDe(p);
  const objetivo = p.categorias.find((c) => c.slug !== "todos");
  const url = `${siteUrl()}/tienda/productos/${slug}`;

  return (
    <main>
      <VistaProducto id={p.id} />
      <div className="bg-surface">
        <div className="mx-auto w-full max-w-content px-gutter pt-4">
          <Breadcrumb items={migasPara(`/tienda/productos/${slug}`, p.nombre)} />
        </div>
        <div className="mx-auto grid w-full max-w-content gap-10 px-gutter py-8 lg:grid-cols-2 lg:py-12">
          <div className="grid gap-3">
            <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-line bg-surface">
              {p.imagenes[0] ? (
                <Image
                  src={p.imagenes[0].src}
                  alt={p.imagenes[0].alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-6"
                />
              ) : null}
            </div>
            {p.imagenes.length > 1 && (
              <ul className="grid grid-cols-4 gap-2">
                {p.imagenes.slice(1, 5).map((img) => (
                  <li
                    key={img.src}
                    className="relative aspect-square overflow-hidden rounded-md border-2 border-line"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="25vw"
                      className="object-contain p-1"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            {objetivo && (
              <p className="text-small font-semibold tracking-widest text-stone uppercase">
                {objetivo.nombre}
              </p>
            )}
            <h1 className="mt-2 font-display text-h1 font-bold">{p.nombre}</h1>
            <p className="mt-4 text-h2 font-bold">{precioDOP(p.precio)}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge>{formatoDe(p.nombre)}</Badge>
              {p.marcas[0] && <Badge>{p.marcas[0].nombre}</Badge>}
            </div>
            <div className="mt-6">
              <Suspense fallback={<Skeleton className="h-28 w-full" />}>
                <Existencia producto={p} />
              </Suspense>
            </div>
            <AvisoAlcance className="mt-6" />
            {/* S6-17: protocolos a los que pertenece. */}
            {protocolos.length > 0 && (
              <div className="mt-6">
                <p className="font-semibold">Forma parte de</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {protocolos.map((pr) => (
                    <li key={pr.slug}>
                      <Link
                        href={`/tienda/protocolos/${pr.slug}`}
                        className="inline-flex min-h-tap items-center rounded-pill bg-functional-soft px-4 font-semibold text-functional"
                      >
                        Protocolo {pr.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <Section title="Para qué sirve">
        {p.resumen ? (
          <Prose>
            {p.resumen.split("\n").map((linea, i) => (
              <p key={i}>{linea}</p>
            ))}
            <p className="text-small text-stone">Texto de la ficha actual de Human Stores.</p>
          </Prose>
        ) : (
          <Pendiente texto={`${p.nombre}: para qué sirve (cliente)`} />
        )}
      </Section>

      <Section tone="surface" title="Cómo se toma y por cuánto tiempo">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border-2 border-line p-5">
            <h3 className="font-display text-h3 font-bold">Cómo se toma</h3>
            <Pendiente
              as="linea"
              texto={`${p.nombre}: dosis indicada`}
              className="mt-2 inline-block text-small"
            />
          </div>
          {/* S6-16: cuántos días rinde el envase según la dosis. */}
          <div className="rounded-lg border-2 border-line p-5">
            <h3 className="font-display text-h3 font-bold">Cuánto rinde</h3>
            <Pendiente
              as="linea"
              texto={`${p.nombre}: días que rinde el envase según la dosis`}
              className="mt-2 inline-block text-small"
            />
          </div>
          <div className="rounded-lg border-2 border-line p-5">
            <h3 className="font-display text-h3 font-bold">Qué esperar</h3>
            <Pendiente
              as="linea"
              texto={`${p.nombre}: qué esperar, sin promesas de resultado`}
              className="mt-2 inline-block text-small"
            />
          </div>
        </div>
      </Section>

      <Section title="Qué contiene">
        {p.descripcion ? (
          <Prose>
            {p.descripcion.split("\n").map((linea, i) => (
              <p key={i}>{linea}</p>
            ))}
          </Prose>
        ) : (
          <Pendiente texto={`${p.nombre}: ingredientes y cantidades por porción (cliente)`} />
        )}
      </Section>

      {/* S6-20 y S6-21: solo datos reales. */}
      <Section tone="surface" title="Confianza">
        <TrustSignals
          items={[
            {
              titulo: "Marca",
              detalle: p.marcas[0]?.nombre,
              pendiente: p.marcas[0] ? undefined : "marca del producto",
            },
            { titulo: "Certificaciones", pendiente: `certificaciones de ${p.nombre}` },
            { titulo: "Origen", pendiente: `país de fabricación de ${p.nombre}` },
            {
              titulo: "Reseñas",
              detalle:
                p.resenas.cantidad > 0
                  ? `${p.resenas.promedio} de 5 (${p.resenas.cantidad})`
                  : undefined,
              pendiente:
                p.resenas.cantidad > 0
                  ? undefined
                  : "reseñas verificadas: la tienda actual no tiene ninguna",
            },
          ]}
        />
      </Section>

      <Section title="Preguntas frecuentes">
        <FAQ items={[]} pendiente={`preguntas frecuentes de ${p.nombre}`} />
      </Section>

      <RelacionadosCategoria producto={p} />

      {/* S6-27: Product con precio y disponibilidad reales. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.nombre,
          sku: p.sku || undefined,
          image: p.imagenes.map((i) => i.src),
          description: p.resumen.slice(0, 500) || undefined,
          brand: p.marcas[0] ? { "@type": "Brand", name: p.marcas[0].nombre } : undefined,
          category: objetivo?.nombre,
          url,
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: "DOP",
            price: (p.precio / 100).toFixed(2),
            availability: p.enExistencia
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            areaServed: "DO",
            seller: { "@id": `${siteUrl()}/tienda#negocio` },
          },
        }}
      />
    </main>
  );
}

async function RelacionadosCategoria({ producto }: { producto: Producto }) {
  const r = await listarProductos();
  const categoria = producto.categorias.find((c) => c.slug !== "todos");
  if (!r.ok || !categoria) return null;
  const otros = r.datos
    .filter(
      (p) =>
        p.id !== producto.id &&
        p.tipo === "simple" &&
        p.categorias.some((c) => c.slug === categoria.slug),
    )
    .slice(0, 4);
  if (otros.length === 0) return null;
  return (
    <Section tone="mist" title={`Más de ${categoria.nombre}`}>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {otros.map((o) => (
          <li key={o.id}>
            <ProductCard
              href={`/tienda/productos/${o.slug}`}
              nombre={o.nombre}
              precio={precioDOP(o.precio)}
              imagen={o.imagenes[0]}
              agotado={!o.enExistencia}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
