import type { ProjectSource } from "@/data/projects";
import { en } from "./en";
import { pt } from "./pt";

export const fca = {
  slug: "fca",
  categories: ["brand-development"],
  publishedAt: "00/00/0000",
  status: "active",
  emphasisProject: true,
  content: { pt, en },
} satisfies ProjectSource;
