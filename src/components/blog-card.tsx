import Image, { type ImageProps } from "next/image";
import Link from "next/link";

import { Tag } from "@/components/ui/tag";
import { MediaReveal } from "@/components/ui/media-reveal";

type BlogCardProps = {
  href: string;
  image: ImageProps["src"];
  imageAlt: string;
  category: string;
  date: string;
  dateTime: string;
  title: string;
  imageSizes?: string;
  className?: string;
};

// Figma: Website Skave 3.0, node 2873:462.
export function BlogCard({
  href,
  image,
  imageAlt,
  category,
  date,
  dateTime,
  title,
  imageSizes = "100vw",
  className = "",
}: BlogCardProps) {
  return (
    <Link
      href={href}
      data-cursor="blog"
      className={`group flex w-full cursor-none flex-col items-start gap-[1.5rem] text-text-01 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-01 ${className}`}
    >
      <MediaReveal className="aspect-square w-full overflow-hidden">
        <figure className="relative size-full overflow-hidden bg-divider p-[1.25rem]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes={imageSizes}
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transition-none"
          />
          <Tag className="relative z-10">{category}</Tag>
        </figure>
      </MediaReveal>

      <div className="flex w-full flex-col items-start gap-[0.5rem]">
        <time dateTime={dateTime} className="type-label-sm text-text-02">
          ({date})
        </time>
        <h3 className="type-body-lg w-full">{title}</h3>
      </div>
    </Link>
  );
}
