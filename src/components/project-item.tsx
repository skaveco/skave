import Image, { type ImageProps } from "next/image";
import Link from "next/link";

import { MediaReveal } from "@/components/ui/media-reveal";
import { TextAnimate } from "@/components/ui/text-animate";

type ProjectItemProps = {
  number: string;
  name: string;
  services: string[];
  segment: string;
  publishedAt: string;
  image?: ImageProps["src"];
  imageAlt: string;
  href?: string;
  className?: string;
};

// Figma: Website Skave 3.0, nodes 2857:554 (desktop) and 2859:590 (responsive).
export function ProjectItem({
  number,
  name,
  services,
  segment,
  publishedAt,
  image = "/hero/video-poster.jpg",
  imageAlt,
  href,
  className = "",
}: ProjectItemProps) {
  const rootClassName = `group relative flex w-full flex-col items-start gap-[0.75rem] border-b border-divider py-[1.25rem] text-text-02 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-01 desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-0 ${className}`;
  const content = (
    <>
      <div className="flex w-full shrink-0 flex-col items-start justify-center gap-[1.25rem] text-text-01 transition-[gap,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none desktop:w-auto desktop:flex-row desktop:items-center desktop:gap-[2.5rem] desktop:whitespace-nowrap desktop:text-text-02 desktop:group-hover:gap-[5rem] desktop:group-hover:text-text-01 desktop:group-focus-visible:gap-[5rem] desktop:group-focus-visible:text-text-01">
        <span className="type-body-base">({number})</span>
        <h3 className="type-heading-md">
          <TextAnimate animation="slideUp" duration={200}>{name}</TextAnimate>
        </h3>
      </div>

      <ul className="type-label-sm flex shrink-0 items-center gap-[1.125rem] uppercase">
        {services.map((service) => (
          <li
            key={service}
            className="w-[6.4375rem] first:w-[4.625rem]"
          >
            {service}
          </li>
        ))}
      </ul>

      <MediaReveal
        fade={false}
        mobileOnly
        className="relative z-10 aspect-video w-full cursor-none overflow-hidden bg-background-01 opacity-100 shadow-sm [clip-path:inset(0)] transition-[clip-path,visibility] duration-1000 ease-in-out motion-reduce:transition-none desktop:invisible desktop:absolute desktop:top-[calc(50%+0.0625rem)] desktop:left-[calc(50%+2.8125rem)] desktop:h-[14.875rem] desktop:w-[25.125rem] desktop:-translate-x-1/2 desktop:-translate-y-1/2 desktop:aspect-auto desktop:bg-text-02 desktop:[clip-path:inset(0_0_100%_0)] desktop:group-hover:visible desktop:group-hover:[clip-path:inset(0)] desktop:group-focus-visible:visible desktop:group-focus-visible:[clip-path:inset(0)]"
      >
        <figure data-cursor="case" className="relative size-full">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 68.75rem) 25.125rem, 100vw"
            className="object-cover"
          />

          <figcaption className="type-label-md absolute inset-x-0 bottom-0 z-10 flex items-center gap-[1.25rem] p-[1.25rem] text-fixed-white uppercase">
            <span>{segment}</span>
            <time>{publishedAt}</time>
          </figcaption>
        </figure>
      </MediaReveal>
    </>
  );

  if (href) {
    return (
      <article>
        <Link href={href} className={rootClassName}>
          {content}
        </Link>
      </article>
    );
  }

  return (
    <article tabIndex={0} className={rootClassName}>
      {content}
    </article>
  );
}
