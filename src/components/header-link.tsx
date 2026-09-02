import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

import { Text3DFlip } from "@/components/ui/text-3d-flip";

type HeaderLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "children"> & {
    children: string;
    difference?: boolean;
    icon?: boolean;
  };

export function HeaderLink({
  children,
  difference = true,
  icon = false,
  className = "",
  ...props
}: HeaderLinkProps) {
  return (
    <Link
      className={`type-body-base inline-flex items-center gap-2 whitespace-nowrap text-fixed-white focus-visible:outline-2 focus-visible:outline-offset-4 ${className}`}
      {...props}
    >
      <span className="sr-only">{children}</span>
      <Text3DFlip difference={difference}>{children}</Text3DFlip>
      {icon && <ArrowUpRightIcon aria-hidden="true" className="size-4 shrink-0" />}
    </Link>
  );
}
