"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type NumberTickerProps = {
  value: number;
  prefix?: string;
  className?: string;
  replayOnHover?: boolean;
};

export function NumberTicker({
  value,
  prefix = "",
  className = "",
  replayOnHover = false,
}: NumberTickerProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  const playAnimation = useCallback(() => {
    animationRef.current?.stop();
    animationRef.current = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
  }, [value]);

  useEffect(() => {
    if (!isInView) return;

    if (reduceMotion) return;

    playAnimation();

    return () => animationRef.current?.stop();
  }, [isInView, playAnimation, reduceMotion]);

  const handlePointerEnter = () => {
    if (!replayOnHover || reduceMotion || !isInView) return;

    const supportsDesktopHover = window.matchMedia(
      "(min-width: 68.75rem) and (hover: hover) and (pointer: fine)",
    ).matches;

    if (supportsDesktopHover) playAnimation();
  };

  return (
    <span
      ref={elementRef}
      className={className}
      aria-label={`${prefix}${value}`}
      onPointerEnter={handlePointerEnter}
    >
      <span aria-hidden="true">
        {prefix}
        {reduceMotion && isInView ? value : displayValue}
      </span>
    </span>
  );
}
