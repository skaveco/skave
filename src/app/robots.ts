import type { MetadataRoute } from "next";
import { indexingEnabled, siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    // Crawlers must access the HTML to read the pre-launch noindex directive.
    rules: { userAgent: "*", allow: "/" },
    ...(indexingEnabled ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
