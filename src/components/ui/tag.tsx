import type { HTMLAttributes } from "react";

type TagState = "default" | "hover" | "selected";

type TagProps = HTMLAttributes<HTMLSpanElement> & {
  children: string;
  state?: TagState;
};

const stateClassNames: Record<TagState, string> = {
  default:
    "border-divider bg-background-01 text-text-01 hover:border-text-01",
  hover: "border-text-01 bg-background-01 text-text-01",
  selected: "border-text-01 bg-text-01 text-background-01",
};

// Figma: Website Skave 3.0, node 2873:466.
export function Tag({
  children,
  className = "",
  state = "default",
  ...props
}: TagProps) {
  return (
    <span
      className={`type-body-sm inline-flex items-center justify-center whitespace-nowrap rounded-full border px-[0.875rem] py-2 transition-colors duration-300 motion-reduce:transition-none ${stateClassNames[state]} ${className}`}
      data-state={state}
      {...props}
    >
      {children}
    </span>
  );
}
