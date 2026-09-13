import type { ProjectSource } from "@/data/projects";
import { en } from "./en";
import { pt } from "./pt";

export const aurea = {
  slug: "aurea",
  categories: ["online-experience"],
  publishedAt: "2026-09-20",
  status: "active",
  emphasisProject: true,
  content: { pt, en },
} satisfies ProjectSource;
