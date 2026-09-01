import type { Locale } from "@/lib/i18n";

type LocalizedText = Record<Locale, string>;

type ProjectSource = {
  slug: string;
  name: string;
  services: Record<Locale, string[]>;
  segment: LocalizedText;
  publishedAt: string;
  imageAlt: LocalizedText;
};

export type ProjectCard = {
  slug: string;
  name: string;
  services: string[];
  segment: string;
  publishedAt: string;
  imageAlt: string;
};

const projects: ProjectSource[] = [
  {
    slug: "normedic",
    name: "Normedic",
    services: {
      pt: ["UI/UX Design", "Identidade Visual"],
      en: ["UI/UX Design", "Visual Identity"],
    },
    segment: { pt: "Segmento do projeto", en: "Project segment" },
    publishedAt: "01/10/2026",
    imageAlt: {
      pt: "Imagem temporária do projeto Normedic",
      en: "Temporary image for the Normedic project",
    },
  },
  {
    slug: "aurea",
    name: "Aurea",
    services: {
      pt: ["UI/UX Design", "Identidade Visual"],
      en: ["UI/UX Design", "Visual Identity"],
    },
    segment: { pt: "Segmento do projeto", en: "Project segment" },
    publishedAt: "00/00/0000",
    imageAlt: {
      pt: "Imagem temporária do projeto Aurea",
      en: "Temporary image for the Aurea project",
    },
  },
  {
    slug: "smart-pedidos",
    name: "Smart Pedidos",
    services: {
      pt: ["UI/UX Design", "Identidade Visual"],
      en: ["UI/UX Design", "Visual Identity"],
    },
    segment: { pt: "Segmento do projeto", en: "Project segment" },
    publishedAt: "00/00/0000",
    imageAlt: {
      pt: "Imagem temporária do projeto Smart Pedidos",
      en: "Temporary image for the Smart Pedidos project",
    },
  },
];

export function projectCards(locale: Locale): ProjectCard[] {
  return projects.slice(0, 5).map((project) => ({
    slug: project.slug,
    name: project.name,
    services: project.services[locale],
    segment: project.segment[locale],
    publishedAt: project.publishedAt,
    imageAlt: project.imageAlt[locale],
  }));
}
