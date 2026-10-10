import type { ReactNode } from "react";
import { Accordion } from "@/components/ui/Disclosure";
import { JsonLd } from "@/components/ui/JsonLd";
import { Pendiente } from "@/components/ui/Pendiente";
import { cn } from "@/lib/cn";

type CTABandProps = {
  title: ReactNode;
  text?: ReactNode;
  action: ReactNode;
  tone?: "ink" | "functional" | "mist";
};

const ctaTones = {
  ink: "bg-ink text-bone",
  functional: "bg-functional text-surface",
  mist: "bg-mist text-ink",
};

/** Cierre de página con una sola acción. */
export function CTABand({ title, text, action, tone = "ink" }: CTABandProps) {
  return (
    <section className={ctaTones[tone]}>
      <div className="mx-auto flex w-full max-w-content flex-col gap-6 px-gutter py-12 lg:flex-row lg:items-center lg:justify-between lg:py-16">
        <div>
          <h2 className="font-display text-h2 font-bold tracking-tight">{title}</h2>
          {text && <div className="mt-3 max-w-reading text-body">{text}</div>}
        </div>
        <div className="shrink-0">{action}</div>
      </div>
    </section>
  );
}

export type Pregunta = { pregunta: string; respuesta: string };

/**
 * Preguntas frecuentes. Con `schema`, emite FAQPage. La respuesta debe ir directa en la primera frase.
 * Sin preguntas aprobadas, muestra el pendiente.
 */
export function FAQ({
  items,
  schema = true,
  pendiente,
  headingLevel = 3,
}: {
  items: Pregunta[];
  schema?: boolean;
  pendiente?: string;
  headingLevel?: 2 | 3 | 4;
}) {
  if (items.length === 0) {
    return <Pendiente texto={pendiente ?? "preguntas frecuentes aprobadas por el cliente"} />;
  }
  return (
    <>
      <Accordion
        headingLevel={headingLevel}
        items={items.map((p, i) => ({
          id: String(i),
          title: p.pregunta,
          content: <p>{p.respuesta}</p>,
        }))}
      />
      {schema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((p) => ({
              "@type": "Question",
              name: p.pregunta,
              acceptedAnswer: { "@type": "Answer", text: p.respuesta },
            })),
          }}
        />
      )}
    </>
  );
}

export type Senal = { titulo: string; detalle?: string; pendiente?: string };

/** Señales de confianza. Solo datos reales: una señal sin respaldo se muestra como pendiente. */
export function TrustSignals({ items, className }: { items: Senal[]; className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((s) => (
        <li key={s.titulo} className="rounded-lg border-2 border-line bg-surface p-5">
          <p className="font-display text-h3 font-bold">{s.titulo}</p>
          {s.detalle && <p className="mt-2 text-small text-stone">{s.detalle}</p>}
          {s.pendiente && (
            <Pendiente as="linea" texto={s.pendiente} className="mt-2 inline-block text-small" />
          )}
        </li>
      ))}
    </ul>
  );
}
