"use client";

import { useEffect, useState } from "react";

type HeroClockProps = {
  label: string;
  locale: string;
};

function timeInSaoJose(locale: string) {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "America/Sao_Paulo",
  })
    .format(new Date())
    .replace(/\s/g, "")
    .toUpperCase();
}

export function HeroClock({ label, locale }: HeroClockProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(timeInSaoJose(locale));

    update();
    const interval = window.setInterval(update, 1_000);

    return () => window.clearInterval(interval);
  }, [locale]);

  return (
    <span>
      {label} - <span suppressHydrationWarning>{time || "--:--"}</span>
    </span>
  );
}
