import type { MetadataRoute } from "next";
import { isProduction, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Los previews y el desarrollo local nunca se indexan.
  if (!isProduction()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/ui"] },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
