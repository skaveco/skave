import type { Dictionary } from "@/app/[lang]/dictionaries";
import { htmlLang, type Locale } from "@/lib/i18n";

export const siteUrl = "https://skave.co";

// Enable only for the public launch; previews and local development stay noindex.
export const indexingEnabled =
  process.env.SITE_INDEXING_ENABLED === "true" &&
  process.env.NODE_ENV === "production" &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");

// Add routes here only after their content and metadata are ready to publish.
export const sitemapPaths = ["/", "/projetos"];

export function homeJsonLd(dict: Dictionary, lang: Locale) {
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const pageUrl = `${siteUrl}/${lang}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Skave",
        url: siteUrl,
        logo: `${siteUrl}/brand/skave.svg`,
        description: dict.footer.statement,
        email: dict.footer.email,
        telephone: dict.footer.phone.replace(/[^\d+]/g, ""),
        sameAs: dict.footer.socialLinks.map(({ url }) => url),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: "Skave",
        publisher: { "@id": organizationId },
        inLanguage: ["pt-BR", "en"],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: dict.metadata.title,
        description: dict.metadata.description,
        inLanguage: htmlLang[lang],
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
      },
    ],
  };
}
