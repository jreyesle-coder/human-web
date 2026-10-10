import type { Metadata } from "next";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";
import { LegalPage } from "../LegalPage";

export const metadata: Metadata = metaPagina({
  title: "Política de reembolsos",
  description: "Cuándo y cómo se puede solicitar un reembolso en Human Stores.",
  path: "/politica-de-reembolsos",
  seccion: "Legal",
});

export default function Page() {
  return (
    <LegalPage path="/politica-de-reembolsos" title="Política de reembolsos">
      <Pendiente texto="política de reembolsos vigente, migrada desde humanstores.com/politicas-de-reembolsos" />
    </LegalPage>
  );
}
