/** Navegación principal: máximo cinco elementos (docs/01-arquitectura-informacion.md). */
export const NAV_PRINCIPAL = [
  { label: "Entrenar", href: "/entrenar" },
  { label: "Sanar", href: "/sanar" },
  { label: "Tienda", href: "/tienda" },
  { label: "Método", href: "/metodo" },
] as const;

export const CTA_PERSISTENTE = {
  label: "Agendar evaluación",
  href: "/sanar/agendar",
} as const;

export const NAV_PIE = [
  {
    titulo: "Unidades",
    links: [
      { label: "Entrenar · Human Balance", href: "/entrenar" },
      { label: "Sanar · Dietética Funcional", href: "/sanar" },
      { label: "Sostener · Human Stores", href: "/tienda" },
    ],
  },
  {
    titulo: "Método y contenido",
    links: [
      { label: "El método", href: "/metodo" },
      { label: "Juan Carlos Simó", href: "/juan-carlos-simo" },
      { label: "Historias", href: "/historias" },
      { label: "Contenido", href: "/contenido" },
    ],
  },
  {
    titulo: "Legales",
    links: [
      { label: "Privacidad", href: "/privacidad" },
      { label: "Términos", href: "/terminos" },
      { label: "Política de entrega", href: "/politica-de-entrega" },
      { label: "Política de reembolsos", href: "/politica-de-reembolsos" },
      { label: "Aviso legal", href: "/aviso-legal" },
    ],
  },
] as const;

/** ¿El enlace corresponde a la sección actual? "/" solo coincide consigo mismo. */
export function esActivo(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
