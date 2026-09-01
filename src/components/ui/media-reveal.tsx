"use client";

import { useEffect, useRef, type ReactNode } from "react";

type MediaRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MediaReveal({ children, className = "", delay = 0 }: MediaRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!element || reduceMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        element.animate(
          [
            { clipPath: "inset(0 0 100% 0)", opacity: 0 },
            { clipPath: "inset(0 0 0% 0)", opacity: 1 },
          ],
          {
            duration: 700,
            delay,
            easing: "ease-in-out",
            fill: "both",
          },
        );
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
