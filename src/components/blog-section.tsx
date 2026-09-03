import type { Dictionary } from "@/app/[lang]/dictionaries";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import type { BlogPostCard } from "@/data/blog";
import { localePath, type Locale } from "@/lib/i18n";

type BlogSectionProps = {
  content: Dictionary["blog"];
  lang: Locale;
  posts: BlogPostCard[];
};

// Figma: Website Skave 3.0, node 2775:7100.
export function BlogSection({ content, lang, posts }: BlogSectionProps) {
  const [featuredPost, ...otherPosts] = posts;

  if (!featuredPost) return null;

  return (
    <section
      id="novidades"
      aria-labelledby="blog-title"
      className="relative bg-background-01 px-[1.25rem] py-[2.5rem] tablet:py-[5rem] text-text-01 tablet:px-[2.5rem] desktop:py-[4.5625rem] border-b border-divider tablet:border-0"
    >
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-[3rem]">
        <header className="flex flex-col items-start gap-[1.25rem] tablet:flex-row tablet:items-end tablet:justify-between tablet:gap-[2rem]">
          <h2 id="blog-title" className="type-display-md">
            <TextAnimate animation="slideUp">{content.title}</TextAnimate>
          </h2>
          <Button
            href={localePath("/blog", lang)}
            icon="arrow-long-right"
            fontSize="0.875rem"
            className="shrink-0"
          >
            {content.viewAll}
          </Button>
        </header>

        <div className="grid items-start gap-[2rem] tablet:gap-[1.25rem] desktop:sticky desktop:top-[7rem] desktop:grid-cols-2">
          <BlogCard
            {...featuredPost}
            href={localePath(`/blog/${featuredPost.slug}`, lang)}
            imageSizes="(min-width: 68.75rem) 50vw, 100vw"
          />

          <div className="grid items-start gap-[2rem] tablet:gap-[1.25rem] tablet:grid-cols-2 desktop:sticky desktop:top-[5rem]">
            {otherPosts.slice(0, 2).map((post) => (
              <BlogCard
                key={post.slug}
                {...post}
                href={localePath(`/blog/${post.slug}`, lang)}
                imageSizes="(min-width: 68.75rem) 25vw, (min-width: 48rem) 50vw, 100vw"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
