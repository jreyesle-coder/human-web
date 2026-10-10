import type { Metadata } from "next";
import { Pendiente } from "@/components/ui/Pendiente";
import { metaPagina } from "@/lib/seo";
import { LegalPage } from "../LegalPage";

export const metadata: Metadata = metaPagina({
  title: "Aviso legal",
  description: "Datos del titular del sitio y condiciones legales de Human Performance Center.",
  path: "/aviso-legal",
  seccion: "Legal",
});

export default function Page() {
  return (
    <LegalPage path="/aviso-legal" title="Aviso legal">
      <Pendiente texto="aviso legal vigente, migrado desde humanstores.com/aviso-legal" />
    </LegalPage>
  );
}
