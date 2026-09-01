"use client";

import { useEffect, useRef } from "react";

type ThemeSectionObserverProps = {
  theme?: "light" | "dark";
};

export function ThemeSectionObserver({
  theme = "dark",
}: ThemeSectionObserverProps) {
  const observerTargetRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = observerTargetRef.current;
    if (!target || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    const setTheme = (theme: "light" | "dark") => {
      root.dataset.theme = theme;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          setTheme(theme);
        } else if (entry.boundingClientRect.top > 0) {
          setTheme(theme === "dark" ? "light" : "dark");
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [theme]);

  return (
    <span
      ref={observerTargetRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    />
  );
}
