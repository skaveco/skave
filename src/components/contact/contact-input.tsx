import type { ComponentPropsWithRef, ReactNode } from "react";

export type ContactInputProps = Omit<
  ComponentPropsWithRef<"input">,
  "children" | "type"
> & {
  label: string;
  icon?: ReactNode;
  type?: "text" | "email" | "password" | "search" | "tel" | "url";
};

// Figma: Website Skave 3.0, node 2960:4216.
export function ContactInput({
  label,
  icon,
  type = "text",
  placeholder = " ",
  className = "",
  ...props
}: ContactInputProps) {
  return (
    <label
      className={`flex w-full min-w-0 items-center gap-3 border-b border-text-01 bg-background-01 px-3 py-4 text-text-01 has-[:placeholder-shown]:not-has-[:focus]:border-divider has-[:placeholder-shown]:not-has-[:focus]:text-text-02 has-[:focus]:border-primary has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 ${className}`}
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
      {/* O placeholder mantém os estados sincronizados com autofill e reset nativos. */}
      <input
        {...props}
        type={type}
        placeholder={placeholder || " "}
        className="type-body-base block w-full min-w-0 flex-1 appearance-none rounded-none border-0 bg-transparent p-0 text-text-01 outline-none placeholder:text-text-02 focus:placeholder:text-text-01 disabled:cursor-not-allowed"
      />
    </label>
  );
}
