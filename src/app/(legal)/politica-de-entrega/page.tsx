import type { Metadata } from "next";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";
import { LegalPage } from "../LegalPage";

export const metadata: Metadata = metaPagina({
  title: "Política de entrega",
  description: "Zonas, tiempos y costos de entrega de Human Stores dentro de República Dominicana.",
  path: "/politica-de-entrega",
  seccion: "Legal",
});

export default function Page() {
  return (
    <LegalPage path="/politica-de-entrega" title="Política de entrega">
      <Pendiente texto="política de entrega vigente, migrada desde humanstores.com/politicas-de-entrega" />
    </LegalPage>
  );
}
