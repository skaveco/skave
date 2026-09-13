"use client";

import { useEffect, useRef, type ComponentProps } from "react";

type ViewportVideoProps = Omit<ComponentProps<"video">, "autoPlay" | "ref"> & {
  hoverTargetSelector?: string;
};

export function ViewportVideo({ hoverTargetSelector, ...props }: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !("IntersectionObserver" in window)) return;

    let visible = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 68.75rem)");
    const target = hoverTargetSelector
      ? video.closest<HTMLElement>(hoverTargetSelector)
      : null;
    let hovered = target?.matches(":hover") ?? false;
    let focused = target?.matches(":focus-visible") ?? false;
    const syncPlayback = () => {
      const interactionAllowed = !hoverTargetSelector || !desktop.matches || hovered || focused;
      if (visible && interactionAllowed && !document.hidden && !reducedMotion.matches) {
        // Autoplay can be denied by browser settings.
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const onEnter = () => { hovered = true; syncPlayback(); };
    const onLeave = () => { hovered = false; syncPlayback(); };
    const onFocus = () => {
      focused = target?.matches(":focus-visible") ?? false;
      syncPlayback();
    };
    const onBlur = () => { focused = false; syncPlayback(); };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting && entry.intersectionRatio > 0);
        syncPlayback();
      },
      // Reveal animations initially clip the video to zero area. A positive
      // threshold guarantees another callback when the video becomes visible.
      { threshold: [0, 0.01] },
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    reducedMotion.addEventListener("change", syncPlayback);
    video.addEventListener("canplay", syncPlayback);
    desktop.addEventListener("change", syncPlayback);
    target?.addEventListener("mouseenter", onEnter);
    target?.addEventListener("mouseleave", onLeave);
    target?.addEventListener("focusin", onFocus);
    target?.addEventListener("focusout", onBlur);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      reducedMotion.removeEventListener("change", syncPlayback);
      video.removeEventListener("canplay", syncPlayback);
      desktop.removeEventListener("change", syncPlayback);
      target?.removeEventListener("mouseenter", onEnter);
      target?.removeEventListener("mouseleave", onLeave);
      target?.removeEventListener("focusin", onFocus);
      target?.removeEventListener("focusout", onBlur);
      video.pause();
    };
  }, [hoverTargetSelector]);

  return <video {...props} ref={videoRef} />;
}
