import { cn } from "@/lib/cn";
import { isProduction } from "@/lib/site";

type ImagePlaceholderProps = {
  /** Ancho y alto de la imagen final, en píxeles. Definen la proporción. */
  width: number;
  height: number;
  /** Qué foto falta. Se muestra como {{PENDIENTE: ...}} y debe estar en backlog.md. */
  label: string;
  tone?: "light" | "dark";
  className?: string;
};

/** Hueco para una foto real que el cliente aún no entrega. Nunca se sustituye por imagen de banco. */
export function ImagePlaceholder({
  width,
  height,
  label,
  tone = "light",
  className,
}: ImagePlaceholderProps) {
  if (isProduction()) {
    throw new Error(`Imagen pendiente en el build de lanzamiento: ${label}`);
  }
  return (
    <div
      role="img"
      aria-label={`Imagen pendiente: ${label}`}
      data-pendiente={`Foto: ${label}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={cn(
        "flex w-full items-center justify-center rounded-lg border-2 border-dashed p-4 text-center text-small",
        tone === "light"
          ? "border-line-strong bg-mist text-stone"
          : "border-bone/40 bg-ink text-bone",
        className,
      )}
    >
      <span>
        {`{{PENDIENTE: ${label}}}`}
        <br />
        <span className="text-micro">
          {width}×{height}
        </span>
      </span>
    </div>
  );
}
