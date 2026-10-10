import type { MetadataRoute } from "next";
import { STATIC_ROUTES } from "@/lib/routes";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return STATIC_ROUTES.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
  }));
}
