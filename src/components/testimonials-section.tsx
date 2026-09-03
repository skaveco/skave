import Image from "next/image";

import type { Dictionary } from "@/app/[lang]/dictionaries";
import { TestimonialStack } from "@/components/ui/testimonial-stack";
import { TextAnimate } from "@/components/ui/text-animate";

type TestimonialsSectionProps = {
  content: Dictionary["testimonials"];
};

// Figma: Website Skave 3.0, node 2885:462.
export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  return (
    <section
      id="depoimentos"
      aria-labelledby="testimonials-title"
      className="overflow-x-clip bg-background-01 px-[1.25rem] w-full py-[2.5rem] tablet:py-[5rem] text-text-01 tablet:px-[2.5rem] tablet:py-[2.5rem] desktop:py-[2.5rem]"
    >
      <div className="mx-auto grid w-full grid-cols-[minmax(0,1fr)] items-center gap-[2.5rem] tablet:gap-[5rem] desktop:grid-cols-[minmax(0,25rem)_minmax(0,31.25rem)] desktop:justify-between desktop:gap-[7.5rem]">
        <div className="flex flex-col w-full items-start gap-[2.5rem]">
          <header className="flex w-full flex-col items-start gap-[0.75rem]">
            <p className="type-label-md">{content.eyebrow}</p>
            <h2 id="testimonials-title" className="type-heading-md">
              <TextAnimate
                animation="shimmer-sweep"
                duration={1000}
                delay={0}
              >
                {content.title}
              </TextAnimate>
            </h2>
          </header>

          <div className="flex items-start gap-[0.75rem]">
            <Image
              src="/testimonials/google-business.svg"
              alt=""
              width={16}
              height={16}
              className="size-[1rem] shrink-0"
            />

            <div className="flex flex-col items-start gap-[0.25rem]">
              <p className="type-body-sm">{content.reviews}</p>
              <div aria-hidden="true" className="flex items-center gap-[0.25rem]">
                {Array.from({ length: 5 }, (_, index) => (
                  <Image
                    key={index}
                    src="/testimonials/star.svg"
                    alt=""
                    width={12}
                    height={12}
                    className="size-[0.75rem]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <TestimonialStack
            key={content.items
              .map((testimonial) => testimonial.authorName)
              .join("-")}
            testimonials={content.items}
            previousLabel={content.previousLabel}
            nextLabel={content.nextLabel}
            statusLabel={content.statusLabel}
          />
        </div>
      </div>
    </section>
  );
}
