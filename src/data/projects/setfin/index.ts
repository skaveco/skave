import type { ProjectSource } from "@/data/projects";
import { en } from "./en";
import { pt } from "./pt";

export const setfin = {
  slug: "setfin",
  categories: ["brand-development", "online-experience"],
  publishedAt: "2025-08-22",
  status: "active",
  emphasisProject: true,
  content: { pt, en },
} satisfies ProjectSource;
