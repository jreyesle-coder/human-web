import type { Metadata, Viewport } from "next";
import { Archivo, Source_Sans_3 } from "next/font/google";
import { BottomBar } from "@/components/blocks/BottomBar";
import { Footer } from "@/components/blocks/Footer";
import { Header } from "@/components/blocks/Header";
import { JsonLd } from "@/components/ui/JsonLd";
import { ToastProvider } from "@/components/ui/Toast";
import { UBICACION } from "@/lib/marca";
import { SITE_DESCRIPTION, SITE_NAME, isProduction, siteUrl } from "@/lib/site";
import "./globals.css";

// D-010: Archivo (títulos, geométrica) + Source Sans 3 (texto, humanista). El subset latin cubre tildes y ñ.
const display = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const body = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE_NAME} · Entrenar, sanar y sostener`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "es_DO",
    siteName: SITE_NAME,
  },
  robots: isProduction() ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f4f1ec",
  width: "device-width",
  initialScale: 1,
};

function OrganizationSchema() {
  const url = siteUrl();
  const direccion = {
    "@type": "PostalAddress",
    streetAddress: UBICACION.calle,
    addressLocality: UBICACION.ciudad,
    addressCountry: UBICACION.codigoPais,
  };
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${url}/#organizacion`,
            name: "Human Performance Center",
            alternateName: SITE_NAME,
            url,
            founder: { "@id": `${url}/juan-carlos-simo#persona` },
          },
          {
            "@type": "HealthClub",
            "@id": `${url}/entrenar#negocio`,
            name: "Human Balance",
            url: `${url}/entrenar`,
            address: direccion,
            parentOrganization: { "@id": `${url}/#organizacion` },
          },
          {
            "@type": "MedicalBusiness",
            "@id": `${url}/sanar#negocio`,
            name: "Centro de Dietética Funcional",
            url: `${url}/sanar`,
            address: direccion,
            parentOrganization: { "@id": `${url}/#organizacion` },
          },
          {
            "@type": "Store",
            "@id": `${url}/tienda#negocio`,
            name: "Human Stores",
            url: `${url}/tienda`,
            address: direccion,
            currenciesAccepted: "DOP",
            parentOrganization: { "@id": `${url}/#organizacion` },
          },
        ],
      }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-DO" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <ToastProvider>
          <Header />
          <div id="contenido" tabIndex={-1} className="flex flex-1 flex-col outline-none">
            {children}
          </div>
          <Footer />
          <BottomBar />
        </ToastProvider>
        <OrganizationSchema />
      </body>
    </html>
  );
}
