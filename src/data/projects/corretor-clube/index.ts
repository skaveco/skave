import type { ProjectSource } from "@/data/projects";
import { en } from "./en";
import { pt } from "./pt";

export const corretorClube = {
  slug: "corretor-clube",
  categories: ["online-experience"],
  publishedAt: "00/00/0000",
  status: "active",
  emphasisProject: true,
  content: { pt, en },
} satisfies ProjectSource;
