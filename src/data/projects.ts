import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

import { aurea } from "@/data/projects/aurea";
import { corretorClube } from "@/data/projects/corretor-clube";
import { fca } from "@/data/projects/fca";
import { normedic } from "@/data/projects/normedic";
import { smartPedidos } from "@/data/projects/smart-pedidos";

export type ProjectCategory =
  | "brand-development"
  | "online-experience"
  | "digital-product";

export type ProjectStatus = "active" | "inactive";

export type ProjectCredit = { role: string; names: string[] };

export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
};

export type ProjectCover = Pick<ProjectMedia, "src" | "alt">;

export type ProjectLocaleContent = {
  name: string;
  segment: string;
  services: string[];
  location: string;
  capabilities: string[];
  credits: ProjectCredit[];
  title: string;
  description: string;
  challenge: string;
  solution: string;
  cover: ProjectCover;
  media: ProjectMedia[];
};

export type ProjectSource = {
  slug: string;
  categories: ProjectCategory[];
  publishedAt: string;
  status: ProjectStatus;
  emphasisProject: boolean;
  content: Record<Locale, ProjectLocaleContent>;
};

export type Project = Omit<ProjectSource, "content"> & ProjectLocaleContent;

export type ProjectCard = Pick<
  Project,
  | "slug"
  | "name"
  | "categories"
  | "services"
  | "segment"
  | "publishedAt"
> & { href: string; image?: string; imageAlt: string };

const projects: ProjectSource[] = [
  normedic,
  aurea,
  smartPedidos,
  corretorClube,
  fca,
];

function localizeProject(project: ProjectSource, locale: Locale): Project {
  return {
    ...project,
    ...project.content[locale],
    publishedAt: formatProjectDate(project.publishedAt, locale),
  };
}

function formatProjectDate(date: string, locale: Locale): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function toProjectCard(project: Project, locale: Locale): ProjectCard {
  return {
    slug: project.slug,
    name: project.name,
    categories: project.categories,
    services: project.services,
    segment: project.segment,
    publishedAt: project.publishedAt,
    href: localePath(`/projetos/${project.slug}`, locale),
    image: project.cover.src,
    imageAlt: project.cover.alt,
  };
}

export function projectCards(locale: Locale): ProjectCard[] {
  return projects
    .filter((project) => project.status === "active")
    .map((project) => toProjectCard(localizeProject(project, locale), locale));
}

export function emphasisProjectCards(locale: Locale): ProjectCard[] {
  return projects
    .filter(
      (project) => project.status === "active" && project.emphasisProject,
    )
    .map((project) => toProjectCard(localizeProject(project, locale), locale));
}

export function relatedProjectCards(
  currentSlug: string,
  locale: Locale,
  limit = 3,
): ProjectCard[] {
  return projects
    .filter(
      (project) => project.status === "active" && project.slug !== currentSlug,
    )
    .slice(0, limit)
    .map((project) => toProjectCard(localizeProject(project, locale), locale));
}

export function getProject(slug: string, locale: Locale): Project | undefined {
  const project = projects.find(
    (item) => item.slug === slug && item.status === "active",
  );

  return project ? localizeProject(project, locale) : undefined;
}

export function activeProjectSlugs(): string[] {
  return projects
    .filter((project) => project.status === "active")
    .map((project) => project.slug);
}
