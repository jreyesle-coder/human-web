import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    // Node por defecto; los componentes piden jsdom con un comentario al inicio del archivo.
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
