import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Card";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/cn";

const cardBase =
  "group flex h-full flex-col overflow-hidden rounded-lg bg-surface text-ink shadow-card transition-transform hover:-translate-y-0.5";

type StoryCardProps = {
  href: string;
  nombre: string;
  objetivo: string;
  extracto: string;
};

export function StoryCard({ href, nombre, objetivo, extracto }: StoryCardProps) {
  return (
    <Link href={href} className={cardBase}>
      <ImagePlaceholder
        width={800}
        height={600}
        label={`foto autorizada de ${nombre}`}
        className="rounded-none border-0"
      />
      <div className="flex flex-1 flex-col p-5">
        <Badge tone="functional" className="self-start">
          {objetivo}
        </Badge>
        <h3 className="mt-3 font-display text-h3 font-bold">{nombre}</h3>
        <p className="mt-2 flex-1 text-body text-stone">{extracto}</p>
        <span className="mt-4 font-semibold underline decoration-2 underline-offset-4">
          Leer la historia
        </span>
      </div>
    </Link>
  );
}

type CoachCardProps = {
  href: string;
  nombre: string;
  especialidad: string;
};

export function CoachCard({ href, nombre, especialidad }: CoachCardProps) {
  return (
    <Link href={href} className={cardBase}>
      <ImagePlaceholder
        width={600}
        height={750}
        label={`retrato de ${nombre}`}
        className="rounded-none border-0"
      />
      <div className="p-5">
        <h3 className="font-display text-h3 font-bold">{nombre}</h3>
        <p className="mt-1 text-body text-stone">{especialidad}</p>
      </div>
    </Link>
  );
}

type ProtocolCardProps = {
  href: string;
  nombre: string;
  objetivo: string;
  productos?: number;
  precioDesde?: string;
  footer?: ReactNode;
};

export function ProtocolCard({
  href,
  nombre,
  objetivo,
  productos,
  precioDesde,
  footer,
}: ProtocolCardProps) {
  return (
    <Link href={href} className={cn(cardBase, "border-2 border-line")}>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-small font-semibold tracking-widest text-functional uppercase">
          Protocolo
        </span>
        <h3 className="mt-2 font-display text-h2 font-bold">{nombre}</h3>
        <p className="mt-3 flex-1 text-body">{objetivo}</p>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-small text-stone">
          {productos !== undefined && (
            <Badge>
              {productos} {productos === 1 ? "producto" : "productos"}
            </Badge>
          )}
          {precioDesde && <span>{precioDesde}</span>}
        </div>
        {footer}
      </div>
    </Link>
  );
}

type ProductCardProps = {
  href: string;
  nombre: string;
  precio: string;
  imagen?: { src: string; alt: string };
  categoria?: string;
  agotado?: boolean;
  action?: ReactNode;
};

export function ProductCard({
  href,
  nombre,
  precio,
  imagen,
  categoria,
  agotado,
  action,
}: ProductCardProps) {
  return (
    <article className={cn(cardBase, "relative")}>
      <div className="relative aspect-square bg-surface">
        {imagen ? (
          <Image
            src={imagen.src}
            alt={imagen.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain p-4"
          />
        ) : (
          <ImagePlaceholder
            width={600}
            height={600}
            label={`foto de ${nombre}`}
            className="h-full rounded-none border-0"
          />
        )}
        {agotado && (
          <Badge tone="warning" className="absolute top-3 left-3">
            Agotado
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col border-t-2 border-line p-4">
        {categoria && <p className="text-small text-stone">{categoria}</p>}
        <h3 className="mt-1 flex-1 font-display text-body font-bold">
          <Link href={href} className="after:absolute after:inset-0">
            {nombre}
          </Link>
        </h3>
        <p className="mt-2 font-semibold">{precio}</p>
        {action && <div className="relative z-10 mt-3">{action}</div>}
      </div>
    </article>
  );
}
