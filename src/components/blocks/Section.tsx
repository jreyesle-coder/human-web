import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  title?: ReactNode;
  intro?: ReactNode;
  tone?: "bone" | "surface" | "ink" | "functional" | "mist";
  children: ReactNode;
  className?: string;
  /** Nivel del título; por defecto h2 (la página ya tiene su h1). */
  level?: 2 | 3;
};

const tones = {
  bone: "bg-bone text-ink",
  surface: "bg-surface text-ink",
  ink: "bg-ink text-bone",
  functional: "bg-functional text-surface",
  mist: "bg-mist text-ink",
};

/** Sección de página con el ancho y el ritmo vertical del sistema. */
export function Section({
  id,
  title,
  intro,
  tone = "bone",
  children,
  className,
  level = 2,
}: SectionProps) {
  const H = `h${level}` as const;
  return (
    <section id={id} className={cn(tones[tone], className)}>
      <div className="mx-auto w-full max-w-content px-gutter py-12 lg:py-20">
        {title && <H className="font-display text-h2 font-bold tracking-tight">{title}</H>}
        {intro && <div className="mt-4 max-w-reading text-body">{intro}</div>}
        <div className={cn((title || intro) && "mt-8")}>{children}</div>
      </div>
    </section>
  );
}

/** Texto de lectura con ancho de 68 caracteres. */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("prose-human max-w-reading", className)}>{children}</div>;
}
