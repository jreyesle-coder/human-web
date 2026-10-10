import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
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
