"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from "motion/react";
import { useEffect, useState, type FocusEvent, type ReactNode } from "react";

import type { Dictionary } from "@/app/[lang]/dictionaries";
import { TestimonialCard } from "@/components/testimonial-card";

type Testimonial = Dictionary["testimonials"]["items"][number];

type TestimonialStackProps = {
  testimonials: Testimonial[];
  previousLabel: string;
  nextLabel: string;
  statusLabel: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  sensitivity?: number;
};

type StackItem = {
  id: string;
  testimonial: Testimonial;
};

type DraggableCardProps = {
  active: boolean;
  children: ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
};

function DraggableCard({
  active,
  children,
  onSendToBack,
  sensitivity,
}: DraggableCardProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
      x.set(0);
      y.set(0);
      return;
    }

    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      aria-hidden={!active}
      data-cursor={active ? "drag" : undefined}
      className="absolute inset-0 cursor-none touch-none select-none"
      style={{
        x,
        y,
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        pointerEvents: active ? "auto" : "none",
      }}
      drag={active}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

function makeStack(testimonials: Testimonial[]): StackItem[] {
  return testimonials.map((testimonial, index) => ({
    id: `${testimonial.authorName}-${testimonial.authorRole}-${index}`,
    testimonial,
  }));
}

export function TestimonialStack({
  testimonials,
  previousLabel,
  nextLabel,
  statusLabel,
  autoplay = true,
  autoplayDelay = 5_000,
  pauseOnHover = true,
  sensitivity = 200,
}: TestimonialStackProps) {
  const reduceMotion = useReducedMotion();
  const [stack, setStack] = useState(() => makeStack(testimonials));
  const [paused, setPaused] = useState(false);
  const activeItem = stack.at(-1);
  const activeIndex = activeItem
    ? testimonials.findIndex(
        (testimonial) => testimonial === activeItem.testimonial,
      )
    : -1;

  function sendToBack(id: string) {
    setStack((current) => {
      if (current.length < 2) return current;

      const index = current.findIndex((item) => item.id === id);
      if (index < 0) return current;

      const next = [...current];
      const [item] = next.splice(index, 1);
      if (!item) return current;

      next.unshift(item);
      return next;
    });
  }

  function showPrevious() {
    setStack((current) => {
      if (current.length < 2) return current;
      return [...current.slice(1), current[0]!];
    });
  }

  function showNext() {
    if (activeItem) sendToBack(activeItem.id);
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
  }

  useEffect(() => {
    if (
      !autoplay ||
      reduceMotion ||
      paused ||
      stack.length < 2 ||
      !activeItem
    ) {
      return;
    }

    const interval = window.setInterval(
      () => sendToBack(activeItem.id),
      autoplayDelay,
    );

    return () => window.clearInterval(interval);
  }, [activeItem, autoplay, autoplayDelay, paused, reduceMotion, stack.length]);

  if (!activeItem) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={statusLabel
        .replace("{current}", String(activeIndex + 1))
        .replace("{total}", String(testimonials.length))}
      className="relative h-[22.9375rem] w-full [perspective:37.5rem]"
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={handleBlur}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPrevious();
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          showNext();
        }
      }}
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {statusLabel
          .replace("{current}", String(activeIndex + 1))
          .replace("{total}", String(testimonials.length))}
      </p>

      <button type="button" className="sr-only" onClick={showPrevious}>
        {previousLabel}
      </button>
      <button type="button" className="sr-only" onClick={showNext}>
        {nextLabel}
      </button>

      {stack.map((item, index) => {
        const active = item.id === activeItem.id;
        const depth = stack.length - index - 1;

        return (
          <DraggableCard
            key={item.id}
            active={active}
            sensitivity={sensitivity}
            onSendToBack={() => sendToBack(item.id)}
          >
            <motion.div
              className="size-full"
              initial={false}
              animate={{
                rotateZ: reduceMotion ? 0 : depth * 4,
                scale: reduceMotion ? 1 : 1 - depth * 0.06,
                transformOrigin: "90% 90%",
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 260, damping: 20 }
              }
              onClick={() => active && showNext()}
            >
              <TestimonialCard
                quote={item.testimonial.quote}
                authorName={item.testimonial.authorName}
                authorRole={item.testimonial.authorRole}
                authorImageAlt={item.testimonial.authorImageAlt}
                className="h-full"
              />
            </motion.div>
          </DraggableCard>
        );
      })}
    </div>
  );
}
