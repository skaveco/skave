import type { ProjectLocaleContent } from "@/data/projects";

export const en = {
  name: "Normedic",
  segment: "Health and Technology",
  services: ["UI/UX Design", "Design System"],
  location: "São Paulo, Brazil",
  capabilities: [
    "User research",
    "Product strategy",
    "Information architecture",
    "UI/UX Design",
    "Prototyping",
    "Design System",
  ],
  credits: [
    { role: "Creative direction", names: ["Mateus Seifert"] },
    { role: "UI/UX Design", names: ["Mateus Seifert", "L. Nascimento"] },
    { role: "Development", names: ["Skave team"] },
  ],
  title: "A simpler digital experience designed to transform healthcare",
  description:
    "We redesigned Normedic's experience to connect patients, professionals, and technology through a clear, accessible platform built to scale.",
  challenge:
    "Organize a complex journey with different user profiles and a large amount of information without losing clarity or trust throughout the care experience.",
  solution:
    "We created a task-oriented architecture, simplified the main flows, and developed a consistent visual system for the entire platform.",
  cover: {
    src: "/hero/video-poster.jpg",
    alt: "Temporary image for the Normedic project",
  },
  media: [
    {
      type: "image",
      src: "/results/leads2b-event.png",
      alt: "Temporary visual presentation for the Normedic project",
    },
    {
      type: "video",
      src: "/hero/hero-loop.mp4",
      poster: "/hero/video-poster.jpg",
      alt: "Temporary video demonstration of Normedic's digital experience",
    },
    {
      type: "image",
      src: "/results/doutor-sim-award.png",
      alt: "Temporary visual identity application for the Normedic project",
    },
  ],
} satisfies ProjectLocaleContent;
