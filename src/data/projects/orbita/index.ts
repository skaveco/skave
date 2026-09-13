import type { ProjectSource } from "@/data/projects";
import { en } from "./en";
import { pt } from "./pt";

export const orbita = {
  slug: "orbita",
  categories: ["digital-product"],
  publishedAt: "2026-04-20",
  status: "active",
  emphasisProject: true,
  content: { pt, en },
} satisfies ProjectSource;
