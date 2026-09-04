"use client";

import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

import type { Dictionary } from "@/app/[lang]/dictionaries";
import { HeaderLink } from "@/components/header-link";
import {
  alternateLocale,
  localePath,
  type Locale,
} from "@/lib/i18n";

type HeaderProps = {
  lang: Locale;
  copy: Dictionary["header"];
};

const navigation = [
  ["services", "#especialidades"],
  ["cases", "/projetos"],
  ["about", "#sobre"],
  ["news", "#novidades"],
] as const;

// Figma: Website Skave 3.0, node 2823:41.
export function Header({ lang, copy }: HeaderProps) {
  const nextLocale = alternateLocale(lang);
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileNavigationId = useId();

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const entrance = reduceMotion ? false : { y: "-100%" };
  const entranceTransition = {
    duration: reduceMotion ? 0 : 0.68,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <>
      {/* Figma: Website Skave 3.0, node 2855:411. */}
      <motion.header
        className="fixed inset-x-0 top-0 z-50 overflow-hidden bg-background-01 px-5 py-[1.375rem] text-text-01 desktop:hidden"
        initial={entrance}
        animate={{ y: 0, height: menuOpen ? "100dvh" : "4.875rem" }}
        transition={entranceTransition}
      >
        <div className="flex h-full min-h-0 flex-col gap-10">
          <div className="flex shrink-0 items-center justify-between">
            <Link
              href={localePath("/", lang)}
              aria-label={copy.homeLabel}
              onClick={() => setMenuOpen(false)}
              className="flex h-[1.5705rem] w-[4.375rem] items-center text-text-01 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span className="size-full bg-current [mask:url('/brand/skave.svg')_center/100%_100%_no-repeat]" />
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href={localePath("/", nextLocale)}
                aria-label={copy.changeLanguageLabel}
                hrefLang={nextLocale}
                className="type-text-base flex size-8 items-center justify-center text-text-01 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {lang.toUpperCase()}
              </Link>

              <button
                type="button"
                aria-label={menuOpen ? copy.menuCloseLabel : copy.menuOpenLabel}
                aria-expanded={menuOpen}
                aria-controls={mobileNavigationId}
                onClick={() => setMenuOpen((open) => !open)}
                className="relative size-8 text-text-01 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-px w-8 bg-current"
                  animate={{
                    x: "-50%",
                    y: menuOpen ? "-50%" : "calc(-50% - 0.25rem)",
                    rotate: menuOpen ? 45 : 0,
                  }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-px w-8 bg-current"
                  animate={{
                    x: "-50%",
                    y: menuOpen ? "-50%" : "calc(-50% + 0.25rem)",
                    rotate: menuOpen ? -45 : 0,
                  }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                id={mobileNavigationId}
                aria-label={copy.navigationLabel}
                className="flex min-h-0 w-full flex-col"
                initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.32, delay: 0.08 }}
              >
                {navigation.map(([label, anchor], index) => (
                  <motion.div
                    key={label}
                    className="border-b border-divider"
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.32, delay: 0.1 + index * 0.04 }}
                  >
                    <Link
                      href={localePath(anchor, lang)}
                      onClick={() => setMenuOpen(false)}
                      className="type-body-base flex min-h-[2.75rem] items-center text-text-01 focus-visible:outline-2 focus-visible:outline-offset-[-0.125rem]"
                    >
                      {copy[label]}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.32, delay: 0.26 }}
                >
                  <Link
                    href={localePath("#contato", lang)}
                    onClick={() => setMenuOpen(false)}
                    className="type-body-base flex min-h-[2.75rem] items-center gap-3 text-text-01 focus-visible:outline-2 focus-visible:outline-offset-[-0.125rem]"
                  >
                    {copy.contact}
                    <ArrowLongRightIcon aria-hidden="true" className="size-4 shrink-0" />
                  </Link>
                </motion.div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <motion.header
        className="fixed inset-x-0 top-0 z-50 hidden h-[4.125rem] w-full px-8 py-[1.375rem] text-fixed-white mix-blend-difference desktop:block"
        initial={entrance}
        animate={{ y: 0 }}
        transition={entranceTransition}
      >
        <div className="flex h-[1.375rem] w-full items-center justify-between">
          <Link
            href={localePath("/", lang)}
            aria-label={copy.homeLabel}
            className="flex h-3.5 w-32 items-center text-fixed-white focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <span className="h-3.5 w-[2.4519375rem] bg-current [mask:url('/brand/skave.svg')_center/100%_100%_no-repeat]" />
          </Link>

          <nav aria-label={copy.navigationLabel} className="flex items-center gap-6">
            {navigation.map(([label, anchor]) => (
              <HeaderLink
                key={label}
                href={localePath(anchor, lang)}
              >
                {copy[label]}
              </HeaderLink>
            ))}
          </nav>

          <div className="flex w-32 items-center justify-end gap-7">
            <HeaderLink href={localePath("#contato", lang)}>
              {copy.contact}
            </HeaderLink>
            <span
              aria-hidden="true"
              className="h-3.5 w-0 shrink-0 border-l-[0.0625rem] border-fixed-white"
            />
            <Link
              href={localePath("/", nextLocale)}
              aria-label={copy.changeLanguageLabel}
              hrefLang={nextLocale}
              className="type-text-base whitespace-nowrap text-fixed-white focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {lang.toUpperCase()}
            </Link>
          </div>
        </div>
      </motion.header>
    </>
  );
}
