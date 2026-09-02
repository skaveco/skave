"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

const CURSOR_SIZE = "0.8rem";
const CURSOR_OFFSET = { x: 8, y: 8 } as const;
const CURSOR_SPRING = { damping: 28, stiffness: 260, mass: 0.45 } as const;

type CursorState = "default" | "pressed" | "video" | "case" | "blog" | "drag";

type CursorLabels = {
  video: string;
  case: string;
  blog: string;
  drag: string;
};

type CursorProps = {
  labels: CursorLabels;
  state?: CursorState;
};

// Figma: Website Skave 3.0, node 2851:417.
export function Cursor({ labels, state = "default" }: CursorProps) {
  if (
    state === "video" ||
    state === "case" ||
    state === "blog" ||
    state === "drag"
  ) {
    return (
      <motion.span
        key={state}
        aria-hidden="true"
        className="type-body-sm flex size-[6rem] items-center justify-center rounded-full bg-background-01 p-2.5 text-center whitespace-nowrap text-text-01"
        initial={{ opacity: 0, scale: 0.72 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        {labels[state]}
      </motion.span>
    );
  }

  const isPressed = state === "pressed";

  return (
    <motion.span
      aria-hidden="true"
      style={{ width: CURSOR_SIZE, height: CURSOR_SIZE }}
      className="relative block text-text-01"
      animate={{ rotate: isPressed ? 135 : 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="block size-full bg-current"
        style={{
          maskImage: `url(/cursor/${state}.svg)`,
          maskPosition: "center",
          maskRepeat: "no-repeat",
          maskSize: "contain",
          WebkitMaskImage: `url(/cursor/${state}.svg)`,
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
        }}
      />
    </motion.span>
  );
}

type SiteCursorProps = {
  labels: CursorLabels;
};

export function SiteCursor({ labels }: SiteCursorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hoverStateRef = useRef<Exclude<CursorState, "pressed">>("default");
  const pressedRef = useRef(false);
  const [state, setState] = useState<CursorState>("default");
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, CURSOR_SPRING);
  const smoothY = useSpring(pointerY, CURSOR_SPRING);

  useEffect(() => {
    const root = rootRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!root || !finePointer.matches || reducedMotion.matches) return;

    const move = (event: PointerEvent) => {
      const target = event.target;
      const cursorTarget =
        target instanceof Element
          ? target.closest<HTMLElement>("[data-cursor]")
          : null;
      const cursorState = cursorTarget?.dataset.cursor;
      const hoverState: Exclude<CursorState, "pressed"> =
        cursorState === "video" ||
        cursorState === "case" ||
        cursorState === "blog" ||
        cursorState === "drag"
          ? cursorState
          : "default";
      const offset = hoverState !== "default" ? { x: 0, y: 0 } : CURSOR_OFFSET;
      const x = event.clientX + offset.x;
      const y = event.clientY + offset.y;

      hoverStateRef.current = hoverState;
      if (!pressedRef.current) setState(hoverState);

      if (root.dataset.visible === "false") {
        pointerX.jump(x);
        pointerY.jump(y);
        smoothX.jump(x);
        smoothY.jump(y);
      } else {
        pointerX.set(x);
        pointerY.set(y);
      }

      root.dataset.visible = "true";
    };
    const press = () => {
      pressedRef.current = true;
      setState("pressed");
    };
    const release = () => {
      pressedRef.current = false;
      setState(hoverStateRef.current);
    };
    const hide = () => {
      root.dataset.visible = "false";
      hoverStateRef.current = "default";
      pressedRef.current = false;
      setState("default");
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", hide, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", hide);
      document.documentElement.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [pointerX, pointerY, smoothX, smoothY]);

  return (
    <motion.div
      ref={rootRef}
      data-visible="false"
      className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 transition-opacity duration-500 data-[visible=true]:opacity-100"
      style={{ x: smoothX, y: smoothY }}
    >
      <div
        className={
          state === "video" ||
          state === "case" ||
          state === "blog" ||
          state === "drag"
            ? "-translate-x-1/2 -translate-y-1/2"
            : ""
        }
      >
        <Cursor state={state} labels={labels} />
      </div>
    </motion.div>
  );
}
