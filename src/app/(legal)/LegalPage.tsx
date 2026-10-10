import type { ReactNode } from "react";
import { Prose } from "@/components/blocks/Section";
import { Breadcrumb } from "@/components/ui/Navigation";
import { migasPara } from "@/lib/routes";

/** Página legal: texto de lectura, sin llamados de venta. */
export function LegalPage({
  path,
  title,
  actualizado,
  children,
}: {
  path: string;
  title: string;
  actualizado?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-content px-gutter py-6 lg:py-10">
      <Breadcrumb items={migasPara(path)} />
      <h1 className="mt-6 font-display text-h1 font-bold">{title}</h1>
      {actualizado && <p className="mt-2 text-small text-stone">Actualizado: {actualizado}</p>}
      <Prose className="mt-8 pb-12">{children}</Prose>
    </main>
  );
}
