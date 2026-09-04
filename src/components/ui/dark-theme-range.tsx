"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type DarkThemeRangeProps = {
  children: ReactNode;
  persistAfter?: boolean;
};

export function DarkThemeRange({
  children,
  persistAfter = false,
}: DarkThemeRangeProps) {
  const rangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const range = rangeRef.current;
    const root = document.documentElement;

    if (!range || !("IntersectionObserver" in window)) {
      root.dataset.theme = "light";
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;

      const isPastRange = entry.boundingClientRect.bottom <= 0;
      root.dataset.theme =
        entry.isIntersecting || (persistAfter && isPastRange) ? "dark" : "light";
    });

    observer.observe(range);

    return () => {
      observer.disconnect();
      root.dataset.theme = "light";
    };
  }, [persistAfter]);

  return <div ref={rangeRef}>{children}</div>;
}
