import type { Locale } from "@/lib/i18n";

type LocalizedText = Record<Locale, string>;

type BlogPostSource = {
  slug: string;
  image: string;
  imageAlt: LocalizedText;
  category: LocalizedText;
  date: string;
  dateTime: string;
  title: LocalizedText;
};

export type BlogPostCard = {
  slug: string;
  image: string;
  imageAlt: string;
  category: string;
  date: string;
  dateTime: string;
  title: string;
};

const posts: BlogPostSource[] = [
  {
    slug: "diagnostico-e-evolucao",
    image: "/results/doutor-sim-award.png",
    imageAlt: {
      pt: "Equipe celebrando o resultado de um projeto",
      en: "Team celebrating the outcome of a project",
    },
    category: { pt: "Tecnologia", en: "Technology" },
    date: "03/04/2026",
    dateTime: "2026-04-03",
    title: {
      pt: "Ajudamos a diagnosticar desafios, construir soluções e acompanhar sua evolução.",
      en: "We help diagnose challenges, build solutions, and support their evolution.",
    },
  },
  {
    slug: "estrategia-para-produtos-digitais",
    image: "/results/leads2b-event.png",
    imageAlt: {
      pt: "Profissional apresentando aprendizados de um projeto digital",
      en: "Professional presenting insights from a digital project",
    },
    category: { pt: "Tecnologia", en: "Technology" },
    date: "03/04/2026",
    dateTime: "2026-04-03",
    title: {
      pt: "Estratégia e tecnologia trabalhando juntas na evolução de produtos digitais.",
      en: "Strategy and technology working together to evolve digital products.",
    },
  },
  {
    slug: "marcas-em-transformacao",
    image: "/hero/video-poster.jpg",
    imageAlt: {
      pt: "Equipe da Skave em um ambiente de trabalho colaborativo",
      en: "Skave team in a collaborative workspace",
    },
    category: { pt: "Branding", en: "Branding" },
    date: "03/04/2026",
    dateTime: "2026-04-03",
    title: {
      pt: "Como marcas em transformação podem construir experiências mais consistentes.",
      en: "How evolving brands can build more consistent experiences.",
    },
  },
];

export function blogPostCards(locale: Locale): BlogPostCard[] {
  return posts.slice(0, 3).map((post) => ({
    slug: post.slug,
    image: post.image,
    imageAlt: post.imageAlt[locale],
    category: post.category[locale],
    date: post.date,
    dateTime: post.dateTime,
    title: post.title[locale],
  }));
}
