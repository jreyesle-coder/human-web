import { describe, expect, it } from "vitest";
import { isProduction, siteUrl } from "./site";

const env = (vars: Record<string, string>) => vars as unknown as NodeJS.ProcessEnv;

describe("isProduction", () => {
  it("solo es producción con HUMAN_LANZAMIENTO=si", () => {
    expect(isProduction(env({ HUMAN_LANZAMIENTO: "si" }))).toBe(true);
  });

  it("un despliegue de Vercel sin la bandera es de presentación", () => {
    expect(isProduction(env({ VERCEL_ENV: "production", NODE_ENV: "production" }))).toBe(false);
    expect(isProduction(env({ NODE_ENV: "production" }))).toBe(false);
  });
});

describe("siteUrl", () => {
  it("prefiere la URL configurada y quita la barra final", () => {
    expect(siteUrl(env({ NEXT_PUBLIC_SITE_URL: "https://dominio.do/" }))).toBe(
      "https://dominio.do",
    );
  });

  it("sin configurar, usa el dominio de Vercel según el entorno", () => {
    const vercel = {
      VERCEL_PROJECT_PRODUCTION_URL: "human.vercel.app",
      VERCEL_URL: "human-abc.vercel.app",
    };
    expect(siteUrl(env({ ...vercel, VERCEL_ENV: "production" }))).toBe("https://human.vercel.app");
    expect(siteUrl(env({ ...vercel, VERCEL_ENV: "preview" }))).toBe("https://human-abc.vercel.app");
  });

  it("en local cae a localhost", () => {
    expect(siteUrl(env({}))).toBe("http://localhost:3000");
  });
});
