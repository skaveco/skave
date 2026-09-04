"use client";

import { useId, useState, type ReactNode } from "react";

type AccordionItemProps = {
  answer: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  question: string;
};

// Figma: Website Skave 3.0, node 2910:526.
export function AccordionItem({
  answer,
  className = "",
  defaultOpen = false,
  question,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div
      className={`type-body-base border-b border-divider py-4 ${className}`}
    >
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-start gap-1 text-left text-text-01 focus-visible:outline-2 focus-visible:outline-offset-4"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span className="min-w-0 flex-1">{question}</span>
        <svg
          aria-hidden="true"
          className="size-[1.125rem] shrink-0 overflow-visible"
          fill="none"
          viewBox="0 0 18.1504 18.5166"
        >
          <path
            className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "rotate-90" : ""}`}
            d="M9.29688 18.5166L9.29687 0.516601"
            stroke="currentColor"
            strokeWidth="0.5625"
            style={{
              transformBox: "view-box",
              transformOrigin: "9.296875px 9.5166px",
            }}
          />
          <path
            d="M0.150391 9.36865L18.1504 9.36865"
            stroke="currentColor"
            strokeWidth="0.5625"
          />
        </svg>
      </button>

      <div
        aria-hidden={!isOpen}
        className={`grid text-text-02 transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        id={panelId}
        inert={!isOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pt-[0.875rem]">{answer}</div>
        </div>
      </div>
    </div>
  );
}
