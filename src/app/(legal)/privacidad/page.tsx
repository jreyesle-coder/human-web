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

/**
 * Las secciones "Qué datos pide este sitio" describen lo que el código hace de verdad (docs/privacidad.md).
 * El texto legal vigente lo entrega el cliente: no se redacta de cero (docs/01).
 */
export default function PrivacidadPage() {
  return (
    <LegalPage path="/privacidad" title="Aviso de privacidad">
      <Pendiente texto="aviso de privacidad vigente del cliente, migrado desde humanstores.com/politica-privacidad, con revisión legal conforme a la Ley No. 172-13" />

      <h2>Qué datos pide este sitio</h2>
      <p>
        Este sitio solo pide datos en tres formularios, y en cada uno pide tu consentimiento
        explícito:
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Formulario</th>
            <th scope="col">Datos</th>
            <th scope="col">Para qué</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Boletín</td>
            <td>Correo</td>
            <td>Enviarte el boletín.</td>
          </tr>
          <tr>
            <td>Clase de prueba (Human Balance)</td>
            <td>Nombre, teléfono, correo, objetivo general y horario preferido</td>
            <td>Coordinar tu clase de prueba.</td>
          </tr>
          <tr>
            <td>Agendar evaluación (consultorio)</td>
            <td>Nombre, teléfono, correo, motivo general y horario preferido</td>
            <td>Agendar y confirmar tu evaluación.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Además se registra desde qué página enviaste el formulario y, si llegaste por una campaña,
        su nombre. Sirve para saber qué canales funcionan.
      </p>

      <h2 id="consultorio">Datos del consultorio</h2>
      <p>
        El formulario del Centro de Dietética Funcional no pide síntomas, historial médico ni
        medicación. El motivo se escoge de una lista general. Todo el detalle clínico se conversa en
        consulta, en persona.
      </p>
      <ul>
        <li>El motivo de consulta no se envía a herramientas de medición ni de publicidad.</li>
        <li>Ningún dato del formulario viaja en la dirección (URL) de la página.</li>
        <li>
          Los datos llegan por correo al equipo del consultorio y no se comparten con terceros.
        </li>
      </ul>
      <Pendiente texto="responsable del tratamiento, plazo de conservación y canal para ejercer los derechos de acceso, rectificación y cancelación (cliente, revisión legal)" />
    </LegalPage>
  );
}
