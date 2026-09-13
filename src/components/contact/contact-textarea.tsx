import type { ComponentPropsWithRef, ReactNode } from "react";

export type ContactTextareaProps = ComponentPropsWithRef<"textarea"> & {
  label: string;
  icon?: ReactNode;
};

// Figma: Website Skave 3.0, node 2960:4216; adaptação para múltiplas linhas.
export function ContactTextarea({
  label,
  icon,
  placeholder = " ",
  rows = 4,
  className = "",
  ...props
}: ContactTextareaProps) {
  return (
    <label
      className={`flex w-full min-w-0 items-start gap-3 border-b border-text-01 bg-background-01 px-3 py-4 text-text-01 has-[:placeholder-shown]:not-has-[:focus]:border-divider has-[:placeholder-shown]:not-has-[:focus]:text-text-02 has-[:focus]:border-primary has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 ${className}`}
    >
      <span className="sr-only">{label}</span>
      {icon && (
        <span
          aria-hidden="true"
          className="block size-[1.1875rem] shrink-0 [&>svg]:size-full"
        >
          {icon}
        </span>
      )}
      <textarea
        {...props}
        rows={rows}
        placeholder={placeholder || " "}
        className="type-body-base block min-h-[1.25rem] w-full min-w-0 flex-1 resize-y appearance-none rounded-none border-0 bg-transparent p-0 text-text-01 outline-none placeholder:text-text-02 focus:placeholder:text-text-01 disabled:cursor-not-allowed"
      />
    </label>
  );
}
