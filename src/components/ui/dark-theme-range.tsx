"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type DarkThemeRangeProps = {
  children: ReactNode;
};

export function DarkThemeRange({ children }: DarkThemeRangeProps) {
  const rangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const range = rangeRef.current;
    const root = document.documentElement;

    if (!range || !("IntersectionObserver" in window)) {
      root.dataset.theme = "light";
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      root.dataset.theme = entry?.isIntersecting ? "dark" : "light";
    });

    observer.observe(range);

    return () => {
      observer.disconnect();
      root.dataset.theme = "light";
    };
  }, []);

  return <div ref={rangeRef}>{children}</div>;
}
