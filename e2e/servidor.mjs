// Servidor de las pruebas e2e: levanta una Store API simulada con una copia fija del catálogo
// (e2e/fixtures, tomada de humanstores.com el 2026-10-10), compila contra ella y arranca el sitio.
// Las pruebas no dependen de que la tienda real responda desde el servidor de CI.
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";

const PUERTO_API = 3199;
const PUERTO_SITIO = process.env.PUERTO_SITIO ?? "3100";
const leer = (f) => JSON.parse(readFileSync(new URL(`./fixtures/${f}`, import.meta.url), "utf8"));
const productos = leer("woo-productos.json");
const categorias = leer("woo-categorias.json");

createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://127.0.0.1:${PUERTO_API}`);
  const json = (cuerpo, status = 200) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(cuerpo));
  };
  if (url.pathname === "/products") {
    const pagina = Number(url.searchParams.get("page") ?? 1);
    return json(pagina === 1 ? productos : []);
  }
  if (url.pathname === "/products/categories") return json(categorias);
  const uno = url.pathname.match(/^\/products\/(\d+)$/);
  if (uno) {
    const p = productos.find((x) => x.id === Number(uno[1]));
    return p ? json(p) : json({ code: "not_found" }, 404);
  }
  json({ code: "not_found" }, 404);
}).listen(PUERTO_API, "127.0.0.1");

const env = { ...process.env, WOO_STORE_API_URL: `http://127.0.0.1:${PUERTO_API}` };
const correr = (args) =>
  new Promise((ok, falla) => {
    const p = spawn("pnpm", args, { env, stdio: "inherit", shell: true });
    p.on("exit", (code) =>
      code === 0 ? ok() : falla(new Error(`pnpm ${args.join(" ")} salió con ${code}`)),
    );
  });

await correr(["build"]);
await correr(["start", "-p", PUERTO_SITIO]);
