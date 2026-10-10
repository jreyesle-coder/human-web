import { describe, expect, it } from "vitest";
import { isProduction } from "./site";

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
