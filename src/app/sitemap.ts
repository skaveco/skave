import type { MetadataRoute } from "next";
import { activeProjectSlugs } from "@/data/projects";
import { htmlLang, locales, localePath } from "@/lib/i18n";
import { indexingEnabled, sitemapPaths, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexingEnabled) return [];

  const paths = [
    ...sitemapPaths,
    ...activeProjectSlugs().map((slug) => `/projetos/${slug}`),
  ];

  return paths.flatMap((path) => {
    const languages = {
      ...Object.fromEntries(
        locales.map((lang) => [htmlLang[lang], `${siteUrl}${localePath(path, lang)}`]),
      ),
      "x-default": `${siteUrl}${path}`,
    };
    return locales.map((lang) => ({
      url: `${siteUrl}${localePath(path, lang)}`,
      alternates: { languages },
    }));
  });
}
