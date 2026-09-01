"use client";

import {
  TextAnimate as ReactTextAnimate,
  type EasingType,
} from "react-text-animator";

type TextAnimateProps = {
  animation: "slideUp";
  children: string;
  duration?: number;
  delay?: number;
  stagger?: number;
  easing?: EasingType;
};

export function TextAnimate({
  animation,
  children,
  duration,
  delay,
  stagger,
  easing,
}: TextAnimateProps) {
  return (
    <ReactTextAnimate
      animation={animation}
      trigger="view"
      duration={duration}
      delay={delay}
      stagger={stagger}
      easing={easing}
    >
      {children}
    </ReactTextAnimate>
  );
}
