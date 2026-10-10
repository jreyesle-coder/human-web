import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Sin partialPrefetching: una ruta no listada se renderiza completa y notFound() responde 404 real (D-011).
  partialPrefetching: false,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Fotos de producto servidas por la tienda actual (WordPress + CDN de Jetpack).
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "humanstores.com", pathname: "/wp-content/uploads/**" },
      { protocol: "https", hostname: "i0.wp.com", pathname: "/humanstores.com/**" },
      { protocol: "https", hostname: "i1.wp.com", pathname: "/humanstores.com/**" },
      { protocol: "https", hostname: "i2.wp.com", pathname: "/humanstores.com/**" },
      { protocol: "https", hostname: "i3.wp.com", pathname: "/humanstores.com/**" },
      // Miniaturas de los videos de YouTube (se muestran antes de cargar el reproductor).
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// El frontmatter lo lee src/lib/content con gray-matter; aquí solo se quita del cuerpo renderizado.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter"],
  },
});

export default withMDX(nextConfig);
