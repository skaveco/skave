export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};

export function hasLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function localePath(path: string, locale: Locale) {
  if (path.startsWith("#")) return `/${locale}${path}`;

  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
}

export function alternateLocale(locale: Locale): Locale {
  return locales.find((candidate) => candidate !== locale) ?? defaultLocale;
}
