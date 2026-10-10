import { describe, expect, it } from "vitest";
import { isProduction, siteUrl } from "./site";

const env = (vars: Record<string, string>) =>
  vars as unknown as NodeJS.ProcessEnv;

describe("isProduction", () => {
  it("en Vercel solo cuenta el despliegue de producción", () => {
    expect(
      isProduction(env({ VERCEL_ENV: "production", NODE_ENV: "production" })),
    ).toBe(true);
    expect(
      isProduction(env({ VERCEL_ENV: "preview", NODE_ENV: "production" })),
    ).toBe(false);
  });

  it("fuera de Vercel usa NODE_ENV", () => {
    expect(isProduction(env({ NODE_ENV: "production" }))).toBe(true);
    expect(isProduction(env({ NODE_ENV: "development" }))).toBe(false);
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
    expect(siteUrl(env({ ...vercel, VERCEL_ENV: "production" }))).toBe(
      "https://human.vercel.app",
    );
    expect(siteUrl(env({ ...vercel, VERCEL_ENV: "preview" }))).toBe(
      "https://human-abc.vercel.app",
    );
  });

  it("en local cae a localhost", () => {
    expect(siteUrl(env({}))).toBe("http://localhost:3000");
  });
});
