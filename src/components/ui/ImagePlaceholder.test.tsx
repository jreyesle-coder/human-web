// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ImagePlaceholder } from "./ImagePlaceholder";

describe("ImagePlaceholder (S0-21)", () => {
  it("respeta la proporción y marca la falta como pendiente", () => {
    render(
      <ImagePlaceholder
        width={1200}
        height={800}
        label="Foto de instalaciones"
      />,
    );
    const img = screen.getByRole("img", {
      name: "Imagen pendiente: Foto de instalaciones",
    });
    expect(img.style.aspectRatio).toBe("1200 / 800");
    expect(img.textContent).toContain("{{PENDIENTE: Foto de instalaciones}}");
  });
});
