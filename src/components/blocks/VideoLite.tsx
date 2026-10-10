"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Video de YouTube con carga diferida (S3-23): hasta que la persona pulsa, solo hay una miniatura.
 * Así no se descarga el reproductor (ni se instalan cookies de YouTube) sin que lo pida.
 */
export function VideoLite({
  id,
  titulo,
  duracion,
  nota,
  prioridad = false,
}: {
  id: string;
  titulo: string;
  duracion?: string;
  nota?: string;
  /** Solo para el video principal de la portada. */
  prioridad?: boolean;
}) {
  const [activo, setActivo] = useState(false);
  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-ink shadow-float">
        {activo ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`}
            title={titulo}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActivo(true)}
            className="group absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={`https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`}
              alt=""
              fill
              priority={prioridad}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <span
              aria-hidden="true"
              className="relative flex size-16 items-center justify-center rounded-pill bg-amber text-h2 text-surface shadow-float transition-transform group-hover:scale-105"
            >
              ▶
            </span>
            <span className="sr-only">Reproducir el video: {titulo}</span>
            {duracion && (
              <span className="absolute right-3 bottom-3 rounded-sm bg-ink px-2 py-0.5 text-small font-semibold text-bone">
                {duracion}
              </span>
            )}
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-small">
        <span className="font-semibold">{titulo}</span>
        {nota && <span className="block opacity-80">{nota}</span>}
      </figcaption>
    </figure>
  );
}
