import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { ComponentPropsWithRef } from "react";

type ContactSelectProps = Omit<
  ComponentPropsWithRef<"select">,
  "children" | "multiple" | "size"
> & {
  label: string;
  placeholder: string;
  options: ReadonlyArray<{ value: string; label: string }>;
};

// Figma: Website Skave 3.0, nodes 2784:270 e 2784:292.
export function ContactSelect({
  label,
  placeholder,
  options,
  className = "",
  defaultValue,
  value,
  ...props
}: ContactSelectProps) {
  return (
    <label
      className={`relative flex w-full min-w-0 border-b border-divider bg-background-01 text-text-02 has-[option:checked:not([value=''])]:border-text-01 has-[option:checked:not([value=''])]:text-text-01 focus-within:!border-primary focus-within:text-text-01 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 ${className}`}
    >
      <span className="sr-only">{label}</span>
      <select
        {...props}
        value={value}
        defaultValue={value === undefined ? (defaultValue ?? "") : undefined}
        className="type-body-base block w-full min-w-0 cursor-pointer appearance-none rounded-none border-0 bg-transparent py-4 pr-[2.625rem] pl-3 text-inherit outline-none disabled:cursor-not-allowed [&>option]:bg-background-01 [&>option]:text-text-01"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 size-[1.125rem] -translate-y-1/2 text-text-02"
      />
    </label>
  );
}
