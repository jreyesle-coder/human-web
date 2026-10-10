import Link from "next/link";
import { Pendiente } from "@/components/ui/Pendiente";
import { ALCANCE_VENTAS, UBICACION } from "@/lib/marca";
import { NAV_PIE } from "@/lib/navegacion";
import { WhatsappLinks } from "./ContactStrip";
import { Logo } from "./Logo";

const enlace =
  "inline-flex min-h-tap items-center text-bone/90 underline-offset-4 hover:text-bone hover:underline";

export function Footer() {
  return (
    <footer className="bg-ink pb-bottom-bar text-bone lg:pb-0">
      <div className="mx-auto w-full max-w-content px-gutter py-12">
        <Logo tone="bone" />
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {NAV_PIE.slice(0, 2).map((col) => (
            <nav key={col.titulo} aria-label={col.titulo}>
              <h2 className="text-small font-semibold tracking-widest uppercase">{col.titulo}</h2>
              <ul className="mt-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={enlace}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="text-small font-semibold tracking-widest uppercase">Ayuda</h2>
            <address className="mt-3 text-body not-italic">
              {UBICACION.calle}, {UBICACION.ciudad}
            </address>
            <div className="mt-3 text-small">
              <Pendiente
                as="linea"
                texto="horarios de atención por unidad"
                className="bg-transparent text-bone"
              />
            </div>
            <div className="mt-3">
              <WhatsappLinks origen="pie" tone="dark" />
            </div>
            <Link href="/contacto" className={enlace}>
              Contacto
            </Link>
          </div>
          {NAV_PIE.slice(2).map((col) => (
            <nav key={col.titulo} aria-label={col.titulo}>
              <h2 className="text-small font-semibold tracking-widest uppercase">{col.titulo}</h2>
              <ul className="mt-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={enlace}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 grid gap-3 border-t border-bone/20 pt-6 text-small text-bone/90">
          <p>Pago seguro procesado por AZUL. {ALCANCE_VENTAS}</p>
          <Pendiente
            as="linea"
            texto="enlaces oficiales a redes sociales"
            className="bg-transparent text-bone"
          />
          <p className="text-micro">
            © {2026} Human Performance Center. Santo Domingo, República Dominicana.
          </p>
        </div>
      </div>
    </footer>
  );
}
