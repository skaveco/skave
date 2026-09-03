"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type EasingType =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "easeInCubic"
  | "easeOutCubic"
  | "easeInOutCubic"
  | "easeInQuad"
  | "easeOutQuad"
  | "easeInOutQuad"
  | "easeInQuart"
  | "easeOutQuart"
  | "easeInOutQuart";

type TextAnimateProps = {
  animation: "slideUp" | "shimmer-sweep";
  children: string;
  duration?: number;
  delay?: number;
  stagger?: number;
  easing?: EasingType;
};

const easings: Record<EasingType, string> = {
  linear: "linear",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  easeInCubic: "cubic-bezier(0.32, 0, 0.67, 0)",
  easeOutCubic: "cubic-bezier(0.33, 1, 0.68, 1)",
  easeInOutCubic: "cubic-bezier(0.65, 0, 0.35, 1)",
  easeInQuad: "cubic-bezier(0.11, 0, 0.5, 0)",
  easeOutQuad: "cubic-bezier(0.5, 1, 0.89, 1)",
  easeInOutQuad: "cubic-bezier(0.45, 0, 0.55, 1)",
  easeInQuart: "cubic-bezier(0.5, 0, 0.75, 0)",
  easeOutQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
  easeInOutQuart: "cubic-bezier(0.76, 0, 0.24, 1)",
};

export function TextAnimate({
  animation,
  children,
  duration,
  delay = 0,
  stagger = 50,
  easing = "easeOut",
}: TextAnimateProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;

    if (!element || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const shouldShow = isVisible || reduceMotion;
  const resolvedDuration = duration ?? (animation === "shimmer-sweep" ? 850 : 1000);

  if (animation === "shimmer-sweep") {
    return (
      <span
        ref={ref}
        className="inline-block"
        style={{
          opacity: shouldShow ? 1 : 0,
          transform: shouldShow ? "translateX(0)" : "translateX(-22px)",
          filter: shouldShow ? "blur(0px)" : "blur(8px)",
          transitionDuration: `${reduceMotion ? 0 : resolvedDuration}ms`,
          transitionDelay: `${reduceMotion ? 0 : delay}ms`,
          transitionProperty: "opacity, transform, filter",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span ref={ref} className="inline-block" aria-label={children}>
      {Array.from(children).map((character, index) => (
        <span
          key={`${character}-${index}`}
          aria-hidden="true"
          className="inline-block motion-reduce:translate-y-0 motion-reduce:opacity-100"
          style={{
            opacity: shouldShow ? 1 : 0,
            transform: shouldShow ? "translateY(0)" : "translateY(20px)",
            transitionDuration: `${reduceMotion ? 0 : resolvedDuration}ms`,
            transitionDelay: `${delay + index * stagger}ms`,
            transitionProperty: "opacity, transform",
            transitionTimingFunction: easings[easing],
            whiteSpace: character === " " ? "pre" : "normal",
          }}
        >
          {character === " " ? "\u00a0" : character}
        </span>
      ))}
    </span>
  );
}
