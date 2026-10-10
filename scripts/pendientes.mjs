// Lista todo el contenido pendiente del repositorio (S2-17).
//   pnpm pendientes             → tabla en consola
//   pnpm pendientes --backlog   → además reescribe la sección marcada de backlog.md
//   pnpm pendientes --json      → salida JSON (la usa docs/materiales-pendientes.md)
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CARPETAS = ["src", "content"];
const IGNORAR = /(__fixtures|\.test\.|[\\/]ui[\\/]|Pendiente\.tsx|ImagePlaceholder\.tsx)/;

const PATRONES = [
  { tipo: "Texto", re: /<Pendiente\b[^>]*?\btexto=\{?(["'`])([\s\S]*?)\1/g },
  { tipo: "Imagen", re: /<ImagePlaceholder\b[^>]*?\blabel=\{?(["'`])([\s\S]*?)\1/g },
  { tipo: "Texto", re: /\bpendiente[=:]\s*\{?(["'`])([\s\S]*?)\1/g },
  { tipo: "Texto", re: /\{\{PENDIENTE:\s*()([^}]+)\}\}/g },
];

function archivos(dir) {
  return readdirSync(dir).flatMap((nombre) => {
    const ruta = path.join(dir, nombre);
    if (statSync(ruta).isDirectory()) return archivos(ruta);
    return /\.(tsx?|mdx)$/.test(nombre) ? [ruta] : [];
  });
}

/** Ruta del sitio a la que pertenece un archivo, para que el cliente sepa dónde mirar. */
function rutaDelSitio(relativo) {
  const app = relativo.match(/^src[\\/]app[\\/](.*)[\\/]page\.tsx$/);
  if (app) {
    const r = app[1]
      .split(/[\\/]/)
      .filter((t) => !t.startsWith("("))
      .join("/");
    return `/${r}`;
  }
  const mdx = relativo.match(/^content[\\/]([^\\/]+)[\\/](.+)\.mdx$/);
  if (mdx) {
    const base = {
      metodo: "/metodo",
      protocolos: "/tienda/protocolos",
      motivos: "/sanar/motivos",
      evaluaciones: "/sanar/evaluaciones",
      coaches: "/entrenar/coaches",
      historias: "/historias",
      contenido: "/contenido",
    }[mdx[1]];
    return `${base}/${mdx[2]}`;
  }
  return "(componente compartido)";
}

export function recolectar() {
  const items = [];
  for (const carpeta of CARPETAS) {
    for (const archivo of archivos(path.join(RAIZ, carpeta))) {
      const relativo = path.relative(RAIZ, archivo);
      if (IGNORAR.test(relativo)) continue;
      const texto = readFileSync(archivo, "utf8");
      for (const { tipo, re } of PATRONES) {
        for (const m of texto.matchAll(re)) {
          const linea = texto.slice(0, m.index).split("\n").length;
          const descripcion = m[2].replace(/\s+/g, " ").trim();
          if (!descripcion || descripcion.includes("texto que el cliente")) continue;
          items.push({
            tipo,
            descripcion,
            ruta: rutaDelSitio(relativo),
            archivo: `${relativo.replace(/\\/g, "/")}:${linea}`,
          });
        }
      }
    }
  }
  return items.sort((a, b) => a.ruta.localeCompare(b.ruta) || a.archivo.localeCompare(b.archivo));
}

function tabla(items) {
  const filas = items.map(
    (i) => `| ${i.ruta} | ${i.tipo} | ${i.descripcion.replace(/\|/g, "/")} | \`${i.archivo}\` |`,
  );
  return ["| Ruta | Tipo | Qué falta | Archivo |", "|---|---|---|---|", ...filas].join("\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const items = recolectar();
  if (process.argv.includes("--json")) {
    process.stdout.write(JSON.stringify(items, null, 2));
  } else {
    process.stdout.write(`${tabla(items)}\n\n${items.length} pendientes.\n`);
  }
  if (process.argv.includes("--backlog")) {
    const archivo = path.join(RAIZ, "backlog.md");
    const actual = readFileSync(archivo, "utf8");
    const inicio = "<!-- pendientes:inicio -->";
    const fin = "<!-- pendientes:fin -->";
    const bloque = `${inicio}\n_Generado con \`pnpm pendientes --backlog\`. No editar a mano._\n\n${tabla(items)}\n${fin}`;
    const nuevo = actual.includes(inicio)
      ? actual.replace(new RegExp(`${inicio}[\\s\\S]*?${fin}`), bloque)
      : actual.replace(
          "## Deuda técnica declarada",
          `### Pendientes en el sitio\n\n${bloque}\n\n## Deuda técnica declarada`,
        );
    writeFileSync(archivo, nuevo);
  }
}
