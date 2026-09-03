"use client";

import { useEffect, useRef, type ReactNode } from "react";

type MediaRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  fade?: boolean;
  mobileOnly?: boolean;
};

export function MediaReveal({
  children,
  className = "",
  delay = 0,
  fade = true,
  mobileOnly = false,
}: MediaRevealProps) {
  const observerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerElement = observerRef.current;
    const mediaElement = mediaRef.current;
    if (!observerElement || !mediaElement) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 68.75rem)").matches;
    if (reduceMotion || (mobileOnly && desktop) || !("IntersectionObserver" in window)) {
      mediaElement.style.clipPath = "inset(0 0 0% 0)";
      mediaElement.style.opacity = "1";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        mediaElement.animate(
          [
            { clipPath: "inset(0 0 100% 0)", opacity: fade ? 0 : 1 },
            { clipPath: "inset(0 0 0% 0)", opacity: 1 },
          ],
          {
            duration: 1000,
            delay,
            easing: "ease-in-out",
            fill: "forwards",
          },
        );
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(observerElement);
    return () => observer.disconnect();
  }, [delay, fade, mobileOnly]);

  return (
    <div ref={observerRef} className={className}>
      <div
        ref={mediaRef}
        className={`size-full ${mobileOnly ? "desktop:![clip-path:inset(0)] desktop:!opacity-100" : ""}`}
        style={{ clipPath: "inset(0 0 100% 0)", opacity: fade ? 0 : 1 }}
      >
        {children}
      </div>
    </div>
  );
}
