"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { cn } from "@/lib/cn";
import { CTA_PERSISTENTE, NAV_PRINCIPAL, esActivo } from "@/lib/navegacion";
import { Logo } from "./Logo";
import { CartButton } from "./CartButton";

export function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-line bg-bone/95 backdrop-blur">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-3 focus:text-bone"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-4 px-gutter">
        <Logo />
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_PRINCIPAL.map((item) => {
              const activo = esActivo(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={activo ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-tap items-center rounded-md px-4 font-semibold transition-colors hover:bg-mist",
                      activo && "underline decoration-amber decoration-2 underline-offset-8",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <CartButton />
          </div>
          <ButtonLink href={CTA_PERSISTENTE.href} className="hidden sm:inline-flex">
            {CTA_PERSISTENTE.label}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMenu(true)}
            aria-haspopup="dialog"
            className="inline-flex min-h-tap min-w-tap items-center justify-center rounded-md font-semibold hover:bg-mist lg:hidden"
          >
            <span aria-hidden="true" className="text-h3">
              ☰
            </span>
            <span className="sr-only">Abrir menú</span>
          </button>
        </div>
      </div>

      <Dialog open={menu} onClose={() => setMenu(false)} title="Menú" placement="side">
        <nav aria-label="Menú móvil">
          <ul className="grid gap-1">
            {[{ label: "Inicio", href: "/" }, ...NAV_PRINCIPAL].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenu(false)}
                  aria-current={esActivo(pathname, item.href) ? "page" : undefined}
                  className="flex min-h-12 items-center rounded-md px-3 font-display text-h3 font-bold hover:bg-mist aria-[current=page]:text-amber"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink
            href={CTA_PERSISTENTE.href}
            onClick={() => setMenu(false)}
            size="lg"
            className="mt-6 w-full"
          >
            {CTA_PERSISTENTE.label}
          </ButtonLink>
        </nav>
      </Dialog>
    </header>
  );
}
