"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const SKAVE_WIDTH = 1036;
const SKAVE_HEIGHT = 235.455;

const letters = [
  { src: "/hero/letters/s.svg", x: 0, y: 0, width: 195.991, height: 235.455 },
  { src: "/hero/letters/k.svg", x: 228.822, y: 3.979, width: 208.924, height: 227.496 },
  { src: "/hero/letters/a.svg", x: 429.391, y: 3.979, width: 236.118, height: 227.496 },
  { src: "/hero/letters/v.svg", x: 630.09, y: 3.979, width: 222.521, height: 227.496 },
  { src: "/hero/letters/e.svg", x: 852.279, y: 3.979, width: 183.721, height: 227.496 },
] as const;

type HeroMediaProps = {
  playVideoLabel: string;
  closeVideoLabel: string;
};

type VideoModalProps = {
  closeLabel: string;
  open: boolean;
  onClose: () => void;
  title: string;
};

function VideoModal({ closeLabel, open, onClose, title }: VideoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-fixed-black p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.42, ease: [0.4, 0, 1, 1] },
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label={closeLabel}
            className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full bg-fixed-white text-fixed-black transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fixed-white md:top-8 md:right-8"
            onClick={onClose}
          >
            <XMarkIcon className="size-6" aria-hidden="true" />
          </button>

          <motion.video
            className="max-h-full max-w-full bg-fixed-black object-contain"
            controls
            autoPlay
            playsInline
            preload="auto"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                duration: 0.7,
                delay: 0.06,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.97,
              y: 8,
              transition: { duration: 0.38, ease: [0.4, 0, 1, 1] },
            }}
          >
            <source src="/hero/hero-full.mp4" type="video/mp4" />
          </motion.video>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function HeroMedia({ playVideoLabel, closeVideoLabel }: HeroMediaProps) {
  const skaveRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const [desktopMedia, setDesktopMedia] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const introComplete = Boolean(reduceMotion) || animationComplete;
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 24, stiffness: 115, mass: 0.65 });
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 68.75rem)");
    const updateMedia = () => setDesktopMedia(media.matches);

    updateMedia();
    media.addEventListener("change", updateMedia);

    return () => media.removeEventListener("change", updateMedia);
  }, []);

  const positionAt = useCallback(
    (clientX: number) => {
      const skave = skaveRef.current;
      if (!skave) return;

      const bounds = skave.getBoundingClientRect();
      const videoWidth = videoRef.current?.getBoundingClientRect().width ?? 0;
      const minimumX = -bounds.left;
      const maximumX = window.innerWidth - bounds.left - videoWidth;
      const desiredX = clientX - bounds.left - videoWidth / 2;

      x.set(Math.min(Math.max(desiredX, minimumX), maximumX));
    },
    [x],
  );

  useEffect(() => {
    if (reduceMotion) return;

    const timeout = window.setTimeout(() => setAnimationComplete(true), 1_250);

    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  useEffect(() => {
    if (!desktopMedia) return;

    const skave = skaveRef.current;
    if (!skave) return;

    const setRestingPosition = () => {
      const bounds = skave.getBoundingClientRect();
      positionAt(bounds.left + bounds.width * 0.8);

      if (!introComplete) smoothX.jump(x.get());
    };

    setRestingPosition();

    if (reduceMotion || !introComplete) return;

    const onPointerMove = (event: PointerEvent) => positionAt(event.clientX);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", setRestingPosition);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", setRestingPosition);
    };
  }, [desktopMedia, introComplete, positionAt, reduceMotion, smoothX, x]);

  return (
    <>
      <div ref={skaveRef} className="relative mx-auto w-full overflow-visible">
        <div className="relative aspect-[1036/235.455] w-[calc(100%+0.75rem)]">
          <div role="img" aria-label="SKAVE" className="absolute inset-0">
            {letters.map((letter, index) => (
              <div
                key={letter.src}
                className="absolute overflow-hidden"
                style={{
                  left: `${(letter.x / SKAVE_WIDTH) * 100}%`,
                  top: `${(letter.y / SKAVE_HEIGHT) * 100}%`,
                  width: `${(letter.width / SKAVE_WIDTH) * 100}%`,
                  height: `${(letter.height / SKAVE_HEIGHT) * 100}%`,
                }}
              >
                <motion.div
                  className="relative size-full"
                  initial={reduceMotion ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.68,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Image
                    src={letter.src}
                    alt=""
                    fill
                    priority
                    unoptimized
                    sizes="20vw"
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <motion.button
          ref={videoRef}
          type="button"
          data-cursor="video"
          aria-label={playVideoLabel}
          aria-haspopup="dialog"
          className="relative z-10 mt-[1.25rem] block aspect-video w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-01 desktop:absolute desktop:top-1/2 desktop:left-0 desktop:mt-0 desktop:w-[min(23.5rem,46vw)] desktop:cursor-none"
          onClick={() => setVideoOpen(true)}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, scale: 1.04, clipPath: "inset(0 100% 0 0)" }
          }
          animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0% 0 0)" }}
          whileHover={
            desktopMedia
              ? {
                  scale: 1.3,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }
              : undefined
          }
          transition={{
            duration: 0.78,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={desktopMedia ? { x: reduceMotion ? x : smoothX } : undefined}
        >
          <video
            className="pointer-events-none size-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="/hero/video-poster.jpg"
            preload="metadata"
          >
            <source src="/hero/hero-loop.mp4" type="video/mp4" />
          </video>
        </motion.button>
      </div>

      <VideoModal
        open={videoOpen}
        onClose={closeVideo}
        title={playVideoLabel}
        closeLabel={closeVideoLabel}
      />
    </>
  );
}
