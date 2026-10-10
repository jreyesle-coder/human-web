import Link from "next/link";
import { cn } from "@/lib/cn";
import { siteUrl } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export type Miga = { label: string; href: string };

/** Migas de pan con BreadcrumbList. La última miga es la página actual y no es enlace. */
export function Breadcrumb({ items, className }: { items: Miga[]; className?: string }) {
  if (items.length < 2) return null;
  const base = siteUrl();
  return (
    <nav aria-label="Migas de pan" className={cn("text-small", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((m, i) => {
          const ultima = i === items.length - 1;
          return (
            <li key={m.href} className="flex items-center gap-2">
              {ultima ? (
                <span aria-current="page" className="font-semibold text-ink">
                  {m.label}
                </span>
              ) : (
                <>
                  <Link
                    href={m.href}
                    className="inline-flex min-h-tap items-center text-stone underline-offset-4 hover:text-ink hover:underline"
                  >
                    {m.label}
                  </Link>
                  <span aria-hidden="true" className="text-stone">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((m, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: m.label,
            item: `${base}${m.href === "/" ? "" : m.href}`,
          })),
        }}
      />
    </nav>
  );
}

type PaginationProps = {
  current: number;
  total: number;
  hrefFor: (pagina: number) => string;
  className?: string;
};

export function Pagination({ current, total, hrefFor, className }: PaginationProps) {
  if (total < 2) return null;
  const paginas = Array.from({ length: total }, (_, i) => i + 1);
  const item =
    "inline-flex min-h-tap min-w-tap items-center justify-center rounded-md px-3 font-semibold";
  return (
    <nav aria-label="Paginación" className={className}>
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          {current > 1 ? (
            <Link href={hrefFor(current - 1)} className={cn(item, "hover:bg-mist")}>
              <span aria-hidden="true">←</span>
              <span className="ml-1">Anterior</span>
            </Link>
          ) : (
            <span className={cn(item, "text-stone")} aria-disabled="true">
              <span aria-hidden="true">←</span>
              <span className="ml-1">Anterior</span>
            </span>
          )}
        </li>
        {paginas.map((p) => (
          <li key={p}>
            <Link
              href={hrefFor(p)}
              aria-current={p === current ? "page" : undefined}
              aria-label={`Página ${p}`}
              className={cn(item, p === current ? "bg-ink text-bone" : "hover:bg-mist")}
            >
              {p}
            </Link>
          </li>
        ))}
        <li>
          {current < total ? (
            <Link href={hrefFor(current + 1)} className={cn(item, "hover:bg-mist")}>
              <span className="mr-1">Siguiente</span>
              <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <span className={cn(item, "text-stone")} aria-disabled="true">
              <span className="mr-1">Siguiente</span>
              <span aria-hidden="true">→</span>
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
