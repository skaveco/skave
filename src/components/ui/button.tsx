"use client";

import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import type { ButtonHTMLAttributes, CSSProperties } from "react";

import { Text3DFlip } from "@/components/ui/text-3d-flip";

type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  children: string;
  fontSize?: CSSProperties["fontSize"];
  gap?: CSSProperties["gap"];
  href?: string;
  icon?: "arrow-long-right";
  iconSize?: CSSProperties["width"];
};

// Figma: Website Skave 3.0, node 2845:411.
export function Button({
  children,
  className = "",
  fontSize = "1.25rem",
  gap = "0.5rem",
  href,
  icon,
  iconSize = "1.5rem",
  style,
  type = "button",
  ...props
}: ButtonProps) {
  const content = (
    <>
      <span className="sr-only">{children}</span>
      <Text3DFlip>{children}</Text3DFlip>
      {icon === "arrow-long-right" && (
        <span
          aria-hidden="true"
          className="relative block shrink-0 overflow-hidden"
          style={{ width: iconSize, height: iconSize }}
        >
          <ArrowLongRightIcon className="absolute inset-0 size-full transition-transform duration-550 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full group-focus-visible:translate-x-full motion-reduce:transform-none" />
          <ArrowLongRightIcon className="absolute inset-0 size-full -translate-x-full transition-transform duration-550 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0 motion-reduce:hidden" />
        </span>
      )}
    </>
  );

  const sharedClassName = `group type-body-lg inline-flex items-center text-text-01 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`;
  const sharedStyle = { ...style, fontSize, gap };

  if (href) {
    return (
      <Link href={href} className={sharedClassName} style={sharedStyle}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={sharedClassName}
      style={sharedStyle}
      {...props}
    >
      {content}
    </button>
  );
}
