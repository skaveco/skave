import { notFound } from "next/navigation";

import { AboutSection } from "@/components/about-section";
import { BlogSection } from "@/components/blog-section";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { CustomersSection } from "@/components/customers-section";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { NumbersSection } from "@/components/numbers-section";
import { PartnersSection } from "@/components/partners-section";
import { ProjectsSection } from "@/components/projects-section";
import { ResultsSection } from "@/components/results-section";
import { blogPostCards } from "@/data/blog";
import { projectCards } from "@/data/projects";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} copy={dict.header} />
      <main>
        <Hero lang={lang} content={dict.hero} />
        <ProjectsSection
          content={dict.projects}
          projects={projectCards(lang)}
        />
        <AboutSection content={dict.about} />
        <ResultsSection content={dict.results} />
        <CapabilitiesSection content={dict.capabilities} />
        <NumbersSection content={dict.numbers} />
        <CustomersSection content={dict.customers} />
        <PartnersSection content={dict.partners} />
        <BlogSection
          content={dict.blog}
          lang={lang}
          posts={blogPostCards(lang)}
        />
      </main>
    </>
  );
}
