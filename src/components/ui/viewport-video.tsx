"use client";

import { useEffect, useRef, type ComponentProps } from "react";

type ViewportVideoProps = Omit<ComponentProps<"video">, "autoPlay" | "ref">;

export function ViewportVideo(props: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !("IntersectionObserver" in window)) return;

    let visible = false;
    const syncPlayback = () => {
      if (visible && !document.hidden) {
        // Autoplay can be denied by browser settings.
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting && entry.intersectionRatio > 0);
      syncPlayback();
    });

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, []);

  return <video {...props} ref={videoRef} />;
}
