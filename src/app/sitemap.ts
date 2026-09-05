import type { MetadataRoute } from "next";
import { htmlLang, locales, localePath } from "@/lib/i18n";
import { indexingEnabled, sitemapPaths, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexingEnabled) return [];

  return sitemapPaths.flatMap((path) => {
    const languages = Object.fromEntries(
      locales.map((lang) => [htmlLang[lang], `${siteUrl}${localePath(path, lang)}`]),
    );
    return locales.map((lang) => ({
      url: `${siteUrl}${localePath(path, lang)}`,
      alternates: { languages },
    }));
  });
}
