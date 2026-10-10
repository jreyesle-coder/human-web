import type { ComponentProps } from "react";
import { Breadcrumb } from "@/components/ui/Navigation";
import { cn } from "@/lib/cn";
import { migasPara } from "@/lib/routes";
import { Hero } from "./Hero";

type PageHeaderProps = Omit<ComponentProps<typeof Hero>, "className"> & {
  /** Ruta de la página, para las migas de pan. */
  path: string;
  /** Nombre de la última miga cuando la página es contenido dinámico. */
  actual?: string;
};

const migaTone = {
  bone: "bg-bone text-ink",
  ink: "bg-ink text-bone [&_a]:text-bone/80 [&_span]:text-bone",
  functional: "bg-functional text-surface [&_a]:text-surface/85 [&_span]:text-surface",
};

/** Encabezado de página interna: migas de pan + hero. */
export function PageHeader({ path, actual, tone = "bone", ...hero }: PageHeaderProps) {
  return (
    <>
      <div className={cn(migaTone[tone])}>
        <Breadcrumb
          items={migasPara(path, actual)}
          className="mx-auto w-full max-w-content px-gutter pt-4"
        />
      </div>
      <Hero tone={tone} {...hero} className="pt-0 lg:pt-0" />
    </>
  );
}
