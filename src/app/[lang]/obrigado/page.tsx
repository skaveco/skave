import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { DarkThemeRange } from "@/components/ui/dark-theme-range";
import { TextAnimate } from "@/components/ui/text-animate";
import { hasLocale, localePath } from "@/lib/i18n";
import { getDictionary } from "../dictionaries";

type ThankYouPageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: ThankYouPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { thankYou } = await getDictionary(lang);

  return {
    title: thankYou.metadata.title,
    description: thankYou.description,
    robots: { index: false, follow: true },
    alternates: { canonical: localePath("/obrigado", lang) },
  };
}

// Figma: Website Skave 3.0, node 2963:4075.
export default async function ThankYouPage({ params }: ThankYouPageProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const content = dict.thankYou;

  return (
    <DarkThemeRange persistAfter>
      <div data-theme="dark" className="min-h-svh bg-background-01 text-text-01">
        <Header lang={lang} copy={dict.header} />
        <main>
          <section
            aria-labelledby="thank-you-title"
            className="flex min-h-svh items-center justify-center px-[1.25rem] py-[7.5rem] tablet:px-[2.5rem]"
          >
            <div className="mx-auto flex w-full max-w-[86rem] flex-col items-center gap-[1.5rem] text-center">
              <h1
                id="thank-you-title"
                className="type-display-md w-full tablet:leading-[6rem] tablet:tracking-[-0.125rem]"
              >
                <span className="text-primary">
                  <TextAnimate animation="slideUp">{content.title}</TextAnimate>
                </span>{" "}
                {content.subtitle.split(" ").map((word, index, words) => (
                  <span key={`${word}-${index}`}>
                    <TextAnimate
                      animation="slideUp"
                      delay={(content.title.length + 1 + words.slice(0, index).join(" ").length + (index > 0 ? 1 : 0)) * 50}
                    >
                      {word}
                    </TextAnimate>
                    {index < words.length - 1 ? " " : null}
                  </span>
                ))}
              </h1>
              <div className="flex w-full max-w-[31.25rem] flex-col items-center gap-[1.75rem]">
                <p className="type-body-base">
                  <TextAnimate animation="shimmer-sweep" delay={200}>
                    {content.description}
                  </TextAnimate>
                </p>
                <hr className="w-full border-0 border-t border-divider" />
                <Button
                  href={localePath("/", lang)}
                  icon="arrow-long-right"
                  fontSize="0.875rem"
                  iconSize="1.25rem"
                  className="leading-[1.25rem] tracking-[0.0175rem]"
                >
                  {content.backToSite}
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </DarkThemeRange>
  );
}
