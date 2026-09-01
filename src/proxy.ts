import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n";

function preferredLocale(request: NextRequest): Locale {
  const acceptedLanguages = request.headers.get("accept-language") ?? "";
  return acceptedLanguages.toLowerCase().includes("pt") ? "pt" : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  if (hasLocale(firstSegment)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
