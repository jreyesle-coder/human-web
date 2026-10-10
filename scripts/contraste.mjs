// Verifica contraste WCAG de los pares de color de tokens.css. Corre antes de cada build y en las pruebas.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/** Pares que el sistema usa de verdad: [texto, fondo, mínimo]. 4.5 = AA texto normal; 3 = AA texto grande/UI. */
export const PARES = [
  ["ink", "bone", 7],
  ["ink", "surface", 7],
  ["ink", "mist", 7],
  ["ink", "functional-soft", 7],
  ["stone", "bone", 4.5],
  ["stone", "surface", 4.5],
  ["stone", "mist", 4.5],
  ["functional", "bone", 4.5],
  ["functional", "surface", 4.5],
  ["functional", "functional-soft", 4.5],
  ["surface", "functional", 4.5],
  ["bone", "functional", 4.5],
  ["surface", "amber", 4.5],
  ["surface", "amber-strong", 4.5],
  ["amber", "bone", 4.5],
  ["amber", "surface", 4.5],
  ["bone", "ink", 7],
  ["error", "bone", 4.5],
  ["error", "surface", 4.5],
  ["error", "error-soft", 4.5],
  ["success", "surface", 4.5],
  ["success", "success-soft", 4.5],
  ["warning", "surface", 4.5],
  ["warning", "warning-soft", 4.5],
  ["line-strong", "surface", 3],
  ["line-strong", "bone", 3],
];

export function leerColores(css) {
  const colores = {};
  for (const m of css.matchAll(/--color-([a-z-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) colores[m[1]] = m[2];
  return colores;
}

function luminancia(hex) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contraste(a, b) {
  const [x, y] = [luminancia(a), luminancia(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

export function verificar(css) {
  const colores = leerColores(css);
  return PARES.map(([texto, fondo, minimo]) => {
    if (!colores[texto] || !colores[fondo]) {
      return { texto, fondo, minimo, ratio: 0, ok: false, falta: true };
    }
    const ratio = contraste(colores[texto], colores[fondo]);
    return { texto, fondo, minimo, ratio, ok: ratio >= minimo };
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const css = readFileSync(new URL("../src/styles/tokens.css", import.meta.url), "utf8");
  const fallos = verificar(css).filter((r) => !r.ok);
  if (fallos.length) {
    for (const f of fallos) {
      console.error(
        f.falta
          ? `Contraste: falta el token ${f.texto} o ${f.fondo}`
          : `Contraste insuficiente: ${f.texto} sobre ${f.fondo} = ${f.ratio.toFixed(2)} (mínimo ${f.minimo})`,
      );
    }
    process.exit(1);
  }
  console.error(`Contraste AA verificado: ${PARES.length} pares.`);
}
