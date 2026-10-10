type ImagePlaceholderProps = {
  /** Ancho y alto de la imagen final, en píxeles. Definen la proporción. */
  width: number;
  height: number;
  /** Qué foto falta. Se muestra como {{PENDIENTE: ...}} y debe estar en backlog.md. */
  label: string;
  className?: string;
};

/** Hueco para una foto real que el cliente aún no entrega. Nunca se sustituye por imagen de banco. */
export function ImagePlaceholder({
  width,
  height,
  label,
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Imagen pendiente: ${label}`}
      data-pendiente={label}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={`flex w-full items-center justify-center border-2 border-dashed border-line bg-surface p-4 text-center text-small text-stone ${className}`}
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
