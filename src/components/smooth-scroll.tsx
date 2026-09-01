"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

const lenisOptions = {
  anchors: true,
  autoRaf: true,
  stopInertiaOnNavigate: true,
} as const;

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
