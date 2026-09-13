import type { ProjectSource } from "@/data/projects";
import { en } from "./en";
import { pt } from "./pt";

export const clickCannabis = {
  slug: "clickcannabis",
  categories: ["brand-development"],
  publishedAt: "2026-02-01",
  status: "active",
  emphasisProject: true,
  content: { pt, en },
} satisfies ProjectSource;
