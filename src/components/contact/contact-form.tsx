"use client";

import {
  ArrowLongRightIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Children, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";

import type { Dictionary } from "@/app/[lang]/dictionaries";
import { ContactInput } from "@/components/contact/contact-input";
import { ContactSelect } from "@/components/contact/contact-select";
import { ContactTextarea } from "@/components/contact/contact-textarea";

type ContactFormProps = {
  content: Dictionary["contact"]["form"];
  privacyHref: string;
  successHref: string;
};

function ContactFieldGroup({ title, children }: { title: string; children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.fieldset
      className="min-w-0"
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: reduceMotion
            ? { duration: 0 }
            : { delayChildren: 0.08, staggerChildren: 0.08 },
        },
      }}
    >
      <legend className="type-body-lg mb-3">{title}</legend>
      {Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: reduceMotion ? {} : { opacity: 0, y: 12 },
            visible: reduceMotion
              ? {}
              : {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.fieldset>
  );
}

function formatPhone(value: string) {
  let digits = value.replace(/\D/g, "");

  // Aceita também números brasileiros colados com o código do país.
  if (digits.startsWith("55") && (value.trimStart().startsWith("+55") || digits.length > 11)) {
    digits = digits.slice(2);
  }

  digits = digits.slice(0, 11);
  if (!digits) return "";
  if (digits.length <= 2) return `(${digits}`;

  const areaCode = digits.slice(0, 2);
  const number = digits.slice(2);
  const splitAt = number.length > 8 ? 5 : 4;
  const formattedNumber = number.length > splitAt
    ? `${number.slice(0, splitAt)}-${number.slice(splitAt)}`
    : number;

  return `(${areaCode}) ${formattedNumber}`;
}

function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
  const input = event.currentTarget;
  const original = input.value;
  const cursor = input.selectionStart ?? original.length;
  const digitsBeforeCursor = original.slice(0, cursor).replace(/\D/g, "").length;
  const formatted = formatPhone(original);

  input.value = formatted;

  // Preserva a posição durante edições no meio do número.
  let nextCursor = formatted.length;
  if (cursor < original.length) {
    let digitsSeen = 0;
    nextCursor = 0;
    while (nextCursor < formatted.length && digitsSeen < digitsBeforeCursor) {
      if (/\d/.test(formatted[nextCursor])) digitsSeen += 1;
      nextCursor += 1;
    }
  }
  input.setSelectionRange(nextCursor, nextCursor);
}

// Figma: Website Skave 3.0, node 2784:302.
export function ContactForm({ content, privacyHref, successHref }: ContactFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    submitting.current = true;
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(25000),
      });
      if (!response.ok) throw new Error("Contact submission failed");
      const result = await response.json();
      if (result.success !== true) throw new Error("Contact submission not confirmed");
      form.reset();
      setStatus("success");
      router.replace(successHref);
    } catch {
      setStatus("error");
      submitting.current = false;
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={status === "sending"}
      className="flex w-full min-w-0 flex-col gap-[2.5rem]"
    >
      <fieldset disabled={status === "sending"} className="flex min-w-0 flex-col gap-[3rem]">
        <ContactFieldGroup title={content.personalTitle}>
          <ContactInput name="name" required maxLength={200} autoComplete="name" {...content.name} />
          <ContactInput
            name="email"
            required
            maxLength={254}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            icon={<EnvelopeIcon />}
            {...content.email}
          />
          <ContactInput
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            onChange={handlePhoneChange}
            icon={<PhoneIcon />}
            {...content.phone}
          />
          <ContactSelect name="referralSource" required {...content.referralSource} />
        </ContactFieldGroup>

        <ContactFieldGroup title={content.companyTitle}>
          <ContactInput name="companyNameAndIndustry" required {...content.companyNameAndIndustry} />
          <ContactInput
            name="company"
            type="url"
            inputMode="url"
            pattern="[hH][tT][tT][pP][sS]?://[^\s]+"
            title={content.company.urlHint}
            autoCapitalize="none"
            spellCheck={false}
            maxLength={1000}
            label={content.company.label}
            placeholder={content.company.placeholder}
          />
          <ContactInput name="partners" required {...content.partners} />
        </ContactFieldGroup>

        <ContactFieldGroup title={content.projectTitle}>
          <ContactSelect name="budget" required {...content.budget} />
          <ContactTextarea
            name="message"
            required
            rows={3}
            className="min-h-[6.25rem]"
            {...content.message}
          />
        </ContactFieldGroup>
      </fieldset>

      <button
        type="submit"
        disabled={status === "sending" || status === "success"}
        className="type-body-base flex w-full items-center justify-center gap-2 bg-text-01 px-4 py-3 font-[550] text-background-01 disabled:cursor-not-allowed"
      >
        {status === "sending" ? content.sending : content.submit}
        <ArrowLongRightIcon aria-hidden="true" className="size-[1.25rem]" />
      </button>

      <p role="status" aria-live="polite" className="type-body-base text-center empty:hidden">
        {status === "success" ? content.success : status === "error" ? content.error : ""}
      </p>

      <p className="type-body-base mx-auto w-full max-w-[31.5rem] text-center">
        {content.privacy}{" "}
        <Link
          href={privacyHref}
          className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {content.privacyLink}
        </Link>
        .
      </p>
    </form>
  );
}
