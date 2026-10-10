import Link from "next/link";
import { LIBRO } from "@/lib/marca";

/** El libro como pieza de soporte, nunca como protagonista (S3-13). */
export function BookAside({ href = `/tienda/productos/${LIBRO.slugProducto}` }: { href?: string }) {
  return (
    <aside className="rounded-lg border-2 border-line bg-surface p-5">
      <p className="text-small font-semibold tracking-widest text-stone uppercase">
        Para profundizar
      </p>
      <p className="mt-2 font-display text-h3 font-bold">
        <cite className="not-italic">{LIBRO.titulo}</cite>
      </p>
      <p className="mt-2 text-small text-stone">
        Juan Carlos Simó, {LIBRO.anio}. El método completo, paso por paso.
      </p>
      <Link
        href={href}
        className="mt-3 inline-flex min-h-tap items-center font-semibold underline decoration-2 underline-offset-4"
      >
        Ver el libro en la tienda
      </Link>
    </aside>
  );
}
