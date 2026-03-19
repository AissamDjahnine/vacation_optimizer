import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DE_HOST = "de.pontsmalins.com";

function shouldBypass(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/apple-icon") ||
    pathname.startsWith("/opengraph-image") ||
    pathname.startsWith("/favicon.ico")
  );
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const pathname = request.nextUrl.pathname;

  if (!host.startsWith(DE_HOST) || shouldBypass(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/de" || pathname.startsWith("/de/")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = pathname === "/de" ? "/" : pathname.replace(/^\/de/, "");
    return NextResponse.redirect(redirectUrl, 308);
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname =
    pathname === "/"
      ? "/de"
      : pathname === "/en"
        ? "/de/en"
        : pathname.startsWith("/en/")
          ? `/de${pathname}`
          : `/de${pathname}`;
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
