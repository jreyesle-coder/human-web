import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Section } from "@/components/blocks/Section";
import { Badge } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Navigation";
import { Pendiente } from "@/components/ui/Pendiente";
import { Skeleton } from "@/components/ui/Toast";
import { getEntries } from "@/lib/content";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  title: "Contenido",
  description:
    "Artículos y videos de Juan Carlos Simó sobre alimentación, entrenamiento y salud funcional.",
  path: "/contenido",
  seccion: "Contenido",
});

const POR_PAGINA = 9;

async function Lista({ searchParams }: { searchParams: PageProps<"/contenido">["searchParams"] }) {
  const articulos = (await getEntries("contenido")).sort(
    (a, b) => b.frontmatter.updated.getTime() - a.frontmatter.updated.getTime(),
  );
  if (articulos.length === 0) {
    return <Pendiente texto="artículos publicados (Juan Carlos Simó / equipo de contenido)" />;
  }
  const total = Math.ceil(articulos.length / POR_PAGINA);
  const pedida = Number((await searchParams).pagina ?? 1);
  const pagina = Number.isInteger(pedida) && pedida >= 1 && pedida <= total ? pedida : 1;
  const visibles = articulos.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  return (
    <>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/contenido/${a.slug}`}
              className="flex h-full flex-col rounded-lg bg-surface p-6 shadow-card transition-transform hover:-translate-y-0.5"
            >
              <div className="flex flex-wrap gap-2">
                <Badge>{a.lectura} min</Badge>
                {a.frontmatter.video && <Badge tone="functional">Video</Badge>}
                {a.frontmatter.status !== "published" && <Badge tone="pending">Borrador</Badge>}
              </div>
              <h2 className="mt-3 font-display text-h3 font-bold">{a.frontmatter.title}</h2>
              <p className="mt-2 flex-1 text-body text-stone">{a.frontmatter.description}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        current={pagina}
        total={total}
        hrefFor={(p) => (p === 1 ? "/contenido" : `/contenido?pagina=${p}`)}
        className="mt-10"
      />
    </>
  );
}

export default function ContenidoPage(props: PageProps<"/contenido">) {
  return (
    <main>
      <PageHeader
        path="/contenido"
        eyebrow="Contenido"
        title="Aprender antes de decidir"
        lead="Artículos y videos para entender el porqué antes de la acción."
      />
      <Section tone="mist">
        <Suspense
          fallback={
            <div className="grid gap-4 md:grid-cols-3">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
          }
        >
          <Lista searchParams={props.searchParams} />
        </Suspense>
        <Pendiente texto="enlace al canal oficial de video (cliente)" className="mt-10" />
      </Section>
    </main>
  );
}
