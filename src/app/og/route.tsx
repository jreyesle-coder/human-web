import { ImageResponse } from "next/og";

// Valores literales: la imagen se genera fuera del CSS del sitio. Corresponden a ink, bone y amber de tokens.css.
const INK = "#101010";
const BONE = "#f4f1ec";
const AMBER = "#965821";

/** Imagen para compartir (1200×630) con la marca: HUMAN, sección y título de la página. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const titulo = (searchParams.get("titulo") ?? "HUMAN").slice(0, 90);
  const seccion = (searchParams.get("seccion") ?? "").slice(0, 40);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: BONE,
        color: INK,
        padding: "64px 72px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 12 }}>HUMAN</div>
        {seccion && (
          <div
            style={{
              fontSize: 26,
              color: BONE,
              background: INK,
              padding: "6px 16px",
              borderRadius: 999,
            }}
          >
            {seccion}
          </div>
        )}
      </div>
      <div style={{ fontSize: titulo.length > 40 ? 64 : 84, fontWeight: 700, lineHeight: 1.05 }}>
        {titulo}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
        <div style={{ width: 48, height: 8, background: AMBER }} />
        Eliminar · Reparar · Liberar
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
