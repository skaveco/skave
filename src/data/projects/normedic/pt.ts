import type { ProjectLocaleContent } from "@/data/projects";

export const pt = {
  name: "Normedic",
  segment: "Saúde e Tecnologia",
  services: ["UI/UX Design", "Design System"],
  location: "São Paulo, Brasil",
  capabilities: [
    "Pesquisa com usuários",
    "Estratégia de produto",
    "Arquitetura da informação",
    "UI/UX Design",
    "Prototipação",
    "Design System",
  ],
  credits: [
    { role: "Direção criativa", names: ["Mateus Seifert"] },
    { role: "UI/UX Design", names: ["Mateus Seifert", "L. Nascimento"] },
    { role: "Desenvolvimento", names: ["Equipe Skave"] },
  ],
  title: "Uma experiência digital mais simples para transformar o cuidado com a saúde",
  description:
    "Redesenhamos a experiência da Normedic para aproximar pacientes, profissionais e tecnologia em uma plataforma clara, acessível e preparada para crescer.",
  challenge:
    "Organizar uma jornada complexa, com diferentes perfis de usuário e grande volume de informações, sem perder clareza ou confiança durante o atendimento.",
  solution:
    "Criamos uma arquitetura orientada às tarefas mais importantes, simplificamos os fluxos e desenvolvemos um sistema visual consistente para toda a plataforma.",
  cover: {
    src: "/hero/video-poster.jpg",
    alt: "Imagem temporária do projeto Normedic",
  },
  media: [
    {
      type: "image",
      src: "/results/leads2b-event.png",
      alt: "Apresentação visual temporária do projeto Normedic",
    },
    {
      type: "video",
      src: "/hero/hero-loop.mp4",
      poster: "/hero/video-poster.jpg",
      alt: "Demonstração em vídeo temporária da experiência digital da Normedic",
    },
    {
      type: "image",
      src: "/results/doutor-sim-award.png",
      alt: "Aplicação temporária da identidade visual do projeto Normedic",
    },
  ],
} satisfies ProjectLocaleContent;
