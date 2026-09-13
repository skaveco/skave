import type { Dictionary } from "@/app/[lang]/dictionaries";
import { ContactForm } from "@/components/contact/contact-form";
import { TextAnimate } from "@/components/ui/text-animate";

type ContactSectionProps = {
  content: Dictionary["contact"];
  privacyHref: string;
  successHref: string;
};

// Figma: Website Skave 3.0, node 2784:424.
export function ContactSection({ content, privacyHref, successHref }: ContactSectionProps) {
  return (
    <section
      id="formulario-contato"
      data-theme="dark"
      aria-labelledby="contact-page-title"
      className="bg-background-01 px-[1.25rem] pt-[7.5rem] pb-[5rem] text-text-01 tablet:px-[2.5rem]"
    >
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-[3rem] desktop:gap-[5rem]">
        <div className="flex flex-col gap-[2rem] desktop:flex-row desktop:items-end desktop:justify-between">
          <h1 id="contact-page-title" className="type-display-md text-primary">
            <TextAnimate animation="slideUp">{content.title}</TextAnimate>
          </h1>
          <div className="flex w-full max-w-[25.9375rem] flex-col gap-[0.625rem]">
            <p className="type-label-sm">
              <TextAnimate animation="shimmer-sweep">{content.eyebrow}</TextAnimate>
            </p>
            <p className="type-body-base text-text-02">
              <TextAnimate animation="shimmer-sweep" delay={100}>
                {content.description}
              </TextAnimate>
            </p>
          </div>
        </div>
        <ContactForm
          content={content.form}
          privacyHref={privacyHref}
          successHref={successHref}
        />
      </div>
    </section>
  );
}
