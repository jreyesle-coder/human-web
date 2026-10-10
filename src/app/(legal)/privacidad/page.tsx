import type { Metadata } from "next";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";
import { LegalPage } from "../LegalPage";

export const metadata: Metadata = metaPagina({
  title: "Aviso de privacidad",
  description:
    "Cómo Human Performance Center trata tus datos personales conforme a la Ley No. 172-13 de República Dominicana.",
  path: "/privacidad",
  seccion: "Legal",
});

export default function Page() {
  return (
    <LegalPage path="/privacidad" title="Aviso de privacidad">
      <Pendiente texto="aviso de privacidad vigente del cliente, migrado desde humanstores.com/politica-privacidad (revisión legal)" />
    </LegalPage>
  );
}
