import type { ProjectSource } from "@/data/projects";
import { en } from "./en";
import { pt } from "./pt";

export const leads2b = {
  slug: "leads2b",
  categories: ["brand-development"],
  publishedAt: "2026-04-20",
  status: "active",
  emphasisProject: true,
  content: { pt, en },
} satisfies ProjectSource;
