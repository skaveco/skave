import type { ProjectSource } from "@/data/projects";
import { en } from "./en";
import { pt } from "./pt";

export const aurea = {
  slug: "aurea",
  categories: ["brand-development", "online-experience"],
  publishedAt: "00/00/0000",
  status: "active",
  emphasisProject: true,
  content: { pt, en },
} satisfies ProjectSource;
