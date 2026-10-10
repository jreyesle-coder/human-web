import { Pendiente } from "@/components/ui/Pendiente";
import { cn } from "@/lib/cn";
import { UBICACION } from "@/lib/marca";
import { type WhatsappUnidad, whatsappLink } from "@/lib/whatsapp";

const UNIDADES_WA: { unidad: WhatsappUnidad; label: string }[] = [
  { unidad: "entrenamiento", label: "Entrenamiento" },
  { unidad: "consultorio", label: "Consultorio" },
  { unidad: "ventas", label: "Tienda" },
];

/** Enlaces de WhatsApp por unidad. Si falta el número en las variables de entorno, lo marca pendiente. */
export function WhatsappLinks({
  origen,
  tone = "light",
  solo,
}: {
  origen: string;
  tone?: "light" | "dark";
  solo?: WhatsappUnidad;
}) {
  const lista = solo ? UNIDADES_WA.filter((u) => u.unidad === solo) : UNIDADES_WA;
  return (
    <ul className="grid gap-1">
      {lista.map(({ unidad, label }) => {
        const href = whatsappLink(unidad, { origen });
        return (
          <li key={unidad}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex min-h-tap items-center gap-2 font-semibold underline decoration-2 underline-offset-4",
                  tone === "dark" ? "text-bone" : "text-ink",
                )}
              >
                WhatsApp {label}
                <span className="sr-only"> (abre en otra ventana)</span>
              </a>
            ) : (
              <Pendiente
                as="linea"
                texto={`número de WhatsApp de ${label.toLowerCase()} (variable de entorno)`}
                className={cn("text-small", tone === "dark" && "bg-transparent text-bone")}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Franja de contacto: ubicación, horarios y WhatsApp por unidad. */
export function ContactStrip({ origen }: { origen: string }) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div>
        <h3 className="font-display text-h3 font-bold">Ubicación</h3>
        <address className="mt-2 text-body not-italic">
          {UBICACION.calle}
          <br />
          {UBICACION.ciudad}, {UBICACION.pais}
        </address>
      </div>
      <div>
        <h3 className="font-display text-h3 font-bold">Horarios</h3>
        <Pendiente texto="horarios de Human Balance, consultorio y tienda" className="mt-2" />
      </div>
      <div>
        <h3 className="font-display text-h3 font-bold">Escríbenos</h3>
        <div className="mt-2">
          <WhatsappLinks origen={origen} />
        </div>
      </div>
    </div>
  );
}
