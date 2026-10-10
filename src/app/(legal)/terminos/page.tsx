import type { Metadata } from "next";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";
import { LegalPage } from "../LegalPage";

export const metadata: Metadata = metaPagina({
  title: "Términos y condiciones",
  description: "Términos y condiciones de uso del sitio y de compra en Human Stores.",
  path: "/terminos",
  seccion: "Legal",
});

export default function Page() {
  return (
    <LegalPage path="/terminos" title="Términos y condiciones">
      <Pendiente texto="términos y condiciones vigentes del cliente (revisión legal)" />
    </LegalPage>
  );
}
