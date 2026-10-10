import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Pendiente } from "@/components/ui/Pendiente";

/** Llamado destacado dentro de un texto. */
function Llamado({ titulo, children }: { titulo?: string; children: ReactNode }) {
  return (
    <aside className="rounded-lg border-l-4 border-functional bg-functional-soft p-5 text-ink">
      {titulo && <p className="font-display font-bold">{titulo}</p>}
      <div className="mt-1">{children}</div>
    </aside>
  );
}

/** Advertencia: para lo que el lector debe saber antes de actuar (consultar al especialista, contraindicaciones). */
function Advertencia({ children }: { children: ReactNode }) {
  return (
    <aside role="note" className="rounded-lg border-2 border-warning bg-warning-soft p-5 text-ink">
      <p className="font-display font-bold text-warning">Importante</p>
      <div className="mt-1">{children}</div>
    </aside>
  );
}

function Img({ src, alt, width, height }: ComponentProps<"img">) {
  if (!src || typeof src !== "string") return null;
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={Number(width) || 1200}
      height={Number(height) || 800}
      className="h-auto w-full rounded-lg"
      sizes="(min-width: 768px) 68ch, 100vw"
    />
  );
}

const components: MDXComponents = {
  img: Img,
  table: (props) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
  Llamado,
  Advertencia,
  Pendiente,
  ImagePlaceholder,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
