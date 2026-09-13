import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { hasLocale, htmlLang, locales, localePath } from "@/lib/i18n";
import { getDictionary } from "../dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/privacidade">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { privacyPage } = await getDictionary(lang);
  const { title, description } = privacyPage.metadata;

  return {
    title,
    description,
    alternates: {
      canonical: localePath("/privacidade", lang),
      languages: {
        ...Object.fromEntries(
          locales.map((locale) => [htmlLang[locale], localePath("/privacidade", locale)]),
        ),
        "x-default": "/privacidade",
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/privacidade">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const content = dict.privacyPage;

  return (
    <>
      <Header lang={lang} copy={dict.header} />
      <main className="bg-background-01 px-[1.25rem] pt-[8rem] pb-[8rem] text-text-01 tablet:px-[2.5rem] tablet:pt-[8rem]">
        <article className="mx-auto grid w-full max-w-[62.5rem] gap-[2.5rem] desktop:grid-cols-[minmax(0,1fr)_minmax(30rem,2fr)] desktop:gap-[6rem]">
          <header className="desktop:sticky desktop:top-32 desktop:self-start">
            <h1 className="type-heading-md mb-[1.25rem] max-w-[12ch]">{content.title}</h1>
            <p className="type-body-base max-w-[30rem] text-text-02">{content.intro}</p>
            <p className="type-body-sm mt-[1.25rem] text-text-02">
              {content.updatedLabel}: <time dateTime="2026-09-08">{content.updatedAt}</time>
            </p>
          </header>

          <div className="flex flex-col">
            {content.sections.map((section) => (
              <section
                key={section.title}
                className="border-t border-divider py-[1.25rem] first:pt-0 first:border-t-0 tablet:py-[2rem]"
              >
                <h2 className="type-body-lg mb-[1.25rem]">{section.title}</h2>
                <div className="flex max-w-[44rem] flex-col gap-4 text-text-02">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="type-body-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer content={dict.footer} lang={lang} />
    </>
  );
}
