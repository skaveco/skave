import "server-only";

import type { Locale } from "@/lib/i18n";
import pt from "./dictionaries/pt.json";

const dictionaries = {
  pt: () => import("./dictionaries/pt.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
} satisfies Record<Locale, () => Promise<typeof pt>>;

export type Dictionary = typeof pt;

export function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
