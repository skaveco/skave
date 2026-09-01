"use client";

import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import {
  useAnimate,
  useReducedMotion,
  type AnimationOptions,
  type ValueAnimationTransition,
} from "motion/react";

const rotations = {
  top: "rotateX(90deg)",
  right: "rotateY(90deg)",
  bottom: "rotateX(-90deg)",
  left: "rotateY(-90deg)",
} as const;

const frontFaceTransforms = {
  top: "translateZ(0.5lh)",
  right: "rotateY(-90deg) translateX(50%) rotateY(90deg)",
  bottom: "translateZ(0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
} as const;

const secondFaceTransforms = {
  top: "rotateX(-90deg) translateZ(0.5lh)",
  right:
    "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)",
  bottom: "rotateX(90deg) translateZ(0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(50%)",
} as const;

const containerTransforms = {
  top: "translateZ(-0.5lh)",
  right: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
  bottom: "translateZ(-0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
} as const;

type RotateDirection = keyof typeof rotations;

type Text3DFlipProps = {
  children: string;
  difference?: boolean;
  rotateDirection?: RotateDirection;
  staggerDuration?: number;
  transition?: ValueAnimationTransition | AnimationOptions;
};

const segmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter("pt", { granularity: "grapheme" })
    : null;

function splitCharacters(text: string) {
  return segmenter
    ? Array.from(segmenter.segment(text), ({ segment }) => segment)
    : Array.from(text);
}

export function Text3DFlip({
  children,
  difference = false,
  rotateDirection = "top",
  staggerDuration = 0.022,
  transition = { type: "spring", damping: 27, stiffness: 190 },
}: Text3DFlipProps) {
  const [scope, animate] = useAnimate();
  const isAnimating = useRef(false);
  const reduceMotion = useReducedMotion();
  const characters = useMemo(() => splitCharacters(children), [children]);

  const play = useCallback(async () => {
    const trigger = scope.current?.closest("a, button");

    if (
      reduceMotion ||
      isAnimating.current ||
      (trigger instanceof HTMLButtonElement && trigger.disabled)
    ) {
      return;
    }

    isAnimating.current = true;

    try {
      await animate(
        ".text-3d-flip-character",
        { transform: rotations[rotateDirection] },
        {
          ...transition,
          delay: (index: number) => index * staggerDuration,
        },
      );
      await animate(
        ".text-3d-flip-character",
        { transform: "rotateX(0deg) rotateY(0deg)" },
        { duration: 0 },
      );
    } finally {
      isAnimating.current = false;
    }
  }, [animate, reduceMotion, rotateDirection, scope, staggerDuration, transition]);

  useEffect(() => {
    const trigger = scope.current?.closest("a, button");
    if (!trigger) return;

    trigger.addEventListener("mouseenter", play);
    trigger.addEventListener("focus", play);

    return () => {
      trigger.removeEventListener("mouseenter", play);
      trigger.removeEventListener("focus", play);
    };
  }, [play, scope]);

  return (
    <span ref={scope} className="relative inline-flex whitespace-pre" aria-hidden="true">
      {characters.map((character, index) => (
        <Character
          key={`${character}-${index}`}
          character={character}
          difference={difference}
          rotateDirection={rotateDirection}
        />
      ))}
    </span>
  );
}

type CharacterProps = {
  character: string;
  difference: boolean;
  rotateDirection: RotateDirection;
};

const Character = memo(function Character({
  character,
  difference,
  rotateDirection,
}: CharacterProps) {
  const faceClassName = difference
    ? "text-fixed-white"
    : "bg-background-01";

  return (
    <span
      className="text-3d-flip-character inline transform-3d"
      style={{ transform: containerTransforms[rotateDirection] }}
    >
      <span
        className={`relative h-[1lh] backface-hidden ${faceClassName}`}
        style={{ transform: frontFaceTransforms[rotateDirection] }}
      >
        {character}
      </span>
      <span
        className={`absolute top-0 left-0 h-[1lh] backface-hidden ${faceClassName}`}
        style={{ transform: secondFaceTransforms[rotateDirection] }}
      >
        {character}
      </span>
    </span>
  );
});
