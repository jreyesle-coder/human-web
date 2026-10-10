import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeroProps = {
  /** marca: portada; unidad: Entrenar/Sanar/Tienda; producto: protocolo o ficha. */
  variant?: "marca" | "unidad" | "producto";
  tone?: "bone" | "ink" | "functional";
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
  children?: ReactNode;
  className?: string;
};

const tones = {
  bone: "bg-bone text-ink",
  ink: "bg-ink text-bone",
  functional: "bg-functional text-surface",
};

export function Hero({
  variant = "unidad",
  tone = "bone",
  eyebrow,
  title,
  lead,
  actions,
  media,
  children,
  className,
}: HeroProps) {
  return (
    <section className={cn(tones[tone], className)}>
      <div
        className={cn(
          "mx-auto grid w-full max-w-content gap-8 px-gutter",
          variant === "marca" ? "py-12 lg:py-24" : "py-10 lg:py-16",
          media && "lg:grid-cols-2 lg:items-center",
        )}
      >
        <div>
          {eyebrow && (
            <p className="text-small font-semibold tracking-widest uppercase opacity-90">
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              "mt-3 font-display font-bold tracking-tight",
              variant === "marca" ? "text-display" : "text-h1",
            )}
          >
            {title}
          </h1>
          {lead && <div className="mt-5 max-w-reading text-body">{lead}</div>}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          {children}
        </div>
        {media && <div>{media}</div>}
      </div>
    </section>
  );
}
