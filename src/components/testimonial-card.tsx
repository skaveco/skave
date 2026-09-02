import Image, { type ImageProps } from "next/image";

type TestimonialCardProps = {
  quote: string;
  authorName: string;
  authorRole: string;
  authorImage?: ImageProps["src"];
  authorImageAlt?: string;
  className?: string;
};

// Figma: Website Skave 3.0, node 2885:522.
export function TestimonialCard({
  quote,
  authorName,
  authorRole,
  authorImage,
  authorImageAlt = "",
  className = "",
}: TestimonialCardProps) {
  return (
    <figure
      data-cursor="drag"
      className={`flex w-full cursor-none flex-col items-start gap-[2rem] border border-divider bg-background-02 p-[2.5rem] text-text-01 ${className}`}
    >
      <span
        aria-hidden="true"
        className="h-[1.5625rem] w-[2.875rem] shrink-0 bg-primary [mask:url('/testimonials/quote-mark.svg')_center/100%_100%_no-repeat]"
      />

      <blockquote className="type-body-base h-[7.5rem] w-full overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:6]">
        {quote}
      </blockquote>

      <div aria-hidden="true" className="h-px w-full bg-divider" />

      <figcaption className="flex min-w-0 items-center gap-[1.25rem]">
        {authorImage ? (
          <Image
            src={authorImage}
            alt={authorImageAlt}
            width={46}
            height={46}
            className="size-[2.875rem] shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="size-[2.875rem] shrink-0 rounded-full bg-divider"
          />
        )}

        <div className="type-body-sm flex min-w-0 flex-col">
          <span>{authorName}</span>
          <span className="text-text-02">{authorRole}</span>
        </div>
      </figcaption>
    </figure>
  );
}
