"use client";

import { useState } from "react";

/**
 * Video de YouTube con carga diferida (S3-23): hasta que la persona pulsa, solo hay un botón.
 * Así no se descarga el reproductor (ni se instalan cookies de YouTube) sin que lo pida.
 */
export function VideoLite({ id, titulo }: { id: string; titulo: string }) {
  const [activo, setActivo] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-ink">
      {activo ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1`}
          title={titulo}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivo(true)}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-bone"
        >
          <span
            aria-hidden="true"
            className="flex size-16 items-center justify-center rounded-pill bg-amber text-h2"
          >
            ▶
          </span>
          <span className="font-semibold">Ver el video: {titulo}</span>
        </button>
      )}
    </div>
  );
}
