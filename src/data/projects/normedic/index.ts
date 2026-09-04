import type { ProjectSource } from "@/data/projects";
import { en } from "./en";
import { pt } from "./pt";

export const normedic = {
  slug: "normedic",
  categories: ["digital-product"],
  publishedAt: "2026-10-01",
  status: "active",
  emphasisProject: true,
  content: { pt, en },
} satisfies ProjectSource;
